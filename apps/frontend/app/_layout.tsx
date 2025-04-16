import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(from)/from-money"
          options={{
            presentation: "modal", // 또는 'transparentModal'도 가능
            gestureEnabled: true, // 드래그해서 닫기
            animation: "slide_from_right", // 슬라이드 효과
          }}
        />
      </Stack>
    </GluestackUIProvider>
  );
}
