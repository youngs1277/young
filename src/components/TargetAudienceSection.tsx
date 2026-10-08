import React from "react";
import { Sunrise, Clock, HeartHandshake, CheckCircle } from "lucide-react";
import { TARGET_AUDIENCES } from "../data/saengsikData";

interface TargetAudienceSectionProps {
  largeFont: boolean;
}

export const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = ({
  largeFont,
}) => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Sunrise className="w-6 h-6 text-[#2E5E32]" />;
      case 1:
        return <Clock className="w-6 h-6 text-[#2E5E32]" />;
      case 2:
      default:
        return <HeartHandshake className="w-6 h-6 text-[#2E5E32]" />;
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F4EFE6] border-b border-[#E8E1D5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs sm:text-sm font-bold text-[#2E5E32] tracking-wider uppercase">
            맞춤 안내
          </span>
          <h2
            className={`font-black text-[#193A1C] tracking-tight mt-1 ${
              largeFont ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl"
            }`}
          >
            이런 분께 특히 좋아요
          </h2>
          <p
            className={`mt-2 text-[#4D5C50] leading-relaxed ${
              largeFont ? "text-base sm:text-xl" : "text-sm sm:text-base"
            }`}
          >
            바쁘고 번거로운 일상 속에서 간편하게 식사를 챙기고 싶은 세 가지 경우입니다.
          </p>
        </div>

        {/* 3 Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TARGET_AUDIENCES.map((item, index) => (
            <div
              key={index}
              className="bg-[#FAF8F5] rounded-2xl border-2 border-[#DFD5C4] p-5 sm:p-6 shadow-xs hover:border-[#28572B]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with icon and index */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E2ECE0] flex items-center justify-center">
                    {getIcon(index)}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#28572B] bg-[#E8F0E6] px-2.5 py-1 rounded-md">
                    추천 {item.number}
                  </span>
                </div>

                <span className="inline-block text-xs font-bold text-[#3B663F] mb-1">
                  {item.badge}
                </span>

                <h3
                  className={`font-bold text-[#193A1C] leading-snug mb-3 ${
                    largeFont ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-[#526355] leading-relaxed mb-4 ${
                    largeFont ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {/* Solution box */}
              <div className="pt-3 border-t border-[#E8E0D1] bg-[#F2EDE3]/70 -mx-2 -mb-2 p-3 rounded-xl mt-auto">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#28572B] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-medium text-[#203D22] leading-tight">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance banner */}
        <div className="mt-8 text-center bg-[#E8F0E6] border border-[#CCDDC9] rounded-xl p-4 sm:p-5">
          <p className="text-sm sm:text-base font-bold text-[#1E3F20]">
            💡 아침 출근 전 1분, 늦은 귀가 후 1분이면 든든하게 해결됩니다.
          </p>
          <p className="text-xs sm:text-sm text-[#4E6351] mt-0.5">
            자극적인 양념이나 기름기 없이, 자연 본연의 구수한 맛으로 속이 편안합니다.
          </p>
        </div>
      </div>
    </section>
  );
};
