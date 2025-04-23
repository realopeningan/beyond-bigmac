import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "ExchangeRates", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const lambdaFn = new NodejsFunction(this, "ExchangeRateApiHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "../lambda/exchange-rate-api.ts"),
      handler: "handler", // export된 함수 이름
      bundling: {
        target: "node18",
        platform: "node",
        minify: false,
        externalModules: ["aws-sdk"], // lambda 런타임에 이미 있는 거 제외
      },
      timeout: cdk.Duration.seconds(10),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const exchangeRateSaveLambda = new NodejsFunction(
      this,
      "DailyExchangeRateFetcher",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: path.join(__dirname, "../lambda/exchange-rate-fetcher.ts"),
        handler: "handler", // export된 함수 이름
        bundling: {
          target: "node18",
          platform: "node",
          minify: false,
          externalModules: ["aws-sdk"], // lambda 런타임에 이미 있는 거 제외
        },
        timeout: cdk.Duration.seconds(10),
        environment: {
          TABLE_NAME: table.tableName,
        },
      }
    );

    new events.Rule(this, "DailyTrigger", {
      schedule: events.Schedule.cron({ minute: "0", hour: "15" }), // UTC 15시 = KST 자정
      targets: [new targets.LambdaFunction(exchangeRateSaveLambda)],
    });

    table.grantReadWriteData(exchangeRateSaveLambda);
    table.grantReadWriteData(lambdaFn);

    const httpApi = new apigatewayv2.HttpApi(this, "HttpApi", {
      defaultIntegration: new integrations.HttpLambdaIntegration(
        "LambdaIntegration",
        lambdaFn
      ),
    });

    new cdk.CfnOutput(this, "HttpApiUrl", {
      value: httpApi.url ?? "Something went wrong",
    });
  }
}
