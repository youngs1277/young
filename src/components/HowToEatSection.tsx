import React from "react";
import { ArrowRight, Droplets, Sparkles, Milk, FlameKindling, Info } from "lucide-react";
import { HOW_TO_STEPS } from "../data/saengsikData";

interface HowToEatSectionProps {
  largeFont: boolean;
}

export const HowToEatSection: React.FC<HowToEatSectionProps> = ({ largeFont }) => {
  return (
    <section className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8E1D5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold text-[#2E5E32] tracking-wider uppercase">
            음용 방법 안내
          </span>
          <h2
            className={`font-black text-[#193A1C] tracking-tight mt-1 leading-tight ${
              largeFont ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl"
            }`}
          >
            물이나 우유에 타서 드세요
          </h2>
          <p
            className={`mt-2 text-[#4B594E] leading-relaxed ${
              largeFont ? "text-base sm:text-xl" : "text-sm sm:text-base"
            }`}
          >
            복잡한 준비 없이 단 10초! 1단계부터 3단계까지 순서대로 따라 해 보세요.
          </p>
        </div>

        {/* 1 -> 2 -> 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {HOW_TO_STEPS.map((stepItem, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F5] rounded-2xl border-2 border-[#DFD6C7] p-6 shadow-xs relative flex flex-col justify-between"
            >
              <div>
                {/* Step number badge & header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#28572B] text-white flex items-center justify-center font-black text-xl shadow-xs">
                    {stepItem.step}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E5ECE3] text-[#245228]">
                    {stepItem.stepLabel}
                  </span>
                </div>

                <h3
                  className={`font-extrabold text-[#193A1C] mb-2 leading-snug ${
                    largeFont ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                  }`}
                >
                  {stepItem.title}
                </h3>

                <p
                  className={`text-[#4C5B4E] leading-relaxed mb-4 ${
                    largeFont ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                  }`}
                >
                  {stepItem.desc}
                </p>
              </div>

              {/* Tip callout */}
              <div className="mt-auto pt-3 border-t border-[#E8E0D2] bg-[#F4EFE6] -mx-3 -mb-3 p-3 rounded-xl">
                <p className="text-xs font-medium text-[#245228] leading-normal">
                  {stepItem.tip}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Liquid recommendations box */}
        <div className="mt-10 bg-[#F4EFE6] rounded-2xl border border-[#DFD6C7] p-5 sm:p-7">
          <h4 className="font-extrabold text-base sm:text-lg text-[#193A1C] mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#2E5E32]" />
            취향별 추천 음용 레시피
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E0D7C9]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1E3F20] mb-1">
                <Droplets className="w-4 h-4 text-[#2E5E32]" />
                물 (200ml)과 함께
              </div>
              <p className="text-xs text-[#526355]">
                가장 깔끔하고 담백하게 곡물 고유의 구수한 풍미를 즐길 수 있습니다.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E0D7C9]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1E3F20] mb-1">
                <Milk className="w-4 h-4 text-[#2E5E32]" />
                우유 또는 두유와 함께
              </div>
              <p className="text-xs text-[#526355]">
                크리미하고 부드러워 미숫가루보다 훨씬 고소하며 포만감이 배가됩니다.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E0D7C9]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1E3F20] mb-1">
                <Sparkles className="w-4 h-4 text-[#2E5E32]" />
                꿀 반 스푼 추가
              </div>
              <p className="text-xs text-[#526355]">
                달달한 맛을 좋아하시는 분이나 아이들 간식으로 은은한 단맛을 더해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
