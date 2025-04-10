type Country = {
  name: string;
  code: string;        // 예: "KRW"
  flag: string;        // 예: "🇰🇷"
};

export const countries: Country[] = [
  {
    name: "대한민국",
    code: "KRW",
    flag: "🇰🇷",
  },
  {
    name: "미국",
    code: "USD",
    flag: "🇺🇸",
  },
  {
    name: "일본",
    code: "JPY",
    flag: "🇯🇵",
  },
  {
    name: "영국",
    code: "GBP",
    flag: "🇬🇧",
  },
  {
    name: "프랑스",
    code: "EUR",
    flag: "🇫🇷",
  },
  {
    name: "스위스",
    code: "CHF",
    flag: "🇨🇭",
  },
];