import React, { useState } from "react";
import { X, Phone, MessageSquare, Clock, Copy, Check } from "lucide-react";

interface PhoneOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  largeFont: boolean;
}

export const PhoneOrderModal: React.FC<PhoneOrderModalProps> = ({
  isOpen,
  onClose,
  largeFont,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const phoneNumber = "080-800-5050";
  const mobileNumber = "010-8950-5050";

  const handleCopy = () => {
    navigator.clipboard.writeText("010-8950-5050");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-[#FAF8F5] rounded-3xl border-2 border-[#DFD6C7] max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#28572B] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#A9D6A6]" />
            <h3 className="font-bold text-lg sm:text-xl">
              전화 및 문자 간편 주문
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/90 cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-[#4E5E51] mb-1">
              인터넷 주문이 번거로우신 분들을 위해
            </p>
            <p
              className={`font-black text-[#193A1C] leading-snug ${
                largeFont ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
              }`}
            >
              상담원이 친절하게 주문을 도와드립니다
            </p>
          </div>

          {/* Call Option 1: Direct phone button */}
          <a
            href={`tel:${phoneNumber}`}
            className="block p-4 sm:p-5 bg-[#E8F0E6] hover:bg-[#DCEADA] border-2 border-[#B9D5B4] rounded-2xl text-center transition-all cursor-pointer shadow-xs"
          >
            <div className="text-xs font-bold text-[#28572B]">
              [무료 전화 상담 및 주문]
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#193A1C] mt-1 tracking-wider">
              {phoneNumber}
            </div>
            <div className="text-xs text-[#526355] mt-1">
              (터치 시 바로 통화로 연결됩니다)
            </div>
          </a>

          {/* SMS Option 2: Text message order */}
          <div className="bg-[#F3EDE3] p-4 rounded-2xl border border-[#E0D7C9]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#1E3F20]">
                <MessageSquare className="w-4 h-4 text-[#28572B]" />
                문자 메시지 간편 주문 ({mobileNumber})
              </div>
              <button
                onClick={handleCopy}
                className="text-[11px] flex items-center gap-1 px-2 py-0.5 bg-white text-[#28572B] rounded-md border border-[#D5CBB9] cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "복사됨" : "번호복사"}</span>
              </button>
            </div>
            <p className="text-xs text-[#4F6052] leading-relaxed">
              문자로 <strong>[성함 / 주소 / 수량(1박스 또는 2박스)]</strong>을
              보내주시면 주문 접수 및 계좌를 바로 회신해 드립니다.
            </p>
          </div>

          {/* Operating hours */}
          <div className="flex items-center gap-2 text-xs text-[#6F7F72] justify-center">
            <Clock className="w-4 h-4" />
            <span>상담 가능 시간: 평일 오전 9시 ~ 오후 6시 (주말/공휴일 휴무)</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-[#ECE5D8] hover:bg-[#E2DACB] text-[#344436] font-bold rounded-xl text-sm transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
