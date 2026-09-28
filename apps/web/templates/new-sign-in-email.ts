import { emailBrandStyles } from "./email-brand";

const newSignInEmail = `
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
                p(class="email-title") Nova prijava na nalog
                p(class="email-body")
                    | Neko se upravo prijavio na 
                    strong #{schoolName}
                    | .
                p(class="email-muted") Pregledač: #{userAgent}
                p(class="email-muted") Adresa: #{ipAddress}
                p(class="email-body") Ako ste to bili Vi, ovu poruku možete da zanemarite.
                div(class="cta-container")
                    a(
                        href=\`\${revokeLink}\`
                        class="cta"
                    ) Odjavite ostale uređaje
                p(class="email-muted") Ako ovo niste bili Vi, link odjavljuje ostale prijave na nalogu.
                if !hideCourseLitBranding
                    div(class="courselit-branding-container")
                        a(
                            href="https://courselit.app"
                            target="_blank"
                            class="courselit-branding-cta"
                        ) Powered by <strong> CourseLit </strong>
`;

export default newSignInEmail;
