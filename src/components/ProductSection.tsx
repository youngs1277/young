import React from "react";
import { ShoppingCart, Check, Gift, Truck, ShieldCheck, Phone } from "lucide-react";
import productImg from "../assets/images/product_saengsik_box_1791342976713.jpg";
import { FEATURED_PRODUCT } from "../data/saengsikData";

interface ProductSectionProps {
  onOpenOrder: () => void;
  onOpenPhoneModal: () => void;
  largeFont: boolean;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  onOpenOrder,
  onOpenPhoneModal,
  largeFont,
}) => {
  return (
    <section id="order-section" className="py-14 sm:py-20 bg-[#F5EFEB] border-b border-[#E8E1D5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs sm:text-sm font-bold text-[#2E5E32] tracking-wider uppercase">
            정직한 상품 소개
          </span>
          <h2
            className={`font-black text-[#193A1C] tracking-tight mt-1 ${
              largeFont ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl"
            }`}
          >
            자연온 50곡 순수 생식
          </h2>
          <p
            className={`mt-2 text-[#4D5C50] leading-relaxed ${
              largeFont ? "text-base sm:text-xl" : "text-sm sm:text-base"
            }`}
          >
            국내산 50가지 곡물과 채소를 1포에 가득 담은 든든한 1개월 한 끼 패키지입니다.
          </p>
        </div>

        {/* Product Card Container */}
        <div className="bg-[#FAF8F5] rounded-3xl border-2 border-[#DFD5C4] shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image Side */}
            <div className="relative bg-[#EDE6D8] flex items-center justify-center p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#E0D7C7]">
              <img
                src={productImg}
                alt="자연온 50곡 순수 생식 패키지 및 전용 보틀"
                className="w-full max-w-sm h-auto object-cover rounded-2xl shadow-sm border border-[#D5CBB9]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = "none";
                }}
              />
              <div className="absolute top-4 left-4 bg-[#28572B] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                사은품 보틀 증정 중
              </div>
            </div>

            {/* Product Info & Purchase Action Side */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#3B663F] mb-1">
                  [단독 특가] 1개월 정기 식사 구성
                </div>
                <h3
                  className={`font-black text-[#193A1C] leading-tight ${
                    largeFont ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                  }`}
                >
                  {FEATURED_PRODUCT.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#556658] mt-1">
                  {FEATURED_PRODUCT.tagline}
                </p>

                {/* Price Display */}
                <div className="mt-5 pt-4 border-t border-[#E8E0D2]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm line-through text-[#849287]">
                      {FEATURED_PRODUCT.regularPrice.toLocaleString()}원
                    </span>
                    <span className="text-xs font-extrabold text-[#A84B30] bg-[#FBECE8] px-2 py-0.5 rounded-md">
                      {FEATURED_PRODUCT.discountRate}% 혜택
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span
                      className={`font-black text-[#1C3E20] ${
                        largeFont ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
                      }`}
                    >
                      {FEATURED_PRODUCT.salePrice.toLocaleString()}
                    </span>
                    <span className="text-lg font-bold text-[#1C3E20]">원</span>
                    <span className="text-xs text-[#5C6E60] font-medium ml-1">
                      (1포당 약 1,600원)
                    </span>
                  </div>
                </div>

                {/* Key specs list */}
                <div className="mt-5 space-y-2 bg-[#F3EDE3] p-4 rounded-xl border border-[#E0D7C9]">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#27382A]">
                    <Check className="w-4 h-4 text-[#28572B] shrink-0" />
                    <span><strong>구성:</strong> {FEATURED_PRODUCT.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#27382A]">
                    <Gift className="w-4 h-4 text-[#28572B] shrink-0" />
                    <span><strong>사은품:</strong> {FEATURED_PRODUCT.gift}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#27382A]">
                    <Truck className="w-4 h-4 text-[#28572B] shrink-0" />
                    <span><strong>배송:</strong> {FEATURED_PRODUCT.shipping}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#27382A]">
                    <ShieldCheck className="w-4 h-4 text-[#28572B] shrink-0" />
                    <span><strong>원산지:</strong> {FEATURED_PRODUCT.origin}</span>
                  </div>
                </div>
              </div>

              {/* Big CTA Buttons as requested */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={onOpenOrder}
                  className={`w-full py-4 sm:py-5 px-6 bg-[#28572B] hover:bg-[#1E4321] text-white font-black rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.99] cursor-pointer ${
                    largeFont ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>주문하기</span>
                </button>

                <button
                  onClick={onOpenPhoneModal}
                  className="w-full py-3 sm:py-3.5 px-4 bg-[#E8EFE6] hover:bg-[#D9E6D6] text-[#245228] font-bold text-sm sm:text-base rounded-xl transition-colors flex items-center justify-center gap-2 border border-[#C6DAC4] cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>전화로 편하게 주문 상담하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Honest Notice */}
        <div className="mt-6 text-center text-xs text-[#6F7F72]">
          ※ 본 제품은 의약품이나 건강기능식품이 아닌 순수 일반식품(곡류가공품)입니다. <br className="hidden sm:inline" />
          신선한 50가지 국내산 원료의 영양을 간편한 식사 대용으로 전해드립니다.
        </div>
      </div>
    </section>
  );
};
