import { Profile } from "@courselit/common-models";
import { checkPermission } from "@courselit/utils";
import { ADMIN_PERMISSIONS } from "@ui-config/constants";

export function isRegularUser(profile?: Partial<Profile> | null) {
    if (!profile?.userId || !profile.permissions?.length) {
        return false;
    }

    return !checkPermission(profile.permissions, ADMIN_PERMISSIONS);
}
