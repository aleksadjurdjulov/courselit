import { WidgetMetadata, Constants } from "@courselit/common-models";
const { PageType } = Constants;

const metadata: WidgetMetadata = {
    name: "content",
    displayName: "Kursevi",
    compatibleWith: [PageType.PRODUCT],
};

export default metadata;
