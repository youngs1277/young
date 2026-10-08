import React, { useState } from "react";
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  promptOrderMessage?: boolean;
  largeFont: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  promptOrderMessage = false,
  largeFont,
}) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("스테판");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  // Real-time password validation helper
  const isPasswordTooShort = password.length > 0 && password.length < 6;
  const isPasswordValidLength = password.length >= 6;
  const isPasswordMismatch =
    mode === "register" &&
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // 1. Client-side validation in plain, easy Korean
    if (!email.trim()) {
      setErrorMessage("이메일 주소를 입력해 주세요.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("이메일 형식(예: user@example.com)을 올바르게 입력해 주세요.");
      return;
    }

    if (!password) {
      setErrorMessage("비밀번호를 입력해 주세요.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        `비밀번호는 최소 6자 이상이어야 합니다. 현재 ${password.length}자만 입력되었습니다. 6자 이상으로 적어주세요.`
      );
      return;
    }

    if (mode === "register") {
      if (!name.trim()) {
        setErrorMessage("성함(이름)을 입력해 주세요.");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage(
          "비밀번호와 비밀번호 확인이 서로 일치하지 않습니다. 같은 비밀번호를 입력했는지 다시 확인해 주세요."
        );
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
      const body =
        mode === "register"
          ? {
              email: email.trim(),
              password,
              name: name.trim(),
              phone: phone.trim(),
            }
          : {
              email: email.trim(),
              password,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(
          data.message ||
            (mode === "login"
              ? "이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해 주세요."
              : "회원가입에 실패했습니다.")
        );
        return;
      }

      // Success
      setSuccessMessage(data.message || "성공적으로 처리되었습니다.");
      setTimeout(() => {
        onLoginSuccess(data.user);
        onClose();
      }, 500);
    } catch (err: any) {
      setErrorMessage("서버와 통신하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickStephenLogin = () => {
    setEmail("stephen@example.com");
    setPassword("password123");
    setMode("login");
    setErrorMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-[#FAF8F5] rounded-3xl border-2 border-[#DFD6C7] max-w-md w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#28572B] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#A9D6A6]" />
            <h3 className="font-bold text-lg sm:text-xl">
              {mode === "login" ? "로그인" : "간편 회원가입"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-white/90"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Order Required Notification Banner */}
        {promptOrderMessage && (
          <div className="bg-[#EAF2E8] border-b border-[#C8DEC6] px-4 py-2.5 text-xs sm:text-sm text-[#1F4C23] font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#28572B] shrink-0" />
            <span>주문하시려면 먼저 회원가입 또는 로그인을 완료해 주세요.</span>
          </div>
        )}

        {/* Tab switcher: 로그인 / 회원가입 */}
        <div className="flex border-b border-[#E3D9C9] bg-[#F2EDE3]">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMessage("");
            }}
            className={`flex-1 py-3 text-center font-bold text-sm transition-colors cursor-pointer ${
              mode === "login"
                ? "bg-[#FAF8F5] text-[#28572B] border-b-2 border-[#28572B]"
                : "text-[#58685A] hover:bg-[#EAE4D8]"
            }`}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setErrorMessage("");
            }}
            className={`flex-1 py-3 text-center font-bold text-sm transition-colors cursor-pointer ${
              mode === "register"
                ? "bg-[#FAF8F5] text-[#28572B] border-b-2 border-[#28572B]"
                : "text-[#58685A] hover:bg-[#EAE4D8]"
            }`}
          >
            회원가입
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Plain Korean Error Message Display */}
          {errorMessage && (
            <div className="p-3.5 bg-[#FBECE8] border-2 border-[#F3C5BA] rounded-xl text-xs sm:text-sm text-[#A84B30] flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="leading-relaxed font-semibold">
                {errorMessage}
              </div>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-[#E8F0E6] border-2 border-[#CCDDC9] rounded-xl text-xs sm:text-sm text-[#245228] flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-[#28572B]" />
              <div className="leading-relaxed font-semibold">
                {successMessage}
              </div>
            </div>
          )}

          {/* Name Field (for register) */}
          {mode === "register" && (
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1E3F20] mb-1">
                성함(이름) *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#7A8C7C] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 스테판"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D5CBB9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#28572B]"
                />
              </div>
              <p className="text-[11px] text-[#6F7F72] mt-1">
                ※ 로그인 시 화면 위에 "{name || "스테판"}님 환영합니다"로 표시됩니다.
              </p>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#1E3F20] mb-1">
              이메일 주소 *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#7A8C7C] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="예: stephen@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D5CBB9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#28572B]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs sm:text-sm font-bold text-[#1E3F20]">
                비밀번호 (6자 이상) *
              </label>
              <span className="text-[11px] text-[#718274]">
                {password.length > 0 ? `${password.length}자 입력됨` : "최소 6자리"}
              </span>
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-[#7A8C7C] absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 6자 이상 입력"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 ${
                  isPasswordTooShort
                    ? "border-[#D97762] focus:ring-[#D97762]"
                    : "border-[#D5CBB9] focus:ring-[#28572B]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#7A8C7C] hover:text-[#28572B] cursor-pointer"
                aria-label="비밀번호 보기"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Clear explanation of why it doesn't work if short */}
            {isPasswordTooShort && (
              <p className="text-xs text-[#A84B30] mt-1.5 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>
                  비밀번호가 6자보다 짧습니다. ({password.length}자/6자) 최소 6자 이상 입력해 주세요.
                </span>
              </p>
            )}

            {isPasswordValidLength && (
              <p className="text-xs text-[#28572B] mt-1.5 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>안전한 6자 이상 비밀번호입니다.</span>
              </p>
            )}
          </div>

          {/* Confirm Password Field (for register) */}
          {mode === "register" && (
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1E3F20] mb-1">
                비밀번호 확인 *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7A8C7C] absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호를 한 번 더 입력해 주세요"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 ${
                    isPasswordMismatch
                      ? "border-[#D97762] focus:ring-[#D97762]"
                      : "border-[#D5CBB9] focus:ring-[#28572B]"
                  }`}
                />
              </div>

              {isPasswordMismatch && (
                <p className="text-xs text-[#A84B30] mt-1.5 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>비밀번호가 일치하지 않습니다. 위와 똑같이 입력해 주세요.</span>
                </p>
              )}
            </div>
          )}

          {/* Phone Field (optional for register) */}
          {mode === "register" && (
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1E3F20] mb-1">
                휴대폰 번호 (선택)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#7A8C7C] absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="예: 010-1234-5678"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D5CBB9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#28572B]"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-[#28572B] hover:bg-[#1E4321] text-white font-black rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2 ${
              largeFont ? "text-xl" : "text-base sm:text-lg"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>처리 중...</span>
              </>
            ) : mode === "login" ? (
              <span>로그인하기</span>
            ) : (
              <span>회원가입 완료하고 로그인하기</span>
            )}
          </button>

          {/* Quick Test Demo Account helper */}
          {mode === "login" && (
            <div className="pt-2 border-t border-[#E8E1D5] text-center">
              <button
                type="button"
                onClick={handleQuickStephenLogin}
                className="text-xs text-[#28572B] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer bg-[#EAF2E8] px-3 py-1.5 rounded-lg border border-[#CCDDC9]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>테스트용 '스테판' 계정으로 1초 자동 채우기</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
