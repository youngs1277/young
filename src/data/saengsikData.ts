export interface IngredientCategory {
  category: string;
  items: string[];
}

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  {
    category: "곡류 및 잡곡 (12종)",
    items: ["현미", "발아현미", "흑미", "찹쌀", "늘보리", "찰보리", "율무", "수수", "차조", "기장", "메밀", "국산귀리"],
  },
  {
    category: "두류 및 씨앗 (8종)",
    items: ["서리태(검은콩)", "쥐눈이콩(약콩)", "백태(노란콩)", "팥", "녹두", "볶은참깨", "들깨", "호박씨"],
  },
  {
    category: "신선 채소 및 잎채소 (11종)",
    items: ["케일", "신선초", "양배추", "시금치", "브로콜리", "당근", "단호박", "비트", "파프리카", "가지", "토마토"],
  },
  {
    category: "뿌리채소 및 산야초 (10종)",
    items: ["우엉", "연근", "더덕", "도라지", "무", "순무", "마", "연잎", "쑥", "미나리"],
  },
  {
    category: "버섯 및 해조류 (5종)",
    items: ["표고버섯", "느타리버섯", "다시마", "미역", "톳"],
  },
  {
    category: "과일 및 솔잎 (4종)",
    items: ["사과", "배", "매실", "솔잎"],
  },
];

export const TOTAL_INGREDIENTS_COUNT = INGREDIENT_CATEGORIES.reduce(
  (acc, curr) => acc + curr.items.length,
  0
);

export interface TargetPerson {
  number: string;
  title: string;
  description: string;
  solution: string;
  badge: string;
}

export const TARGET_AUDIENCES: TargetPerson[] = [
  {
    number: "01",
    title: "아침을 자주 거르는 바쁜 직장인·학생",
    description: "출근과 등교 준비로 바빠서 밥 한 술 뜨기 힘들고, 빈속으로 하루를 시작하는 분",
    solution: "물이나 우유에 넣고 10초만 가볍게 흔들면, 든든하고 속 편한 아침 식사가 완성됩니다.",
    badge: "바쁜 아침 추천",
  },
  {
    number: "02",
    title: "끼니 챙겨 먹기가 번거로운 1인 가구 & 어르신",
    description: "매번 밥 짓고 반찬 차려 설거지하기 번거로워 대충 라면이나 빵으로 때우시는 분",
    solution: "번거로운 조리 없이 50가지 자연 곡물과 채소를 골고루 간편하게 챙겨 드실 수 있습니다.",
    badge: "간편한 한 끼",
  },
  {
    number: "03",
    title: "기름진 외식 대신 담백한 자연식을 찾는 분",
    description: "짜고 기름진 인스턴트 배달 음식에 질려 속이 편안하고 고소한 자연 한 끼를 원하는 분",
    solution: "합성 첨가물 없이 100% 국내산 곡물 본연의 구수함과 깔끔한 목넘김으로 든든합니다.",
    badge: "자연 원재료",
  },
];

export interface HowToStep {
  step: number;
  stepLabel: string;
  title: string;
  desc: string;
  tip: string;
}

export const HOW_TO_STEPS: HowToStep[] = [
  {
    step: 1,
    stepLabel: "1단계",
    title: "보틀에 물 또는 우유 200ml 붓기",
    desc: "취향에 따라 생수, 우유, 두유 중 하나를 전용 보틀에 먼저 채워주세요.",
    tip: "★ 가루가 바닥에 뭉치지 않도록 '액체를 먼저' 넣는 것이 포인트!",
  },
  {
    step: 2,
    stepLabel: "2단계",
    title: "50곡 생식 1포(30g) 넣기",
    desc: "개별 포장된 생식 스틱 1포를 뜯어 보틀 안에 톡 털어 넣어줍니다.",
    tip: "가방에 쏙 들어가는 개별 포장이라 사무실, 여행지에서도 깔끔합니다.",
  },
  {
    step: 3,
    stepLabel: "3단계",
    title: "뚜껑 닫고 흔들어 맛있게 마시기",
    desc: "뚜껑을 꼭 닫고 5~10초간 위아래로 가볍게 흔들어 주면 완성!",
    tip: "더 달콤한 맛을 원하시면 꿀 반 스푼이나 바나나를 곁들여도 좋습니다.",
  },
];

export interface ProductInfo {
  name: string;
  tagline: string;
  regularPrice: number;
  salePrice: number;
  discountRate: number;
  shipping: string;
  capacity: string;
  gift: string;
  origin: string;
}

export const FEATURED_PRODUCT: ProductInfo = {
  name: "자연온 50곡 순수 생식 (1개월분)",
  tagline: "100% 국내산 50가지 자연 곡물·채소 동결건조 스틱",
  regularPrice: 55000,
  salePrice: 48000,
  discountRate: 12,
  shipping: "전국 무료배송 (제주/도서산간 포함)",
  capacity: "1박스 (30g × 30포 / 900g)",
  gift: "친환경 트라이탄 전용 쉐이커 보틀 (500ml) 무료 증정",
  origin: "원재료 100% 대한민국 국산",
};
