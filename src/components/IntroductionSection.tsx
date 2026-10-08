import React, { useState } from "react";
import { Check, ChevronDown, ChevronUp, Wheat, Leaf, Sparkles } from "lucide-react";
import ingredientsImg from "../assets/images/ingredients_harvest_1791342989091.jpg";
import { INGREDIENT_CATEGORIES, TOTAL_INGREDIENTS_COUNT } from "../data/saengsikData";

interface IntroductionSectionProps {
  largeFont: boolean;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({
  largeFont,
}) => {
  const [showAllIngredients, setShowAllIngredients] = useState(false);

  return (
    <section className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8E1D5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E2ECE0] text-[#245228] rounded-full text-xs sm:text-sm font-bold mb-3">
            <Wheat className="w-4 h-4 text-[#2E5E32]" />
            대한민국 흙과 바람이 키운 100% 국산
          </div>

          <h2
            className={`font-extrabold text-[#193A1C] tracking-tight leading-tight ${
              largeFont ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl"
            }`}
          >
            국내산 50가지 자연 원료, <br className="sm:hidden" />
            <span className="text-[#2C6330]">통째로 담았습니다</span>
          </h2>

          <p
            className={`mt-3 text-[#4A594D] leading-relaxed ${
              largeFont ? "text-base sm:text-xl" : "text-sm sm:text-base"
            }`}
          >
            기름진 인스턴트나 가공식품 대신, 자연에서 나고 자란 50가지 곡물과
            채소를 깨끗하게 씻어 그대로 동결건조했습니다.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Image card */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#DFD6C7] bg-[#E8E0D1] flex flex-col">
            <img
              src={ingredientsImg}
              alt="국내산 50가지 곡물과 채소 수확물"
              className="w-full h-56 sm:h-64 object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = "none";
              }}
            />
            <div className="p-4 sm:p-5 bg-[#FBF9F4]">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-[#245228] bg-[#E2ECE0] px-2.5 py-0.5 rounded-md">
                  산지 직송 엄선
                </span>
                <span className="text-xs text-[#637265]">원산지: 대한민국 전역</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#1E3F20] mt-2">
                영양 손실을 줄인 영하 40℃ 동결건조
              </h3>
              <p className="text-xs sm:text-sm text-[#506052] mt-1">
                뜨거운 열을 가하지 않고 급속 동결건조하여, 자연 원물이 지닌 고유의
                맛과 향, 담백한 고소함을 온전히 보존했습니다.
              </p>
            </div>
          </div>

          {/* Core promises list */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#E0D7C7] shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#28572B] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#1A381D]">
                    100% 국내산 곡물과 채소만 고집
                  </h4>
                  <p className="text-sm sm:text-base text-[#475749] mt-1 leading-relaxed">
                    수입산 곡물이나 합성 부원료는 1%도 넣지 않았습니다. 믿을 수
                    있는 전국 농가와 함께 정직하게 준비했습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#E0D7C7] shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#28572B] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#1A381D]">
                    합성 첨가물 4無 안심 원칙
                  </h4>
                  <p className="text-sm sm:text-base text-[#475749] mt-1 leading-relaxed">
                    합성 착향료, 인공 감미료, 보존료, 착색료를 일절 넣지 않아
                    원재료 본연의 깔끔하고 구수한 맛이 납니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#E0D7C7] shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#28572B] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#1A381D]">
                    간편한 개별 스틱 파우치 포장
                  </h4>
                  <p className="text-sm sm:text-base text-[#475749] mt-1 leading-relaxed">
                    대용량 통 형태와 달리 1회분(30g)씩 위생적으로 질소 충전 포장하여
                    눅눅해질 염려 없이 어디서나 깔끔합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 50 Ingredients Full View Card */}
        <div className="bg-[#FAF8F5] rounded-2xl border-2 border-[#DFD6C7] p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5DDCF]">
            <div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[#2E5E32]" />
                <h3 className="font-extrabold text-lg sm:text-xl text-[#193A1C]">
                  국내산 50가지 전성분 원료표
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C6D5F] mt-0.5">
                총 {TOTAL_INGREDIENTS_COUNT}가지 순수 국내산 자연 식재료를 엄선했습니다.
              </p>
            </div>

            <button
              onClick={() => setShowAllIngredients(!showAllIngredients)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#E6EFE4] hover:bg-[#D8E6D5] text-[#245228] font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>{showAllIngredients ? "목록 접기" : "50가지 원료 전체보기"}</span>
              {showAllIngredients ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Quick summary tags */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {INGREDIENT_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#F2EDE3] border border-[#DDD3C2]"
              >
                <div className="font-bold text-xs sm:text-sm text-[#1E3F20] mb-1">
                  {cat.category}
                </div>
                <div className="text-xs text-[#526354] line-clamp-2">
                  {cat.items.slice(0, 3).join(", ")} 등 {cat.items.length}종
                </div>
              </div>
            ))}
          </div>

          {/* Expandable full ingredients breakdown */}
          {showAllIngredients && (
            <div className="mt-5 pt-5 border-t border-[#E5DDCF] space-y-4 animate-in fade-in duration-300">
              {INGREDIENT_CATEGORIES.map((cat, index) => (
                <div key={index} className="bg-white/80 p-3.5 rounded-xl border border-[#E2DAD0]">
                  <h4 className="font-bold text-sm text-[#28572B] mb-2 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#2E5E32]" />
                    {cat.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#FAF7F2] text-[#344436] px-2.5 py-1 rounded-md border border-[#E5DDD0] font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-[11px] sm:text-xs text-[#6B7C6E] text-center pt-2">
                ※ 자연온생식은 일반 식품(곡류가공품)으로서 정직한 식재료만 담았습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
