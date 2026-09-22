"use client";

import { ThemeContext } from "@components/contexts";
import { Button } from "@courselit/page-primitives";
import {
    getFutureFizioBuyAllUrl,
    getFutureFizioBuyCourseUrl,
} from "@courselit/utils";
import {
    BUY_ALL_COURSES_BUTTON_TEXT,
    BUY_COURSE_BUTTON_TEXT,
} from "@ui-config/strings";
import { useContext } from "react";

interface BuyButtonsProps {
    slug: string;
    className?: string;
}

export default function BuyButtons({ slug, className }: BuyButtonsProps) {
    const { theme } = useContext(ThemeContext);

    if (!slug) {
        return null;
    }

    return (
        <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
            <a href={getFutureFizioBuyCourseUrl(slug)}>
                <Button theme={theme.theme}>{BUY_COURSE_BUTTON_TEXT}</Button>
            </a>
            <a href={getFutureFizioBuyAllUrl()}>
                <Button theme={theme.theme}>
                    {BUY_ALL_COURSES_BUTTON_TEXT}
                </Button>
            </a>
        </div>
    );
}
