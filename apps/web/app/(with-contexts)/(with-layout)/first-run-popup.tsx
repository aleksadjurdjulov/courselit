"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import {
    FIRST_RUN_POPUP_CONTINUE,
    FIRST_RUN_POPUP_DESCRIPTION,
    FIRST_RUN_POPUP_SKIP,
    FIRST_RUN_POPUP_TITLE,
} from "@ui-config/strings";
import Link from "next/link";
import { useState } from "react";

export default function FirstRunPopup() {
    const [open, setOpen] = useState(true);

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{FIRST_RUN_POPUP_TITLE}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {FIRST_RUN_POPUP_DESCRIPTION}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>
                        {FIRST_RUN_POPUP_SKIP}
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Link href="/dashboard/get-set-up">
                            {FIRST_RUN_POPUP_CONTINUE}
                        </Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
