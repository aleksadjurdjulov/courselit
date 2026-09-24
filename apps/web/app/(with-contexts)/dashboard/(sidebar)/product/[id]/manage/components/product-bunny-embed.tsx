"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@courselit/components-library";
import {
    BUNNY_EMBED_TOKEN_CONFIGURED,
    BUNNY_EMBED_TOKEN_DESCRIPTION,
    BUNNY_EMBED_TOKEN_LABEL,
    BUNNY_EMBED_TOKEN_PLACEHOLDER,
    BUNNY_EMBED_TOKEN_REMOVE,
    BUNNY_EMBED_TOKEN_REMOVED,
    BUNNY_EMBED_TOKEN_SAVE_FAILED,
    BUNNY_EMBED_TOKEN_SAVED,
    BUNNY_EMBED_TOKEN_TITLE,
    BUTTON_SAVE,
    BUTTON_SAVING,
    TOAST_TITLE_ERROR,
    TOAST_TITLE_SUCCESS,
} from "@ui-config/strings";
import { useGraphQLFetch } from "@/hooks/use-graphql-fetch";
import { COURSE_TYPE_COURSE } from "@ui-config/constants";

const MUTATION_UPDATE_BUNNY_EMBED_TOKEN = `
    mutation UpdateBunnyEmbedToken($courseId: String!, $bunnyEmbedTokenKey: String!) {
        updateCourse(courseData: { id: $courseId, bunnyEmbedTokenKey: $bunnyEmbedTokenKey }) {
            courseId
            bunnyEmbedTokenConfigured
        }
    }
`;

interface ProductBunnyEmbedProps {
    product: {
        courseId?: string;
        type?: string;
        bunnyEmbedTokenConfigured?: boolean;
    };
}

export default function ProductBunnyEmbed({ product }: ProductBunnyEmbedProps) {
    const { toast } = useToast();
    const fetch = useGraphQLFetch();
    const keyRef = useRef("");
    const [canSave, setCanSave] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputVersion, setInputVersion] = useState(0);
    const [configured, setConfigured] = useState(
        Boolean(product?.bunnyEmbedTokenConfigured),
    );

    useEffect(() => {
        setConfigured(Boolean(product?.bunnyEmbedTokenConfigured));
    }, [product?.bunnyEmbedTokenConfigured]);

    const saveKey = async (bunnyEmbedTokenKey: string) => {
        if (!product?.courseId) {
            return;
        }

        try {
            setLoading(true);
            const response = await fetch
                .setPayload({
                    query: MUTATION_UPDATE_BUNNY_EMBED_TOKEN,
                    variables: {
                        courseId: product.courseId,
                        bunnyEmbedTokenKey,
                    },
                })
                .build()
                .exec();

            if (response?.updateCourse) {
                const nextConfigured = Boolean(
                    response.updateCourse.bunnyEmbedTokenConfigured,
                );
                if (bunnyEmbedTokenKey.trim() && !nextConfigured) {
                    toast({
                        title: TOAST_TITLE_ERROR,
                        description: BUNNY_EMBED_TOKEN_SAVE_FAILED,
                        variant: "destructive",
                    });
                    return;
                }
                setConfigured(nextConfigured);
                keyRef.current = "";
                setCanSave(false);
                setInputVersion((version) => version + 1);
                toast({
                    title: TOAST_TITLE_SUCCESS,
                    description: nextConfigured
                        ? BUNNY_EMBED_TOKEN_SAVED
                        : BUNNY_EMBED_TOKEN_REMOVED,
                });
            }
        } catch (err: any) {
            toast({
                title: TOAST_TITLE_ERROR,
                description: err.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const bunnyEmbedTokenKey = keyRef.current.trim();
        if (!bunnyEmbedTokenKey) {
            return;
        }
        await saveKey(bunnyEmbedTokenKey);
    };

    if (product?.type?.toLowerCase() !== COURSE_TYPE_COURSE) {
        return null;
    }

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="space-y-0.5">
                    <Label className="text-base font-semibold">
                        {BUNNY_EMBED_TOKEN_TITLE}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        {BUNNY_EMBED_TOKEN_DESCRIPTION}
                    </p>
                </div>
                {configured && (
                    <p className="text-sm text-muted-foreground">
                        {BUNNY_EMBED_TOKEN_CONFIGURED}
                    </p>
                )}
                <div className="space-y-2">
                    <Label htmlFor="bunny-embed-token-key">
                        {BUNNY_EMBED_TOKEN_LABEL}
                    </Label>
                    <Input
                        key={inputVersion}
                        id="bunny-embed-token-key"
                        type="password"
                        autoComplete="off"
                        placeholder={BUNNY_EMBED_TOKEN_PLACEHOLDER}
                        onChange={(event) => {
                            keyRef.current = event.target.value;
                            setCanSave(event.target.value.trim().length > 0);
                        }}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button type="submit" disabled={!canSave || loading}>
                        {loading ? BUTTON_SAVING : BUTTON_SAVE}
                    </Button>
                    {configured && (
                        <Button
                            type="button"
                            variant="outline"
                            disabled={loading}
                            onClick={() => saveKey("")}
                        >
                            {BUNNY_EMBED_TOKEN_REMOVE}
                        </Button>
                    )}
                </div>
            </div>
            <Separator />
        </form>
    );
}
