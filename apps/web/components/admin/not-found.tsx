import Link from "next/link";
import { Users } from "lucide-react";
import {
    NOT_FOUND_DEFAULT_DESCRIPTION,
    NOT_FOUND_DEFAULT_TITLE,
    NOT_FOUND_RESOURCE_DESCRIPTION,
    NOT_FOUND_RESOURCE_TITLE,
} from "@ui-config/strings";

interface NotFoundProps {
    resource?: string;
    title?: string;
    description?: string;
    backLink: string;
    backLinkText: string;
}

export default function NotFound({
    resource,
    title,
    description,
    backLink,
    backLinkText,
}: NotFoundProps) {
    const heading =
        title ||
        (resource
            ? NOT_FOUND_RESOURCE_TITLE.replace("{resource}", resource)
            : NOT_FOUND_DEFAULT_TITLE);
    const body =
        description ||
        (resource
            ? NOT_FOUND_RESOURCE_DESCRIPTION
            : NOT_FOUND_DEFAULT_DESCRIPTION);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
            <Users className="w-16 h-16 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{heading}</h1>
            <p className="text-gray-600 mb-4">{body}</p>
            <Link
                href={backLink}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
                &larr; {backLinkText}
            </Link>
        </div>
    );
}
