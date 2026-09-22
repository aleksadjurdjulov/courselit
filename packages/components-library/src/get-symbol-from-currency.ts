import getSymbolFromCurrencyMap from "currency-symbol-map";

const LATIN_CURRENCY_SYMBOLS: Record<string, string> = {
    RSD: "RSD",
};

/**
 * Currency symbol lookup with Latin overrides (e.g. RSD instead of Cyrillic дин).
 */
export default function getSymbolFromCurrency(
    currencyCode?: string | null,
): string | undefined {
    if (!currencyCode) {
        return undefined;
    }

    const code = currencyCode.toUpperCase();
    if (LATIN_CURRENCY_SYMBOLS[code]) {
        return LATIN_CURRENCY_SYMBOLS[code];
    }

    return getSymbolFromCurrencyMap(code) || undefined;
}
