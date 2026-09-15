export function formatSuperAdminCurrency(value: unknown) {
  if (typeof value !== "number") {
    return "₹0";
  }

  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatSuperAdminRevenueTrend(
  revenueTrend: {
    month: string;
    revenue: number;
  }[],
) {
  return revenueTrend.map((item) => ({
    ...item,
    month: new Date(`${item.month}-01T00:00:00`).toLocaleDateString(
      "en-US",
      {
        month: "short",
      },
    ),
  }));
}