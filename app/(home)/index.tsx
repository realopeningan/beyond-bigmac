import { BigmacWave } from "@/components/screen/BigmacWave";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet } from "react-native";
export default function Index() {
  return (
    <LinearGradient
      colors={["#FFFBDA", "#FFBB70"]} // 감성 배경
      style={styles.container}
    >
      <Box className="flex flex-col justify-between h-full">
        <Box className="flex items-start justify-center flex-col gap-4">
          <Text className="text-black text-xl mt-4 font-normal py-3 px-5 bg-white rounded-lg ">
            당신의 돈으로...
          </Text>
          <Text className="text-black text-xl py-3 px-5 bg-white rounded-lg">
            몇 개의 햄버거를 살 수 있을까요?
          </Text>
        </Box>

        <Box className="flex items-end w-full">
          <BigmacWave />
        </Box>
      </Box>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  burger: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 20,
    transform: [{ rotate: "-2deg" }],
  },
});
