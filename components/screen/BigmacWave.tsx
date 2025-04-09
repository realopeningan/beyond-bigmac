import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

import { Image } from "react-native";

export function BigmacWave() {
  const rotationAnimation = useSharedValue(0);

  // 🍔 애니메이션 실행 함수
  const triggerAnimation = () => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 150 }),
        withTiming(0, { duration: 150 })
      ),
      4
    );
  };

  // 🔁 처음 랜더링 시 실행
  useEffect(() => {
    triggerAnimation();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Pressable onPress={triggerAnimation}>
      <Animated.View style={animatedStyle}>
        <Image
          source={require("../../assets/images/bigmac.png")}
          style={styles.burger}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  burger: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 20,
    transform: [{ rotate: "-2deg" }],
  },
});
