"use client";

import { useState, useCallback } from "react";
import {
  caseStudyOrders,
  caseStudyUnresolvedQuestions,
} from "@/lib/content";
import type { ViewportSize, Order, OrderStatus } from "@/lib/content";
import UnresolvedQuestions from "./UnresolvedQuestions";

interface LiveCodedViewProps {
  viewport: ViewportSize;
  selectedRows: Set<string>;
  setSelectedRows: (rows: Set<string>) => void;
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
}

const statusColors: Record<OrderStatus, { bg: string; text: string }> = {
  Processing: { bg: "bg-amber-500/10", text: "text-amber-400" },
  Shipped: { bg: "bg-sky-500/10", text: "text-sky-400" },
  Delivered: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  Cancelled: { bg: "bg-red-500/10", text: "text-red-400" },
};

const allStatuses: OrderStatus[] = ["Processing", "Shipped", "Delivered", "Cancelled"];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function LiveCodedView({
  viewport,
  selectedRows,
  setSelectedRows,
  activeOrderId,
  setActiveOrderId,
}: LiveCodedViewProps) {
  const [orders, setOrders] = useState<Order[]>(caseStudyOrders);
  const [sortField, setSortField] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);

  const isMobile = viewport === "mobile";
  const isTablet = viewport === "tablet";

  const activeOrder = orders.find((o) => o.id === activeOrderId) ?? null;

  const sortedOrders = [...orders].sort((a, b) => {
    const dir = sortDirection === "asc" ? 1 : -1;
    if (sortField === "status") return a.status.localeCompare(b.status) * dir;
    if (sortField === "amount") return (a.amount - b.amount) * dir;
    if (sortField === "date") return a.date.localeCompare(b.date) * dir;
    if (sortField === "customer") return a.customer.localeCompare(b.customer) * dir;
    return 0;
  });

  const toggleRow = useCallback(
    (id: string) => {
      const next = new Set(selectedRows);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setSelectedRows(next);
    },
    [selectedRows, setSelectedRows]
  );

  const toggleAll = useCallback(() => {
    if (selectedRows.size === sortedOrders.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(sortedOrders.map((o) => o.id)));
    }
  }, [selectedRows, sortedOrders, setSelectedRows]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    setEditingStatusId(null);
  };

  const SortIndicator = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return <span className="ml-1 text-emerald-400">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>;
  };

  // ── Detail Panel ──
  const DetailPanel = () => {
    if (!activeOrder) return null;

    const sc = statusColors[activeOrder.status];

    const content = (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-200">{activeOrder.id}</h3>
          <button
            onClick={() => setActiveOrderId(null)}
            className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200 text-sm"
          >
            {"\u2715"}
          </button>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-zinc-500 text-xs">Customer</span>
            <p className="text-zinc-300">{activeOrder.customer}</p>
          </div>
          <div>
            <span className="text-zinc-500 text-xs">Email</span>
            <p className="text-zinc-400">{activeOrder.email}</p>
          </div>
          <div>
            <span className="text-zinc-500 text-xs">Status</span>
            <p className={`${sc.text}`}>{activeOrder.status}</p>
          </div>
          <div>
            <span className="text-zinc-500 text-xs">Amount</span>
            <p className="text-zinc-300">{formatCurrency(activeOrder.amount)}</p>
          </div>
          <div>
            <span className="text-zinc-500 text-xs">Items</span>
            <p className="text-zinc-300">{activeOrder.items}</p>
          </div>
          <div>
            <span className="text-zinc-500 text-xs">Priority</span>
            <p className={`text-zinc-300 ${activeOrder.priority === "urgent" ? "text-red-400" : activeOrder.priority === "high" ? "text-amber-400" : ""}`}>
              {activeOrder.priority}
            </p>
          </div>
          <div>
            <span className="text-zinc-500 text-xs">Date</span>
            <p className="text-zinc-400">{activeOrder.date}</p>
          </div>
        </div>
      </div>
    );

    if (isMobile) {
      return (
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-zinc-800 border-t border-zinc-700/60 rounded-t-xl z-20 overflow-y-auto">
          {content}
        </div>
      );
    }

    return (
      <div
        className={`shrink-0 bg-zinc-800/80 border-l border-zinc-700/60 overflow-y-auto transition-all duration-200 ${
          isTablet ? "w-64" : "w-80"
        }`}
      >
        {content}
      </div>
    );
  };

  // ── Bulk Actions Bar ──
  const BulkActionsBar = () => {
    if (selectedRows.size === 0) return null;

    const bar = (
      <div className="flex items-center gap-3 px-4 py-2 bg-zinc-800/90 border border-zinc-700/60 rounded-lg">
        <span className="text-xs text-zinc-400">{selectedRows.size} selected</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-300 transition-all duration-200">
            Export
          </button>
          <button className="px-3 py-1.5 text-xs rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-300 transition-all duration-200">
            Update Status
          </button>
          <button className="px-3 py-1.5 text-xs rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-300 transition-all duration-200">
            Archive
          </button>
        </div>
      </div>
    );

    if (isMobile) {
      return (
        <div className={`absolute left-0 right-0 px-3 pb-2 z-10 ${activeOrder ? "bottom-[60vh]" : "bottom-0"}`}>
          {bar}
        </div>
      );
    }

    return <div className="mb-2">{bar}</div>;
  };

  // ── Status Badge ──
  const StatusBadge = ({ order }: { order: Order }) => {
    const sc = statusColors[order.status];
    const isEditing = editingStatusId === order.id;

    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditingStatusId(isEditing ? null : order.id);
          }}
          className={`${sc.bg} ${sc.text} px-2 py-0.5 rounded-full text-xs transition-all duration-200 hover:brightness-125`}
        >
          {order.status}
        </button>
        {isEditing && (
          <div className="absolute top-7 left-0 z-20 bg-zinc-800 border border-zinc-700 rounded-lg py-1 shadow-xl min-w-[120px]">
            {allStatuses.map((s) => {
              const c = statusColors[s];
              return (
                <button
                  key={s}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateStatus(order.id, s);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-zinc-700/60 transition-colors duration-200 ${c.text}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ── Mobile List View ──
  if (isMobile) {
    return (
      <div className="relative min-h-[400px]">
        <div className="p-3 space-y-1">
          <BulkActionsBar />
          {sortedOrders.map((order) => {
            const isSelected = selectedRows.has(order.id);
            const sc = statusColors[order.status];
            return (
              <div
                key={order.id}
                onClick={() => setActiveOrderId(activeOrderId === order.id ? null : order.id)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-emerald-500/5 border-l-2 border-emerald-500"
                    : "hover:bg-zinc-800/60 border-l-2 border-transparent"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleRow(order.id);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-sm w-4 h-4 accent-emerald-500 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-300 font-medium">{order.id}</span>
                    <span className="text-xs text-zinc-400">{formatCurrency(order.amount)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-zinc-500 truncate">{order.customer}</span>
                    <StatusBadge order={order} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <DetailPanel />
        <UnresolvedQuestions questions={caseStudyUnresolvedQuestions} mode="resolved" />
      </div>
    );
  }

  // ── Desktop / Tablet Table View ──
  return (
    <div>
      <div className="flex">
        {/* Table area */}
        <div className="flex-1 p-4 overflow-x-auto">
          <BulkActionsBar />
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700/40 text-xs text-zinc-500">
                <th className="py-2 pr-3 text-left w-8">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === sortedOrders.length && sortedOrders.length > 0}
                    onChange={toggleAll}
                    className="rounded-sm w-4 h-4 accent-emerald-500"
                  />
                </th>
                <th className="py-2 pr-3 text-left font-medium">Order</th>
                <th
                  className="py-2 pr-3 text-left font-medium cursor-pointer hover:text-zinc-300 transition-colors duration-200"
                  onClick={() => handleSort("customer")}
                >
                  Customer
                  <SortIndicator field="customer" />
                </th>
                <th
                  className="py-2 pr-3 text-left font-medium cursor-pointer hover:text-zinc-300 transition-colors duration-200"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <SortIndicator field="status" />
                </th>
                <th
                  className="py-2 pr-3 text-left font-medium cursor-pointer hover:text-zinc-300 transition-colors duration-200"
                  onClick={() => handleSort("amount")}
                >
                  Amount
                  <SortIndicator field="amount" />
                </th>
                {!isTablet && (
                  <th
                    className="py-2 pr-3 text-left font-medium cursor-pointer hover:text-zinc-300 transition-colors duration-200"
                    onClick={() => handleSort("date")}
                  >
                    Date
                    <SortIndicator field="date" />
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((order) => {
                const isSelected = selectedRows.has(order.id);
                return (
                  <tr
                    key={order.id}
                    onClick={() =>
                      setActiveOrderId(activeOrderId === order.id ? null : order.id)
                    }
                    className={`border-b border-zinc-800/60 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-emerald-500/5 border-l-2 border-l-emerald-500"
                        : "hover:bg-zinc-800/40 border-l-2 border-l-transparent"
                    } ${activeOrderId === order.id ? "bg-zinc-800/60" : ""}`}
                  >
                    <td className="py-2.5 pr-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleRow(order.id);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-sm w-4 h-4 accent-emerald-500"
                      />
                    </td>
                    <td className="py-2.5 pr-3 text-zinc-300 font-medium">{order.id}</td>
                    <td className="py-2.5 pr-3 text-zinc-400">{order.customer}</td>
                    <td className="py-2.5 pr-3">
                      <StatusBadge order={order} />
                    </td>
                    <td className="py-2.5 pr-3 text-zinc-300">{formatCurrency(order.amount)}</td>
                    {!isTablet && (
                      <td className="py-2.5 pr-3 text-zinc-500">{order.date}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        {activeOrder && <DetailPanel />}
      </div>

      <UnresolvedQuestions questions={caseStudyUnresolvedQuestions} mode="resolved" />
    </div>
  );
}
