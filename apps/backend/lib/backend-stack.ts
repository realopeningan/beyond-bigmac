import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as path from 'path';
import { DockerImage } from 'aws-cdk-lib';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaPath = path.join(__dirname, '../lambda');

    const handler = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'hello.handler',
      code: lambda.Code.fromAsset(lambdaPath, {
        bundling: {
          local: {
            tryBundle(outputDir: string) {
              const { execSync } = require('child_process');
              execSync(
                `npx esbuild hello.ts --bundle --platform=node --target=node18 --outfile=${outputDir}/hello.js`,
                {
                  cwd: lambdaPath,
                  stdio: 'inherit',
                }
              );
              return true;
            },
          },
          image: DockerImage.fromRegistry('node:18-alpine'),
        },
      }),
    });


    const httpApi = new apigatewayv2.HttpApi(this, 'HttpApi', {
      defaultIntegration: new integrations.HttpLambdaIntegration('LambdaIntegration', handler),
    });

    new cdk.CfnOutput(this, 'HttpApiUrl', {
      value: httpApi.url ?? 'Something went wrong',
    });
  }
}