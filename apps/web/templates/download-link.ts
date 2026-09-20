import { emailBrandStyles } from "./email-brand";

const digitalDownloadTemplate = `
doctype html
html
    head
        meta(charset="utf-8")
        meta(name="viewport" content="width=device-width, initial-scale=1.0")
        style(type='text/css').
${emailBrandStyles}
    body
        div(class="email-page")
            div(class="email-card")
                p(class="email-title") Hvala! Vaš fajl za #{courseName} je spreman.
                div(class="cta-container")
                    a(
                        href=\`\${downloadLink}\`
                        class="cta"
                    ) Preuzmite sada
                p(class="sign-off") Srdačan pozdrav,
                p(class="email-body") #{name}
                p(class="email-muted")
                    | Da pristupite celom sadržaju, 
                    a(href=\`\${loginLink}\` class="email-link") prijavite se
                    |  ovde.
                if !hideCourseLitBranding
                    div(class="courselit-branding-container")
                        a(
                            href="https://courselit.app"
                            target="_blank"
                            class="courselit-branding-cta"
                        ) Powered by <strong> CourseLit </strong>
`;

export default digitalDownloadTemplate;
