import React from "react";
import { Phone, MapPin, Shield, PackageSearch } from "lucide-react";

interface FooterProps {
  onOpenOrderLookup?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderLookup }) => {
  return (
    <footer className="bg-[#EFE8DD] text-[#3E4F41] py-12 px-4 sm:px-6 border-t border-[#DFD6C7]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Brand & Regulatory Notice */}
        <div className="space-y-3 pb-6 border-b border-[#DDD3C2]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xl font-bold text-[#1E3F20]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B7A37]"></span>
              자연온생식 (自然溫生食)
            </div>
            {onOpenOrderLookup && (
              <button
                onClick={onOpenOrderLookup}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E2ECE0] text-[#245228] font-bold text-xs rounded-lg hover:bg-[#D5E4D2] transition-colors cursor-pointer"
              >
                <PackageSearch className="w-3.5 h-3.5" />
                <span>주문조회 / 사장님 관리</span>
              </button>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#506353] leading-relaxed max-w-2xl">
            자연온생식은 우리 땅에서 수확한 국내산 50가지 순수 곡물과 채소를
            동결건조하여 바쁜 현대인에게 정직하고 든든한 한 끼를 전합니다.
          </p>

          <div className="flex items-start gap-2 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#DFD5C4] text-xs text-[#526355]">
            <Shield className="w-4 h-4 text-[#28572B] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>식품위생법 안내:</strong> 본 제품은 질병의 예방 및 치료를 위한
              의약품이나 건강기능식품이 아니며, 자연 원재료를 동결건조한 일반식품(곡류가공품)입니다.
            </p>
          </div>
        </div>

        {/* Business details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#637566] leading-relaxed">
          <div className="space-y-1">
            <p><strong>상호명:</strong> 농업회사법인 (주)자연온생식</p>
            <p><strong>대표자:</strong> 김온유 | <strong>사업자등록번호:</strong> 314-86-12345</p>
            <p><strong>통신판매업신고:</strong> 제 2026-충주주덕-0128호</p>
            <p><strong>식품제조가공업영업신고:</strong> 충주시 제 142호</p>
            <p className="flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>사업장 소재지: 충청북도 충주시 주덕읍 신양로 102 자연온 가공센터</span>
            </p>
          </div>

          <div className="space-y-1 md:text-right">
            <p className="font-bold text-sm text-[#1E3F20]">
              고객만족센터: 080-800-5050
            </p>
            <p>문자 전용 주문: 010-8950-5050</p>
            <p>상담 운영: 평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)</p>
            <p>토·일·공휴일 휴무 (인터넷 및 문자 주문은 24시간 상시 접수)</p>
            <p className="text-[11px] pt-1">반품/교환 주소: 충주시 주덕읍 신양로 102 물류센터</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-[#DDD3C2] flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#78887B] gap-2">
          <p>© 2026 자연온생식. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">이용약관</a>
            <a href="#" className="hover:underline font-bold text-[#4B5E4E]">개인정보처리방침</a>
            <a href="#" className="hover:underline">식품안전인증조회</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
