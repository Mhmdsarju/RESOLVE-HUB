import { useEffect, useState } from "react";

import { Search, X } from "lucide-react";

import { useOrgAdminPaymentHistory } from "../hooks/useOrgAdminPaymentHistory";

export default function OrgAdminPaymentHistory() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  // Payment period filters
  const [period, setPeriod] = useState<"MONTHLY" | "YEARLY" | "CUSTOM" | "">("");

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const limit = 10;

  // --------------------------------------------------
  // Search debounce
  // --------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // --------------------------------------------------
  // Payment history API
  // --------------------------------------------------

  const { data, isLoading, isError } = useOrgAdminPaymentHistory({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: status || undefined,

    period: period || undefined,

    year: period === "MONTHLY" || period === "YEARLY" ? year : undefined,

    month: period === "MONTHLY" ? month : undefined,

    startDate: period === "CUSTOM" ? startDate || undefined : undefined,

    endDate: period === "CUSTOM" ? endDate || undefined : undefined,
  });

  // --------------------------------------------------
  // Handlers
  // --------------------------------------------------

  const handleClearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handlePeriodChange = (value: "MONTHLY" | "YEARLY" | "CUSTOM" | "") => {
    setPeriod(value);
    setPage(1);

    if (value !== "CUSTOM") {
      setStartDate("");
      setEndDate("");
    }
  };

  const handleYearChange = (value: number) => {
    setYear(value);
    setPage(1);
  };

  const handleMonthChange = (value: number) => {
    setMonth(value);
    setPage(1);
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    setPage(1);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    setPage(1);
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4B3932] border-t-transparent" />
      </div>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (isError || !data) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <p className="text-sm font-medium text-red-600">Failed to load payment history.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8 bg-stone-50/50 p-4 sm:p-6 lg:p-8">
      {/* ------------------------------------------------ */}
      {/* Header */}
      {/* ------------------------------------------------ */}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-[#4B3932]">Payment History</h1>

          <p className="text-sm font-medium text-stone-500">
            View payment transactions for your organization.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* Filters */}
      {/* ------------------------------------------------ */}

      <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Search */}

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search transaction..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-10 text-sm font-medium text-stone-700 outline-none transition focus:border-stone-400 focus:bg-white"
            />

            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 transition hover:text-stone-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Status */}

          <select
            value={status}
            onChange={(event) => handleStatusChange(event.target.value)}
            className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium text-stone-700 outline-none transition focus:border-stone-400 focus:bg-white"
          >
            <option value="">All Statuses</option>
            <option value="SUCCESS">Success</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>

        {/* Period Filter */}

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center">
          <select
            value={period}
            onChange={(event) =>
              handlePeriodChange(event.target.value as "MONTHLY" | "YEARLY" | "CUSTOM" | "")
            }
            className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium text-stone-700 outline-none transition focus:border-stone-400 focus:bg-white"
          >
            <option value="">All Periods</option>
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
            <option value="CUSTOM">Custom Date</option>
          </select>

          {/* Monthly */}

          {period === "MONTHLY" && (
            <>
              <select
                value={month}
                onChange={(event) => handleMonthChange(Number(event.target.value))}
                className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium text-stone-700 outline-none transition focus:border-stone-400 focus:bg-white"
              >
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </select>

              <select
                value={year}
                onChange={(event) => handleYearChange(Number(event.target.value))}
                className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium text-stone-700 outline-none transition focus:border-stone-400 focus:bg-white"
              >
                {Array.from({ length: 5 }, (_, index) => new Date().getFullYear() - index).map(
                  (yearOption) => (
                    <option key={yearOption} value={yearOption}>
                      {yearOption}
                    </option>
                  ),
                )}
              </select>
            </>
          )}

          {/* Yearly */}

          {period === "YEARLY" && (
            <select
              value={year}
              onChange={(event) => handleYearChange(Number(event.target.value))}
              className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium text-stone-700 outline-none transition focus:border-stone-400 focus:bg-white"
            >
              {Array.from({ length: 5 }, (_, index) => new Date().getFullYear() - index).map(
                (yearOption) => (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                ),
              )}
            </select>
          )}

          {/* Custom Date */}

          {period === "CUSTOM" && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-stone-500">From</label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => handleStartDateChange(event.target.value)}
                  className="rounded-xl border border-stone-200 bg-stone-50 py-2.5 px-4 text-sm font-medium text-stone-700 outline-none transition focus:border-stone-400 focus:bg-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-stone-500">To</label>

                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => handleEndDateChange(event.target.value)}
                  className="rounded-xl border border-stone-200 bg-stone-50 py-2.5 px-4 text-sm font-medium text-stone-700 outline-none transition focus:border-stone-400 focus:bg-white"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* Payment Table */}
      {/* ------------------------------------------------ */}

      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
        <div className="border-b border-stone-100 p-6">
          <h2 className="text-xl font-bold text-[#4B3932]">Transaction Details</h2>

          <p className="mt-0.5 text-sm text-stone-500">Payment records for your organization.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-stone-200/80 bg-stone-50/50 text-xs font-bold uppercase tracking-wider text-stone-500">
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Paid At</th>
                <th className="px-6 py-4">Created At</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 text-sm">
              {data.payments.map((payment) => (
                <tr key={payment.id} className="transition-colors hover:bg-stone-50/60">
                  <td className="px-6 py-4 font-semibold text-stone-600">{payment.plan}</td>

                  <td className="px-6 py-4 font-bold text-stone-700">
                    {payment.currency} {payment.amount.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${
                        payment.status === "SUCCESS"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : payment.status === "PENDING"
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-mono text-xs text-stone-600">
                    {payment.transactionId || "-"}
                  </td>

                  <td className="px-6 py-4 font-mono text-xs text-stone-600">
                    {payment.razorpayOrderId}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-stone-600">
                    {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString("en-IN") : "-"}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-stone-600">
                    {new Date(payment.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.payments.length === 0 && (
            <div className="flex h-32 items-center justify-center text-sm font-medium text-stone-500">
              No payment records found.
            </div>
          )}
        </div>

        {/* Pagination */}

        {data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-stone-100 px-6 py-4">
            <p className="text-sm font-medium text-stone-500">
              Page {data.page} of {data.totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={page === data.totalPages}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
