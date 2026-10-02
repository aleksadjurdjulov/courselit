import { emailBrand, emailBrandStyles } from "./email-brand";

const courseEnrollBundleTemplate = `
doctype html
html
    head
        meta(charset="utf-8")
        meta(name="viewport" content="width=device-width, initial-scale=1.0")
        style(type='text/css').
${emailBrandStyles}
            .email-course-list {
                margin: 0 0 16px;
                padding-left: 20px;
                font-size: 15px;
                line-height: 1.6;
                color: ${emailBrand.text};
            }
            .email-course-list li {
                margin: 0 0 6px;
            }
    body
        div(class="email-page")
            div(class="email-card")
                p(class="email-title") Upisani ste na kurseve
                p(class="email-body") Dobrodošli na sledeće kurseve:
                ul(class="email-course-list")
                    each courseName in courseNames
                        li
                            strong= courseName
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

export default courseEnrollBundleTemplate;
