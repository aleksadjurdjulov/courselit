import { emailBrandStyles } from "./email-brand";

const courseEnrollTemplate = `
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
                p(class="email-title") Upisani ste na kurs
                p(class="email-body")
                    | Dobrodošli na 
                    strong #{courseName}
                    | .
                div(class="cta-container")
                    a(
                        href=\`\${loginLink}\`
                        class="cta"
                    ) Prijavite se
                p(class="email-muted") Da pristupite svom sadržaju, prijavite se na nalog.
                if !hideCourseLitBranding
                    div(class="courselit-branding-container")
                        a(
                            href="https://courselit.app"
                            target="_blank"
                            class="courselit-branding-cta"
                        ) Powered by <strong> CourseLit </strong>
`;

export default courseEnrollTemplate;
