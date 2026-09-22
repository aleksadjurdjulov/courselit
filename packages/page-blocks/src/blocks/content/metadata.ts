import { WidgetMetadata, Constants } from "@courselit/common-models";
const { PageType } = Constants;

const metadata: WidgetMetadata = {
    name: "content",
    displayName: "Sadržaj",
    compatibleWith: [PageType.PRODUCT],
};

export default metadata;
