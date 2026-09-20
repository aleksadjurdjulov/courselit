export const emailBrand = {
    pageBackground: "#f4f1ed",
    softPanel: "#f2e9da",
    cardBackground: "#ffffff",
    text: "#22262d",
    mutedText: "#5a5f66",
    border: "#b6e1e1",
    primary: "#00afa3",
    primaryForeground: "#ffffff",
    fontFamily: "Arial, Helvetica, sans-serif",
} as const;

/** Shared CSS used inside Pug email <style> blocks. */
export const emailBrandStyles = `
            body {
                margin: 0;
                padding: 0;
                background-color: ${emailBrand.pageBackground};
                color: ${emailBrand.text};
                font-family: ${emailBrand.fontFamily};
                -webkit-font-smoothing: antialiased;
            }
            .email-page {
                width: 100%;
                background-color: ${emailBrand.pageBackground};
                padding: 32px 16px;
            }
            .email-card {
                max-width: 600px;
                margin: 0 auto;
                background-color: ${emailBrand.cardBackground};
                border: 1px solid ${emailBrand.border};
                border-radius: 8px;
                padding: 32px 28px;
            }
            .email-title {
                margin: 0 0 8px;
                font-size: 16px;
                line-height: 1.5;
                color: ${emailBrand.text};
            }
            .email-body {
                margin: 0 0 16px;
                font-size: 15px;
                line-height: 1.6;
                color: ${emailBrand.text};
            }
            .email-muted {
                margin: 0;
                font-size: 14px;
                line-height: 1.5;
                color: ${emailBrand.mutedText};
            }
            .email-link {
                color: ${emailBrand.primary};
                text-decoration: underline;
            }
            .otp-code {
                margin: 24px 0;
                padding: 20px 16px;
                text-align: center;
                background-color: ${emailBrand.softPanel};
                border: 1px solid ${emailBrand.border};
                border-radius: 8px;
                font-size: 40px;
                font-weight: bold;
                letter-spacing: 8px;
                line-height: 1.2;
                color: ${emailBrand.text};
                font-family: ${emailBrand.fontFamily};
            }
            .email-note {
                margin: 24px 0 0;
                padding: 14px 16px;
                background-color: ${emailBrand.softPanel};
                border: 1px solid ${emailBrand.border};
                border-radius: 8px;
                font-size: 13px;
                line-height: 1.5;
                color: ${emailBrand.mutedText};
            }
            .email-note strong {
                color: ${emailBrand.text};
            }
            .cta-container {
                margin: 28px 0 8px;
                text-align: center;
            }
            .cta {
                display: inline-block;
                border: 1px solid ${emailBrand.primary};
                border-radius: 6px;
                padding: 12px 22px;
                text-decoration: none;
                color: ${emailBrand.primaryForeground};
                background-color: ${emailBrand.primary};
                font-weight: bold;
                font-size: 15px;
                font-family: ${emailBrand.fontFamily};
            }
            .cta:hover {
                background-color: ${emailBrand.primary};
                border-color: ${emailBrand.primary};
                color: ${emailBrand.primaryForeground};
            }
            .sign-off {
                margin: 28px 0 0;
                font-size: 15px;
                line-height: 1.5;
                color: ${emailBrand.text};
            }
            .courselit-branding-container {
                margin: 32px 0 0;
                text-align: center;
            }
            .courselit-branding-cta {
                text-decoration: none;
                color: ${emailBrand.mutedText};
                padding: 6px 10px;
                background-color: ${emailBrand.cardBackground};
                border: 1px solid ${emailBrand.border};
                border-radius: 6px;
                text-align: center;
                font-size: 12px;
                font-family: ${emailBrand.fontFamily};
            }
`;
