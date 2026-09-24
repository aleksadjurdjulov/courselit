"use client";

import {
    AddressContext,
    ServerConfigContext,
    SiteInfoContext,
    ThemeContext,
} from "@components/contexts";
import {
    Button,
    Caption,
    Input,
    Section,
    Text1,
    Link as PageLink,
} from "@courselit/page-primitives";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FormEvent } from "react";
import { Form, useToast } from "@courselit/components-library";
import {
    BTN_LOGIN,
    BTN_LOGIN_GET_CODE,
    LOGIN_CODE_INTIMATION_MESSAGE,
    LOGIN_NO_CODE,
    BTN_LOGIN_NO_CODE,
    LOGIN_FORM_LABEL,
    LOGIN_FORM_DISCLAIMER,
    LOGIN_FORM_TERMS_LINK,
    LOGIN_EMAIL_PLACEHOLDER,
    LOGIN_CODE_PLACEHOLDER,
    LOGIN_ERROR_SIGNIN_PREFIX,
    LOGIN_ERROR_UNEXPECTED,
    LOGIN_ERROR_RECAPTCHA_UNAVAILABLE,
    LOGIN_ERROR_RECAPTCHA_FAILED,
    LOADING,
    TOAST_TITLE_ERROR,
} from "@/ui-config/strings";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { useRecaptcha } from "@/hooks/use-recaptcha";
import RecaptchaScriptLoader from "@/components/recaptcha-script-loader";
import { checkPermission } from "@courselit/utils";
import { Constants, Profile } from "@courselit/common-models";
import { getUserProfile } from "../../helpers";
import { ADMIN_PERMISSIONS } from "@ui-config/constants";
import { authClient } from "@/lib/auth-client";
import type { RuntimeLoginProvider } from "@/lib/login-providers";
import ExternalLoginButton from "@/components/auth/external-login-button";
import "@/components/public/base-layout/login-site-header.css";

export default function LoginForm({
    redirectTo,
    loginProviders = [],
}: {
    redirectTo?: string;
    loginProviders?: RuntimeLoginProvider[];
}) {
    const { theme } = useContext(ThemeContext);
    const [showCode, setShowCode] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const serverConfig = useContext(ServerConfigContext);
    const { executeRecaptcha } = useRecaptcha();
    const address = useContext(AddressContext);
    const codeInputRef = useRef<HTMLInputElement>(null);
    const siteinfo = useContext(SiteInfoContext);

    const validateRecaptcha = useCallback(async (): Promise<boolean> => {
        if (!serverConfig.recaptchaSiteKey) {
            return true;
        }

        if (!executeRecaptcha) {
            toast({
                title: TOAST_TITLE_ERROR,
                description: LOGIN_ERROR_RECAPTCHA_UNAVAILABLE,
                variant: "destructive",
            });
            setLoading(false);
            return false;
        }

        const recaptchaToken = await executeRecaptcha("login_code_request");
        if (!recaptchaToken) {
            toast({
                title: TOAST_TITLE_ERROR,
                description: LOGIN_ERROR_RECAPTCHA_FAILED,
                variant: "destructive",
            });
            setLoading(false);
            return false;
        }
        try {
            const recaptchaVerificationResponse = await fetch(
                "/api/recaptcha",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: recaptchaToken }),
                },
            );

            const recaptchaData = await recaptchaVerificationResponse.json();

            if (
                !recaptchaVerificationResponse.ok ||
                !recaptchaData.success ||
                (recaptchaData.score && recaptchaData.score < 0.5)
            ) {
                toast({
                    title: TOAST_TITLE_ERROR,
                    description: `${LOGIN_ERROR_RECAPTCHA_FAILED}${recaptchaData.score ? ` Score: ${recaptchaData.score.toFixed(2)}.` : ""}`,
                    variant: "destructive",
                });
                setLoading(false);
                return false;
            }
        } catch (err) {
            toast({
                title: TOAST_TITLE_ERROR,
                description: LOGIN_ERROR_RECAPTCHA_FAILED,
                variant: "destructive",
            });
            setLoading(false);
            return false;
        }

        return true;
    }, []);

    const signInUser = async function (e: FormEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            const { error } = await authClient.signIn.emailOtp({
                email: email.trim().toLowerCase(),
                otp: code,
            });
            if (error) {
                setError(`${LOGIN_ERROR_SIGNIN_PREFIX} ${error.message}`);
            } else {
                window.location.href =
                    redirectTo ||
                    getRedirectURLBasedOnProfile(
                        await getUserProfile(address.backend),
                    );
            }
        } catch (err) {
            console.error("Error during requestCode:", err);
            toast({
                title: TOAST_TITLE_ERROR,
                description: LOGIN_ERROR_UNEXPECTED,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const getRedirectURLBasedOnProfile = (profile: Profile) => {
        if (
            profile?.userId &&
            checkPermission(profile.permissions!, ADMIN_PERMISSIONS)
        ) {
            return "/dashboard/overview";
        } else {
            return "/dashboard/my-content";
        }
    };

    useEffect(() => {
        if (showCode) {
            codeInputRef.current?.focus();
        }
    }, [showCode]);

    useEffect(() => {
        const page = document.querySelector(".courselit-theme");
        page?.classList.add("ff-login-page");
        return () => page?.classList.remove("ff-login-page");
    }, []);

    const requestCode = async function (e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!validateRecaptcha()) {
            return;
        }

        try {
            const { error } = await authClient.emailOtp.sendVerificationOtp({
                email: email.trim().toLowerCase(),
                type: "sign-in",
            });

            if (error) {
                setError(error.message as any);
            } else {
                setShowCode(true);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Section theme={theme.theme} className="ff-login min-h-screen">
            <div className="flex min-h-screen flex-col gap-4">
                <div className="mx-auto flex w-full grow items-center justify-center px-4 lg:max-w-[1200px]">
                    <div className="flex w-full flex-col gap-4 lg:w-[360px]">
                        {siteinfo.logins?.includes(
                            Constants.LoginProvider.EMAIL,
                        ) && (
                            <>
                                {error && (
                                    <div
                                        style={{
                                            color: theme?.theme?.colors?.light
                                                ?.destructive,
                                        }}
                                        className="flex items-center gap-2 mb-4"
                                    >
                                        <TriangleAlert className="w-4 h-4" />
                                        <div>
                                            <Text1 theme={theme.theme}>
                                                {error}
                                            </Text1>
                                        </div>
                                    </div>
                                )}
                                {!showCode && (
                                    <div>
                                        <Text1
                                            theme={theme.theme}
                                            className="ff-login-copy mb-4"
                                        >
                                            {LOGIN_FORM_LABEL}
                                        </Text1>
                                        <Form
                                            onSubmit={requestCode}
                                            className="mx-auto flex w-full flex-col gap-4"
                                        >
                                            <Input
                                                type="email"
                                                value={email}
                                                placeholder={
                                                    LOGIN_EMAIL_PLACEHOLDER
                                                }
                                                required={true}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                theme={theme.theme}
                                                className="ff-login-input"
                                            />
                                            <Button
                                                theme={theme.theme}
                                                disabled={loading}
                                                className="ff-login-button"
                                            >
                                                {loading
                                                    ? LOADING
                                                    : BTN_LOGIN_GET_CODE}
                                            </Button>
                                        </Form>
                                    </div>
                                )}
                                {showCode && (
                                    <div>
                                        <Text1
                                            theme={theme.theme}
                                            className="ff-login-copy mb-4"
                                        >
                                            {LOGIN_CODE_INTIMATION_MESSAGE}{" "}
                                            <strong>{email}</strong>
                                        </Text1>
                                        <Form
                                            className="mx-auto mb-4 flex w-full flex-col gap-4"
                                            onSubmit={signInUser}
                                        >
                                            <Input
                                                type="text"
                                                value={code}
                                                placeholder={
                                                    LOGIN_CODE_PLACEHOLDER
                                                }
                                                required={true}
                                                onChange={(e) =>
                                                    setCode(e.target.value)
                                                }
                                                theme={theme.theme}
                                                ref={codeInputRef}
                                                className="ff-login-input"
                                            />
                                            <Button
                                                theme={theme.theme}
                                                disabled={loading}
                                                className="ff-login-button"
                                            >
                                                {loading ? LOADING : BTN_LOGIN}
                                            </Button>
                                            {/* </div> */}
                                        </Form>
                                        <div className="flex justify-center items-center gap-1 text-sm">
                                            <Caption
                                                theme={theme.theme}
                                                className="ff-login-note flex items-center gap-1 text-center"
                                            >
                                                {LOGIN_NO_CODE}
                                                <button
                                                    onClick={requestCode}
                                                    className="ff-login-link"
                                                    disabled={loading}
                                                >
                                                    <PageLink
                                                        theme={theme.theme}
                                                        className="ff-login-link text-sm"
                                                    >
                                                        {loading
                                                            ? LOADING
                                                            : BTN_LOGIN_NO_CODE}
                                                    </PageLink>
                                                </button>
                                            </Caption>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        {loginProviders.map((provider) => (
                            <ExternalLoginButton
                                key={provider.key}
                                provider={provider}
                                theme={theme.theme}
                                className="ff-login-button-secondary mx-auto w-full"
                                onClick={async () => {
                                    await authClient.signIn.sso({
                                        providerId: provider.providerId,
                                        callbackURL: "/dashboard",
                                    });
                                }}
                            />
                        ))}
                        <Caption
                            theme={theme.theme}
                            className="ff-login-note text-center"
                        >
                            {LOGIN_FORM_DISCLAIMER}
                            <Link href="/p/terms" className="ff-login-link">
                                {LOGIN_FORM_TERMS_LINK}
                            </Link>
                        </Caption>
                    </div>
                </div>
            </div>
            <RecaptchaScriptLoader />
        </Section>
    );
}
