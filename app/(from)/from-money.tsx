import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { CountrySelector } from "@/components/screen/ContrySelector";
import { useRouter } from "expo-router"; 

export default function FromMoney() {
  const [selectedCountry, setSelectedCountry] = useState("KRW");
  const router = useRouter(); 
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center px-6 bg-[#FFFDF5]">
        <CountrySelector
          selected={selectedCountry}
          onChange={setSelectedCountry}
        />

        <Text className="text-base text-gray-600 mb-2">
          얼마를 가지고 계신가요?
        </Text>
        <TextInput
          placeholder="예: 10000"
          keyboardType="numeric"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg bg-white"
        />

        <TouchableOpacity
          className="mt-10 bg-yellow-400 py-4 px-6 rounded-xl shadow-md"
          onPress={() => {
            router.push("/");
          }}
        >
          <Text className="text-lg font-bold text-black">
            🍔 햄버거 개수 확인하기
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
