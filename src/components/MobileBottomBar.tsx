import React from "react";
import { ShoppingCart, Phone } from "lucide-react";

interface MobileBottomBarProps {
  onOpenOrder: () => void;
  onOpenPhoneModal: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenOrder,
  onOpenPhoneModal,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#DFD6C7] px-3 py-2.5 shadow-xl flex items-center gap-2">
      <button
        onClick={onOpenPhoneModal}
        className="flex flex-col items-center justify-center w-14 h-12 rounded-xl bg-[#E8EFE6] text-[#245228] font-bold text-[11px] border border-[#CCDDC9] shrink-0 active:scale-95"
        aria-label="전화주문"
      >
        <Phone className="w-4 h-4 mb-0.5" />
        <span>전화</span>
      </button>

      <button
        onClick={onOpenOrder}
        className="flex-1 h-12 bg-[#28572B] hover:bg-[#1E4321] text-white font-black rounded-xl text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.98] cursor-pointer"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>주문하기 (48,000원)</span>
      </button>
    </div>
  );
};
