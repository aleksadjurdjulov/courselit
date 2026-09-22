const FUTUREFIZIO_PAY_BASE_URL = "https://pay.futurefizio.com/buy";

export function getFutureFizioBuyCourseUrl(productSlug: string): string {
    return `${FUTUREFIZIO_PAY_BASE_URL}?product=${encodeURIComponent(productSlug)}`;
}

export function getFutureFizioBuyAllUrl(): string {
    return `${FUTUREFIZIO_PAY_BASE_URL}?product=all`;
}
