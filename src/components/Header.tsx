import React from "react";
import {
  Phone,
  ShoppingCart,
  Type,
  PackageSearch,
  User,
  LogOut,
  LogIn,
  Sparkles,
} from "lucide-react";
import { AuthUser } from "./AuthModal";

interface HeaderProps {
  onOpenOrder: () => void;
  onOpenPhoneModal: () => void;
  onOpenOrderLookup: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  currentUser: AuthUser | null;
  largeFont: boolean;
  onToggleLargeFont: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenOrder,
  onOpenPhoneModal,
  onOpenOrderLookup,
  onOpenAuth,
  onLogout,
  currentUser,
  largeFont,
  onToggleLargeFont,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E1D5] shadow-xs">
      {/* Top Banner when Logged In: "스테판님 환영합니다." as specifically requested */}
      {currentUser ? (
        <div className="bg-[#E5EFE3] border-b border-[#CCDDC9] text-[#1B421E] px-4 py-2 text-xs sm:text-sm font-bold flex items-center justify-between">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <Sparkles className="w-4 h-4 text-[#2E5E32] shrink-0" />
              <span className="truncate">
                <strong className="text-[#193A1C] text-sm sm:text-base underline decoration-[#8EB88B] decoration-2">
                  {currentUser.name}님 환영합니다.
                </strong>{" "}
                자연온 50곡 생식과 함께 든든한 하루를 시작하세요!
              </span>
            </div>
            <button
              onClick={onLogout}
              className="text-xs text-[#526355] hover:text-[#193A1C] font-semibold underline shrink-0 cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#F3EFE7] border-b border-[#E5DDD0] text-[#4E5E51] px-4 py-1.5 text-xs text-center">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
            <span>주문하시려면 먼저 회원가입 및 로그인을 해주세요.</span>
            <button
              onClick={onOpenAuth}
              className="text-[#245228] font-bold underline cursor-pointer"
            >
              로그인 / 회원가입하기
            </button>
          </div>
        </div>
      )}

      {/* Main Top Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-bold tracking-tight text-[#1E3F20] flex items-center gap-2 shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#3B7A37]"></span>
          자연온생식
        </a>

        {/* Zone 2: Navigation Links, Auth status, Accessibility */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {currentUser ? (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-bold text-[#1E3F20] bg-[#E8F0E6] border border-[#CCDDC9]">
              <User className="w-3.5 h-3.5 text-[#2E5E32]" />
              <span className="truncate max-w-[120px]">{currentUser.name}님</span>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-bold text-[#245228] bg-[#E8F0E6] hover:bg-[#DDEADC] transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>로그인</span>
            </button>
          )}

          <button
            onClick={onToggleLargeFont}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              largeFont
                ? "bg-[#28572B] text-white"
                : "bg-[#EFE9DD] text-[#344237] hover:bg-[#E4DBCB]"
            }`}
            title="돋보기/글자 크기 조절"
          >
            <Type className="w-3.5 h-3.5" />
            <span>{largeFont ? "큰 글씨" : "글자 크게"}</span>
          </button>

          <button
            onClick={onOpenOrderLookup}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-bold text-[#1E3F20] bg-[#E8F0E6] hover:bg-[#DBE8D8] border border-[#CCDDC9] transition-colors cursor-pointer shrink-0"
            title="판매자 실시간 주문관리"
          >
            <PackageSearch className="w-3.5 h-3.5 text-[#28572B]" />
            <span>주문관리</span>
          </button>
        </div>

        {/* Zone 3: Primary action button */}
        <div className="shrink-0 flex items-center gap-1.5">
          <button
            onClick={onOpenOrder}
            className="flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#28572B] hover:bg-[#1E4321] text-white font-bold text-sm sm:text-base rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>주문하기</span>
          </button>
        </div>
      </div>
    </header>
  );
};
