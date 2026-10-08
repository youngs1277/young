import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Search,
  Package,
  Clock,
  Phone,
  MapPin,
  CheckCircle2,
  Copy,
  RefreshCw,
  Truck,
  CheckCheck,
  AlertCircle,
  Bell,
  Sparkles,
  DollarSign,
  Filter,
} from "lucide-react";

export interface OrderItem {
  id: string;
  recipientName: string;
  phone: string;
  address: string;
  addressDetail?: string;
  deliveryNote: string;
  packageType: "1box" | "2box";
  productName: string;
  boxCount: string;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  status: "주문접수" | "입금확인" | "배송준비" | "배송중" | "배송완료" | "취소됨";
  createdAt: string;
}

interface OrderManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  largeFont: boolean;
}

export const OrderManagementModal: React.FC<OrderManagementModalProps> = ({
  isOpen,
  onClose,
  largeFont,
}) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newOrderNotice, setNewOrderNotice] = useState<string | null>(null);

  // Keep track of previous orders count to notify on new incoming orders
  const prevOrdersCountRef = useRef<number | null>(null);
  const isFirstLoadRef = useRef(true);

  // Fetch orders from API
  const fetchOrders = async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        const newOrders: OrderItem[] = data.orders;

        // Check if new orders arrived automatically (without refreshing)
        if (
          !isFirstLoadRef.current &&
          prevOrdersCountRef.current !== null &&
          newOrders.length > prevOrdersCountRef.current
        ) {
          const newest = newOrders[0];
          setNewOrderNotice(
            `새로운 주문이 실시간으로 접수되었습니다! (주문자: ${newest.recipientName}님 / ${newest.id})`
          );
          setTimeout(() => setNewOrderNotice(null), 5000);
        }

        prevOrdersCountRef.current = newOrders.length;
        isFirstLoadRef.current = false;
        setOrders(newOrders);
      }
    } catch (err) {
      console.error("주문 목록 불러오기 실패:", err);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  // Real-time auto-polling: Polls every 2.5 seconds while open!
  useEffect(() => {
    if (isOpen) {
      isFirstLoadRef.current = true;
      fetchOrders(false);

      const interval = setInterval(() => {
        fetchOrders(true);
      }, 2500);

      return () => clearInterval(interval);
    } else {
      prevOrdersCountRef.current = null;
      setNewOrderNotice(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Status changer handler: specifically "배송중", "배송완료"
  const handleUpdateStatus = async (orderId: string, newStatus: OrderItem["status"]) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      alert("상태 변경에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // Copy shipping info
  const handleCopyShippingInfo = (order: OrderItem) => {
    const text = `[배송요청]\n주문번호: ${order.id}\n수령인: ${order.recipientName}\n연락처: ${order.phone}\n배송지: ${order.address} ${order.addressDetail || ""}\n품목: ${order.productName} (${order.boxCount})\n요청사항: ${order.deliveryNote}`;
    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filter orders by status and search keyword
  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      statusFilter === "ALL" || order.status === statusFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      order.id.toLowerCase().includes(query) ||
      order.recipientName.toLowerCase().includes(query) ||
      order.phone.includes(query) ||
      order.address.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  // Calculate summary metrics
  const totalCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === "주문접수").length;
  const inTransitCount = orders.filter((o) => o.status === "배송중").length;
  const completedCount = orders.filter((o) => o.status === "배송완료").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  // Status badge styling helper
  const renderStatusBadge = (status: OrderItem["status"]) => {
    switch (status) {
      case "주문접수":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
            <Clock className="w-3 h-3" />
            주문접수
          </span>
        );
      case "배송중":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#DBEAFE] text-[#1E40AF] border border-[#BFDBFE]">
            <Truck className="w-3 h-3" />
            배송중
          </span>
        );
      case "배송완료":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
            <CheckCheck className="w-3 h-3" />
            배송완료
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#F3EDE3] text-[#4F6052] border border-[#E0D7C9]">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-[#FAF8F5] rounded-3xl border-2 border-[#DFD6C7] max-w-5xl w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Bar */}
        <div className="bg-[#1C3E20] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#28572B] flex items-center justify-center text-[#A9D6A6]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg sm:text-xl">
                  판매자 실시간 주문관리
                </h3>
                {/* Live Real-time Polling Pulse Indicator */}
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#28572B] text-[#D1E7D0] border border-[#3E7442]">
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-ping" />
                  실시간 자동수신 ON
                </span>
              </div>
              <p className="text-xs text-[#9BB39D]">
                새로고침 없이 외부에서 들어온 주문이 실시간으로 자동 집계됩니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchOrders(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="수동 즉시 동기화"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">새로고침</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/90 cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Real-time Notification Flash Toast */}
        {newOrderNotice && (
          <div className="bg-[#FEF08A] border-b-2 border-[#EAB308] text-[#854D0E] px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between animate-bounce">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#CA8A04] shrink-0" />
              <span>{newOrderNotice}</span>
            </div>
            <button
              onClick={() => setNewOrderNotice(null)}
              className="text-xs font-bold underline cursor-pointer"
            >
              확인
            </button>
          </div>
        )}

        {/* Metric Overview Cards */}
        <div className="p-4 sm:p-5 bg-[#F4EFE6] border-b border-[#E3D9C9] shrink-0 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <div className="bg-white p-3 rounded-xl border border-[#DFD6C7] shadow-xs">
            <span className="text-[11px] font-bold text-[#657667]">총 주문수</span>
            <div className="text-xl font-black text-[#193A1C] mt-0.5">
              {totalCount}건
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#FDE68A] shadow-xs">
            <span className="text-[11px] font-bold text-[#92400E]">주문접수 (대기)</span>
            <div className="text-xl font-black text-[#B45309] mt-0.5">
              {pendingCount}건
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#BFDBFE] shadow-xs">
            <span className="text-[11px] font-bold text-[#1E40AF]">배송중</span>
            <div className="text-xl font-black text-[#2563EB] mt-0.5">
              {inTransitCount}건
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#BBF7D0] shadow-xs">
            <span className="text-[11px] font-bold text-[#166534]">배송완료</span>
            <div className="text-xl font-black text-[#15803D] mt-0.5">
              {completedCount}건
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-white p-3 rounded-xl border border-[#DFD6C7] shadow-xs">
            <span className="text-[11px] font-bold text-[#657667]">총 매출 누적</span>
            <div className="text-lg sm:text-xl font-black text-[#1E3F20] mt-0.5 truncate">
              {totalRevenue.toLocaleString()}원
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 bg-[#FAF8F5] border-b border-[#E8E1D5] shrink-0 flex flex-col sm:flex-row gap-2.5 sm:items-center justify-between">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === "ALL"
                  ? "bg-[#28572B] text-white"
                  : "bg-[#EFE9DD] text-[#4F6052] hover:bg-[#E5DDD0]"
              }`}
            >
              전체 ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter("주문접수")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === "주문접수"
                  ? "bg-[#D97706] text-white"
                  : "bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A]"
              }`}
            >
              주문접수 ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter("배송중")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === "배송중"
                  ? "bg-[#2563EB] text-white"
                  : "bg-[#DBEAFE] text-[#1E40AF] hover:bg-[#BFDBFE]"
              }`}
            >
              배송중 ({inTransitCount})
            </button>
            <button
              onClick={() => setStatusFilter("배송완료")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === "배송완료"
                  ? "bg-[#16A34A] text-white"
                  : "bg-[#DCFCE7] text-[#166534] hover:bg-[#BBF7D0]"
              }`}
            >
              배송완료 ({completedCount})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#7B8B7D] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="주문번호, 주문자명, 전화번호 검색"
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D5CBB9] bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#28572B]"
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* Table View (주문번호, 주문자, 상품 금액, 상태 표 형태) */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-auto p-4 sm:p-5">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-[#68796B] bg-[#F4EFE6] rounded-2xl border border-[#E3D9C9]">
              <Package className="w-10 h-10 mx-auto text-[#9CB39E] mb-2" />
              <p className="text-base font-bold text-[#193A1C]">
                해당 조건의 주문 내역이 없습니다.
              </p>
              <p className="text-xs text-[#728375] mt-1">
                외부에서 고객이 주문서를 작성하고 결제하면 <strong>새로고침 없이 자동으로</strong> 여기에 나타납니다.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border-2 border-[#DFD6C7] bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#ECE5D8] border-b-2 border-[#DCD2C2] text-[#1E3F20] font-black text-xs sm:text-sm">
                    <th className="py-3 px-3.5 whitespace-nowrap">주문번호</th>
                    <th className="py-3 px-3.5 whitespace-nowrap">주문자 (성함/연락처)</th>
                    <th className="py-3 px-3.5 whitespace-nowrap">상품 구성</th>
                    <th className="py-3 px-3.5 whitespace-nowrap text-right">상품 금액</th>
                    <th className="py-3 px-3.5 whitespace-nowrap">배송지 주소</th>
                    <th className="py-3 px-3.5 whitespace-nowrap text-center">상태</th>
                    <th className="py-3 px-3.5 whitespace-nowrap text-center">
                      상태 변경 (배송관리)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8DD]">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-[#FAF8F5] transition-colors group"
                    >
                      {/* 1. 주문번호 */}
                      <td className="py-3.5 px-3.5 align-middle whitespace-nowrap">
                        <div className="font-mono font-black text-xs sm:text-sm text-[#1B421E]">
                          {order.id}
                        </div>
                        <div className="text-[11px] text-[#718274] mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString("ko-KR", {
                            month: "numeric",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>

                      {/* 2. 주문자 (성함/연락처) */}
                      <td className="py-3.5 px-3.5 align-middle whitespace-nowrap">
                        <div className="font-bold text-sm text-[#193A1C]">
                          {order.recipientName}
                        </div>
                        <div className="text-xs text-[#526355] font-mono mt-0.5">
                          {order.phone}
                        </div>
                      </td>

                      {/* 3. 상품 구성 */}
                      <td className="py-3.5 px-3.5 align-middle">
                        <div className="font-bold text-xs sm:text-sm text-[#27382A]">
                          {order.productName}
                        </div>
                        <div className="text-xs text-[#637466]">
                          {order.boxCount}
                        </div>
                      </td>

                      {/* 4. 상품 금액 */}
                      <td className="py-3.5 px-3.5 align-middle text-right whitespace-nowrap">
                        <div className="font-black text-sm sm:text-base text-[#1E3F20] tabular-nums">
                          {order.totalPrice.toLocaleString()}원
                        </div>
                        <div className="text-[11px] text-[#28572B] font-semibold">
                          무료배송
                        </div>
                      </td>

                      {/* 5. 배송지 주소 */}
                      <td className="py-3.5 px-3.5 align-middle max-w-xs">
                        <div className="text-xs text-[#304133] leading-snug line-clamp-2">
                          {order.address} {order.addressDetail || ""}
                        </div>
                        {order.deliveryNote && (
                          <div className="text-[11px] text-[#718274] mt-1 italic truncate">
                            요청: {order.deliveryNote}
                          </div>
                        )}
                      </td>

                      {/* 6. 현재 상태 */}
                      <td className="py-3.5 px-3.5 align-middle text-center whitespace-nowrap">
                        {renderStatusBadge(order.status)}
                      </td>

                      {/* 7. 상태 변경 버튼 (배송중, 배송완료, 송장복사) */}
                      <td className="py-3.5 px-3.5 align-middle text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* "배송중" 변경 버튼 as explicitly requested */}
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(order.id, "배송중")}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              order.status === "배송중"
                                ? "bg-[#1E40AF] text-white shadow-xs"
                                : "bg-[#DBEAFE] hover:bg-[#BFDBFE] text-[#1E40AF]"
                            }`}
                            title="배송중 상태로 변경"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>배송중</span>
                          </button>

                          {/* "배송완료" 변경 버튼 as explicitly requested */}
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(order.id, "배송완료")}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              order.status === "배송완료"
                                ? "bg-[#15803D] text-white shadow-xs"
                                : "bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#166534]"
                            }`}
                            title="배송완료 상태로 변경"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>배송완료</span>
                          </button>

                          {/* 송장 복사 버튼 */}
                          <button
                            type="button"
                            onClick={() => handleCopyShippingInfo(order)}
                            className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EFE8DD] border border-[#DDD3C2] text-[#4A5D4D] transition-colors cursor-pointer"
                            title="택배 송장정보 원클릭 복사"
                          >
                            {copiedId === order.id ? (
                              <CheckCircle2 className="w-4 h-4 text-[#28572B]" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3.5 bg-[#EFE8DD] border-t border-[#DFD6C7] flex flex-col sm:flex-row items-center justify-between text-xs text-[#526355] shrink-0 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span>
              2.5초마다 백그라운드 자동 갱신됩니다. 외부에서 들어온 주문을 바로 확인하세요.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#718274]">
              현재 표시 주문: <strong>{filteredOrders.length}</strong>건 / 전체:{" "}
              <strong>{totalCount}</strong>건
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#28572B] hover:bg-[#1E4321] text-white font-bold rounded-lg transition-colors cursor-pointer text-xs"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
