import React from "react";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import heroImg from "../assets/images/hero_saengsik_meal_1791342963955.jpg";

interface HeroSectionProps {
  onOpenOrder: () => void;
  largeFont: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenOrder,
  largeFont,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFEB] to-[#FAF7F2] pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-[#E8E1D5]">
      {/* Decorative subtle nature glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8EB88B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Top natural intro tag */}
        <div className="flex items-center gap-2 mb-4 text-[#2E5E32] font-semibold text-sm sm:text-base">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E2ECE0] text-[#245228] rounded-full text-xs sm:text-sm font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#326B36]" />
            100% 대한민국 국산 원료
          </span>
          <span className="text-[#647265] text-xs sm:text-sm">· 첨가물 0% 정직한 곡물식</span>
        </div>

        {/* Main Hero Catchphrase: Prompt explicit requirement */}
        <div className="mb-6">
          <h1
            className={`font-extrabold text-[#193A1C] leading-[1.25] tracking-tight text-balance ${
              largeFont
                ? "text-3xl sm:text-5xl lg:text-6xl"
                : "text-3xl sm:text-4xl lg:text-5xl"
            }`}
          >
            하루 한잔, <br className="sm:hidden" />
            <span className="text-[#2C6330] underline decoration-[#A9CBA6] decoration-4 underline-offset-8">
              간편한 한끼
            </span>
          </h1>

          <p
            className={`mt-4 text-[#435245] leading-relaxed max-w-2xl ${
              largeFont ? "text-lg sm:text-2xl" : "text-base sm:text-lg"
            }`}
          >
            물이나 우유에 흔들어 10초 만에 든든하게! <br />
            국내산 50가지 정직한 곡물과 채소를 자연 그대로 동결건조해 담았습니다.
          </p>
        </div>

        {/* Big Hero Image */}
        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-lg border-2 border-[#E3DBCF] bg-[#ECE5D8] group">
          <img
            src={heroImg}
            alt="국내산 50곡 자연 생식 한잔"
            className="w-full h-56 sm:h-80 md:h-96 object-cover object-center transform group-hover:scale-102 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // fallback container
              const target = e.target as HTMLElement;
              target.style.display = "none";
            }}
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C361E]/40 via-transparent to-transparent pointer-events-none" />

          {/* Image overlay badge */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#FDFBF7]/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-[#DCD3C3] shadow-md flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E2ECE0] flex items-center justify-center text-[#245228] font-bold text-sm">
              50
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#1E3F20] leading-tight">
                자연 원물 그대로 50종
              </p>
              <p className="text-[11px] sm:text-xs text-[#526355]">
                인공 감미료·보존료 무첨가
              </p>
            </div>
          </div>
        </div>

        {/* Big CTA Button Area as explicitly requested */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
          <button
            onClick={onOpenOrder}
            className={`w-full sm:flex-1 py-4 sm:py-5 px-6 sm:px-8 bg-[#28572B] hover:bg-[#1E4321] text-white font-black rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.99] cursor-pointer ${
              largeFont ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
            }`}
          >
            <span>지금 주문하기</span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* 3 Quick Guarantees (Clean, honest, non-medical) */}
        <div className="mt-8 pt-6 border-t border-[#E8E1D5] grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-5 h-5 text-[#28572B] mb-1" />
            <span className="text-xs sm:text-sm font-bold text-[#2A392C]">
              100% 국내산 원료
            </span>
            <span className="text-[11px] sm:text-xs text-[#637265]">
              곡물·채소 50종
            </span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-[#28572B] mb-1" />
            <span className="text-xs sm:text-sm font-bold text-[#2A392C]">
              첨가물 4無 원칙
            </span>
            <span className="text-[11px] sm:text-xs text-[#637265]">
              향료·색소·감미료 無
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-5 h-5 text-[#28572B] mb-1" />
            <span className="text-xs sm:text-sm font-bold text-[#2A392C]">
              동결건조 영양보존
            </span>
            <span className="text-[11px] sm:text-xs text-[#637265]">
              자연 맛 그대로
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
