import { emailBrandStyles } from "./email-brand";

const magicCodeEmail = `
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
                p(class="email-title") Vaš verifikacioni kod
                div(class="otp-code") #{code}
                div(class="email-note")
                    strong VAŽNO:
                    |  Ne delite ovaj email ni sa kim — bilo ko može da se prijavi na
                    |  Vaš nalog pomoću koda iz ove poruke.
                if !hideCourseLitBranding
                    div(class="courselit-branding-container")
                        a(
                            href="https://courselit.app"
                            target="_blank"
                            class="courselit-branding-cta"
                        ) Powered by <strong> CourseLit </strong>
`;

export default magicCodeEmail;
