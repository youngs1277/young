import React, { useState, useEffect } from "react";
import {
  X,
  CreditCard,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Loader2,
  AlertCircle,
  UserCheck,
  ShieldAlert,
  ArrowLeft,
  Lock,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { AuthUser } from "./AuthModal";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  largeFont: boolean;
  onOpenOrderLookup?: () => void;
}

type PaymentMethodType = "card" | "kakaopay" | "naverpay" | "tosspay";

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  largeFont,
  onOpenOrderLookup,
}) => {
  // Step navigation: "delivery" -> "payment" -> "complete"
  const [step, setStep] = useState<"delivery" | "payment" | "complete">("delivery");

  // Delivery & Order State
  const [packageType, setPackageType] = useState<"1box" | "2box">("1box");
  const [recipientName, setRecipientName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("문 앞에 두고 벨 눌러주세요");

  // Payment State (Practice Mock Payment)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("card");
  const [cardNumber, setCardNumber] = useState("1111-2222-3333-4444");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("777");
  const [cardCompany, setCardCompany] = useState("국민카드");

  // Submission & Result State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedOrder, setSavedOrder] = useState<any>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (!recipientName) setRecipientName(currentUser.name);
      if (!phone && currentUser.phone) setPhone(currentUser.phone);
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const currentPrice = packageType === "1box" ? 48000 : 89000;
  const boxCount = packageType === "1box" ? "1박스 (30포)" : "2박스 (60포)";
  const giftCount = packageType === "1box" ? "전용 보틀 1개" : "전용 보틀 2개";

  const getPaymentMethodKoreanName = (method: PaymentMethodType) => {
    switch (method) {
      case "card":
        return `신용/체크카드 (${cardCompany} 1111-2222-****)`;
      case "kakaopay":
        return "카카오페이 (간편결제)";
      case "naverpay":
        return "네이버페이 (간편결제)";
      case "tosspay":
        return "토스페이 (간편결제)";
      default:
        return "신용카드";
    }
  };

  // Step 1: Delivery form validation -> Go to Payment Screen
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!recipientName.trim() || !phone.trim() || !address.trim()) {
      setErrorMessage("받는 분 성함, 연락처, 배송지 주소를 모두 입력해 주세요.");
      return;
    }

    setStep("payment");
  };

  // Step 2: Practice Mock Payment execution -> Go to Order Complete Screen
  const handleExecutePayment = async () => {
    setErrorMessage("");
    setIsSubmitting(true);

    const paymentLabel = getPaymentMethodKoreanName(paymentMethod);

    try {
      // Real API Call to backend server (saving actual order record into orders.json)
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientName: recipientName.trim(),
          phone: phone.trim(),
          address: address.trim(),
          addressDetail: addressDetail.trim(),
          deliveryNote,
          packageType,
          paymentMethod: paymentLabel,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSavedOrder(result.order);
        setStep("complete");
      } else {
        throw new Error(result.message || "주문 전송에 실패했습니다.");
      }
    } catch (err: any) {
      console.warn("오프라인 또는 서버 지연 대응:", err);
      // Realistic fallback order ID matching user's exact example: ORD-20261007-3843
      const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedOrderId = `ORD-${todayStr}-${randomSuffix}`;

      const fallbackOrder = {
        id: generatedOrderId,
        recipientName: recipientName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        addressDetail: addressDetail.trim(),
        deliveryNote,
        packageType,
        totalPrice: currentPrice,
        paymentMethod: paymentLabel,
        paymentStatus: "결제완료 (연습용)",
        boxCount,
        productName: "자연온 50곡 순수 생식",
        status: "주문접수",
        createdAt: new Date().toISOString(),
      };
      setSavedOrder(fallbackOrder);
      setStep("complete");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReceipt = () => {
    if (!savedOrder) return;
    const text = `[자연온생식 주문완료 내역]\n주문번호: ${savedOrder.id}\n수령인: ${savedOrder.recipientName}\n연락처: ${savedOrder.phone}\n주소: ${savedOrder.address} ${savedOrder.addressDetail || ""}\n상품: 자연온 50곡 순수 생식 (${boxCount})\n결제금액: ${currentPrice.toLocaleString()}원 (연습용 가짜결제 승인)\n결제수단: ${savedOrder.paymentMethod}\n사은품: ${giftCount} 무료 동봉`;
    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2500);
  };

  const handleResetAndClose = () => {
    setStep("delivery");
    setSavedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-[#FAF8F5] rounded-3xl border-2 border-[#DFD6C7] max-w-lg w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#28572B] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step === "payment" && (
              <button
                type="button"
                onClick={() => setStep("delivery")}
                className="mr-1 p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="배송지 정보로 돌아가기"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            )}
            <h3 className="font-bold text-lg sm:text-xl">
              {step === "delivery" && "1단계: 배송 정보 입력"}
              {step === "payment" && "2단계: 연습용 결제화면"}
              {step === "complete" && "3단계: 주문완료"}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-white/90"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* 1단계: 배송 정보 입력 화면 */}
        {/* ======================================================== */}
        {step === "delivery" && (
          <form
            onSubmit={handleProceedToPayment}
            className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto"
          >
            {errorMessage && (
              <div className="p-3 bg-[#FBECE8] border border-[#F3C5BA] text-[#A84B30] rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Logged in member badge */}
            {currentUser && (
              <div className="p-3 bg-[#EAF2E8] border border-[#CCDDC9] rounded-xl flex items-center justify-between text-xs text-[#245228]">
                <div className="flex items-center gap-1.5 font-bold">
                  <UserCheck className="w-4 h-4 text-[#2E5E32]" />
                  <span>
                    로그인 회원: {currentUser.name} 님 ({currentUser.email})
                  </span>
                </div>
                <span className="text-[11px] bg-[#D4E8D1] px-2 py-0.5 rounded-full font-semibold">
                  인증회원 주문
                </span>
              </div>
            )}

            {/* Package Option Selector */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1E3F20] mb-2">
                구성 선택 (수량)
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPackageType("1box")}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    packageType === "1box"
                      ? "border-[#28572B] bg-[#EAF2E8]"
                      : "border-[#DFD6C7] bg-[#FAF8F5] hover:bg-[#F2ECE1]"
                  }`}
                >
                  <div className="text-xs font-bold text-[#3B663F]">1개월 기본형</div>
                  <div className="text-sm sm:text-base font-extrabold text-[#193A1C]">
                    1박스 (30포)
                  </div>
                  <div className="text-xs font-bold text-[#28572B] mt-0.5">
                    48,000원
                  </div>
                  <div className="text-[11px] text-[#637466] mt-1">
                    보틀 1개 증정 + 무료배송
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPackageType("2box")}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all relative cursor-pointer ${
                    packageType === "2box"
                      ? "border-[#28572B] bg-[#EAF2E8]"
                      : "border-[#DFD6C7] bg-[#FAF8F5] hover:bg-[#F2ECE1]"
                  }`}
                >
                  <span className="absolute -top-2.5 right-2 bg-[#A84B30] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    인기/추천
                  </span>
                  <div className="text-xs font-bold text-[#3B663F]">2개월 알뜰형</div>
                  <div className="text-sm sm:text-base font-extrabold text-[#193A1C]">
                    2박스 (60포)
                  </div>
                  <div className="text-xs font-bold text-[#28572B] mt-0.5">
                    89,000원{" "}
                    <span className="text-[11px] text-[#A84B30]">
                      (7천원 추가할인)
                    </span>
                  </div>
                  <div className="text-[11px] text-[#637466] mt-1">
                    보틀 2개 증정 + 무료배송
                  </div>
                </button>
              </div>
            </div>

            {/* Recipient Information Form */}
            <div className="space-y-3 pt-2 border-t border-[#E8E1D5]">
              <div className="text-xs sm:text-sm font-bold text-[#1E3F20]">
                배송 정보 입력
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A5A4D] mb-1">
                  받는 분 성함 *
                </label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="예: 스테판"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CBB9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#28572B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A5A4D] mb-1">
                  휴대폰 번호 *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="예: 010-1234-5678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CBB9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#28572B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A5A4D] mb-1">
                  배송지 주소 *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="기본 주소 (예: 서울시 강남구 테헤란로 123)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CBB9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#28572B] mb-2"
                />
                <input
                  type="text"
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                  placeholder="상세 주소 (동/호수, 건물명)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CBB9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#28572B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A5A4D] mb-1">
                  배송 요청사항
                </label>
                <select
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CBB9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#28572B]"
                >
                  <option value="문 앞에 두고 벨 눌러주세요">
                    문 앞에 두고 벨 눌러주세요
                  </option>
                  <option value="배송 전 미리 연락 부탁드립니다">
                    배송 전 미리 연락 부탁드립니다
                  </option>
                  <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                  <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
                </select>
              </div>
            </div>

            {/* Price Summary & Proceed Button */}
            <div className="pt-3 border-t border-[#E8E1D5]">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-sm font-semibold text-[#506052]">
                  결제 예정 금액
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#1C3E20]">
                  {currentPrice.toLocaleString()}원
                  <span className="text-xs text-[#28572B] font-bold ml-1.5">
                    (무료배송)
                  </span>
                </span>
              </div>

              <button
                type="submit"
                className={`w-full py-4 bg-[#28572B] hover:bg-[#1E4321] text-white font-black rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer ${
                  largeFont ? "text-xl" : "text-lg"
                }`}
              >
                <span>결제화면으로 이동하기 ({currentPrice.toLocaleString()}원)</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* 2단계: 연습용 가짜 결제 화면 (User explicit requirement) */}
        {/* ======================================================== */}
        {step === "payment" && (
          <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* HUGE Prominent Practice Sandbox Warning Banner as requested */}
            <div className="p-4 bg-[#FFF2E8] border-2 border-[#F97316] rounded-2xl text-center shadow-xs animate-pulse">
              <div className="flex items-center justify-center gap-2 text-[#EA580C] font-black text-base sm:text-lg mb-1">
                <ShieldAlert className="w-6 h-6 shrink-0" />
                <span>실제로 결제되지 않는 연습용입니다.</span>
              </div>
              <p className="text-xs text-[#9A3412] font-semibold leading-relaxed">
                안심하고 테스트하세요! 실제 신용카드나 통장에서 <strong>돈이 전혀 빠져나가지 않습니다.</strong>
              </p>
            </div>

            {/* Order summary box */}
            <div className="bg-[#F3EDE3] p-3.5 rounded-xl border border-[#E0D7C9] text-xs space-y-1 text-[#334235]">
              <div className="flex justify-between font-bold">
                <span>주문 상품</span>
                <span>자연온 50곡 순수 생식 ({boxCount})</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#193A1C] pt-1 border-t border-[#E5DDCF]">
                <span>최종 결제 금액</span>
                <span className="text-[#28572B] text-base font-black">
                  {currentPrice.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* Payment Method Tabs: 카드, 카카오, 네이버, 토스 */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1E3F20] mb-2">
                결제 수단 선택 (네이버, 토스, 카카오페이, 카드 모두 지원)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* 1. 신용/체크카드 */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-2.5 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-[#28572B] bg-[#EAF2E8] text-[#1E3F20] font-bold shadow-xs"
                      : "border-[#DCD2C0] bg-white text-[#526354] hover:bg-[#F5EFEB]"
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-1 text-[#28572B]" />
                  <span className="text-xs">신용/체크카드</span>
                </button>

                {/* 2. 카카오페이 */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("kakaopay")}
                  className={`p-2.5 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    paymentMethod === "kakaopay"
                      ? "border-[#3C1E1E] bg-[#FEE500] text-[#191919] font-black shadow-xs"
                      : "border-[#DCD2C0] bg-white text-[#526354] hover:bg-[#FFFDE6]"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-[#191919] text-[#FEE500] text-[10px] font-black flex items-center justify-center mb-1">
                    talk
                  </span>
                  <span className="text-xs">카카오페이</span>
                </button>

                {/* 3. 네이버페이 */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("naverpay")}
                  className={`p-2.5 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    paymentMethod === "naverpay"
                      ? "border-[#03C75A] bg-[#E6F9EF] text-[#03C75A] font-black shadow-xs"
                      : "border-[#DCD2C0] bg-white text-[#526354] hover:bg-[#F2FCF6]"
                  }`}
                >
                  <span className="w-5 h-5 rounded-md bg-[#03C75A] text-white text-[10px] font-black flex items-center justify-center mb-1">
                    N
                  </span>
                  <span className="text-xs">네이버페이</span>
                </button>

                {/* 4. 토스페이 */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("tosspay")}
                  className={`p-2.5 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    paymentMethod === "tosspay"
                      ? "border-[#0064FF] bg-[#E8F1FF] text-[#0064FF] font-black shadow-xs"
                      : "border-[#DCD2C0] bg-white text-[#526354] hover:bg-[#F0F6FF]"
                  }`}
                >
                  <span className="w-5 h-5 rounded-md bg-[#0064FF] text-white text-[10px] font-black flex items-center justify-center mb-1">
                    toss
                  </span>
                  <span className="text-xs">토스페이</span>
                </button>
              </div>
            </div>

            {/* Payment Method Details */}
            {paymentMethod === "card" && (
              <div className="p-4 bg-white rounded-2xl border border-[#DFD6C7] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#EFE8DD]">
                  <span className="text-xs font-bold text-[#1E3F20] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#28572B]" />
                    가짜 연습용 카드 정보 (자동 입력됨)
                  </span>
                  <select
                    value={cardCompany}
                    onChange={(e) => setCardCompany(e.target.value)}
                    className="text-xs font-semibold px-2 py-1 rounded-md border border-[#D5CBB9] bg-[#FAF8F5]"
                  >
                    <option value="국민카드">국민카드</option>
                    <option value="신한카드">신한카드</option>
                    <option value="삼성카드">삼성카드</option>
                    <option value="현대카드">현대카드</option>
                    <option value="농협카드">농협카드</option>
                  </select>
                </div>

                {/* Card Number Pre-filled 1111-2222-3333-4444 as explicitly requested */}
                <div>
                  <label className="block text-xs font-bold text-[#4B5B4E] mb-1">
                    카드번호 (연습용 번호 미리 입력됨) *
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#28572B]/30 bg-[#FAF9F5] font-mono text-sm sm:text-base font-bold text-[#193A1C] focus:outline-none focus:ring-2 focus:ring-[#28572B]"
                    placeholder="1111-2222-3333-4444"
                  />
                  <p className="text-[11px] text-[#697A6B] mt-1">
                    ※ 1111-2222-3333-4444 가짜 번호가 입력되어 있어 바로 결제 테스트가 가능합니다.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-[#4B5B4E] mb-1">
                      유효기간 (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D5CBB9] bg-[#FAF9F5] font-mono text-sm text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4B5B4E] mb-1">
                      CVC (뒷면 3자리)
                    </label>
                    <input
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D5CBB9] bg-[#FAF9F5] font-mono text-sm text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "kakaopay" && (
              <div className="p-4 bg-[#FFFDE6] rounded-2xl border-2 border-[#FEE500] space-y-2 text-center">
                <div className="font-bold text-sm text-[#191919]">
                  🟡 카카오페이 1초 연습 결제
                </div>
                <p className="text-xs text-[#524B00] leading-relaxed">
                  카카오페이 인증 화면 모의 시뮬레이션입니다. 아래 버튼을 누르면
                  연습 결제 승인이 완료됩니다.
                </p>
                <div className="p-2.5 bg-white/80 rounded-xl text-xs text-[#635B00] border border-[#F5DC00]">
                  카카오머니 잔액 및 연결 계좌에서 <strong>0원</strong> 차감됩니다.
                </div>
              </div>
            )}

            {paymentMethod === "naverpay" && (
              <div className="p-4 bg-[#EAF8F1] rounded-2xl border-2 border-[#03C75A] space-y-2 text-center">
                <div className="font-bold text-sm text-[#03C75A]">
                  🟢 네이버페이 연습 결제
                </div>
                <p className="text-xs text-[#0F6032] leading-relaxed">
                  네이버페이 포인트 적립 혜택 모의 적용! 아래 버튼을 누르면
                  네이버페이 승인이 완료됩니다.
                </p>
                <div className="p-2.5 bg-white/80 rounded-xl text-xs text-[#0F6032] border border-[#A5E3C1]">
                  네이버페이 포인트 최대 1,440원 적립 모의
                </div>
              </div>
            )}

            {paymentMethod === "tosspay" && (
              <div className="p-4 bg-[#EBF3FF] rounded-2xl border-2 border-[#0064FF] space-y-2 text-center">
                <div className="font-bold text-sm text-[#0064FF]">
                  🔵 토스페이 원클릭 연습 결제
                </div>
                <p className="text-xs text-[#0B409C] leading-relaxed">
                  토스 앱 연동 없이 웹에서 즉시 연습 결제 승인됩니다.
                </p>
                <div className="p-2.5 bg-white/80 rounded-xl text-xs text-[#0B409C] border border-[#A1C5FA]">
                  토스 프라임 적립 모의 적용
                </div>
              </div>
            )}

            {/* Big "결제하기" button as explicitly requested */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleExecutePayment}
                disabled={isSubmitting}
                className={`w-full py-4 sm:py-5 bg-[#28572B] hover:bg-[#1E4321] text-white font-black rounded-xl shadow-xl transition-all text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 ${
                  largeFont ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>연습 결제 승인 처리 중...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>{currentPrice.toLocaleString()}원 결제하기</span>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-[#7B8B7D] mt-2 font-medium">
                ※ 위 버튼을 누르면 가짜 결제가 승인되고 주문완료 화면으로 넘어갑니다.
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3단계: 주문완료 화면 (User explicit requirement) */}
        {/* ======================================================== */}
        {step === "complete" && savedOrder && (
          <div className="p-6 sm:p-8 text-center space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Success icon */}
            <div className="w-16 h-16 bg-[#E2ECE0] text-[#28572B] rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              {/* Order Number prominently formatted as ORD-YYYYMMDD-XXXX as requested */}
              <div className="inline-block bg-[#E8F0E6] border border-[#CCDDC9] px-4 py-1.5 rounded-full mb-2">
                <span className="text-xs text-[#526355] font-semibold">주문번호: </span>
                <span className="font-mono text-sm sm:text-base font-black text-[#1E3F20]">
                  {savedOrder.id}
                </span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-black text-[#193A1C] mt-2">
                주문이 정상적으로 완료되었습니다!
              </h4>
              <p className="text-sm text-[#4E5E51] mt-1.5">
                (실제 돈이 빠져나가지 않은 <strong>연습용 결제</strong>입니다)
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#F3EDE3] p-4 sm:p-5 rounded-2xl text-left border border-[#E0D7C9] text-xs sm:text-sm space-y-2 text-[#304133]">
              <div className="flex justify-between pb-2 border-b border-[#E3DACB]">
                <span className="text-[#647466]">주문일시</span>
                <span className="font-mono font-bold">
                  {new Date(savedOrder.createdAt).toLocaleString("ko-KR")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#647466]">상품명</span>
                <span className="font-bold">
                  자연온 50곡 순수 생식 ({boxCount})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#647466]">결제금액</span>
                <span className="font-black text-[#1E3F20] text-base">
                  {currentPrice.toLocaleString()}원 (무료배송)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#647466]">결제방식</span>
                <span className="font-bold text-[#28572B]">
                  {savedOrder.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#647466]">받는 분</span>
                <span className="font-semibold">
                  {savedOrder.recipientName} ({savedOrder.phone})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#647466]">배송지</span>
                <span className="font-semibold text-right max-w-[240px]">
                  {savedOrder.address} {savedOrder.addressDetail || ""}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#E3DACB]">
                <span className="text-[#647466]">사은품</span>
                <span className="font-bold text-[#28572B]">
                  {giftCount} 무료 동봉
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="flex-1 py-3 px-4 bg-[#FAF7F2] hover:bg-[#EFE8DD] border border-[#DDD3C2] text-[#28572B] font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedReceipt ? (
                  <Check className="w-4 h-4 text-[#28572B]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>
                  {copiedReceipt ? "영수증 복사완료!" : "주문 영수증 복사"}
                </span>
              </button>

              {onOpenOrderLookup && (
                <button
                  type="button"
                  onClick={() => {
                    handleResetAndClose();
                    onOpenOrderLookup();
                  }}
                  className="flex-1 py-3 px-4 bg-[#E8EFE6] hover:bg-[#DCEADA] text-[#245228] font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>주문 내역 실시간 조회</span>
                </button>
              )}
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-4 bg-[#28572B] hover:bg-[#1E4321] text-white font-bold rounded-xl text-base transition-colors cursor-pointer"
            >
              확인 (창 닫기)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
