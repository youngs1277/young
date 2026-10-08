import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { IntroductionSection } from "./components/IntroductionSection";
import { TargetAudienceSection } from "./components/TargetAudienceSection";
import { HowToEatSection } from "./components/HowToEatSection";
import { ProductSection } from "./components/ProductSection";
import { OrderModal } from "./components/OrderModal";
import { PhoneOrderModal } from "./components/PhoneOrderModal";
import { OrderManagementModal } from "./components/OrderManagementModal";
import { AuthModal, AuthUser } from "./components/AuthModal";
import { Footer } from "./components/Footer";
import { MobileBottomBar } from "./components/MobileBottomBar";

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authPromptOrder, setAuthPromptOrder] = useState(false);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isOrderManagementOpen, setIsOrderManagementOpen] = useState(false);
  const [largeFont, setLargeFont] = useState(false);

  // Restore user session from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saengsik_user");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("사용자 정보 불러오기 실패:", e);
    }
  }, []);

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem("saengsik_user", JSON.stringify(user));
    } catch (e) {
      console.error("로컬 저장 오류:", e);
    }

    // If user clicked order before logging in, proceed to order modal immediately
    if (authPromptOrder) {
      setAuthPromptOrder(false);
      setIsOrderModalOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("saengsik_user");
    } catch (e) {
      console.error("로그아웃 오류:", e);
    }
  };

  // Order click handler: Requires login first as explicitly requested
  const handleOrderClick = () => {
    if (!currentUser) {
      setAuthPromptOrder(true);
      setIsAuthModalOpen(true);
    } else {
      setIsOrderModalOpen(true);
    }
  };

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
  };

  const handleOpenPhoneModal = () => {
    setIsPhoneModalOpen(true);
  };

  const handleClosePhoneModal = () => {
    setIsPhoneModalOpen(false);
  };

  const handleOpenOrderManagement = () => {
    setIsOrderManagementOpen(true);
  };

  const handleCloseOrderManagement = () => {
    setIsOrderManagementOpen(false);
  };

  const handleToggleLargeFont = () => {
    setLargeFont((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen bg-[#F8F6F0] text-[#1F2923] selection:bg-[#CCDDC9] selection:text-[#18391C] ${
        largeFont ? "text-lg" : "text-base"
      }`}
    >
      {/* Top Header: Displays welcome banner "[User]님 환영합니다." & Auth controls */}
      <Header
        onOpenOrder={handleOrderClick}
        onOpenPhoneModal={handleOpenPhoneModal}
        onOpenOrderLookup={handleOpenOrderManagement}
        onOpenAuth={() => {
          setAuthPromptOrder(false);
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
        currentUser={currentUser}
        largeFont={largeFont}
        onToggleLargeFont={handleToggleLargeFont}
      />

      {/* Main Content Area */}
      <main className="pb-16 md:pb-0">
        {/* 1. Hero Section: "하루 한잔, 간편한 한끼" + 큰 주문하기 버튼 */}
        <HeroSection onOpenOrder={handleOrderClick} largeFont={largeFont} />

        {/* 2. Introduction Section: 국내산 50가지 곡물/채소 소개 */}
        <IntroductionSection largeFont={largeFont} />

        {/* 3. Target Audience: 이런 분께 좋아요 3가지 */}
        <TargetAudienceSection largeFont={largeFont} />

        {/* 4. How To Eat: 물이나 우유에 타서 드세요 (1 -> 2 -> 3 순서) */}
        <HowToEatSection largeFont={largeFont} />

        {/* 5. Product & Price: 상품 1개와 가격, 큰 주문하기 버튼 */}
        <ProductSection
          onOpenOrder={handleOrderClick}
          onOpenPhoneModal={handleOpenPhoneModal}
          largeFont={largeFont}
        />
      </main>

      {/* Footer */}
      <Footer onOpenOrderLookup={handleOpenOrderManagement} />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileBottomBar
        onOpenOrder={handleOrderClick}
        onOpenPhoneModal={handleOpenPhoneModal}
      />

      {/* Auth Modal: Register & Login with Korean error handling */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthPromptOrder(false);
        }}
        onLoginSuccess={handleLoginSuccess}
        promptOrderMessage={authPromptOrder}
        largeFont={largeFont}
      />

      {/* Interactive Real Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrder}
        currentUser={currentUser}
        largeFont={largeFont}
        onOpenOrderLookup={handleOpenOrderManagement}
      />

      {/* Real-time Order Management & Lookup Modal */}
      <OrderManagementModal
        isOpen={isOrderManagementOpen}
        onClose={handleCloseOrderManagement}
        largeFont={largeFont}
      />

      {/* Phone/SMS Order Modal */}
      <PhoneOrderModal
        isOpen={isPhoneModalOpen}
        onClose={handleClosePhoneModal}
        largeFont={largeFont}
      />
    </div>
  );
}
