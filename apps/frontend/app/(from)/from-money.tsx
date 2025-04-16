import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { useRouter } from "expo-router";
import { countries } from "@/lib/data/countries";
import { useAppStore } from "@/lib/zustand/store";

export default function FromMoney() {
  const [selectedCountry, setSelectedCountry] = useState("KRW");
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState(""); // 실제 TextInput에 표시되는 값
  const [money, setMoney] = useState("");
  const { state, setState } = useAppStore();

  // 필터된 국가 리스트
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const prettyNumber = (number?: number): string => {
    if (!number) return "0";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-start items-center px-6 bg-[#FFFDF5] gap-10 pt-[80px]">
            <View className="w-full flex-col ">
              <Text className="text-lg font-semibold text-black mb-2">
                국가 선택,,,
              </Text>
              <TextInput
                placeholder="국가 이름으로 검색 (예: 대한민국)"
                value={searchText}
                onChangeText={(value) => {
                  setSearchText(value);
                  setSearchQuery(value); 
                }}
                className="w-full px-4 pb-1 h-14  border border-gray-300 rounded-lg text-base bg-white mb-4 items-center"
              />

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-8 h-12 max-h-12"
              >
                {filteredCountries.map((country) => (
                  <TouchableOpacity
                    key={country.code}
                    onPress={() => {
                      setSelectedCountry(country.code);
                      setSearchText(country.name); // ✅ 표시용만 갱신
                      setSearchQuery(""); // ✅ 필터 초기화 (즉 전체 리스트 다시 보이게)
                    }}
                    className={`px-4 py-2 mr-3 h-10 rounded-xl border ${
                      selectedCountry === country.code
                        ? "bg-white border-gray-500"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <Text className="text-sm text-black">{country.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View className="w-full flex-col">
              <Text className="text-lg font-semibold text-black mb-2">
                금액 입력
              </Text>
              <TextInput
                placeholder="예: 10000"
                keyboardType="numeric"
                value={money}
                onChangeText={(value) => {
                  setMoney(value.replace(/[^0-9]/g, ""));
                }}
                onBlur={() => {
                  const safeNumber = parseInt(money.replace(/[^0-9]/g, '') || '0', 10);
                  const formatted = prettyNumber(Number(safeNumber));
                  setMoney(formatted);
                }}
                className="w-full px-4 pb-1 h-14 border border-gray-300 rounded-xl text-lg bg-white"
              />

              <TouchableOpacity
                className="mt-10 bg-white py-4 px-6 rounded-xl border border-gray-300"
                onPress={() => {
                  const safeNumber = parseInt(money.replace(/[^0-9]/g, '') || '0', 10);
                  setState({
                    money: safeNumber,
                    country: selectedCountry,
                  });
                  router.back(); // TODO : 변경
                }}
              >
                <Text className="text-lg font-base text-center w-full text-black">입력 완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
