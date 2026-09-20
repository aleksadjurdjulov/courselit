import { Constants } from "@courselit/common-models";

/**
 * This file provides application wide strings.
 */
export const ERR_ALL_FIELDS_REQUIRED = "Sva polja su obavezna.";
export const ERR_PASSWORDS_DONT_MATCH = "Lozinke se ne poklapaju.";
export const SIGNUP_SUCCESS = "Registracija uspešna. Prijavite se.";
export const ERR_COURSE_TITLE_REQUIRED = "Naslov je obavezan.";
export const ERR_COURSE_COST_REQUIRED = "Cena je obavezna.";

// Replies from the backend
export const RESP_API_USER_CREATED = "Korisnik je kreiran";

// Placeholder texts
export const CREATOR_AREA_LINK_TEXT = "Kreiraj";
export const CREATOR_AREA_PAGE_TITLE = "Kontrolna tabla";
export const GENERIC_TITLE = "Moj sajt za kurseve";
export const GENERIC_SUBTITLE = "Naučite nove veštine";
export const GENERIC_LOGO_PATH = "";
export const GENERIC_SIGNIN_TEXT = "Prijava";
export const GENERIC_SIGNUP_TEXT = "Registracija";
export const GENERIC_SIGNOUT_TEXT = "Odjava";
export const GENERIC_CURRENCY_UNIT = "";
export const GENERIC_STRIPE_PUBLISHABLE_KEY_TEXT = "";
export const GENERIC_CURRENCY_ISO_CODE = "";
export const GENERIC_PAYMENT_METHOD = "";
export const GENERIC_CODE_INJECTION_HEAD = "";

// UI texts
export const BTN_LOAD_MORE = "Učitaj još";
export const MEDIA_UPLOAD_BUTTON_TEXT = "Otpremi";
export const MEDIA_UPLOADING = "Otpremanje...";
export const MEDIA_ADD_NEW_BUTTON_TEXT = "Dodaj novo";
export const BUTTON_CANCEL_TEXT = "Otkaži";
export const BUTTON_CONFIRM_TEXT = "Potvrdi";
export const BUTTON_CANCEL_SCHEDULED_MAIL = "Otkaži slanje";
export const MEDIA_SEARCH_INPUT_PLACEHOLDER = "Pretražite medije";
export const LOAD_MORE_TEXT = "Učitaj još";
export const MANAGE_MEDIA_BUTTON_TEXT = "Ubaci medij";
export const MANAGE_COURSES_PAGE_HEADING = "Proizvodi";
export const COURSE_CUSTOMERS_PAGE_HEADING = "Kupci";
export const MANAGE_COMMUNITIES_PAGE_HEADING = "Zajednice";
export const MANAGE_PAGES_PAGE_HEADING = "Stranice";
export const BREADCRUMBS_EDIT_LESSON_COURSE_NAME = "Proizvod";
export const NEW_PAGE_HEADING = "Nova stranica";
export const USERS_MANAGER_PAGE_HEADING = "Korisnici";
export const BTN_MANAGE_TAGS = "Upravljaj oznakama";
export const USERS_TAG_HEADER = "Oznake";
export const USERS_TAG_NEW_HEADER = "Nova oznaka";
export const TAG_TABLE_HEADER_NAME = "Naziv oznake";
export const BTN_NEW_TAG = "Nova oznaka";
export const TAG_TABLE_HEADER_SUBS_COUNT = "Broj označenih korisnika";
export const TAGS_TABLE_CONTEXT_MENU_DELETE_PRODUCT = "Obriši oznaku";
export const TAGS_TABLE_CONTEXT_MENU_UNTAG = "Ukloni oznaku sa korisnika";
export const UNTAG_POPUP_DESC =
    "Ovo će ukloniti oznaku sa svih korisnika označenih ovom oznakom. Korisnici će ostati u sistemu.";
export const UNTAG_POPUP_HEADER = "Ukloni oznaku sa korisnika označenih sa";
export const DELETE_TAG_POPUP_HEADER = "Obriši oznaku";
export const DELETE_TAG_POPUP_DESC =
    "Ovo će ukloniti oznaku sa korisnika i obrisati oznaku. Korisnici će ostati u sistemu.";
export const NEW_COURSE_PAGE_HEADING = "Dodaj kurs";
export const EDIT_PRODUCT_HEADER = "Izmeni proizvod";
export const EDIT_BLOG = "Izmeni blog";
export const EDIT_EMAIL = "Izmeni email";
export const MEDIA_MANAGER_DIALOG_TITLE = "Dodaj medij";
export const BUTTON_NEW_COURSE = "Novo";
export const BUTTON_DONE_TEXT = "Gotovo";
export const DIALOG_TITLE_FEATURED_IMAGE = "Izaberi medij";
export const BUTTON_SET_FEATURED_IMAGE = "Izaberi";
export const BUTTON_SELECT_MEDIA = "Izaberi medij";
export const FORM_FIELD_FEATURED_IMAGE = "Istaknuta slika";
export const BTN_DELETE_COURSE = "Obriši proizvod";
export const BTN_EXIT_COURSE = "Izađi";
export const BTN_EXIT_COURSE_TOOLTIP = "Izađi iz kursa";
export const BTN_TOGGLE_THEME = "Promeni temu";
export const BTN_ADD_VIDEO = "Dodaj";
export const ADD_VIDEO_DIALOG_TITLE = "Ugradi online video";
export const LABEL_NEW_PASSWORD = "Nova lozinka";
export const BUTTON_SAVE = "Sačuvaj";
export const BUTTON_SAVING = "Čuvanje...";
export const GROUP_SETTINGS_HEADER = "Podešavanja";
export const GROUP_LESSONS_HEADER = "Lekcije";
export const BUTTON_DELETE_GROUP = "Obriši grupu";
export const BTN_RESET = "Resetuj";
export const SWITCH_ACCOUNT_ACTIVE = "Nalog aktivan";
export const LABEL_CONF_PASSWORD = "Potvrdite lozinku";
export const HEADER_BLOG_POSTS_SECTION = "Blog";
export const HEADER_COURSES_SECTION = "Kursevi";
export const HEADER_TAG_SECTION = "Sadržaj označen sa";
export const SITE_SETTINGS_TITLE = "Naslov";
export const SITE_SETTINGS_SUBTITLE = "Podnaslov";
export const SITE_SETTINGS_CURRENCY = "Valuta";
export const SITE_SETTINGS_LOGO = "Logo";
export const SITE_SETTINGS_DEFAULT_TITLE = "CourseLit";
export const SITE_SETTINGS_COURSELIT_BRANDING_CAPTION =
    "Ukloni CourseLit brending";
export const SITE_SETTINGS_COURSELIT_BRANDING_SUB_CAPTION = `Sakrij "Powered by CourseLit" na Vašim CourseLit kursevima i sajtu.`;
export const SITE_SETTINGS_PAGE_HEADING = "Podešavanja";
export const HEADER_COURSELIT = "O CourseLit-u";
export const MEDIA_SELECTOR_UPLOAD_BTN_CAPTION = "Otpremi sliku";
export const MEDIA_SELECTOR_REMOVE_BTN_CAPTION = "Ukloni sliku";
export const SITE_ADMIN_SETTINGS_STRIPE_SECRET = "Stripe tajni ključ";
export const SITE_ADMIN_SETTINGS_RAZORPAY_SECRET = "Razorpay tajni ključ";
export const SITE_ADMIN_SETTINGS_RAZORPAY_WEBHOOK_SECRET =
    "Razorpay webhook tajna";
export const SITE_ADMIN_SETTINGS_PAYPAL_SECRET = "Paypal tajni ključ";
export const SITE_ADMIN_SETTINGS_PAYTM_SECRET = "Paytm tajni ključ";
export const SITE_SETTINGS_SECTION_GENERAL = "Brending";
export const SITE_SETTINGS_SECTION_PAYMENT = "Plaćanje";
export const SITE_SETTINGS_SECTION_MAILS = "Emailovi";
export const SITE_ADMIN_SETTINGS_PAYMENT_METHOD = "Način plaćanja";
export const SITE_SETTINGS_STRIPE_PUBLISHABLE_KEY_TEXT = "Stripe javni ključ";
export const SITE_SETTINGS_RAZORPAY_KEY_TEXT = "Razorpay ključ";
export const SITE_SETTINGS_LEMONSQUEEZY_KEY_TEXT = "Lemonsqueezy ključ";
export const SITE_SETTINGS_LEMONSQUEEZY_STOREID_TEXT = "Lemonsqueezy Store ID";
export const SITE_SETTINGS_LEMONSQUEEZY_ONETIME_TEXT =
    "ID jednokratne varijante";
export const SITE_SETTINGS_LEMONSQUEEZY_SUB_MONTHLY_TEXT =
    "ID varijante pretplate (mesečno)";
export const SITE_SETTINGS_LEMONSQUEEZY_SUB_YEARLY_TEXT =
    "ID varijante pretplate (godišnje)";
export const SITE_SETTINGS_PAYMENT_METHOD_NONE_LABEL = "Nijedan";
export const SITE_SETTINGS_PAYMENT_METHOD_RESET_BUTTON = "Resetuj";
export const SITE_SETTINGS_PAYMENT_METHOD_RESET_TOOLTIP =
    "Obriši trenutni način plaćanja i zadrži sačuvane podatke gateway-a";
export const SITE_SETTINGS_PAYMENT_METHOD_RESET_CONFIRM_TITLE =
    "Resetovati način plaćanja?";
export const SITE_SETTINGS_PAYMENT_METHOD_RESET_CONFIRM_DESCRIPTION =
    "Nakon resetovanja, svi plaćeni planovi svih proizvoda neće uspeti na kasi sa greškom. Besplatni planovi će nastaviti da rade.";
export const SITE_SETTINGS_PAYMENT_METHOD_RESET_CONFIRM_ACTION = "Resetuj";
export const FREE_COST = "BESPLATNO";
export const SIDEBAR_TEXT_COURSE_ABOUT = "Uvod";
export const SIDEBAR_TEXT_COURSE_DISCUSSIONS = "Diskusije";
export const COURSE_DISCUSSIONS_TITLE = "Diskusije";
export const COURSE_DISCUSSIONS_TOOLTIP = "Diskusije";
export const COURSE_DISCUSSIONS_DESCRIPTION =
    "Omogući diskusije po lekcijama za ovaj kurs";
export const DISCUSSIONS_DISABLED_MESSAGE =
    "Diskusije su onemogućene za ovaj proizvod.";
export const DISCUSSIONS_ENABLED_MESSAGE =
    "Diskusije su omogućene za ovaj proizvod.";
export const COURSE_DISCUSSIONS_VIEW_ALL = "Prikaži sve diskusije";
export const COURSE_DISCUSSIONS_EMPTY = "Još nema diskusija";
export const COURSE_DISCUSSIONS_COMMENT_PLACEHOLDER = "Dodajte komentar...";
export const COURSE_DISCUSSIONS_REPLY_PLACEHOLDER = "Dodajte odgovor...";
export const COURSE_DISCUSSIONS_POST_COMMENT = "Objavi komentar";
export const COURSE_DISCUSSIONS_POST_REPLY = "Objavi odgovor";
export const COURSE_DISCUSSIONS_REPLY = "Odgovori";
export const COURSE_DISCUSSIONS_REPORT = "Prijavi";
export const COURSE_DISCUSSIONS_DELETE = "Obriši";
export const COURSE_DISCUSSIONS_DELETED = "Obrisano";
export const COURSE_DISCUSSIONS_DELETE_CONFIRM_TITLE = "Obriši diskusiju";
export const COURSE_DISCUSSIONS_DELETE_CONFIRM =
    "Da li ste sigurni da želite ovo da obrišete?";
export const COURSE_DISCUSSIONS_DELETE_CONFIRM_DESCRIPTION =
    "Ova radnja se ne može opozvati.";
export const COURSE_DISCUSSIONS_DELETE_CANCEL = "Otkaži";
export const COURSE_DISCUSSIONS_REPORT_REASON = "Zašto prijavljujete ovo?";
export const COURSE_DISCUSSIONS_REPORTED = "Prijavljeno";
export const COURSE_DISCUSSIONS_CONTENT_REQUIRED = "Prvo dodajte komentar.";
export const COURSE_DISCUSSIONS_CONTENT_TOO_LONG =
    "Sadržaj diskusije je predugačak.";
export const COURSE_DISCUSSIONS_ADMIN_REPORTS = "Prijave";
export const COURSE_DISCUSSIONS_ADMIN_VIEW_REPORTS =
    "Upravljaj prijavljenim sadržajem";
export const COURSE_DISCUSSIONS_ADMIN_NO_REPORTS = "Nema prijava";
export const COURSE_DISCUSSIONS_ADMIN_NO_REPORTS_DESCRIPTION =
    "Prijavljeni komentari iz diskusija će se pojaviti ovde.";
export const COURSE_DISCUSSIONS_ADMIN_STATUS = "Status";
export const COURSE_DISCUSSIONS_ADMIN_REASON = "Razlog";
export const COURSE_DISCUSSIONS_ADMIN_TARGET = "Cilj";
export const COURSE_DISCUSSIONS_ADMIN_REPORTED_BY = "Prijavio";
export const COURSE_DISCUSSIONS_ADMIN_LESSON = "Lekcija";
export const COURSE_DISCUSSIONS_ADMIN_CONTENT = "Sadržaj";
export const COURSE_DISCUSSIONS_ADMIN_AUTHOR = "Autor";
export const COURSE_DISCUSSIONS_ADMIN_DATE = "Datum";
export const COURSE_DISCUSSIONS_ADMIN_FILTER_ALL = "Sve";
export const COURSE_DISCUSSIONS_ADMIN_STATUS_PENDING = "na čekanju";
export const COURSE_DISCUSSIONS_ADMIN_STATUS_ACCEPTED = "prihvaćeno";
export const COURSE_DISCUSSIONS_ADMIN_STATUS_REJECTED = "odbijeno";
export const COURSE_DISCUSSIONS_ADMIN_REJECTION_REASON_DEFAULT =
    "Odbio moderator";
export const COURSE_DISCUSSIONS_ADMIN_REJECTION_DIALOG_TITLE =
    "Unesite razlog odbijanja";
export const COURSE_DISCUSSIONS_ADMIN_REJECTION_DIALOG_DESCRIPTION =
    "Navedite razlog odbijanja ove prijave. Ovo je opciono, ali preporučeno.";
export const COURSE_DISCUSSIONS_ADMIN_REJECTION_DIALOG_LABEL = "Razlog";
export const COURSE_DISCUSSIONS_REPORT_DIALOG_TITLE = "Prijavi objavu";
export const COURSE_DISCUSSIONS_REPORT_DIALOG_TITLE_COMMENT =
    "Prijavi komentar";
export const COURSE_DISCUSSIONS_REPORT_DIALOG_DESCRIPTION =
    "Navedite razlog prijave ove objave.";
export const COURSE_DISCUSSIONS_REPORT_DIALOG_DESCRIPTION_COMMENT =
    "Navedite razlog prijave ovog komentara.";
export const COURSE_DISCUSSIONS_REPORT_DIALOG_PLACEHOLDER = "Razlog prijave...";
export const COURSE_DISCUSSIONS_REPORT_DIALOG_SUBMIT = "Pošalji";
export const COURSE_DISCUSSIONS_REPORT_POST_SUCCESS = "Objava je prijavljena";
export const COURSE_DISCUSSIONS_REPORT_CONTENT_SUCCESS =
    "Sadržaj je prijavljen";
export const COURSE_DISCUSSIONS_EDIT = "Izmeni";
export const COURSE_DISCUSSIONS_EDITED_LABEL = "izmenjeno";
export const COURSE_DISCUSSIONS_SAVE = "Sačuvaj";
export const COURSE_DISCUSSIONS_CANCEL = "Otkaži";
export const REACT_COMPONENT_CRASHED =
    "Došlo je do problema pri prikazivanju sadržaja";
export const CHECKOUT_PAGE_TITLE = "Plaćanje";
export const PAYMENT_MODAL_PAYMENT_DETAILS_HEADER = "Detalji plaćanja";
export const PAYMENT_MODAL_COST_PREFIX = "Cena";
export const PAYMENT_MODAL_PAY_NOW_BUTTON_CAPTION = "Plati sada";
export const PAYMENT_INITIATION_FAILED =
    "Obrada plaćanja nije uspela. Zatvorite ovaj prozor i pokušajte ponovo.";
export const PAYMENT_VERIFICATION_FAILED =
    "Nismo uspeli da potvrdimo Vaše plaćanje. Pokušajte ponovo.";
export const STRIPE_PUBLISHABLE_KEY_EMPTY =
    "Stripe konfiguracija nije ispravna. Kontaktirajte administratora sajta.";
export const CAPTION_TRY_AGAIN = "Pokušaj ponovo";
export const CAPTION_CLOSE = "Zatvori";
export const LOADING = "Učitavanje";
export const WORKING = "Obrada...";
export const BUTTON_NEW_LESSON_TEXT = "Dodaj lekciju";
export const BUTTON_NEW_LESSON_TEXT_DOWNLOAD = "Dodaj fajl";
export const EDIT_LESSON_TEXT = "Izmeni lekciju";
export const BUTTON_LESSON_DOWNLOAD = "Otvori u novom tabu";
export const BUTTON_NEW_GROUP_TEXT = "Nova sekcija";
export const BUTTON_MANAGE_LESSONS_TEXT = "Upravljaj lekcijama";
export const BUTTON_LESSON_VIEW_GO_BACK = "Nazad na detalje kursa";
export const BUTTON_DELETE_LESSON_TEXT = "Obriši";
export const COURSE_SETTINGS_CARD_HEADER = "Podešavanja";
export const DANGER_ZONE_HEADER = "Opasna zona";
export const DANGER_ZONE_DESCRIPTION = "Ova radnja je nepovratna.";
export const DELETE_COURSE_POPUP_HEADER = "Obrisati kurs?";
export const POPUP_OK_ACTION = "Obriši";
export const POPUP_CANCEL_ACTION = "Otkaži";
export const BTN_BACK_TO_CONTENT = "Nazad na sadržaj";
export const LOGIN_SECTION_HEADER = "Prijava";
export const LABEL_GROUP_NAME = "Naziv";
export const LABEL_DRIP_EMAIL_SUBJECT = "Naslov";
export const LABEL_DRIP_DELAY = "Broj dana nakon poslednjeg drip-a";
export const LABEL_DRIP_DATE = "Datum";
export const BTN_LOGIN = "Nastavi";
export const BTN_LOGIN_NO_CODE = "Pošalji ponovo";
export const LOGIN_FORM_LABEL =
    "Unesite Vašu mejl adresu da se prijavite ili kreirate nalog";
export const LOGIN_NO_CODE = "Niste dobili kod?";
export const BTN_LOGIN_GET_CODE = "Pošalji kod";
export const LOGIN_CODE_INTIMATION_MESSAGE =
    "Unesite kod koji smo poslali na vaš email";
export const LOGIN_FORM_DISCLAIMER = "Slanjem prihvatate ";
export const LOGIN_FORM_TERMS_LINK = "Uslove korišćenja";
export const LOGIN_EMAIL_PLACEHOLDER = "Unesite Vašu mejl adresu";
export const LOGIN_CODE_PLACEHOLDER = "Kod";
export const LOGIN_ERROR_SIGNIN_PREFIX = "Trenutno nije moguća prijava:";
export const LOGIN_ERROR_UNEXPECTED =
    "Došlo je do neočekivane greške. Pokušajte ponovo.";
export const LOGIN_ERROR_RECAPTCHA_UNAVAILABLE =
    "reCAPTCHA servis nije dostupan. Pokušajte kasnije.";
export const LOGIN_ERROR_RECAPTCHA_FAILED =
    "reCAPTCHA provera nije uspela. Pokušajte ponovo.";
export const SIGNUP_SECTION_HEADER = "Kreirajte nalog";
export const SIGNUP_SECTION_BUTTON = "Pridruži se";
export const MEDIA_MANAGER_PAGE_HEADING = "Mediji";
export const BUTTON_SEARCH = "Pretraži";
export const BUTTON_ADD_FILE = "Izaberi fajl";
export const FILE_UPLOAD_SUCCESS = "Fajl je otpremljen";
export const HEADER_YOUR_MEDIA = "Vaši mediji";
export const BLOG_POST_SWITCH = "Objava";
export const DOWNLOADABLE_SWITCH = "Za preuzimanje";
export const TYPE_DROPDOWN = "Tip";
export const LESSON_CONTENT_HEADER = "Tekstualni sadržaj";
export const COURSE_CONTENT_HEADER = "Sadržaj";
export const LESSON_CONTENT_EMBED_HEADER = "Link";
export const LESSON_CONTENT_EMBED_PLACEHOLDER = "Link ka YouTube videu itd.";
export const CONTENT_URL_LABEL = "Medijski sadržaj";
export const MEDIA_MANAGER_YOUR_MEDIA_HEADER = "Vaši mediji";
export const DIALOG_SELECT_BUTTON = "Izaberi";
export const LESSON_PREVIEW = "Pregled";
export const LESSON_PREVIEW_TOOLTIP =
    "Ova lekcija će biti besplatno dostupna korisnicima.";
export const LESSON_VISIBILITY = "Vidljivost";
export const LESSON_VISIBILITY_TOOLTIP =
    "Kada nije objavljena, ova lekcija je sakrivena od upisanih polaznika.";
export const DELETE_LESSON_POPUP_HEADER = "Obriši lekciju";
export const APP_MESSAGE_COURSE_DELETED = "Proizvod je obrisan";
export const APP_MESSAGE_LESSON_DELETED = "Lekcija je obrisana";
export const APP_MESSAGE_LESSON_SAVED = "Detalji lekcije su sačuvani";
export const APP_MESSAGE_COURSE_SAVED = "Izmene su sačuvane";
export const ENROLL_IN_THE_COURSE =
    "Morate biti upisani na kurs da biste videli ovu lekciju.";
export const NOT_ENROLLED_HEADER = "Sadržaj je zaključan";
export const USER_ERROR_HEADER = "Ups!";
export const ENROLL_BUTTON_TEXT = "Kupi sada";
export const CHECKOUT_BUTTON_TEXT = "Završi kupovinu";
export const BUTTON_DELETE_MEDIA = "Obriši";
export const DELETE_MEDIA_POPUP_HEADER = "Obrisati ovaj fajl?";
export const HEADER_EDITING_MEDIA = "Izmeni medij";
export const MEDIA_EDITOR_HEADER_EDIT_DETAILS = "Detalji";
export const HEADER_MEDIA_PREVIEW = "Pregled";
export const PREVIEW_PDF_FILE = "Pregledaj u novom tabu";
export const APP_MESSAGE_MEDIA_DELETED = "Medij je obrisan";
export const APP_MESSAGE_MEDIA_UPDATED = "Detalji medija su ažurirani";
export const PAGE_HEADER_ALL_COURSES = "Kursevi";
export const PAGE_HEADER_ALL_POSTS = "Blog";
export const COURSE_TYPE_BLOG = "Blog";
export const BACK_TO_BLOG = "Nazad na sve blogove";
export const COURSE_TYPE_COURSE = "Kurs";
export const COURSE_CREATOR_PREFIX = "Autor";
export const APP_MESSAGE_SETTINGS_SAVED = "Podešavanja su sačuvana";
export const ENROLLED_COURSES_HEADER = "Upisani kursevi";
export const SITE_APIKEYS_SETTING_HEADER = "API ključevi";
export const SITE_MAILS_HEADER = "Emailovi";
export const BROADCASTS = "Broadcast-ovi";
export const SEQUENCES = "Sekvence";
export const TEMPLATES = "Šabloni";
export const SITE_MAILING_ADDRESS_SETTING_HEADER = "Poštanska adresa";
export const SITE_MAILING_ADDRESS_SETTING_EXPLANATION =
    "Ovo je obavezno radi usklađenosti sa CAN-SPAM zakonom.";
export const MAIL_REQUEST_RECEIVED =
    "Vaš zahtev je ažuriran. Javićemo Vam se uskoro.";
export const MAIL_REQUEST_FORM_SUBMIT_INITIAL_REQUEST_TEXT = "Zatraži pristup";
export const MAIL_REQUEST_FORM_SUBMIT_UPDATE_REQUEST_TEXT = "Ažuriraj razlog";
export const SITE_CUSTOMISATIONS_SETTING_HEADER = "Ubacivanje koda";
export const SITE_MISCELLANEOUS_SETTING_HEADER = "Ostalo";
export const ALPHA_LABEL = "Alpha";
export const BETA_LABEL = "Beta";
export const SITE_CUSTOMISATIONS_SETTING_CODEINJECTION_HEAD =
    "Ubacivanje koda u <head>";
export const SITE_CUSTOMISATIONS_SETTING_CODEINJECTION_BODY =
    "Ubacivanje koda u <body>";
export const DISCARD_COURSE_CHANGES_POPUP_HEADER = "Odbaciti izmene na kursu?";
export const FEATURED_SECTION_HEADER = "Istaknuti resursi";
export const CARD_HEADER_PAGE_LAYOUT = "Raspored";
export const CARD_HEADER_THEME = "Teme";
export const CARD_DESCRIPTION_PAGE_LAYOUT =
    "Koristite dugmad '+' da dodate omiljene komponente u željene sekcije stranice.";
export const ADD_COMPONENT_POPUP_HEADER = "Dodaj vidžete";
export const APP_MESSAGE_CHANGES_SAVED = "Izmene su sačuvane";
export const SUBHEADER_COURSES_SECTION =
    "Naučite nove veštine uz naše pažljivo pripremljene kurseve.";
export const SUBHEADER_FEATURED_SECTION = "Ručno odabrani resursi od urednika.";
export const SUBHEADER_THEME_ADD_THEME = "Nova tema";
export const SUBHEADER_THEME_ADDED_THEME = "Instalirane teme";
export const SUBHEADER_THEME_ADD_THEME_INPUT_LABEL = "Uređivač tema";
export const SUBHEADER_THEME_ADD_THEME_INPUT_PLACEHOLDER =
    "Nalepite važeći JSON ovde";
export const BUTTON_GET_THEMES = "Nabavite još tema";
export const BUTTON_THEME_APPLY = "Primeni";
export const BUTTON_THEME_UNINSTALL = "Deinstaliraj";
export const BUTTON_THEME_INSTALL = "Instaliraj";
export const BUTTON_THEME_REMIX = "Remiks";
export const DELETE_THEME_POPUP_HEADER = "Deinstaliraj temu";
export const APPLY_THEME_POPUP_HEADER = "Primeni temu";
export const REMIXED_THEME_PREFIX = "Remiks";
export const APP_MESSAGE_THEME_COPIED = "Tema je spremna za uređivanje";
export const NO_THEMES_INSTALLED = "Nema instaliranih tema";
export const APP_MESSAGE_THEME_INSTALLED = "Tema je instalirana";
export const APP_MESSAGE_THEME_APPLIED = "Tema je primenjena";
export const APP_MESSAGE_THEME_UNINSTALLED = "Tema je deinstalirana";
export const HEADER_SECTION_PAYMENT_CONFIRMATION_WEBHOOK =
    "URL-ovi webhook-a za plaćanje";
export const SUBHEADER_SECTION_PAYMENT_CONFIRMATION_WEBHOOK =
    "Vaš procesor plaćanja šalje obaveštenja o kupovinama. CourseLit-u su potrebna ta obaveštenja da bi tačno prikazao kupovine korisnika. Kopirajte i nalepite ih u podešavanja webhook-a Vašeg procesora plaćanja.";
export const PURCHASE_STATUS_PAGE_HEADER = "Status kupovine";
export const MAIN_MENU_ITEM_DASHBOARD = "Kontrolna tabla";
export const MAIN_MENU_ITEM_PROFILE = "Profil";
export const MAIN_MENU_ITEM_NOTIFICATIONS = "Obaveštenja";
export const LAYOUT_SECTION_MAIN_CONTENT = "Glavni sadržaj";
export const LAYOUT_SECTION_FOOTER_LEFT = "Leva sekcija";
export const LAYOUT_SECTION_FOOTER_RIGHT = "Desna sekcija";
export const LAYOUT_SECTION_TOP = "Vrh";
export const LAYOUT_SECTION_FOOTER = "Podnožje";
export const LAYOUT_SECTION_BOTTOM = "Dno";
export const LAYOUT_SECTION_ASIDE = "Bočna";
export const TRANSACTION_STATUS_SUCCESS = "Plaćanje je primljeno.";
export const TRANSACTION_STATUS_SUCCESS_DETAILS =
    "Hvala Vam. Sada možete otići na kurs i početi sa učenjem.";
export const TRANSACTION_STATUS_INITIATED = "Plaćanje još nije potvrđeno.";
export const TRANSACTION_STATUS_FAILED = "Plaćanje nije uspelo.";
export const TRANSACTION_STATUS_FAILED_DETAILS =
    "Pružalac usluge plaćanja nije mogao da obradi Vaše plaćanje. Vratite se i pokušajte ponovo.";
export const VISIT_COURSE_BUTTON = "Pokreni kurs";
export const VERIFY_PAYMENT_BUTTON = "Ponovo proveri status plaćanja";
export const PURCHASE_ID_HEADER = "ID kupovine";
export const PAGE_HEADER_FEATURED = "Istaknuti sadržaj";
export const BTN_VIEW_ALL = "Prikaži sve";
export const EMPTY_COURSES_LIST_ADMIN =
    "Kreirajte prvi kurs klikom na dugme + u gornjem desnom uglu.";
export const HEADER_RESET_PASSWORD = "Resetuj lozinku";
export const HEADER_DESIGN = "Sajt";
export const HEADER_YOUR_PROFILE = "Vaš profil";
export const PROFILE_PAGE_MESSAGE_NOT_LOGGED_IN = "da vidite svoj profil.";
export const PROFILE_PAGE_HEADER = "Profil";
export const MY_CONTENT_HEADER = "Moj sadržaj";
export const MY_CONTENT_PRODUCTS_TAB = "Proizvodi";
export const MY_CONTENT_FEED_TAB = "Zajednice";
export const MY_CONTENT_EMPTY_PRODUCTS =
    "Još niste upisani ni na jedan proizvod.";
export const MY_CONTENT_EMPTY_COMMUNITIES =
    "Još se niste pridružili nijednoj zajednici.";
export const MY_CONTENT_BROWSE_PRODUCTS = "Pregledaj proizvode";
export const MY_CONTENT_BROWSE_COMMUNITIES = "Pregledaj zajednice";
export const MY_CONTENT_FEED_EMPTY_TITLE =
    "Još nema objava u Vašim zajednicama";
export const MY_CONTENT_FEED_EMPTY_DESCRIPTION =
    "Pridružite se zajednicama i učestvujte u diskusijama da biste ovde videli objave.";
export const MY_CONTENT_FEED_COMMUNITIES_TITLE = "Vaše zajednice";
export const MY_CONTENT_FEED_COMMUNITIES_EMPTY =
    "Još se niste pridružili nijednoj zajednici.";
export const NOTIFICATION_SETTINGS_PAGE_HEADER = "Obaveštenja";
export const NOTIFICATION_SETTINGS_PAGE_DESCRIPTION =
    "Upravljajte načinom primanja obaveštenja za svaku aktivnost.";
export const NOTIFICATION_SETTINGS_RESOURCE_TEXT = "Prilagodi obaveštenja";
export const NOTIFICATION_SETTINGS_COLUMN_ACTIVITY = "Aktivnost";
export const NOTIFICATION_SETTINGS_EMPTY_STATE =
    "Nema dostupnih podešavanja obaveštenja za Vaš nalog.";
export const NOTIFICATION_SETTINGS_GROUP_GENERAL = "Opšte";
export const NOTIFICATION_SETTINGS_GROUP_PRODUCT_MANAGEMENT = "Proizvod";
export const NOTIFICATION_SETTINGS_GROUP_USER_MANAGEMENT = "Korisnik";
export const NOTIFICATION_SETTINGS_GROUP_COMMUNITY_MANAGEMENT = "Zajednica";
export const NOTIFICATIONS_POPOVER_TITLE = "Obaveštenja";
export const NOTIFICATIONS_POPOVER_VIEW = "Prikaži obaveštenja";
export const NOTIFICATIONS_POPOVER_READ_ALL = "Pročitaj sve";
export const NOTIFICATIONS_POPOVER_EMPTY = "Nema novih obaveštenja";
export const NOTIFICATIONS_POPOVER_PREVIOUS = "Prethodna";
export const NOTIFICATIONS_POPOVER_NEXT = "Sledeća";
export const NOTIFICATIONS_POPOVER_PAGE = "Strana";
export const NOTIFICATIONS_POPOVER_OF = "od";
export const NOTIFICATIONS_POPOVER_OPEN_ERROR =
    "Otvaranje obaveštenja nije uspelo";
export const NOTIFICATIONS_POPOVER_QUEUE_WARNING =
    "Nedostaje konfiguracija reda. Obaveštenja u realnom vremenu neće raditi.";
export const PROFILE_EMAIL_PREFERENCES = "Email preferencije";
export const PROFILE_SECTION_DETAILS = "Lični podaci";
export const PROFILE_SECTION_DETAILS_NAME = "Ime";
export const PROFILE_SECTION_DETAILS_EMAIL = "Email";
export const PROFILE_SECTION_DETAILS_BIO = "Bio";
export const PROFILE_SECTION_DISPLAY_PICTURE = "Profilna fotografija";
export const PROFILE_EMAIL_PREFERENCES_NEWSLETTER_OPTION_TEXT =
    "Primaj newsletter i marketinške emailove";
export const BTN_PUBLISH = "Objavi";
export const BTN_UNPUBLISH = "Poništi objavu";
export const PERM_SECTION_HEADER = "Dozvole";
export const USER_BASIC_DETAILS_HEADER = "Osnovni podaci";
export const USER_EMAIL_SUBHEADER = "Email";
export const USER_NAME_SUBHEADER = "Ime";
export const USER_FILTER_CLEAR = "Obriši filtere";
export const USER_FILTER_DROPDOWN_LABEL = "Dodaj filter";
export const USER_FILTER_BTN_LABEL = "Filteri";
export const USER_FILTER_CATEGORY_EMAIL = "Email";
export const USER_FILTER_CATEGORY_PRODUCT = "Proizvod";
export const USER_FILTER_CATEGORY_COMMUNITY = "Zajednica";
export const USER_FILTER_CATEGORY_LAST_ACTIVE = "Poslednja aktivnost";
export const USER_FILTER_CATEGORY_SIGNED_UP = "Registracija";
export const USER_FILTER_CATEGORY_SUBSCRIPTION = "Pretplata";
export const USER_FILTER_CATEGORY_TAGGED = "Oznaka";
export const USER_FILTER_CATEGORY_PERMISSION = "Dozvola";
export const USER_FILTER_EMAIL_IS_EXACTLY = "Tačno je";
export const USER_FILTER_EMAIL_CONTAINS = "Sadrži";
export const USER_FILTER_EMAIL_NOT_CONTAINS = "Ne sadrži";
export const USER_FILTER_PRODUCT_HAS = "Ima";
export const USER_FILTER_PRODUCT_DOES_NOT_HAVE = "Nema";
export const USER_FILTER_COMMUNITY_HAS = "Član je";
export const USER_FILTER_COMMUNITY_DOES_NOT_HAVE = "Nije član";
export const USER_FILTER_APPLY_BTN = "Primeni";
export const USER_FILTER_SAVE = "Sačuvaj novi segment";
export const USER_FILTER_SAVE_DESCRIPTION =
    "Sačuvanim segmentima možete pristupiti iz padajućeg menija Segmenti";
export const USER_SEGMENT_DESCRIPTION =
    "Razdvojite korisnike u različite grupe.";
export const USER_FILTER_LABEL_DEFAULT = "Svi";
export const USER_FILTER_AGGREGATOR_HEADER = "Poklopi";
export const USER_FILTER_AGGREGATOR_ALL = "Sve";
export const USER_FILTER_AGGREGATOR_ANY = "Bilo koje";
export const USER_FILTER_PRODUCT_DROPDOWN_LABEL = "Izaberi proizvod";
export const USER_FILTER_COMMUNITY_DROPDOWN_LABEL = "Izaberi zajednicu";
export const USER_FILTER_TAGGED_DROPDOWN_LABEL = "Izaberi oznaku";
export const USER_FILTER_PERMISSION_DROPDOWN_LABEL = "Izaberi dozvolu";
export const USER_DELETE_SEGMENT = "Obriši segment";
export const USER_DELETE_SEGMENT_DESCRIPTION =
    "Da li ste sigurni da želite da obrišete ";
export const USER_FILTER_NEW_SEGMENT_NAME = "Naziv segmenta";
export const USER_FILTER_SUBSCRIPTION_SUBSCRIBED = "Pretplaćen";
export const USER_FILTER_SUBSCRIPTION_NOT_SUBSCRIBED = "Nije pretplaćen";
export const USER_FILTER_CHIP_TOOLTIP = "Ukloni filter";
export const USER_FILTER_PERMISSION_HAS = "Ima";
export const USER_FILTER_PERMISSION_DOES_NOT_HAVE = "Nema";
export const USER_FILTER_LAST_ACTIVE_BEFORE = "Pre";
export const USER_FILTER_LAST_ACTIVE_AFTER = "Posle";
export const USER_FILTER_LAST_ACTIVE_ON = "Na";
export const USER_FILTER_SIGNED_UP_BEFORE = "Pre";
export const USER_FILTER_SIGNED_UP_AFTER = "Posle";
export const USER_FILTER_SIGNED_UP_ON = "Na";
export const USER_FILTER_DATE_RANGE_DROPDOWN_LABEL = "Izaberi datum";
export const DOCUMENTATION_LINK_LABEL = "Saznajte više";
export const PERM_COURSE_MANAGE = "Upravljaj proizvodima";
export const PERM_COURSE_MANAGE_ANY = "Upravljaj svim proizvodima";
export const PERM_COURSE_PUBLISH = "Objavi sadržaj";
export const PERM_ENROLL_IN_COURSE = "Kupi proizvode";
export const PERM_MEDIA_MANAGE = "Upravljaj fajlovima";
export const PERM_MEDIA_MANAGE_ANY = "Upravljaj svim fajlovima";
export const PERM_SITE = "Upravljaj stranicama";
export const PERM_SETTINGS = "Upravljaj podešavanjima";
export const PERM_USERS = "Upravljaj korisnicima";
export const PERM_MANAGE_COMMUNITY = "Upravljaj zajednicom";
export const MEDIA_EDITOR_ORIGINAL_FILE_NAME_HEADER = "Naziv fajla";
export const GROUP_LESSON_ITEM_UNTITLED = "Bez naslova";
export const SECTION_GROUP_HEADER = "Sekcije";
export const ERROR_SIGNIN_GENERATING_LINK =
    "Greška pri generisanju linka za prijavu. Pokušajte ponovo.";
export const ERROR = "Izgleda da postoji problem!";
export const SIGNIN_SUCCESS_PREFIX = "Link za prijavu je poslat na";
export const ERROR_SIGNIN_VERIFYING_LINK =
    "Nismo uspeli da vas prijavimo. Pokušajte ponovo.";
export const COURSE_STRUCTURE_SELECT_LESSON =
    "Izaberite lekciju iz oblasti Sekcije.";
export const ERROR_GROUP_NEW_LESSON_WITHOUT_SAVE =
    "Prvo sačuvajte podešavanja sekcije";
export const LABEL_GROUP_COLLAPSE = "Prikaži prošireno";
export const SEARCH_TEXTBOX_PLACEHOLDER = "Pretraži";
export const PAGE_TITLE_404 = "Nije pronađeno";
export const MEDIA_PUBLIC = "Javno dostupno";
export const MEDIA_DIRECT_URL = "Direktan URL";
export const MEDIA_URL_COPIED = "Kopirano u clipboard";
export const MEDIA_FILE_TYPE = "Tip fajla";
export const LOGOUT = "Odjava";
export const LOGOUT_MESSAGE = "Da li ste sigurni da želite da se odjavite?";
export const USER_TABLE_HEADER_NAME = "Detalji";
export const USER_TABLE_HEADER_STATUS = "Status";
export const USER_TABLE_HEADER_PRODUCTS = "Proizvodi";
export const USER_TABLE_HEADER_COMMUNITIES = "Zajednice";
export const USER_TABLE_HEADER_JOINED = "Pridružen";
export const USER_TABLE_HEADER_LAST_ACTIVE = "Poslednja prijava";
export const USER_TABLE_HEADER_EMAIL = "Email";
export const USER_TABLE_HEADER_NAME_NAME = "Ime";
export const USER_SEGMENT_DROPDOWN_LABEL = "Segmenti";
export const USER_TYPE_TOOLTIP =
    "Razvrstajte korisnike prema ulogama. Publika su korisnici koji mogu da se upišu na kurseve. Tim su korisnici sa administratorskim pravima.";
export const DIALOG_DONE_BUTTON = "Gotovo";
export const DIALOG_EDIT_WIDGET_PREFIX = "Izmeni";
export const PRODUCTS_TABLE_HEADER_NAME = "Naslov";
export const PRODUCTS_TABLE_HEADER_TYPE = "Tip";
export const PRODUCTS_TABLE_HEADER_STATUS = "Status";
export const PRODUCTS_TABLE_HEADER_STUDENTS = "Polaznici";
export const PRODUCTS_TABLE_HEADER_SALES = "Prodaja";
export const PRODUCTS_TABLE_HEADER_ACTIONS = "Akcije";
export const PRODUCT_STATUS_DRAFT = "Nacrt";
export const PRODUCT_STATUS_PUBLISHED = "Objavljeno";
export const PRODUCT_TABLE_CONTEXT_MENU_DELETE_PRODUCT = "Obriši";
export const PRODUCT_TABLE_CONTEXT_MENU_EDIT_PAGE = "Izmeni stranicu";
export const PRODUCT_TABLE_CONTEXT_MENU_INVITE_A_CUSTOMER = "Pozovi kupca";
export const BTN_INVITE = "Pozovi";
export const BTN_GO_BACK = "Nazad";
export const BTN_NEW_PRODUCT = "Novi proizvod";
export const BTN_NEW_PAGE = "Nova stranica";
export const PAGE_HEADER_NEW_PRODUCT = "Novi proizvod";
export const FORM_NEW_PRODUCT_TITLE = "Naslov";
export const FORM_NEW_PRODUCT_TYPE = "Tip proizvoda";
export const FORM_NEW_PRODUCT_TITLE_PLC = "npr. 'Photoshop za početnike'";
export const FORM_NEW_PRODUCT_SELECT = "Tip proizvoda";
export const BTN_CONTINUE = "Nastavi";
export const DELETE_PRODUCT_POPUP_HEADER = "Obriši proizvod";
export const DELETE_PRODUCT_POPUP_TEXT =
    "Ovo je nepovratna radnja i svi podaci i analitika vezani za ovaj proizvod biće obrisani.";
export const FORM_NEW_PRODUCT_MENU_COURSE_SUBTITLE =
    "Interaktivni kurs koji se sastoji od slika, videa, teksta i više.";
export const FORM_NEW_PRODUCT_MENU_DOWNLOADS_SUBTITLE =
    "ZIP fajl koji sadrži slike, video, tekst i više.";
export const NEW_SECTION_HEADER = "Nova sekcija";
export const EDIT_SECTION_DRIP = "Drip";
export const DRIP_SECTION_STATUS = "Omogući drip";
export const EDIT_SECTION_HEADER = "Izmeni sekciju";
export const DELETE_SECTION_HEADER = "Obriši sekciju";
export const BUTTON_MOVE_SECTION_UP = "Pomeri sekciju nagore";
export const BUTTON_MOVE_SECTION_DOWN = "Pomeri sekciju nadole";
export const PRICING_HEADER = "Cene";
export const PRICING_DROPDOWN = "Model cena";
export const PRICING_FREE = Constants.ProductPriceType.FREE;
export const PRICING_FREE_SUBTITLE =
    "Ljudi mogu pristupiti sadržaju besplatno. Korisnik mora biti prijavljen.";
export const PRICING_EMAIL = Constants.ProductPriceType.EMAIL;
export const PRICING_EMAIL_LABEL = "Besplatna isporuka emailom";
export const PRICING_EMAIL_SUBTITLE =
    "Sadržaj će biti poslat emailom. Korisnik ne mora biti prijavljen.";
export const PRICING_PAID = Constants.ProductPriceType.PAID;
export const PRICING_PAID_LABEL = "Plaćeno";
export const PRICING_FREE_LABEL = "Besplatno";
export const PAYMENT_PLAN_FREE_LABEL = "Besplatno";
export const PAYMENT_PLAN_ONETIME_LABEL = "Jednokratno";
export const PAYMENT_PLAN_SUBSCRIPTION_LABEL = "Pretplata";
export const PAYMENT_PLAN_EMI_LABEL = "EMI";
export const PAYMENT_PLAN_NEW_LABEL = "Novi plan";
export const PAYMENT_PLAN_FREQUENCY_LABEL = "Učestalost plaćanja";
export const PAYMENT_PLAN_MONTHLY_LABEL = "Mesečno";
export const PAYMENT_PLAN_YEARLY_LABEL = "Godišnje";
export const PAYMENT_PLAN_MAKE_RECOMMENDED = "Postavi kao preporučeni";
export const PAYMENT_PLAN_ARCHIVE = "Arhiviraj plan";
export const PAYMENT_PLAN_ARCHIVE_TITLE =
    "Da li ste sigurni da želite da arhivirate ovaj plan?";
export const PAYMENT_PLAN_ARCHIVE_DESCRIPTION =
    "Ova radnja se ne može opozvati. Plan plaćanja će biti trajno arhiviran.";
export const PAYMENT_PLAN_ARCHIVE_ACTION = "Arhiviraj";
export const PAYMENT_PLAN_INCLUDED_PRODUCTS_SUFFIX = "proizvoda";
export const PRICING_PAID_SUBTITLE =
    "Ljudi mogu pristupiti sadržaju nakon jednokratnog plaćanja. Korisnik mora biti prijavljen.";
export const PRICING_PAID_NO_PAYMENT_METHOD =
    "Podesite način plaćanja u Podešavanjima da biste omogućili ovu opciju.";
export const PUBLISH_TAB_STATUS_TITLE = "Status";
export const PUBLISH_TAB_STATUS_SUBTITLE = "Učinite kurs javnim ili privatnim.";
export const PUBLISH_TAB_VISIBILITY_TITLE = "Vidljivost";
export const PUBLISH_TAB_VISIBILITY_SUBTITLE =
    "Proizvod ostaje sakriven i može se pristupiti samo direktnim URL-om.";
export const PAGE_TITLE_EDIT_PAGE = "Izmeni";
export const PAGE_TITLE_VIEW_PAGE = "Prikaži";
export const PAGE_HEADER_EDIT_PAGE = "Izmeni stranicu";
export const EDIT_PAGE_MENU_ITEM = "Izmeni stranicu";
export const VIEW_PAGE_MENU_ITEM = "Prikaži stranicu";
export const PREVIEW_COURSE_MENU_ITEM = "Pregled";
export const EDIT_PAGE_BUTTON_UPDATE = "Objavi";
export const EDIT_PAGE_BUTTON_VIEW = "Prikaži";
export const EDIT_PAGE_BUTTON_DONE = "Izađi";
export const EDIT_PAGE_ADD_WIDGET_TITLE = "Novi blok";
export const EDIT_PAGE_WIDGET_LIST_HEADER = "Blokovi stranice";
export const THEMES_TABLE_HEADER_NAME = "Naziv";
export const ACCOUNT_PROGRESS_SUFFIX = "% završeno";
export const CHECKOUT_PAGE_TOTAL = "Ukupno";
export const COURSE_PROGRESS_PREV = "Prethodno";
export const COURSE_PROGRESS_INTRO = "Uvod";
export const COURSE_PROGRESS_NEXT = "Završi i nastavi";
export const COURSE_PROGRESS_START = "Počni";
export const COURSE_PROGRESS_FINISH = "Završi i kompletiraj";
export const COURSE_PROGRESS_MARK_COMPLETED = "Označi kao završeno";
export const COURSE_PROGRESS_COMPLETED = "Završeno";
export const BTN_NEW_BLOG = "Novi blog";
export const MANAGE_BLOG_PAGE_HEADING = "Blogovi";
export const BLOG_TABLE_HEADER_NAME = "Naslov";
export const PAGE_HEADER_NEW_BLOG = "Novi blog";
export const MENU_BLOG_VISIT = "Poseti blog";
export const ACCOUNT_NO_PURCHASE_PLACEHOLDER =
    "Vaši upisani kursevi će se pojaviti ovde.";
export const EXPORT_CSV = "Izvezi u CSV";
export const GENERIC_FAILURE_MESSAGE = "To nije uspelo. Pokušajte ponovo.";
export const LESSON_QUIZ_ADD_QUESTION = "Dodaj pitanje";
export const LESSON_QUIZ_ADD_OPTION_BTN = "Dodaj opciju";
export const LESSON_QUIZ_CONTENT_HEADER = "Pitanje";
export const LESSON_QUIZ_OPTIONS_HEADER = "Opcije";
export const LESSON_QUIZ_QUESTION_PLACEHOLDER = "Unesite pitanje ovde";
export const LESSON_QUIZ_OPTION_PLACEHOLDER = "Unesite opciju ovde";
export const QUESTION_BUILDER_CORRECT_ANS_TOOLTIP = "Označi kao tačan odgovor";
export const QUESTION_BUILDER_EXPAND_TOOLTIP = "Proširi";
export const QUESTION_BUILDER_COLLAPSE_TOOLTIP = "Skupi";
export const LESSON_QUIZ_GRADED_TEXT = "Ovaj kviz zahteva prolaznu ocenu";
export const QUIZ_VIEWER_EVALUATE_BTN = "Pošalji";
export const QUIZ_VIEWER_EVALUATE_BTN_LOADING = "Provera...";
export const QUIZ_SCORE_PREFIX_MESSAGE = "Ostvarili ste";
export const COURSE_STUDENT_REPORT_HEADER = "Polaznici";
export const COURSE_STUDENT_TABLE_HEADER_PROGRESS = "Napredak";
export const COURSE_STUDENT_TABLE_HEADER_DOWNLOAD = "Preuzeto";
export const COURSE_STUDENT_TABLE_HEADER_SIGNED_UP_ON = "Upisan";
export const COURSE_STUDENT_TABLE_HEADER_LAST_ACCESSED_ON = "Poslednji pristup";
export const COURSE_STUDENT_SEARCH_BY_TEXT = "Pretraži polaznika";
export const COURSE_STUDENT_NO_RECORDS = "Nije pronađen nijedan polaznik";
export const QUESTION_BUILDER_DELETE_TOOLTIP = "Obriši pitanje";
export const PAGE_HEADER_EDIT_MAIL = "Sastavi email";
export const PAGE_HEADER_EDIT_TEMPLATE = "Šablon";
export const PAGE_HEADER_MANAGE = "Upravljaj";
export const PAGE_HEADER_EDIT_SEQUENCE = "Detalji sekvence";
export const BTN_SEND = "Pošalji";
export const DIALOG_SEND_HEADER = "Pošalji email";
export const BTN_SCHEDULE = "Zakaži";
export const ERROR_SUBJECT_EMPTY = "Naslov ne može biti prazan";
export const ERROR_DELAY_EMPTY = "Zakazani datum nije u budućnosti";
export const FORM_MAIL_SCHEDULE_TIME_LABEL = "Pošalji";
export const BTN_SENDING = "Slanje";
export const MAIL_SUBJECT_PLACEHOLDER = "Naslov";
export const MAIL_PREVIEW_TITLE = "Tekst pregleda";
export const COMPOSE_SEQUENCE_FORM_TITLE = "Naziv sekvence";
export const COMPOSE_SEQUENCE_ENTRANCE_CONDITION_DATA = "Podaci uslova ulaska";
export const COMPOSE_SEQUENCE_FORM_FROM = "Od";
export const COMPOSE_SEQUENCE_FROM_PLC = "John Wick";
export const COMPOSE_SEQUENCE_ENTRANCE_CONDITION = "Uslov ulaska";
export const COMPOSE_SEQUENCE_EDIT_DELAY = "Kašnjenje";
export const MAIL_TO_PLACEHOLDER = "Za";
export const MAIL_BODY_PLACEHOLDER = "Sadržaj emaila";
export const PAGE_HEADER_ALL_MAILS = "Emailovi";
export const SIDEBAR_MENU_MAILS = "Emailovi";
export const SIDEBAR_MENU_USERS = "Korisnici";
export const SIDEBAR_MENU_SETTINGS = "Podešavanja";
export const SIDEBAR_MENU_PAGES = "Stranice";
export const SIDEBAR_MENU_PRODUCTS = "Proizvodi";
export const SIDEBAR_MENU_DASHBOARD = "Početna";
export const SIDEBAR_MENU_BLOGS = "Blogovi";
export const PAGE_HEADER_EDIT_USER = "Izmeni korisnika";
export const PAGE_HEADER_ALL_USER = "Svi korisnici";
export const TOAST_MAIL_SENT = "Email je zakazan za slanje";
export const PAGE_PLACEHOLDER_MAIL = "Vaši emailovi će se pojaviti ovde";
export const BTN_NEW_MAIL = "Novi broadcast";
export const BTN_NEW_SEQUENCE = "Nova sekvenca";
export const BTN_NEW_TEMPLATE = "Novi šablon";
export const PAGE_HEADER_CHOOSE_TEMPLATE = "Izaberite šablon";
export const BTN_EDIT_TEMPLATE = "Izmeni šablon";
export const BTN_DELETE_TEMPLATE = "Obriši šablon";
export const TEMPLATE_NAME_LABEL = "Naziv šablona";
export const TEMPLATE_NAME_PLACEHOLDER = "Neimenovani šablon";
export const TEMPLATE_SETTINGS_DESCRIPTION =
    "Ažurirajte naziv šablona ovde. Koristite pregled ispod da otvorite uređivač kada želite da promenite sadržaj.";
export const TEMPLATE_MANAGE_DESCRIPTION = "Upravljajte podešavanjima šablona";
export const TEMPLATE_PREVIEW_HEADER = "Pregled šablona";
export const TEMPLATE_PREVIEW_DESCRIPTION =
    "Pregledajte sadržaj šablona i otvorite uređivač kada želite da napravite izmene.";
export const MAIL_TEMPLATE_CHOOSER_HEADING = "Izaberite šablon";
export const MAIL_TEMPLATE_CHOOSER_DESCRIPTION =
    "Počnite od uglađenog rasporeda i prilagodite ga u uređivaču.";
export const MAIL_TEMPLATE_CHOOSER_SYSTEM_SECTION = "Sistem";
export const MAIL_TEMPLATE_CHOOSER_SYSTEM_DESCRIPTION =
    "Ugrađeni početni šabloni za uobičajene stilove i namene emailova.";
export const MAIL_TEMPLATE_CHOOSER_CUSTOM_SECTION = "Moji šabloni";
export const MAIL_TEMPLATE_CHOOSER_CUSTOM_DESCRIPTION =
    "Vaši sačuvani šabloni, spremni za ponovnu upotrebu.";
export const TEMPLATES_EMPTY_STATE_TITLE = "Još nema šablona";
export const TEMPLATES_EMPTY_STATE_DESCRIPTION =
    "Počnite od sistemskog šablona i prilagodite ga da izgradite sopstvenu biblioteku za ponovnu upotrebu.";
export const TEMPLATES_EMPTY_STATE_CTA = "Kreiraj iz šablona";
export const TEMPLATE_CHOOSER_CUSTOM_EMPTY_STATE_TITLE =
    "Još nema sačuvanih šablona";
export const TEMPLATE_CHOOSER_CUSTOM_EMPTY_STATE_DESCRIPTION =
    "Kreirajte jedan iz sistemskog šablona iznad i pojaviće se ovde za ponovnu upotrebu.";
export const MAIL_TEMPLATE_CHOOSER_BADGE_SYSTEM = "Početni";
export const MAIL_TEMPLATE_CHOOSER_BADGE_CUSTOM = "Prilagođeni";
export const DELETE_TEMPLATE_DIALOG_HEADER = "Obriši šablon";
export const DELETE_TEMPLATE_DIALOG_DESCRIPTION =
    "Ovo će trajno obrisati šablon. Ova radnja se ne može opozvati.";
export const TOAST_TEMPLATE_SAVED = "Šablon je ažuriran";
export const TOAST_TEMPLATE_DELETED = "Šablon je obrisan";
export const MAIL_TABLE_HEADER_SUBJECT = "Naslov";
export const MAIL_TABLE_HEADER_TITLE = "Naslov";
export const MAIL_TABLE_HEADER_RECEPIENTS = "Broj primalaca";
export const MAIL_SENDER_YOU = "Vi";
export const MAIL_TABLE_HEADER_SENDER = "Pošiljalac";
export const MAIL_TABLE_HEADER_STATUS = "Status";
export const MAIL_TABLE_HEADER_ENTRANTS = "Pretplatnici";
export const MAIL_TABLE_HEADER_SENT_ON = "Poslato";
export const TOOLTIP_USER_PAGE_SEND_MAIL = "Pošalji email trenutnoj selekciji";
export const EDIT_PAGE_BUTTON_FONTS = "Fontovi";
export const EDIT_PAGE_BUTTON_THEME = "Tema";
export const EDIT_PAGE_BUTTON_SEO = "SEO";
export const SEO_FORM_NAME_LABEL = "Naslov";
export const SEO_FORM_DESC_LABEL = "Opis";
export const SEO_FORM_ROBOTS_LABEL = "Vidljivost u pretraživačima";
export const SEO_FORM_SOCIAL_IMAGE_LABEL = "Slika za društvene mreže";
export const SEO_FORM_SOCIAL_IMAGE_TOOLTIP =
    "Prilikom deljenja ove stranice na društvenim mrežama kao što su Twitter ili Facebook, koristiće se ova slika.";
export const EDIT_PAGE_SEO_HEADER = "SEO";
export const EDIT_PAGE_HEADER_ALL_PAGES = "Stranice";
export const LOGIN_SECTION_EMAIL_INVALID = "Neispravan email";
export const COMPONENT_MISSING_SUFFIX = "komponenta nije pronađena.";
export const LESSON_GROUP_DELETED = "Sekcija je obrisana";
export const USER_PERMISSION_AREA_SUBTEXT =
    "Kontrolišite koje radnje ovaj korisnik može da izvrši u Vašoj školi.";
export const APIKEY_NEW_BUTTON = "Novi API ključ";
export const ADD_SSO_PROVIDER_BUTTON = "Novi provajder";
export const APIKEY_EXISTING_HEADER = "API ključevi";
export const APIKEY_CARD_DESCRIPTION =
    "Pomoću API ključeva možete da komunicirate sa CourseLit API-jem i gradite prilagođene integracije";
export const SSO_CARD_DESCRIPTION =
    "Omogućite postojećim korisnicima da se prijave u Vašu školu";
export const SINGLE_SIGN_ON_HEADER = "Jedinstvena prijava (SSO)";
export const LOGIN_METHODS_HEADER = "Provajderi prijave";
export const LOGIN_METHODS_CARD_DESCRIPTION =
    "Kontrolišite kako korisnici pristupaju školi";
export const LOGIN_PROVIDER_EMAIL_LABEL = "Email";
export const LOGIN_PROVIDER_GOOGLE_LABEL = "Google";
export const LOGIN_PROVIDER_SSO_LABEL = "SAML SSO";
export const LOGIN_PROVIDER_GOOGLE_BUTTON = "Nastavi sa Google nalogom";
export const LOGIN_PROVIDER_SSO_BUTTON = "Nastavi sa SSO";
export const APIKEY_EXISTING_TABLE_HEADER_CREATED = "Kreirano";
export const APIKEY_EXISTING_TABLE_HEADER_NAME = "Naziv";
export const APIKEY_NEW_HEADER = "Novi API ključ";
export const SSO_PROVIDER_HEADER = "SSO provajder";
export const SSO_PROVIDER_CARD_HEADER = "IDP konfiguracija";
export const SSO_PROVIDER_CARD_DESCRIPTION =
    "Unesite vrednosti iz Vašeg IDP-a (Okta, Azure AD, OneLogin itd.)";
export const SSO_PROVIDER_SP_EMTPY =
    "Unesite IDP podešavanja da biste videli ova podešavanja";
export const SSO_PROVIDER_SP_ACS_LABEL = "SAML ACS URL";
export const SSO_PROVIDER_SP_ENTITY_ID_LABEL = "Audience URI (SP Entity ID)";
export const APIKEY_NEW_LABEL = "Naziv";
export const SSO_PROVIDER_DOMAIN_LABEL = "Domen";
export const SSO_PROVIDER_ENTRY_POINT_LABEL = "Ulazna tačka";
export const SSO_PROVIDER_CERT_LABEL = "Sertifikat";
export const SSO_PROVIDER_CALLBACK_URL_LABEL = "Callback URL";
export const SSO_PROVIDER_IDP_METADATA_LABEL = "IDP metapodaci";
export const SSO_PROVIDER_PROVIDER_ID_LABEL = "ID provajdera";
export const SSO_PROVIDER_SUCCESS_MESSAGE = "SSO provajder je uspešno dodat";
export const GOOGLE_PROVIDER_HEADER = "Google";
export const GOOGLE_PROVIDER_CARD_HEADER = "Konfiguracija Google aplikacije";
export const GOOGLE_PROVIDER_CARD_DESCRIPTION =
    "Unesite vrednosti iz Vaše Google Cloud OAuth aplikacije";
export const GOOGLE_PROVIDER_SETTINGS_HEADER = "Podešavanja škole";
export const GOOGLE_PROVIDER_SETTINGS_DESCRIPTION =
    "Koristite ove vrednosti prilikom konfigurisanja Google OAuth aplikacije";
export const GOOGLE_PROVIDER_CLIENT_ID_LABEL = "Client ID";
export const GOOGLE_PROVIDER_CLIENT_SECRET_LABEL = "Client secret";
export const GOOGLE_PROVIDER_REDIRECT_URI_LABEL = "Autorizovani redirect URI";
export const GOOGLE_PROVIDER_ORIGIN_LABEL = "Autorizovano JavaScript poreklo";
export const GOOGLE_PROVIDER_SUCCESS_MESSAGE =
    "Google provajder je uspešno sačuvan";
export const GOOGLE_PROVIDER_REMOVE_DIALOG_HEADER = "Ukloni Google provajdera";
export const GOOGLE_PROVIDER_SECRET_HELPER =
    "Ostavite prazno da zadržite trenutni client secret.";
export const GOOGLE_PROVIDER_SECRET_SAVED = "Client secret je već sačuvan.";
export const URL_COPIED_TO_CLIPBOARD = "URL je kopiran u clipboard";
export const PROVIDER_RESET_SUCCESS_MESSAGE = "Provajder je uspešno resetovan";
export const APIKEY_NEW_BTN_CAPTION = "Kreiraj";
export const APIKEY_NEW_GENERATED_KEY_HEADER = "Vaš novi API ključ";
export const APIKEY_NEW_GENERATED_KEY_DESC =
    "Kopirajte ga i čuvajte na bezbednom mestu. Nećete moći ponovo da ga vidite.";
export const APIKEY_NEW_GENERATED_KEY_COPIED = "Kopirano u clipboard";
export const APIKEY_REMOVE_BTN = "Ukloni";
export const SSO_PROVIDER_REMOVE_BTN = "Ukloni";
export const APIKEY_REMOVE_DIALOG_HEADER = "Ukloni API ključ";
export const SSO_PROVIDER_REMOVE_DIALOG_HEADER = "Ukloni SSO provajdera";
export const SSO_PROVIDER_REMOVE_DIALOG_DESC =
    "Da li ste sigurni da želite da uklonite ovog provajdera?";
export const APIKEY_REMOVE_DIALOG_DESC =
    "Ako koristite ovaj ključ u aplikaciji, uklanjanje će pokvariti integraciju. Nema povratka ako ga uklonite.";
export const USER_TAGS_SUBHEADER = "Oznake";
export const BTN_DELETE_USER = "Obriši korisnika";
export const USER_DELETE_DIALOG_TITLE = "Obrisati korisnika?";
export const USER_DELETE_DIALOG_DESCRIPTION =
    "Ova radnja je nepovratna. Proizvodi i zajednice u vlasništvu ovog korisnika biće preneti na Vas, a ostali podaci biće obrisani.";
export const USER_DELETE_DIALOG_MIGRATION_HEADING =
    "Šta će biti prebačeno na Vaš nalog";
export const USER_DELETE_DIALOG_MIGRATION_ITEM_PRODUCTS =
    "Proizvodi, lekcije i stranice koje je kreirao ovaj korisnik biće dodeljeni Vama.";
export const USER_DELETE_DIALOG_MIGRATION_ITEM_EMAIL =
    "Email šabloni, sekvence i isporuke koje je kreirao ovaj korisnik biće dodeljeni Vama.";
export const USER_DELETE_DIALOG_MIGRATION_ITEM_AUDIENCE =
    "Sredstva publike kao što su segmenti, teme, planovi plaćanja i tekuće sekvence biće dodeljeni Vama.";
export const USER_DELETE_DIALOG_MIGRATION_ITEM_COMMUNITY =
    "Uloge moderatora zajednice i stranice zajednice kojima upravlja ovaj korisnik biće dodeljene Vama.";
export const USER_DELETE_DIALOG_DELETION_HEADING = "Šta će biti obrisano";
export const USER_DELETE_DIALOG_DELETION_ITEM_COMMUNICATION =
    "Obaveštenja, statusi emailova, ocene lekcija, linkovi za preuzimanje, sertifikati i evidencije aktivnosti.";
export const USER_DELETE_DIALOG_DELETION_ITEM_COMMUNITY =
    "Objave, komentari, odgovori, pretplate, prijave i povezani lajkovi u zajednici. Lajkovi, pretplate i prijave diskusija proizvoda (pisani komentari i odgovori biće anonimizovani).";
export const USER_DELETE_DIALOG_DELETION_ITEM_COMMERCE =
    "Članstva, fakture, upisi na kurseve i unosi marketinških sekvenci.";
export const USER_DELETE_DIALOG_DELETION_ITEM_ACCOUNT =
    "Avatar medij i nalog korisnika.";
export const USER_DELETE_CONFIRMATION_LABEL = 'Ukucajte "delete" da potvrdite';
export const USER_DELETE_CONFIRMATION_PLACEHOLDER =
    "Ukucajte 'delete' da potvrdite";
export const USER_DELETE_CONFIRMATION_TOKEN = "delete";
export const USER_DELETE_ACTION_LOADING = "Brisanje...";
export const APP_MESSAGE_USER_DELETED = "Korisnik je obrisan";
export const APP_MESSAGE_USER_UPDATED = "Podaci korisnika su sačuvani";
export const USER_DETAILS_SAVE_BUTTON = "Sačuvaj izmene";
export const USER_DETAILS_SAVE_BUTTON_LOADING = "Čuvanje...";
export const USER_NAME_PLACEHOLDER = "Unesite puno ime";
export const USER_EMAIL_PLACEHOLDER = "Unesite email adresu";
export const PAGES_TABLE_HEADER_NAME = "Naziv";
export const PAGES_TABLE_HEADER_ACTIONS = "Akcije";
export const NEW_PAGE_NAME_PLC = "Moja sjajna stranica";
export const NEW_PAGE_URL_LABEL = "URL";
export const NEW_PAGE_URL_PLC = "moja-sjajna-stranica";
export const DELETE_PAGE_POPUP_HEADER = "Obrisati stranicu?";
export const DELETE_PAGE_POPUP_TEXT =
    "Ovo je nepovratna radnja i svi podaci vezani za ovu stranicu biće obrisani.";
export const PAGE_TABLE_CONTEXT_MENU_DELETE = "Obriši";
export const APP_MESSAGE_PAGE_DELETED = "Stranica je obrisana";
export const APP_MESSAGE_MAIL_DELETED = "Email je obrisan";
export const NEW_PAGE_FORM_WARNING =
    "Ova podešavanja se kasnije ne mogu promeniti, pa nastavite sa oprezom.";
export const DASHBOARD_PAGE_HEADER = "Dobrodošli";
export const UNNAMED_USER = "Stranac";
export const MAIL_REQUEST_FORM_REASON_FIELD = "Razlog";
export const MAIL_REQUEST_FORM_REASON_PLACEHOLDER =
    "Budite što detaljniji. To će nam pomoći da bolje pregledamo Vašu prijavu.";
export const DASHBOARD_SELECT_HEADER = "Period";
export const DELETE_EMAIL_MENU = "Obriši";
export const DELETE_EMAIL_DIALOG_HEADER = "Obriši email";
export const OVERVIEW_HEADER = "Pregled";
export const HELP_HEADER = "Pomoć";
export const COMMUNITY_HEADER = "Zajednica";
export const COMMUNITY_MEMBERSHIP_LIST_HEADER = "Članstva";
export const COMMUNITY_REPORTS_HEADER = "Prijavljeni sadržaj";
export const COMMUNITY_REPORTS_SUBHEADER =
    "Pregledajte i upravljajte prijavljenim sadržajem u Vašoj zajednici";
export const COMMUNITY_MEMBERSHIP_LIST_SUBHEADER =
    "Pregledajte i upravljajte članstvima u Vašoj zajednici";
export const SITE_SETTINGS_SECTION_COMMUNITIES = "Zajednice";
export const NEW_COMMUNITY_BUTTON = "Nova zajednica";
export const COMMUNITY_FIELD_NAME = "Naziv zajednice";
export const COMMUNITY_NEW_BTN_CAPTION = "Kreiraj";
export const COMMUNITY_SETTINGS = "Upravljaj";
export const COMMUNITY_MANAGE_SUBHEADER =
    "Upravljajte podešavanjima Vaše zajednice.";
export const COMMUNITY_MANAGE_EDIT_PAGE = "Izmeni stranicu";
export const COMMUNITY_MANAGE_NAME_LABEL = "Naziv";
export const COMMUNITY_MANAGE_NAME_PLACEHOLDER = "Naziv zajednice";
export const COMMUNITY_MANAGE_SLUG_LABEL = "Slug";
export const COMMUNITY_MANAGE_SLUG_DESCRIPTION =
    "URL identifikator za stranicu ove zajednice.";
export const COMMUNITY_MANAGE_DESCRIPTION_LABEL = "Opis";
export const COMMUNITY_MANAGE_ENABLED_LABEL = "Zajednica omogućena";
export const COMMUNITY_MANAGE_ENABLED_DESCRIPTION =
    "Dozvolite korisnicima da se pridruže Vašoj zajednici";
export const COMMUNITY_MANAGE_AUTO_ACCEPT_LABEL = "Automatski prihvati članove";
export const COMMUNITY_MANAGE_AUTO_ACCEPT_DESCRIPTION =
    "Automatski prihvati nove članove";
export const COMMUNITY_MANAGE_JOINING_REASON_LABEL =
    "Tekst za razlog pridruživanja";
export const COMMUNITY_MANAGE_JOINING_REASON_PLACEHOLDER =
    "Tekst koji se prikazuje kada korisnici zatraže pristup besplatnoj zajednici";
export const COMMUNITY_MANAGE_SAVE = "Sačuvaj izmene";
export const COMMUNITY_MANAGE_FEATURED_IMAGE_LABEL = "Istaknuta slika";
export const COMMUNITY_MANAGE_FEATURED_IMAGE_DESCRIPTION =
    "Hero slika Vaše zajednice";
export const COMMUNITY_MANAGE_CATEGORIES_LABEL = "Kategorije";
export const COMMUNITY_MANAGE_CATEGORIES_DESCRIPTION =
    "Dodajte i upravljajte kategorijama zajednice";
export const COMMUNITY_MANAGE_CATEGORY_PLACEHOLDER = "Unesite naziv kategorije";
export const COMMUNITY_MANAGE_CATEGORY_ADD = "Dodaj kategoriju";
export const COMMUNITY_MANAGE_CATEGORY_REMOVE = "Ukloni kategoriju";
export const COMMUNITY_MANAGE_CATEGORY_ADDED_TITLE = "Kategorija dodata";
export const COMMUNITY_MANAGE_CATEGORY_ADDED_DESCRIPTION =
    "Kategorija je uspešno dodata.";
export const COMMUNITY_MANAGE_CATEGORY_DELETED_TITLE = "Kategorija obrisana";
export const COMMUNITY_MANAGE_CATEGORY_DELETED_DESCRIPTION =
    "Kategorija je uklonjena i objave su migrirane.";
export const COMMUNITY_MANAGE_CATEGORY_DELETE_TITLE = "Obriši kategoriju";
export const COMMUNITY_MANAGE_CATEGORY_DELETE_DESCRIPTION =
    "Izaberite kategoriju u koju ćete migrirati objave pre brisanja.";
export const COMMUNITY_MANAGE_CATEGORY_SELECT = "Izaberite kategoriju";
export const COMMUNITY_MANAGE_CATEGORY_DELETE_MIGRATE =
    "Obriši i migriraj postojeći sadržaj u";
export const COMMUNITY_MANAGE_CATEGORY_NONE = "Nijedna";
export const COMMUNITY_MANAGE_PRICING_LABEL = "Cene";
export const COMMUNITY_MANAGE_PRICING_DESCRIPTION =
    "Upravljajte planovima plaćanja za zajednicu";
export const COMMUNITY_MANAGE_DELETE_BUTTON = "Obriši zajednicu";
export const COMMUNITY_MANAGE_DELETE_TITLE = "Da li ste apsolutno sigurni?";
export const COMMUNITY_MANAGE_DELETE_DESCRIPTION =
    "Ova radnja je nepovratna. Svi podaci zajednice biće trajno obrisani.";
export const COMMUNITY_MANAGE_DELETE_CONFIRM_LABEL =
    'Ukucajte "obrisi" da potvrdite';
export const COMMUNITY_MANAGE_DELETE_CONFIRM_PLACEHOLDER =
    "Ukucajte 'obrisi' da potvrdite";
export const COMMUNITY_MANAGE_DELETE_CONFIRM_KEYWORD = "obrisi";
export const COMMUNITY_MANAGE_DELETE_LOADING = "Brisanje...";
export const COMMUNITY_MANAGE_DELETE_ACTION = "Obriši";
export const COMMUNITY_MANAGE_DELETED_SUCCESS = "Zajednica je uspešno obrisana";
export const COMMUNITY_MEMBERSHIP_FILTER_STATUS = "Filtriraj po statusu";
export const COMMUNITY_MEMBERSHIP_FILTER_ALL = "Sve";
export const COMMUNITY_MEMBERSHIP_COL_USER = "Korisnik";
export const COMMUNITY_MEMBERSHIP_COL_STATUS = "Status";
export const COMMUNITY_MEMBERSHIP_COL_ROLE = "Uloga";
export const COMMUNITY_MEMBERSHIP_COL_JOINING_REASON = "Razlog pridruživanja";
export const COMMUNITY_MEMBERSHIP_COL_REJECTION_REASON = "Razlog odbijanja";
export const COMMUNITY_MEMBERSHIP_COL_SUBSCRIPTION = "Pretplata";
export const COMMUNITY_MEMBERSHIP_CHANGE_STATUS = "Promeni status";
export const COMMUNITY_MEMBERSHIP_CHANGE_ROLE = "Promeni ulogu";
export const COMMUNITY_MEMBERSHIP_COPY_SUBSCRIPTION = "Kopiraj ID pretplate";
export const COMMUNITY_MEMBERSHIP_SUBSCRIPTION_ID = "ID pretplate";
export const COMMUNITY_MEMBERSHIP_COPIED_TITLE = "Uspeh";
export const COMMUNITY_MEMBERSHIP_COPIED_DESCRIPTION =
    "ID pretplate je kopiran u clipboard";
export const COMMUNITY_MEMBERSHIP_REJECT_TITLE = "Odbij zahtev za članstvo";
export const COMMUNITY_MEMBERSHIP_REJECT_DESCRIPTION =
    "Navedite razlog odbijanja ovog zahteva za članstvo.";
export const COMMUNITY_MEMBERSHIP_REJECT_CONFIRM = "Potvrdi odbijanje";
export const COMMUNITY_STATUS_PENDING = "na čekanju";
export const COMMUNITY_STATUS_ACTIVE = "aktivno";
export const COMMUNITY_STATUS_REJECTED = "odbijeno";
export const COMMUNITY_STATUS_ACCEPTED = "prihvaćeno";
export const COMMUNITY_MEMBERSHIP_PENDING = "Članstvo na čekanju";
export const COMMUNITY_MEMBERSHIP_REJECTED = "Članstvo odbijeno";
export const COMMUNITY_REJECTION_REASON_LABEL = "Razlog odbijanja";
export const COMMUNITY_LEAVE_CONFIRM_DESCRIPTION =
    "Da li ste sigurni da želite da napustite ovu zajednicu?";
export const COMMUNITY_LEAVE_CONFIRM_DESCRIPTION_DETAILS =
    "Izgubićete pristup svom sadržaju zajednice, diskusijama i uključenim proizvodima. Aktivna pretplata će takođe biti otkazana, ako postoji.";
export const COMMUNITY_POST_DELETE_CONFIRM =
    "Da li ste sigurni da želite da obrišete ovu objavu? Ova radnja se ne može opozvati.";
export const COMMUNITY_POST_DELETE_CONFIRM_SHORT =
    "Da li ste sigurni da želite da obrišete ovu objavu?";
export const COMMUNITY_PAGE_URL_COPIED = "URL stranice je kopiran u clipboard!";
export const COMMUNITY_POST_UPDATE_FAILED = "Ažuriranje objave nije uspelo";
export const COMMUNITY_POST_ADD_FAILED = "Dodavanje objave nije uspelo";
export const COMMUNITY_POST_DELETE_FAILED = "Brisanje objave nije uspelo";
export const COMMUNITY_DISABLED_WARNING =
    "Ova zajednica nije omogućena. Nije vidljiva Vašoj publici (uključujući moderatore).";
export const COMMUNITY_NOT_FOUND_TITLE = "Zajednica nije pronađena";
export const COMMUNITY_NOT_FOUND_DESCRIPTION =
    "Nismo mogli da pronađemo zajednicu koju tražite. Možda je uklonjena ili ne postoji.";
export const COMMUNITY_POST_NOT_FOUND_TITLE = "Objava nije pronađena";
export const COMMUNITY_POST_NOT_FOUND_DESCRIPTION =
    "Nismo mogli da pronađemo objavu koju tražite. Možda je uklonjena ili ne postoji.";
export const COMMUNITY_BACK_TO_HOME = "Nazad na početnu";
export const COMMUNITY_BACK_TO_COMMUNITY = "Nazad na zajednicu";
export const NOT_FOUND_DEFAULT_TITLE = "Nije pronađeno";
export const NOT_FOUND_DEFAULT_DESCRIPTION =
    "Nismo mogli da pronađemo ono što tražite.";
export const NOT_FOUND_RESOURCE_TITLE = "{resource} nije pronađen";
export const NOT_FOUND_RESOURCE_DESCRIPTION =
    "Nismo mogli da pronađemo resurs koji tražite. Možda je uklonjen ili ne postoji.";
export const COMMUNITY_EDIT_BANNER = "Izmeni baner";
export const COMMUNITY_MEDIA_ALT = "Medij objave";
export const COMMUNITY_MEDIA_GIF_ALT = "GIF";
export const COMMUNITY_MEDIA_YOUTUBE_ALT = "YouTube sličica";
export const COMMUNITY_MEDIA_VIEW_FULLSCREEN = "Prikaži preko celog ekrana";
export const COMMUNITY_MEDIA_DOWNLOAD = "Preuzmi";
export const COMMUNITY_ADD_REACTION = "Dodaj reakciju";
export const COMMUNITY_REPORT_COL_CONTENT = "Sadržaj";
export const COMMUNITY_REPORT_COL_TYPE = "Tip";
export const COMMUNITY_REPORT_COL_REASON = "Razlog";
export const COMMUNITY_REPORT_COL_STATUS = "Status";
export const COMMUNITY_REPORT_COL_REJECTION_REASON = "Razlog odbijanja";
export const COMMUNITY_REPORT_COL_ACTIONS = "Akcije";
export const COMMUNITY_REPORT_CHANGE = "Promeni";
export const COMMUNITY_WRITE_SOMETHING = "Napišite nešto...";
export const COMMUNITY_CATEGORY_ALL = "Sve";
export const COMMUNITY_CATEGORY_GENERAL = "Opšte";
export const COMMUNITY_SHOW_MORE = "Više...";
export const COMMUNITY_SHOW_LESS = "Manje";
export const COMMUNITY_BANNER_PLACEHOLDER =
    "Ovde delite važna ažuriranja, obaveštenja ili vesti sa članovima zajednice.";
export const COMMUNITY_MEMBERS_LABEL_ONE = "član";
export const COMMUNITY_MEMBERS_LABEL_FEW = "člana";
export const COMMUNITY_MEMBERS_LABEL_MANY = "članova";
export const COMMUNITY_LEAVE = "Napusti zajednicu";
export const COMMUNITY_JOIN = "Pridruži se";
export const COMMUNITY_INCOMPLETE_PROFILE_TITLE = "Nepotpun profil";
export const COMMUNITY_JOIN_COMPLETE_PROFILE_PREFIX = "Popunite svoj";
export const COMMUNITY_JOIN_COMPLETE_PROFILE_LINK = "profil";
export const COMMUNITY_JOIN_COMPLETE_PROFILE_SUFFIX =
    "da biste se pridružili ovoj zajednici";
export const COMMUNITY_JOIN_COMPLETE_PROFILE_OR_POST_SUFFIX =
    "da biste se pridružili ovoj zajednici ili objavljivali ovde";
export const COMMUNITY_JOIN_REASON_LABEL =
    "Zašto želite da se pridružite ovoj zajednici?";
export const COMMUNITY_JOIN_REASON_PLACEHOLDER = "Razlog za pridruživanje";
export const COMMUNITY_JOIN_SUCCESS = "Uspešno ste se pridružili zajednici.";
export const COMMUNITY_JOIN_REQUEST_SUCCESS =
    "Vaš zahtev za pridruživanje je poslat.";
export const COMMUNITY_POST_TITLE_PLACEHOLDER = "Naslov";
export const COMMUNITY_POST_CONTENT_PLACEHOLDER = "Šta Vam je na umu?";
export const COMMUNITY_POST_TITLE_REQUIRED = "Naslov je obavezan";
export const COMMUNITY_POST_CONTENT_REQUIRED = "Sadržaj je obavezan";
export const COMMUNITY_POST_CATEGORY_REQUIRED = "Kategorija je obavezna";
export const COMMUNITY_POST_SELECT_CATEGORY = "Izaberite kategoriju";
export const COMMUNITY_POST_ATTACH_FILES = "Priloži fajlove";
export const COMMUNITY_POST_ADD_VIDEO = "Dodaj video";
export const COMMUNITY_POST_ADD_VIDEO_BUTTON = "Dodaj video";
export const COMMUNITY_POST_ADD_GIF = "Dodaj GIF";
export const COMMUNITY_POST_SEARCH_GIFS = "Pretraži GIF-ove";
export const COMMUNITY_POST_LOADING_GIFS = "Učitavanje GIF-ova...";
export const COMMUNITY_POST_YOUTUBE_TITLE = "YouTube video";
export const COMMUNITY_POST_UPLOADING = "Otpremanje";
export const COMMUNITY_POST_OF_FILES = "od";
export const COMMUNITY_POST_FILES = "fajlova";
export const COMMUNITY_POST_BUTTON = "Objavi";
export const COMMUNITY_POST_SAVING = "Čuvanje...";
export const COMMUNITY_POSTING = "Objavljivanje...";
export const PAGINATION_PREVIOUS = "Prethodna";
export const PAGINATION_NEXT = "Sledeća";
export const PAGINATION_OF = "od";

// Payment Plan strings
export const NEW_PAYMENT_PLAN_HEADER = "Novi plan plaćanja";
export const EDIT_PAYMENT_PLAN_HEADER = "Izmeni plan plaćanja";
export const PAYMENT_PLANS_HEADER = "Planovi plaćanja";
export const NEW_PAYMENT_PLAN_DESCRIPTION =
    "Konfigurišite novi plan plaćanja za Vaš";
export const EDIT_PAYMENT_PLAN_DESCRIPTION = "Ažurirajte konfiguraciju za";
export const TOAST_TITLE_SUCCESS = "Uspeh";
export const TOAST_SEQUENCE_SAVED = "Izmene sekvence su uspešno sačuvane";
export const TOAST_QUIZ_PASS_MESSAGE = "Položeno 🎉";
export const TOAST_QUIZ_FAIL_MESSAGE = "Nije položeno ☠️";
export const TOAST_TITLE_ERROR = "Greška";
export const TOAST_DESCRIPTION_CHANGES_SAVED = "Izmene su sačuvane";
export const DELETED_COMMENT_PLACEHOLDER = "Obrisano";
export const SETTINGS_RESOURCE_PAYMENT = "Podesi plaćanje";
export const SETTINGS_RESOURCE_API = "API dokumentacija";
export const EDIT_CONTENT_MENU_ITEM = "Izmeni sadržaj";
export const PRODUCT_UNPUBLISHED_WARNING =
    "Ovaj proizvod nije objavljen. Nije vidljiv Vašoj publici.";
export const SEQUENCE_UNPUBLISHED_WARNING =
    "Ova sekvenca nije zakazana za slanje. Pokrenite je da biste je poslali publici.";
export const PRODUCT_EMPTY_WARNING =
    "Vaš proizvod je prazan. Dodajte sadržaj da bi izgledao zanimljivije.";
export const BLOG_UPDATED_PREFIX = "Ažurirano";
export const HEADER_HELP = "Pomoć";
export const CHECKOUT_PAGE_ORDER_SUMMARY = "Pregled porudžbine";
export const TEXT_EDITOR_PLACEHOLDER = "Napišite nešto...";
export const BTN_VIEW_CERTIFICATE = "Prikaži sertifikat";
export const GET_SET_UP = "Podesite";
export const MANAGE_LINK_TEXT = "Upravljaj";
export const BLOG_LIST_EMPTY_TITLE = "Nema pronađenih objava";
export const BLOG_LIST_EMPTY_DESCRIPTION_PUBLIC =
    "Tim još nije objavio nijednu objavu.";
export const BLOG_LIST_EMPTY_DESCRIPTION_PRIVATE =
    "Još niste objavili nijednu objavu.";
export const PRODUCTS_LIST_EMPTY_TITLE = "Nema pronađenih proizvoda";
export const PRODUCTS_LIST_EMPTY_DESCRIPTION_PUBLIC =
    "Tim još nije dodao nijedan proizvod.";
export const PRODUCTS_LIST_EMPTY_DESCRIPTION_PRIVATE =
    "Još niste dodali nijedan proizvod.";
export const COMMUNITIES_LIST_EMPTY_TITLE = "Nema pronađenih zajednica";
export const COMMUNITIES_LIST_EMPTY_DESCRIPTION_PUBLIC =
    "Tim još nije dodao nijednu zajednicu.";
export const COMMUNITIES_LIST_EMPTY_DESCRIPTION_PRIVATE =
    "Još niste dodali nijednu zajednicu.";
export const COMMUNITIES_LIST_PAGE_EMPTY = "Ova stranica je prazna.";
export const COMMUNITIES_LIST_GO_TO_FIRST_PAGE = "Idi na prvu stranicu";
export const RESOURCES_HEADER = "Resursi";
export const RESOURCE_CREATE_COMMUNITY = "Kreirajte zajednicu";
export const LOGIN_CODE_SENT_MESSAGE =
    "Poslali smo vam jednokratnu lozinku emailom.";
export const LESSON_EMBED_URL_LABEL = "Embed kod";
export const LESSON_CONTENT_LABEL = "Sadržaj";
export const EMAIL_EDITOR_EMAIL_EDIT_HEADER = "Uređivanje emaila";
export const EMAIL_EDITOR_TEMPLATE_EDIT_HEADER = "Uređivanje šablona";
export const LOGIN_FORM_PERSONAL_INFORMATION_LABEL = "Lični podaci";
export const LOGIN_EMAIL_REQUIRED = "Unesite ispravnu email adresu";
export const LOGIN_OTP_MIN_LENGTH = "Kod mora imati najmanje 6 karaktera";
export const FIRST_RUN_POPUP_TITLE = "Dobrodošli u Vašu novu školu! 🎉";
export const FIRST_RUN_POPUP_DESCRIPTION =
    "Skoro ste spremni da unovčite svoje znanje.";
export const FIRST_RUN_POPUP_SKIP = "Uradiću to sam";
export const FIRST_RUN_POPUP_CONTINUE = "Nastavi podešavanje";
