/**
 * This file provides strings used app wide.
 */
import { UIConstants } from "@courselit/common-models";

export const responses = {
    error: "Greška",
    domain_missing: "Domen nedostaje",
    domain_doesnt_exist: "Domen ne postoji",
    domain_super_admin_email_missing:
        "SUPER_ADMIN_EMAIL promenljiva okruženja nije definisana",
    not_valid_subscription: "Nije pronađena važeća pretplata",
    sign_in_mail_prefix: "Prijava na",
    sign_in_mail_body: "Kliknite na sledeći link da se prijavite.",
    sign_in_link_text: "Prijavi se",
    course_enroll_email_subject_prefix: "Upisani ste na kurs:",
    download_email_subject_prefix: "Vaše preuzimanje:",

    // graphql responses
    past_date: "Datum ne može biti u prošlosti",
    invalid_permission: "Nevažeća dozvola",
    user_not_found: "Korisnik nije pronađen.",
    request_not_authenticated: "Zahtev nije autentifikovan",
    content_cannot_be_null: "Sadržaj ne može biti prazan",
    media_id_cannot_be_null: "Medij ne može biti prazan",
    item_not_found: "Stavka nije pronađena",
    drip_not_released: "Ova sekcija još nije dostupna za Vas",
    not_a_creator: "Nemate prava da izvršite ovu radnju",
    course_not_empty: "Obrišite sve lekcije pre brisanja kursa",
    invalid_offset: "Nevažeći offset",
    is_not_admin: "Nedovoljne privilegije",
    is_not_admin_or_creator: "Nedovoljne privilegije",
    blog_description_empty: "Polje opisa je obavezno",
    cannot_convert_to_blog:
        "Kurs ima lekcije pa se ne može pretvoriti u objavu",
    cost_not_provided: "Polje cene je obavezno",
    invalid_cost: "Nevažeća cena",
    cannot_add_to_blogs: "Ne možete dodati lekcije u blog objavu",
    file_is_required: "Fajl je obavezan",
    error_in_moving_file: "Greška pri premestanju fajla",
    success: "uspeh",
    user_name_cant_be_null: "Ime ne može biti prazno",
    action_not_allowed: "Nemate prava da izvršite ovu radnju",
    invalid_input: "Nevažeći unos",
    payment_invalid_settings: "Konfiguracija plaćanja nije ispravna",
    payment_info_required:
        "Dodajte način plaćanja pre kreiranja plaćenog plana",
    unrecognised_currency_code: "Nepoznat kod valute",
    only_admins_can_purchase:
        "Samo administratori mogu kupovati kurseve u ime drugih",
    course_already_purchased: "Već ste kupili ovu stavku",
    payment_settings_invalid_suffix: "podešavanja nisu ispravna",
    invalid_course_id: "Nevažeći ID kursa",
    invalid_user_id: "Nevažeći ID korisnika",
    payment_settings_invalid:
        "Način plaćanja nije podešen. Kontaktirajte administratora sajta.",
    not_enrolled: "Niste upisani na kurs",
    currency_iso_not_set:
        "ISO kod valute nije podešen. Kontaktirajte administratora sajta.",
    payment_method_not_saved:
        "Podesite način plaćanja pre podešavanja odgovarajućeg tajnog ključa",
    invalid_payment_method: "Nevažeći način plaćanja",
    invalid_theme: "Nevažeća tema",
    theme_not_installed: "Tema nije instalirana",
    invalid_layout: "Nevažeći raspored",
    missing_mandatory_blocks: "Nedostaju obavezni blokovi",
    destination_dont_exist: "Odredište ne postoji",
    page_exists: "Stranica sa tom URL adresom već postoji",
    invalid_format: "Nevažeći format",
    no_thumbnail: "Sličica nije dostupna",
    file_size_exceeded: "Veličina fajla je prekoračena",
    name_is_required: "Ime je obavezno",
    mimetype_is_required: "MIME tip je obavezan",
    existing_group: "Grupa sa tim imenom već postoji",
    group_not_empty: "Ova sekcija ima lekcije. Obrišite ih pre nastavka",
    group_not_found: "Sekcija nije pronađena",
    update_payment_method:
        "Morate podesiti način plaćanja da biste kreirali plaćeni sadržaj.",
    currency_iso_code_required:
        "ISO kod valute je obavezan. Primeri: usd, rsd, eur itd.",
    currency_unit_required:
        "Simbol valute je obavezan. Primeri: $, €, RSD itd.",
    school_title_not_set:
        "Dajte školi naslov pre podešavanja informacija o plaćanju.",
    internal_error: "Došlo je do interne greške. Pokušajte ponovo.",
    presigned_url_failed: "To nije uspelo! Vratite se i pokušajte ponovo.",
    file_uploaded: "Fajl je otpremljen. Vratite se da vidite medije.",
    media_deleted: "Medij je obrisan. Vratite se da vidite medije.",
    invalid_access_type: "Tip pristupa može biti javni ili privatni.",
    answers_missing: "Odgovori nedostaju.",
    cannot_be_evaluated: "Ova lekcija se ne može oceniti.",
    need_to_pass: "Morate položiti ovaj test da biste ga označili kao završen.",
    no_correct_answer: "Svako pitanje mora imati bar jedan tačan odgovor.",
    no_empty_option: "Opcije bez teksta nisu dozvoljene u pitanjima.",
    medialit_apikey_notfound:
        "Morate konfigurisati MediaLit da biste otpremali fajlove.",
    mail_already_sent: "Email je već poslat",
    mail_subject_length_exceeded: `Naslov ne može biti duži od ${UIConstants.MAIL_SUBJECT_MAX_LENGTH} karaktera`,
    mail_max_recipients_exceeded: `Ukupan broj primalaca ne može premašiti ${UIConstants.MAIL_MAX_RECIPIENTS}`,
    invalid_mail: "Polja Primaoci, Naslov i Sadržaj su obavezna",
    email_delivery_failed_for_all_recipients:
        "Slanje emaila nije uspelo ni za jednog primaoca",
    courses_cannot_be_downloaded: "Kurs se ne može ponuditi kao preuzimanje.",
    apikey_already_exists: "API ključ sa tim imenom već postoji",
    email_template_already_exists: "Šablon sa tim imenom već postoji",
    sequence_details_missing: "Nedostaju sledeća podešavanja",
    invalid_emails_order: "Nevažeći redosled emailova",
    no_published_emails: "Nema objavljenih emailova",
    sequence_not_active: "Sekvenca nije aktivna",
    sequence_already_started: "Sekvenca je već pokrenuta",
    mailing_address_too_short: "Poštanska adresa je prekratka",
    mandatory_tags_missing: "Obavezne oznake nedostaju",
    cannot_delete_last_email: "Ne možete obrisati poslednji email u sekvenci",
    invalid_drip_email: "Drip email mora imati naslov i sadržaj",
    cannot_invite_to_unpublished_product:
        "Ne možete pozvati korisnike na neobjavljeni proizvod",
    rejection_reason_missing: "Razlog odbijanja nedostaje",
    joining_reason_missing: "Razlog pridruživanja je obavezan",
    invalid_category: "Nevažeća kategorija",
    community_exists: "Zajednica sa istim imenom već postoji",
    payment_plan_required: "Dodajte plan plaćanja pre ove radnje",
    community_requires_payment: "Zajednica zahteva plaćanje",
    community_has_no_payment_plans: "Zajednica nema planove plaćanja",
    duplicate_payment_plan: "Plan plaćanja istog tipa već postoji",
    default_payment_plan_cannot_be_archived:
        "Podrazumevani plan plaćanja ne može biti arhiviran",
    default_payment_plan_required:
        "Označite plan plaćanja kao podrazumevani pre omogućavanja zajednice",
    community_content_already_reported: "Sadržaj je već prijavljen",
    profile_incomplete: "Popunite profil da biste izvršili ovu radnju",
    cannot_reject_member_with_active_subscription:
        "Ne možete odbiti člana sa aktivnom pretplatom",
    cannot_leave_community_last_moderator:
        "Poslednji menadžer ne može napustiti zajednicu",
    cannot_delete_last_permission_user:
        "Ne možete obrisati poslednjeg korisnika sa potrebnim dozvolama:",
    cannot_change_role_inactive_member:
        "Ne možete promeniti ulogu člana koji nije aktivan",
    cannot_change_role_last_moderator:
        "Ne možete promeniti ulogu poslednjeg moderatora",
    cannot_delete_last_category: "Ne možete obrisati poslednju kategoriju",
    lead_magnet_invalid_settings:
        "Proizvod mora imati tačno jedan besplatni plan plaćanja da bi lead magnet bio omogućen",
    certificate_invalid_settings:
        "Sertifikat može biti omogućen samo za kurseve",
    sso_provider_already_exists: "SSO provajder sa istim ID-jem već postoji",
    quiz_cannot_be_previewed: "Kviz se ne može pregledati",

    // api responses
    digital_download_no_files:
        "Ovo digitalno preuzimanje je prazno. Kontaktirajte kreatora.",
    download_link_expired: "Link za preuzimanje je istekao",
    user_already_exists: "Korisnik već postoji",
    unsubscribe_success:
        "Žao nam je što odlazite. Odjavljeni ste sa mailing liste.",
    download_course_cannot_have_groups:
        "Digitalno preuzimanje ne može imati sekcije",
    download_course_last_group_cannot_be_removed:
        "Poslednja sekcija ne može biti uklonjena iz digitalnog preuzimanja",
    certificate_demo_course_id_required:
        "CourseID je obavezan za demo sertifikat",
    provider_not_configured: "Konfigurišite provajdera pre omogućavanja",
    provider_invalid_configuration: "Nevažeća konfiguracija provajdera",
    page_id_already_exists: "Ovaj URL slug je već zauzet. Izaberite drugi.",
    signup_disabled:
        "Registracija je onemogućena. Pridružite se samo putem pozivnice.",
};

export const internal = {
    error_unrecognised_payment_method: "Nepoznat način plaćanja",
    error_payment_method_not_implemented: "Još nije implementirano",
    error_db_connection_failed:
        "Nije moguće uspostaviti vezu sa bazom podataka.",
    error_env_var_undefined: "Obavezna promenljiva okruženja nije definisana",
    app_running: "CourseLit server radi na",
    invalid_cloud_storage_settings: "Podešavanja cloud skladišta nisu ispravna",
    domain_not_specified: "Domen nije naveden",
    default_group_name: "Prva sekcija",
    default_email_broadcast_subject: "Neimenovani broadcast",
    default_email_sequence_subject: "Prvi email",
    default_email_sequence_name: "Neimenovana sekvenca",
    joining_reason_creator: "Pridružio se kao kreator",
};
