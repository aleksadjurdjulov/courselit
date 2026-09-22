/**
 * Formats a monetary amount with locale-aware grouping and a Latin currency label.
 * RSD uses Serbian Latin locale and the "RSD" code (not Cyrillic дин).
 */
export default function formatCurrency(amount: number, isoCode?: string) {
    const code = (isoCode || "USD").toUpperCase();
    const locale = code === "RSD" ? "sr-Latn-RS" : "en-US";

    try {
        return amount.toLocaleString(locale, {
            style: "currency",
            currency: code,
            currencyDisplay: code === "RSD" ? "code" : "symbol",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    } catch {
        const formattedAmount = amount.toLocaleString(locale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
        return `${formattedAmount} ${code}`;
    }
}
