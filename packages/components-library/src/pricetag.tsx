import * as React from "react";
import { formatCurrency } from "@courselit/utils";

interface PriceTagProps {
    cost: number;
    freeCostCaption: string;
    currencyISOCode: string;
}

const PriceTag = (props: PriceTagProps) => {
    const cost = props.cost || 0;
    const costText =
        cost <= 0
            ? props.freeCostCaption
            : formatCurrency(cost, props.currencyISOCode || "USD");

    return <div className="font-medium">{costText}</div>;
};

export default PriceTag;
