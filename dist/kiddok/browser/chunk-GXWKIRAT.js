import {
  HttpClient,
  Injectable,
  NgZone,
  __async,
  __spreadProps,
  __spreadValues,
  computed,
  environment,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-C7WIKZ6K.js";

// src/app/services/toast.service.ts
var ToastService = class _ToastService {
  constructor() {
    this.listeners = [];
  }
  show(message, type = "info") {
    this.listeners.forEach((l) => l(message, type));
  }
  subscribe(listener) {
    this.listeners.push(listener);
  }
  static {
    this.\u0275fac = function ToastService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/core/i18n/i18n.service.ts
var translations = {
  // Sidebar
  "sidebar.brand": { sq: "KidDok", en: "KidDok" },
  "sidebar.activeChild": { sq: "F\xEBmija Aktiv", en: "Active Child" },
  "sidebar.noChildSelected": { sq: "Zgjidhni Profilin", en: "Select Profile" },
  "sidebar.ageFormat": { sq: "{n} vje\xE7", en: "{n} years" },
  "sidebar.ageFormatMonths": { sq: "{n} muaj", en: "{n} months" },
  "sidebar.nav.home": { sq: "Ekrani Kryesor", en: "Dashboard" },
  "sidebar.nav.temperature": { sq: "Temperatura", en: "Temperature" },
  "sidebar.nav.growth": { sq: "Rritja", en: "Growth" },
  "sidebar.nav.diary": { sq: "Ditari", en: "Diary" },
  "sidebar.nav.vaccines": { sq: "Vaksinat", en: "Vaccines" },
  "sidebar.nav.medications": { sq: "Medikamentet", en: "Medications" },
  "sidebar.nav.appointments": { sq: "Terminet", en: "Appointments" },
  "sidebar.nav.labResults": { sq: "Laboratori", en: "Lab Results" },
  "sidebar.nav.settings": { sq: "Konfigurime", en: "Settings" },
  "sidebar.nav.analytics": { sq: "Analitika", en: "Analytics" },
  "sidebar.footer.settings": { sq: "Konfigurime", en: "Settings" },
  "sidebar.footer.logout": { sq: "Dil nga Sistemi", en: "Sign Out" },
  "sidebar.selectChildToContinue": { sq: "Zgjidhni profilin e f\xEBmij\xEBs p\xEBr t\xEB vazhduar.", en: "Select a child profile to continue." },
  "sidebar.openProfile": { sq: "Hapni Profilin", en: "Open Profile" },
  "sidebar.saveChanges": { sq: "Ruaj Ndryshimet", en: "Save Changes" },
  "sidebar.deleteProfile": { sq: "Fshi Profilin", en: "Delete Profile" },
  // PIN Lock
  "pin.dashboard": { sq: "Paneli i Prind\xEBrve", en: "Parent Dashboard" },
  "pin.welcome": { sq: "Mir\xEBsevini!", en: "Welcome!" },
  "pin.enterUserId": { sq: "Vendosni kodin e p\xEBrdoruesit", en: "Enter User ID" },
  "pin.userIdHint": { sq: "P.sh. elena.hoxha", en: "e.g. elena.hoxha" },
  "pin.enterPassword": { sq: "Vendosni fjal\xEBkalimin", en: "Enter Password" },
  "pin.yourPassword": { sq: "Fjal\xEBkalimi juaj", en: "Your password" },
  "pin.continueSignIn": { sq: "Vazhdoni me identifikimin", en: "Continue Sign In" },
  "pin.authenticating": { sq: "Duke u identifikuar...", en: "Authenticating..." },
  "pin.language": { sq: "Gjuha:", en: "Language:" },
  "pin.safeData": { sq: "T\xEB dh\xEBnat tuaja jan\xEB t\xEB sigurta & t\xEB mbrojtura", en: "Your data is safe & protected" },
  "pin.forgotPassword": { sq: "Keni harruar fjal\xEBkalimin tuaj?", en: "Forgot your password?" },
  "pin.goBack": { sq: "Kthehu", en: "Go back" },
  "pin.resetPassword": { sq: "Rip\xEBrt\xEBri fjal\xEBkalimin", en: "Reset Password" },
  "pin.nid": { sq: "NID / NIPT", en: "NID / NIPT" },
  "pin.confirmationCode": { sq: "Kodi i konfirmimit", en: "Confirmation Code" },
  "pin.enterNid": { sq: "Vendosni kodin e p\xEBrdoruesit NID / NIPT", en: "Enter your User ID / NID / NIPT" },
  "pin.enterNidConfirm": { sq: "Vendosni NID / NIPT p\xEBr konfirmimin e identitetit tuaj", en: "Enter your NID / NIPT to confirm identity" },
  "pin.invalidCredentials": { sq: "Kodi ose fjal\xEBkalimi \xEBsht\xEB i pasakt\xEB.", en: "Invalid username or password." },
  "pin.otpSent": { sq: "Nj\xEB kod i ri sigurie u d\xEBrgua n\xEB numrin tuaj t\xEB telefonit q\xEB p\xEBrfundon me ****123.", en: "A new security code was sent to your phone number ending in ****123." },
  "pin.enterOtp": { sq: "Vendosni kodin e konfirmimit (6 shifra)", en: "Enter the 6-digit confirmation code" },
  // Header
  "header.sq": { sq: "SQ", en: "SQ" },
  "header.en": { sq: "EN", en: "EN" },
  // Settings
  "settings.noChildren": { sq: "Nuk ka f\xEBmij\xEB t\xEB regjistruar.", en: "No children registered yet." },
  // Bottom Nav
  "bottomNav.home": { sq: "Ballina", en: "Home" },
  "bottomNav.temperature": { sq: "Temperatura", en: "Temperature" },
  "bottomNav.growth": { sq: "Rritja", en: "Growth" },
  "bottomNav.diary": { sq: "Ditari", en: "Diary" },
  "bottomNav.vaccines": { sq: "Vaksinat", en: "Vaccines" },
  // Navigation
  "nav.home": { sq: "Ekrani Kryesor", en: "Dashboard" },
  "nav.diary": { sq: "Ditari Mjek\xEBsor", en: "Medical Diary" },
  "nav.records": { sq: "Dosja & Vaksinat", en: "Records & Vaccines" },
  "nav.settings": { sq: "Konfigurime", en: "Settings" },
  "nav.temperatureDiary": { sq: "Ditari i Temperatur\xEBs", en: "Temperature Diary" },
  "nav.growthTracking": { sq: "Rritja", en: "Growth" },
  "nav.medications": { sq: "Medikamentet", en: "Medications" },
  // Sidebar
  "sidebar.logout": { sq: "Dil nga Sistemi", en: "Sign Out" },
  // Language
  "language.label": { sq: "Gjuha", en: "Language" },
  // Child form labels
  "child.addNew": { sq: "Regjistro Profilin e F\xEBmij\xEBs", en: "Register Child Profile" },
  "child.addNewBtn": { sq: "Shto Pjestar t\xEB Ri", en: "Add New Member" },
  "child.switchProfile": { sq: "Profili i F\xEBmij\xEBs", en: "Child Profile" },
  "child.born": { sq: "Lindur", en: "Born" },
  "child.fullName": { sq: "Emri i Plot\xEB", en: "Full Name" },
  "child.dateOfBirth": { sq: "Data e Lindjes", en: "Date of Birth" },
  "child.birthWeight": { sq: "Pesha n\xEB Lindje (kg)", en: "Birth Weight (kg)" },
  "child.bloodType": { sq: "Grupi i Gjakut", en: "Blood Type" },
  "child.deliveryDoctor": { sq: "Doktori q\xEB ndihmoi n\xEB lindje", en: "Delivery Doctor" },
  "child.saveProfile": { sq: "Ruaj Profilin", en: "Save Profile" },
  "child.save": { sq: "Ruaj", en: "Save" },
  "child.cancel": { sq: "Anulo", en: "Cancel" },
  "child.welcome": { sq: "Mir\xEBsevini n\xEB KidDok", en: "Welcome to KidDok" },
  "child.welcomeSub": {
    sq: "Ky \xEBsht\xEB laboratori juaj dixhital. Gjith\xE7ka \xEBsht\xEB gati dhe e lidhur me baz\xEBn e t\xEB dh\xEBnave. Shtoni profilin e par\xEB p\xEBr t\xEB nisur!",
    en: "This is your digital health companion. Everything is set up and connected. Add your first profile to get started!"
  },
  "child.selectChild": { sq: "Zgjidhni ose shtoni nj\xEB f\xEBmij\xEB", en: "Select or add a child" },
  "child.switchChild": { sq: "Nd\xEBrro F\xEBmij\xEBn", en: "Switch Child" },
  "child.gender": { sq: "Gjinia", en: "Gender" },
  "child.editProfile": { sq: "Modifiko Profilin e F\xEBmij\xEBs", en: "Edit Child Profile" },
  // Header
  "header.switchChild": { sq: "Nd\xEBrro F\xEBmij\xEBn", en: "Switch Child" },
  "header.addNewMember": { sq: "Shto Pjestar t\xEB Ri", en: "Add New Member" },
  "header.noChildrenPlaceholder": { sq: "Nuk ka f\xEBmij\xEB", en: "No children added yet" },
  "header.profileLabel": { sq: "Profili i F\xEBmij\xEBs", en: "Child Profile" },
  "header.quickSwitch": { sq: "Nd\xEBrrim i shpejt\xEB", en: "Quick Switch" },
  "header.altShortcut": { sq: "Alt+C", en: "Alt+C" },
  "nav.back": { sq: "Kthehu", en: "Back" },
  "child.goToSelector": { sq: "Shko te Zgjidhni F\xEBmij\xEBn", en: "Go to Child Selector" },
  "welcome.loggedIn": { sq: "Mir\xEBserdhje", en: "Welcome back" },
  // Diary / Calendar
  "diary.title": { sq: "Ditari", en: "Diary" },
  "diary.subtitle": { sq: "Regjistroni simptoma dhe aktivitete", en: "Log symptoms and activities" },
  "diary.addEntry": { sq: "Shto Regjistrim", en: "Add Entry" },
  "diary.noEntries": { sq: "Nuk ka regjistrime p\xEBr k\xEBt\xEB dit\xEB", en: "No entries for this day" },
  "diary.today": { sq: "Sot", en: "Today" },
  "diary.symptoms": { sq: "Simptom\xEB", en: "Symptom" },
  "diary.symptomTypes.fever": { sq: "Ethet", en: "Fever" },
  "diary.symptomTypes.cough": { sq: "Koll\xEB", en: "Cough" },
  "diary.symptomTypes.vomit": { sq: "T\xEB vjella", en: "Vomit" },
  "diary.symptomTypes.diarrhea": { sq: "Diarre", en: "Diarrhea" },
  "diary.symptomTypes.headache": { sq: "Dhimbje koke", en: "Headache" },
  "diary.symptomTypes.rash": { sq: "Skuqje", en: "Rash" },
  "diary.symptomTypes.soreThroat": { sq: "Dhimbje fyti", en: "Sore throat" },
  "diary.symptomTypes.tired": { sq: "I lodhur", en: "Tired" },
  "diary.symptomTypes.stomachache": { sq: "Dhimbje barku", en: "Stomach ache" },
  "diary.severity.mild": { sq: "I leht\xEB", en: "Mild" },
  "diary.severity.moderate": { sq: "Mesatar", en: "Moderate" },
  "diary.severity.severe": { sq: "I r\xEBnd\xEB", en: "Severe" },
  "diary.duration": { sq: "Koh\xEBzgjatja", en: "Duration" },
  "diary.durationPlaceholder": { sq: "P.sh. 2 or\xEB", en: "e.g. 2 hours" },
  "diary.quickAdd.notWell": { sq: "Nuk ndihem mir\xEB", en: "Not well" },
  "diary.quickAdd.ate": { sq: "H\xEBngri", en: "Ate" },
  "diary.quickAdd.slept": { sq: "Fjeti", en: "Slept" },
  "diary.quickAdd.happy": { sq: "I g\xEBzuar", en: "Happy" },
  "diary.description": { sq: "P\xEBrshkrimi", en: "Description" },
  "diary.descriptionPlaceholder": { sq: "Sh\xEBno detajet...", en: "Enter details..." },
  "diary.notes": { sq: "Sh\xEBnime", en: "Notes" },
  "diary.recentActivity": { sq: "Aktiviteti i Funta", en: "Recent Activity" },
  "diary.hasEntries": { sq: "Ka regjistrime", en: "Has entries" },
  "diary.severity.label": { sq: "Seviiteti", en: "Severity" },
  "diary.notesPlaceholder": { sq: "Sh\xEBno detajet...", en: "Enter details..." },
  "diary.emptyState": { sq: "Nuk ka sh\xEBnime", en: "No entries yet" },
  "diary.filter.all": { sq: "T\xEB gjitha", en: "All" },
  "diary.filter.symptom": { sq: "Simptoma", en: "Symptoms" },
  "diary.filter.meal": { sq: "Vakte", en: "Meals" },
  "diary.filter.sleep": { sq: "Gjum\xEB", en: "Sleep" },
  "diary.filter.mood": { sq: "Gjendje", en: "Mood" },
  "diary.type.symptom": { sq: "Simptom\xEB", en: "Symptom" },
  "diary.type.meal": { sq: "Vakt", en: "Meal" },
  "diary.type.sleep": { sq: "Gjum\xEB", en: "Sleep" },
  "diary.type.mood": { sq: "Gjendje", en: "Mood" },
  "diary.type.activity": { sq: "Aktivitet", en: "Activity" },
  "diary.save": { sq: "Ruaj", en: "Save" },
  "diary.cancel": { sq: "Anulo", en: "Cancel" },
  "diary.delete": { sq: "Fshij", en: "Delete" },
  "diary.seeMore": { sq: "Shiko m\xEB shum\xEB", en: "See more" },
  "diary.entriesForDay": { sq: "regjistrime", en: "entries" },
  "settings.name": { sq: "Emri", en: "First Name" },
  "settings.surname": { sq: "Mbiemri", en: "Surname" },
  "settings.phone": { sq: "Numri i Telefonit", en: "Phone Number" },
  "settings.saveChanges": { sq: "Ruaj Ndryshimet", en: "Save Changes" },
  "settings.saved": { sq: "T\xEB dh\xEBnat u ruajt\xEBn!", en: "Changes saved!" },
  "settings.title": { sq: "Konfigurime", en: "Settings" },
  "settings.language": { sq: "Gjuha", en: "Language" },
  "settings.language.sq": { sq: "Shqip", en: "Albanian" },
  "settings.language.en": { sq: "English", en: "English" },
  "settings.children": { sq: "F\xEBmij\xEBt", en: "Children" },
  "settings.children.edit": { sq: "Redakto", en: "Edit" },
  "settings.children.delete": { sq: "Fshi", en: "Delete" },
  "settings.children.add": { sq: "Shto F\xEBmij\xEB", en: "Add Child" },
  "settings.children.confirmDelete": { sq: "D\xEBshironi ta fshini k\xEBt\xEB profil?", en: "Delete this profile?" },
  "settings.data.title": { sq: "Menaxhimi i t\xEB Dh\xEBnave", en: "Data Management" },
  "settings.data.export": { sq: "Shkarko T\xEB Dh\xEBnat", en: "Export Data" },
  "settings.data.clear": { sq: "Fshi T\xEB Dh\xEBnat", en: "Clear All Data" },
  "settings.data.clearConfirm": { sq: "Jen i sigurt? Ky veprim nuk mund t\xEB zhb\xEBhet.", en: "Are you sure? This cannot be undone." },
  "settings.about.tagline": { sq: "Mir\xEBsevini n\xEB KidDok v1.0", en: "Welcome to KidDok v1.0" },
  "settings.about.version": { sq: "Versioni 1.0.0", en: "Version 1.0.0" },
  "settings.save": { sq: "Ruaj", en: "Save" },
  "settings.confirm": { sq: "Po", en: "Yes" },
  "settings.cancel": { sq: "Anulo", en: "Cancel" },
  // Placeholders
  "placeholder.fullName": { sq: "P.sh. Elena Hoxha", en: "e.g. Elena Hoxha" },
  "placeholder.deliveryDoctor": { sq: "P.sh. Dr. Blerina Doko", en: "e.g. Dr. John Smith" },
  "placeholder.birthWeight": { sq: "P.sh. 3.2", en: "e.g. 7.1" },
  "placeholder.allergies": { sq: "P.sh. Alergji ndaj penicilin\xEBs...", en: "e.g. Penicillin allergy..." },
  "placeholder.medicalNotes": { sq: "Sh\xEBnime shtes\xEB...", en: "Additional medical notes..." },
  // Child medical fields
  "child.criticalAllergies": { sq: "Alergji Kritike", en: "Critical Allergies" },
  "child.medicalNotes": { sq: "Sh\xEBnime Mjek\xEBsore", en: "Medical Notes" },
  "child.medicalDocument": { sq: "Dokument Mjek\xEBsor", en: "Medical Document" },
  "child.documentIssueDate": { sq: "Data e L\xEBshimit", en: "Issue Date" },
  "child.documentAttached": { sq: "Dokument i ngarkuar", en: "Document attached" },
  // Temperature Diary
  "temperature.current": { sq: "Temperatura aktuale", en: "Current Temperature" },
  "home.greeting.morning": { sq: "Mir\xEBm\xEBngjes", en: "Good morning" },
  "home.greeting.afternoon": { sq: "Mir\xEBdit\xEB", en: "Good afternoon" },
  "home.greeting.evening": { sq: "Mir\xEBmbr\xEBma", en: "Good evening" },
  "home.greeting.night": { sq: "Nat\xEBn e mir\xEB", en: "Good night" },
  "home.addFirstChild": { sq: "Shto f\xEBmij\xEBn e par\xEB", en: "Add your first child" },
  "home.welcome.subtitle": { sq: "T\xEB dh\xEBnat e tua mjek\xEBsore n\xEB nj\xEB vend", en: "Your medical records in one place" },
  // â”â ¬â”â ¬â”â ¬ HOME PAGE â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬
  "home.welcome.morning": { sq: "Mir\xEBm\xEBngjes", en: "Good morning" },
  "home.welcome.afternoon": { sq: "Mir\xEBmbr\xEBma", en: "Good afternoon" },
  "home.welcome.evening": { sq: "Nat\xEBn e mir\xEB", en: "Good evening" },
  "home.welcome.greeting": { sq: "Mir\xEBsevje, {name}!", en: "Welcome, {name}!" },
  "home.welcome.greetingNoChild": { sq: "Mir\xEBsevje!", en: "Welcome!" },
  "home.welcome.ageYears": { sq: "{n} vje\xE7", en: "{n} years old" },
  "home.welcome.ageMonths": { sq: "{n} muaj", en: "{n} months old" },
  "home.welcome.addChild": { sq: "Shto f\xEBmij\xEBn", en: "Add child" },
  "home.quickActions.title": { sq: "Veprimet e Shpejta", en: "Quick Actions" },
  "home.quickActions.temperature": { sq: "Temperatura", en: "Temperature" },
  "home.quickActions.temperatureDesc": { sq: "Monitoroni temperatur\xEBn", en: "Track temperature" },
  "home.quickActions.growth": { sq: "Rritja", en: "Growth" },
  "home.quickActions.growthDesc": { sq: "Gjat\xEBsia dhe pesha", en: "Height & weight" },
  "home.quickActions.diary": { sq: "Ditari", en: "Diary" },
  "home.quickActions.diaryDesc": { sq: "Simptomat dhe sh\xEBnime", en: "Symptoms & notes" },
  "home.quickActions.vaccines": { sq: "Vaksinat", en: "Vaccines" },
  "home.quickActions.vaccinesDesc": { sq: "Planet dhe alertet", en: "Schedule & alerts" },
  "home.quickActions.analytics": { sq: "Analitika", en: "Analytics" },
  "home.quickActions.analyticsDesc": { sq: "Tendencat dhe p\xEBrputhshm\xEBria", en: "Trends & compliance" },
  "home.alerts.title": { sq: "Alerte Sh\xEBndet\xEBsore", en: "Health Alerts" },
  "home.alerts.dismiss": { sq: "Heq njoftimin", en: "Dismiss alert" },
  "home.alerts.allClear": { sq: "Gjith\xE7ka n\xEB rregull!", en: "All clear!" },
  "home.alerts.fever": { sq: "Temperatura e lart\xEB!", en: "Fever detected!" },
  "home.alerts.feverDesc": { sq: "{value}\xB0C \xE2\xE2 \xAC\u201D u matur {time}", en: "{value}\xB0C \xE2\xE2 \xAC\u201D measured {time}" },
  "home.alerts.fever.link": { sq: "Shiko temperatur\xEBn", en: "View temperature" },
  "home.alerts.overdueVaccine": { sq: "Vaksina e vonuar", en: "Overdue vaccine" },
  "home.alerts.overdueVaccineDesc": { sq: "{name} \xE2\xE2 \xAC\u201D e vonuar {days} dit\xEB", en: "{name} \xE2\xE2 \xAC\u201D {days} days overdue" },
  "home.alerts.vaccine.link": { sq: "Shiko vaksinat", en: "View vaccines" },
  "home.alerts.growth.link": { sq: "Shiko rritjen", en: "View growth" },
  "home.alerts.takeAction": { sq: "Merrni mas\xEB", en: "Take action" },
  "home.alerts.clear": { sq: "Gjith\xE7ka n\xEB rregull!", en: "All clear!" },
  "home.alerts.allClearDesc": { sq: "T\xEB gjitha temperaturas normale, asnj\xEB vaksine e vonuar.", en: "All temperatures normal, no overdue vaccines." },
  "home.recentActivity.title": { sq: "Aktiviteti i Funts", en: "Recent Activity" },
  "home.recentActivity.empty": { sq: "Nuk ka aktivitet", en: "No activity yet" },
  "home.recentActivity.emptyDesc": { sq: "Shtoni t\xEB par\xEBn duke p\xEBrdorur veprimet e shpejta", en: "Add your first entry using quick actions" },
  "home.recentActivity.today": { sq: "Sot", en: "Today" },
  "home.recentActivity.yesterday": { sq: "Dje", en: "Yesterday" },
  "home.recentActivity.thisWeek": { sq: "K\xEBt\xEB jav\xEB", en: "This week" },
  "home.recentActivity.earlier": { sq: "M\xEB her\xEBt", en: "Earlier" },
  "home.recentActivity.minutesAgo": { sq: "{n} minuta m\xEB par\xEB", en: "{n} minutes ago" },
  "home.recentActivity.hoursAgo": { sq: "{n} or\xEB m\xEB par\xEB", en: "{n} hours ago" },
  "home.recentActivity.daysAgo": { sq: "{n} dit\xEB m\xEB par\xEB", en: "{n} days ago" },
  "home.recentActivity.tempRecorded": { sq: "Temperatura u regjistrua", en: "Temperature recorded" },
  "home.recentActivity.growthUpdated": { sq: "Rritja u p\xEBrdit\xEBsua", en: "Growth updated" },
  "home.activity.showMore": { sq: "Shiko m\xEB shum\xEB", en: "Show more" },
  "home.activity.ago": { sq: "para", en: "ago" },
  "home.activity.justNow": { sq: "tani", en: "just now" },
  // â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬â”â ¬
  "temperature.quickAdd": { sq: "Shto shpejt", en: "Quick Add" },
  "temperature.location": { sq: "Matja n\xEB", en: "Measured at" },
  "temperature.notes": { sq: "Sh\xEBnime", en: "Notes" },
  "temperature.save": { sq: "Ruaj", en: "Save" },
  "temperature.alertHigh": { sq: "Ka ethe t\xEB larta! Kontaktoni mjekun.", en: "High temperature detected! Contact the doctor." },
  "temperature.trend": { sq: "Tendeca 7 ditore", en: "7-Day Trend" },
  "temperature.recent": { sq: "Leximet e fundit", en: "Recent Readings" },
  "temperature.saveError": { sq: "Ruajtja d\xEBshtoi. Provo p\xEBrs\xEBri.", en: "Save failed. Please try again." },
  "temperature.saving": { sq: "Duke ruajtur...", en: "Saving..." },
  "temperature.saved": { sq: "U ruajt!", en: "Saved!" },
  "temperature.noReadings": { sq: "Nuk ka lexime akoma.", en: "No readings yet." },
  "temperature.allGood": { sq: "T\xEB gjitha temperaturas mir\xEB! \xB0 \xB0", en: "All temperatures normal! \xB0 \xB0" },
  "temperature.addFirst": { sq: "Shtani leximin e par\xEB", en: "Add your first reading" },
  "temperature.deleteConfirm": { sq: "Fshi k\xEBt\xEB lexim?", en: "Delete this reading?" },
  "temperature.delete": { sq: "Fshi", en: "Delete" },
  "temperature.cancel": { sq: "Anulo", en: "Cancel" },
  "temperature.newReading": { sq: "Lexim i Ri", en: "New Reading" },
  "temperature.value": { sq: "Temperatura (\xB0C)", en: "Temperature (\xB0C)" },
  "temperature.time": { sq: "Ora", en: "Time" },
  "temperature.location.forehead": { sq: "Koka", en: "Forehead" },
  "temperature.location.ear": { sq: "Veshthi", en: "Ear" },
  "temperature.location.oral": { sq: "Goja", en: "Mouth" },
  "temperature.location.axillary": { sq: "Armpiti", en: "Armpit" },
  "temperature.location.rectal": { sq: "Rektali", en: "Rectal" },
  "temperature.contextFever": { sq: "Kontroll temperature", en: "Fever Check" },
  "temperature.contextRoutine": { sq: "Rutinore", en: "Routine" },
  "temperature.contextPostMed": { sq: "Pas ila\xE7it", en: "After Medication" },
  // Growth Tracking
  "growth.height": { sq: "Gjat\xEBsia (cm)", en: "Height (cm)" },
  "growth.weight": { sq: "Pesha (kg)", en: "Weight (kg)" },
  "growth.measuredAt": { sq: "Data e matjes", en: "Measurement Date" },
  "growth.notes": { sq: "Sh\xEBnime", en: "Notes" },
  "growth.save": { sq: "Ruaj", en: "Save" },
  "growth.chart": { sq: "Diagrama e rritjes", en: "Growth Chart" },
  "growth.recent": { sq: "Matjet e fundit", en: "Recent Measurements" },
  "growth.noData": { sq: "Nuk ka t\xEB dh\xEBna ende", en: "No data yet" },
  "growth.addFirst": { sq: "Shtoni matjen e par\xEB", en: "Add the first measurement" },
  "growth.heightLabel": { sq: "Gjat\xEBsia", en: "Height" },
  "growth.weightLabel": { sq: "Pesha", en: "Weight" },
  "growth.kg": { sq: "kg", en: "kg" },
  "growth.cm": { sq: "cm", en: "cm" },
  "growth.title": { sq: "Rritja", en: "Growth" },
  "growth.currentStats": { sq: "Statistikat aktuale", en: "Current Stats" },
  "growth.addMeasurement": { sq: "Shto Matje", en: "Add Measurement" },
  "growth.delete": { sq: "Fshi", en: "Delete" },
  "growth.saving": { sq: "Duke ruajtur...", en: "Saving..." },
  "growth.saved": { sq: "U ruajt!", en: "Saved!" },
  "growth.saveError": { sq: "Ruajtja d\xEBshtoi. Provo p\xEBrs\xEBri.", en: "Save failed. Please try again." },
  "growth.lastUpdated": { sq: "P\xEBrdit\xEBsuar s\xEB fundi", en: "Last updated" },
  "growth.noHeight": { sq: "--", en: "--" },
  "growth.noWeight": { sq: "--", en: "--" },
  // Error messages
  "error.documentTooLarge": { sq: "Dokumenti \xEBsht\xEB shum\xEB i madh. Maksimumi 5MB.", en: "Document too large. Maximum 5MB." },
  "error.invalidDocType": { sq: "Lejohen vet\xEBm PDF ose imazhe.", en: "Only PDF or image files allowed." },
  // Child Form (Sprint 7)
  "childForm.titleAdd": { sq: "Shto Pjestar", en: "Add Member" },
  "childForm.titleEdit": { sq: "Redakto Profilin", en: "Edit Profile" },
  "childForm.step1.basics": { sq: "Bazat", en: "Basics" },
  "childForm.step2.medical": { sq: "Mjek\xEBsore", en: "Medical" },
  "childForm.step3.documents": { sq: "Dokumente", en: "Documents" },
  "childForm.name.label": { sq: "Emri", en: "Name" },
  "childForm.name.placeholder": { sq: "Emri i f\xEBmij\xEBs", en: "Child's name" },
  "childForm.name.error": { sq: "Emri duhet t\xEB p\xEBrmbaj\xEB vet\xEBm shkronja", en: "Name must contain only letters" },
  "childForm.dob.label": { sq: "Data e lindjes", en: "Date of Birth" },
  "childForm.dob.error": { sq: "Data e lindjes \xEBsht\xEB e detyrueshme", en: "Date of birth is required" },
  "childForm.dob.futureError": { sq: "Data e lindjes nuk mund t\xEB jet\xEB n\xEB t\xEB ardhmen", en: "Date of birth cannot be in the future" },
  "childForm.gender.label": { sq: "Gjinia", en: "Gender" },
  "childForm.gender.male": { sq: "Mashkull", en: "Male" },
  "childForm.gender.female": { sq: "Fem\xEBr", en: "Female" },
  "childForm.gender.other": { sq: "Tjet\xEBr", en: "Other" },
  "childForm.bloodType": { sq: "Grupi i gjakut", en: "Blood Type" },
  "childForm.birthWeight": { sq: "Pesha e lindjes (kg)", en: "Birth Weight (kg)" },
  "childForm.allergies": { sq: "Alergji", en: "Allergies" },
  "childForm.allergies.placeholder": { sq: "Sh\xEBno alergjit\xEB...", en: "List any allergies..." },
  "childForm.next": { sq: "Vazhdo", en: "Next" },
  "childForm.back": { sq: "Mbrapa", en: "Back" },
  "childForm.save": { sq: "Ruaj", en: "Save" },
  "childForm.cancel": { sq: "Anulo", en: "Cancel" },
  "childForm.uploadDocument": { sq: "Ngarko Dokument Mjek\xEBsor", en: "Upload Medical Document" },
  "childForm.uploadHint": { sq: "PDF ose imazhe, maks 5MB", en: "PDF or images, max 5MB" },
  "childForm.success": { sq: "Profili u ruajt me sukses!", en: "Profile saved successfully!" },
  "childForm.error": { sq: "Di\xE7ka shkoi keq. Provo p\xEBrs\xEBri.", en: "Something went wrong. Please try again." },
  "childForm.fileTooBig": { sq: "Skedari tejkalon 5MB", en: "File exceeds 5MB" },
  "childForm.fileTypeError": { sq: "Lloji i skedarit nuk mb\xEBshtet\xEBt", en: "File type not supported" },
  "childForm.optional": { sq: "Opsionale", en: "Optional" },
  // Vaccines
  "vaccines.title": { sq: "Vaksinat", en: "Vaccines" },
  "vaccines.addRecord": { sq: "Shto Vaksina", en: "Add Vaccine" },
  "vaccines.vaccineName": { sq: "Emri i Vaksines", en: "Vaccine Name" },
  "vaccines.doseNumber": { sq: "Doza nr.", en: "Dose No." },
  "vaccines.totalDoses": { sq: "Nga gjithsej", en: "of total" },
  "vaccines.dateGiven": { sq: "Data e vendosjes", en: "Date Given" },
  "vaccines.batchNumber": { sq: "Numri i batch-it", en: "Batch Number" },
  "vaccines.manufacturer": { sq: "Prodhuesi", en: "Manufacturer" },
  "vaccines.injectionSite": { sq: "Vendi i injeksionit", en: "Injection Site" },
  "vaccines.doctor": { sq: "Mjeku/Dhoma", en: "Doctor/Clinic" },
  "vaccines.notes": { sq: "Sh\xEBnime", en: "Notes" },
  "vaccines.status.overdue": { sq: "Vonuar", en: "Overdue" },
  "vaccines.status.due": { sq: "P\xEBr shkak", en: "Due" },
  "vaccines.status.upcoming": { sq: "S\xEB shpejti", en: "Upcoming" },
  "vaccines.status.completed": { sq: "P\xEBrfunduar", en: "Completed" },
  "vaccines.alert.overdue": { sq: "Keni {n} vaksina t\xEB vonuara", en: "You have {n} overdue vaccines" },
  "vaccines.alert.due": { sq: "Keni {n} vaksina p\xEBr shkak", en: "You have {n} vaccines due" },
  "vaccines.dosesProgress": { sq: "{done}/{total} doza", en: "{done}/{total} doses" },
  "vaccines.emptyState": { sq: "Nuk ka vaksina", en: "No vaccines recorded" },
  "vaccines.emptyStateHint": { sq: "Shtoni vaksinat e para p\xEBr t\xEB ndjekur \xE7do doz\xEB", en: "Add your first vaccines to track every dose" },
  "vaccines.markComplete": { sq: "Sh\xEBno si e b\xEBr\xEB", en: "Mark as done" },
  "vaccines.comingUp": { sq: "Vijon s\xEB shpejti", en: "Coming up" },
  "vaccines.site.arm": { sq: "Krah", en: "Arm" },
  "vaccines.site.thigh": { sq: "Kofsh\xEB", en: "Thigh" },
  "vaccines.cancel": { sq: "Anulo", en: "Cancel" },
  "vaccines.save": { sq: "Ruaj", en: "Save" },
  // Vaccine Schedule
  "vaccines.schedule.title": { sq: "Planifikimi i Vaksinave", en: "Vaccine Schedule" },
  "vaccines.schedule.completed": { sq: "P\xEBrfunduar", en: "Completed" },
  "vaccines.schedule.upcoming": { sq: "N\xEB pritje", en: "Upcoming" },
  "vaccines.schedule.overdue": { sq: "I vonuar", en: "Overdue" },
  "vaccines.schedule.notStarted": { sq: "I pamartur", en: "Not started" },
  "vaccines.schedule.dueSoon": { sq: "S\xEB shpejti", en: "Due soon" },
  "vaccines.schedule.expandDetails": { sq: "Shiko detajet", en: "View details" },
  "vaccines.schedule.markComplete": { sq: "Sh\xEBno t\xEB p\xEBrfunduar", en: "Mark complete" },
  "vaccines.schedule.completionDate": { sq: "Data e p\xEBrfundimit", en: "Completion date" },
  // Vaccine Alert Card
  "vaccines.alertCard.markComplete": { sq: "Sh\xEBno t\xEB p\xEBrfunduar", en: "Mark complete" },
  "vaccines.alertCard.viewDetails": { sq: "Shiko detajet", en: "View details" },
  "vaccines.alertCard.overdue": { sq: "e vonuar {n} dit\xEB", en: "overdue by {n} days" },
  "vaccines.alertCard.dueSoon": { sq: "p\xEBr shkak sot", en: "due today" },
  "vaccines.alertCard.upcoming": { sq: "n\xEB pritje", en: "upcoming" },
  "vaccines.alertCard.dismiss": { sq: "Hiqe", en: "Dismiss" },
  // Records (Vaccine/Medical Records page)
  "records.title": { sq: "Dosja e Vaksinave", en: "Vaccine Records" },
  "records.subtitle": { sq: "Kalendari zyrtar i mjekimeve dhe rekomandimeve t\xEB mjekut.", en: "Official schedule of treatments and doctor recommendations." },
  "records.addRecord": { sq: "Shto Dokument i Ri", en: "Add New Record" },
  "records.formTitle": { sq: "Skeda e Vaksinimit", en: "Vaccination Record" },
  "records.nameLabel": { sq: "Em\xEBrtimi / P\xEBrshkrimi", en: "Name / Description" },
  "records.namePlaceholder": { sq: "Psh: Vaksina MMR II", en: "e.g. MMR II Vaccine" },
  "records.statusLabel": { sq: "Kryerja \xEBsht\xEB...", en: "Status is..." },
  "records.completed": { sq: "P\xEBrfunduar", en: "Completed" },
  "records.pending": { sq: "N\xEB Pritje", en: "Pending" },
  "records.dateLabel": { sq: "Data e Planifikimit/B\xEBrjes", en: "Scheduled / Completion Date" },
  "records.updateButton": { sq: "P\xEBrdit\xEBso Dosjen", en: "Update Record" },
  "records.emptyTitle": { sq: "Asnj\xEB e dh\xEBn\xEB laboratorike.", en: "No medical records yet." },
  "records.emptyHint": { sq: "Regjistro t\xEB pakt\xEBn nj\xEB vaksin\xEB ose vizit\xEB te mjeku.", en: "Record at least one vaccine or doctor visit." },
  "records.status.done": { sq: "Kryer", en: "Done" },
  "records.status.planned": { sq: "N\xEB plan", en: "Planned" },
  // Push Notifications
  "notifications.fever.title": { sq: "Temperatura e lart\xEB!", en: "High temperature!" },
  "notifications.vaccine.overdueTitle": { sq: "Vaksina e vonuar!", en: "Vaccine overdue!" },
  "notifications.vaccine.dueSoonTitle": { sq: "Vaksina p\xEBr shkak!", en: "Vaccine due soon!" },
  // Settings — Notifications section
  "settings.notifications.title": { sq: "Njoftimet", en: "Notifications" },
  "settings.notifications.enable": { sq: "Aktivizo Njoftimet", en: "Enable Notifications" },
  "settings.notifications.enableDesc": { sq: "Merrni njoftime n\xEB shfletues p\xEBr ethe dhe vaksina", en: "Receive browser notifications for fever and vaccines" },
  "settings.notifications.feverAlerts": { sq: "Njoftimet p\xEBr ethe", en: "Fever Alerts" },
  "settings.notifications.feverAlertsDesc": { sq: "Temperatura \xE2 \xA5 38.5\xB0C", en: "Temperature \xE2 \xA5 38.5\xB0C" },
  "settings.notifications.vaccineAlerts": { sq: "Njoftimet p\xEBr vaksina", en: "Vaccine Alerts" },
  "settings.notifications.vaccineAlertsDesc": { sq: "Vaksinat e vonuara dhe n\xEB afat", en: "Overdue and upcoming vaccines" },
  "settings.notifications.dnd": { sq: "Mos m\xEB pengo (Do Not Disturb)", en: "Do Not Disturb" },
  "settings.notifications.dndDesc": { sq: "Njoftimet pushohen gjat\xEB or\xEBve t\xEB caktuara", en: "Notifications paused during set hours" },
  "settings.notifications.dndFrom": { sq: "Nga", en: "From" },
  "settings.notifications.dndTo": { sq: "Deri", en: "To" },
  "settings.notifications.browserDenied": { sq: "Njoftimet jan\xEB bllokuar nga shfletuesi. Ju lutemi hiqni bllokimin n\xEB cil\xEBsimet e shfletuesit.", en: "Notifications are blocked by your browser. Please unblock them in browser settings." },
  // Medications
  "medications.title": { sq: "Medikamentet", en: "Medications" },
  "medications.add": { sq: "Shto Medikament", en: "Add Medication" },
  "medications.addFirst": { sq: "Shto medikamentin e par\xEB", en: "Add first medication" },
  "medications.empty": { sq: "Nuk ka medikamente", en: "No medications" },
  "medications.emptyHint": { sq: "Shtoni medikamentet e para p\xEBr t\xEB ndjekur trajtimin", en: "Add medications to track treatment progress" },
  "medications.name": { sq: "Emri i medikamentit", en: "Medication name" },
  "medications.namePlaceholder": { sq: "P.sh. Amoxicillin", en: "e.g. Amoxicillin" },
  "medications.dosage": { sq: "Doza", en: "Dosage" },
  "medications.frequency": { sq: "Frekuenca", en: "Frequency" },
  "medications.startDate": { sq: "Data e fillimit", en: "Start date" },
  "medications.endDate": { sq: "Data e p\xEBrfundimit", en: "End date" },
  "medications.prescribedBy": { sq: "P\xEBrshkruar nga", en: "Prescribed by" },
  "medications.prescribedByPlaceholder": { sq: "P.sh. Dr. Elena Hoxha", en: "e.g. Dr. John Smith" },
  "medications.notes": { sq: "Sh\xEBnime", en: "Notes" },
  "medications.notesPlaceholder": { sq: "Sh\xEBno detajet shtes\xEB...", en: "Enter additional details..." },
  "medications.active": { sq: "Aktiv", en: "Active" },
  "medications.activeLabel": { sq: "medikamente active", en: "active medications" },
  "medications.activeDesc": { sq: "N\xEB p\xEBrdorim aktualisht", en: "Currently in use" },
  "medications.inactive": { sq: "Jo aktiv", en: "Inactive" },
  "medications.ongoing": { sq: "N\xEB vazhdim", en: "Ongoing" },
  "medications.optional": { sq: "opsionale", en: "optional" },
  "medications.edit": { sq: "Redakto", en: "Edit" },
  "medications.delete": { sq: "Fshi", en: "Delete" },
  "medications.cancel": { sq: "Anulo", en: "Cancel" },
  "medications.save": { sq: "Ruaj", en: "Save" },
  "medications.saving": { sq: "Duke ruajtur...", en: "Saving..." },
  "medications.saveError": { sq: "Ruajtja d\xEBshtoi. Provo p\xEBrs\xEBri.", en: "Save failed. Please try again." },
  "medications.editMed": { sq: "Redakto Medikamentin", en: "Edit Medication" },
  "medications.addMed": { sq: "Shto Medikament", en: "Add Medication" },
  "medications.deleteConfirmTitle": { sq: "Fshij Medikamentin?", en: "Delete Medication?" },
  "medications.activeHint": { sq: "Medikamenti n\xEB p\xEBrdorim aktualisht", en: "Medication currently in use" },
  // Appointments
  "appointments.title": { sq: "Terminet", en: "Appointments" },
  "appointments.add": { sq: "Shto Termin", en: "Add Appointment" },
  "appointments.addFirst": { sq: "Shto terminin e par\xEB", en: "Add first appointment" },
  "appointments.empty": { sq: "Nuk ka termine", en: "No appointments" },
  "appointments.emptyHint": { sq: "Shtoni terminin e par\xEB p\xEBr ta ndjekur", en: "Add your first appointment to track visits" },
  "appointments.upcomingLabel": { sq: "termine t\xEB ardhshme", en: "upcoming appointments" },
  "appointments.upcomingDesc": { sq: "N\xEB 30 dit\xEBt e ardhshme", en: "In the next 30 days" },
  "appointments.upcoming": { sq: "S\xEB shpejti", en: "Upcoming" },
  "appointments.edit": { sq: "Redakto", en: "Edit" },
  "appointments.delete": { sq: "Fshi", en: "Delete" },
  "appointments.cancel": { sq: "Anulo", en: "Cancel" },
  "appointments.save": { sq: "Ruaj", en: "Save" },
  "appointments.saving": { sq: "Duke ruajtur...", en: "Saving..." },
  "appointments.saveError": { sq: "Ruajtja d\xEBshtoi. Provo p\xEBrs\xEBri.", en: "Save failed. Please try again." },
  "appointments.editAppt": { sq: "Redakto Terminin", en: "Edit Appointment" },
  "appointments.addAppt": { sq: "Shto Termin", en: "Add Appointment" },
  "appointments.deleteConfirmTitle": { sq: "Fshij Terminin?", en: "Delete Appointment?" },
  "appointments.titleLabel": { sq: "Titulli", en: "Title" },
  "appointments.titlePlaceholder": { sq: "P.sh. Kontroll\xEB e p\xEBrgjithshme", en: "e.g. Annual checkup" },
  "appointments.dateTime": { sq: "Data dhe Ora", en: "Date & Time" },
  "appointments.doctor": { sq: "Doktori", en: "Doctor" },
  "appointments.doctorPlaceholder": { sq: "P.sh. Dr. Elena Hoxha", en: "e.g. Dr. John Smith" },
  "appointments.location": { sq: "Vendi", en: "Location" },
  "appointments.locationPlaceholder": { sq: "P.sh. Qendra Sh\xEBndet\xEBsore Nr. 3", en: "e.g. Health Center No. 3" },
  "appointments.notes": { sq: "Sh\xEBnime", en: "Notes" },
  "appointments.notesPlaceholder": { sq: "Sh\xEBno detajet shtes\xEB...", en: "Enter additional details..." },
  "appointments.optional": { sq: "opsionale", en: "optional" },
  // Lab Results
  "labResults.title": { sq: "Rezultatet e Laboratorit", en: "Lab Results" },
  "labResults.add": { sq: "Shto Rezultat", en: "Add Result" },
  "labResults.addFirst": { sq: "Shto rezultatin e par\xEB", en: "Add first lab result" },
  "labResults.empty": { sq: "Nuk ka rezultate laboratorike", en: "No lab results" },
  "labResults.emptyHint": { sq: "Shtoni rezultatet e testimit p\xEBr t\xEB ndjekur sh\xEBndetin", en: "Add test results to track health indicators" },
  "labResults.view": { sq: "Shiko Detajet", en: "View Details" },
  "labResults.delete": { sq: "Fshi", en: "Delete" },
  "labResults.cancel": { sq: "Anulo", en: "Cancel" },
  "labResults.save": { sq: "Ruaj", en: "Save" },
  "labResults.saving": { sq: "Duke ruajtur...", en: "Saving..." },
  "labResults.saveError": { sq: "Ruajtja d\xEBshtoi. Provo p\xEBrs\xEBri.", en: "Save failed. Please try again." },
  "labResults.addResult": { sq: "Shto Rezultat Laboratori", en: "Add Lab Result" },
  "labResults.deleteConfirmTitle": { sq: "Fshij Rezultatin?", en: "Delete Lab Result?" },
  "labResults.testName": { sq: "Emri i Testit", en: "Test Name" },
  "labResults.testNamePlaceholder": { sq: "P.sh. Gjak i plot\xEB", en: "e.g. Complete blood count" },
  "labResults.result": { sq: "Rezultati", en: "Result" },
  "labResults.unit": { sq: "Nj\xEBsia", en: "Unit" },
  "labResults.referenceRange": { sq: "Vlera Referente", en: "Reference Range" },
  "labResults.refRange": { sq: "Ref", en: "Ref" },
  "labResults.date": { sq: "Data e Testit", en: "Test Date" },
  "labResults.doctor": { sq: "Doktori", en: "Doctor" },
  "labResults.doctorPlaceholder": { sq: "P.sh. Dr. Arben Basha", en: "e.g. Dr. Sarah Jones" },
  "labResults.notes": { sq: "Sh\xEBnime", en: "Notes" },
  "labResults.notesPlaceholder": { sq: "Sh\xEBno detajet shtes\xEB...", en: "Enter additional details..." },
  "labResults.optional": { sq: "opsionale", en: "optional" },
  "labResults.close": { sq: "Mbyll", en: "Close" },
  // Analytics
  "analytics.title": { sq: "Analitika", en: "Analytics" },
  "analytics.temperatureTrend": { sq: "Tendeca e Temperatur\xEBs", en: "Temperature Trend" },
  "analytics.last7Days": { sq: "7 dit\xEBt e fundit", en: "Last 7 days" },
  "analytics.growthChart": { sq: "Diagrama e Rritjes", en: "Growth Chart" },
  "analytics.heightWeight": { sq: "Gjat\xEBsia & Pesha", en: "Height & Weight" },
  "analytics.vaccineCompliance": { sq: "P\xEBrputhshm\xEBria e Vaksinave", en: "Vaccine Compliance" },
  "analytics.upToDateVsOverdue": { sq: "N\xEB koh\xEB kundrejt t\xEB vonuara", en: "Up to date vs overdue" },
  "analytics.upToDate": { sq: "N\xEB koh\xEB", en: "Up to date" },
  "analytics.overdue": { sq: "T\xEB vonuara", en: "Overdue" },
  "analytics.upcoming": { sq: "N\xEB pritje", en: "Upcoming" },
  "analytics.ofTotal": { sq: "nga gjithsej {n}", en: "of {n} total" },
  "analytics.exportCsv": { sq: "Eksporto CSV", en: "Export CSV" },
  // Theme Settings
  "settings.theme.title": { sq: "Dukja", en: "Appearance" },
  "settings.theme.darkMode": { sq: "M\xEBnyra e Err\xEBt", en: "Dark Mode" },
  "settings.theme.darkModeDesc": { sq: "Zvog\xEBlon ndri\xE7imin p\xEBr p\xEBrdorim nat\xEBn", en: "Reduces brightness for night use" },
  "settings.theme.accentColor": { sq: "Ngjyra thelb\xEBsore", en: "Accent Color" },
  "settings.theme.accentColorDesc": { sq: "Ndryshon ngjyr\xEBn kryesore t\xEB aplikacionit", en: "Changes the main color of the app" },
  "settings.theme.fontSize": { sq: "Madh\xEBsia e Tekstit", en: "Text Size" },
  "settings.theme.fontSizeDesc": { sq: "Rregullon madh\xEBsin\xEB e t\xEB gjith\xEB tekstit", en: "Adjusts the size of all text" },
  "settings.theme.color.purple": { sq: "Viole", en: "Purple" },
  "settings.theme.color.blue": { sq: "Blu", en: "Blue" },
  "settings.theme.color.green": { sq: "Gjelb\xEBr", en: "Green" },
  "settings.theme.color.orange": { sq: "Portokalli", en: "Orange" },
  "settings.theme.size.small": { sq: "I vog\xEBl", en: "Small" },
  "settings.theme.size.medium": { sq: "Mesatar", en: "Medium" },
  "settings.theme.size.large": { sq: "I madh", en: "Large" },
  // Onboarding Tour (Sprint 22)
  "tour.welcome.title": { sq: "Mir\xEBsevini n\xEB KidDok!", en: "Welcome to KidDok!" },
  "tour.welcome.body": { sq: "KidDok \xEBsht\xEB companioni juaj digjital p\xEBr sh\xEBndetin e f\xEBmij\xEBve. Monitoroni temperatura, rritjen, vaksinat dhe m\xEB shum\xEB \u2014 gjith\xE7ka n\xEB nj\xEB vend.", en: "KidDok is your digital health companion for your children. Track temperatures, growth, vaccines and more \u2014 all in one place." },
  "tour.child.title": { sq: "Shtoni Profilet e F\xEBmij\xEBve", en: "Add Your Children" },
  "tour.child.body": { sq: "Shtoni profilet e f\xEBmij\xEBve tuaj p\xEBr t\xEB filluar. P\xEBr \xE7do f\xEBmij\xEB mund t\xEB regjistroni temperatura, matje rritjeje dhe vaksina.", en: "Add profiles for your children to get started. For each child you can track temperatures, growth measurements, and vaccines." },
  "tour.temperature.title": { sq: "Ditari i Temperatur\xEBs", en: "Temperature Diary" },
  "tour.temperature.body": { sq: "Regjistroni temperatura me lexim automatik kohe. Kur temperatura arrin \xE2 \xA538.5\xB0C, do t\xEB merrni njoftim t\xEB menj\xEBhersh\xEBm.", en: "Log temperatures with automatic time tracking. When temperature reaches \xE2 \xA538.5\xB0C you will receive an immediate notification." },
  "tour.growth.title": { sq: "Ndjekja e Rritjes", en: "Growth Tracking" },
  "tour.growth.body": { sq: "Regjistroni gjat\xEBsin\xEB dhe pesh\xEBn e f\xEBmij\xEBs tuaj me grafik\xEB interaktive q\xEB tregon tendencat e rritjes me kalimin e koh\xEBs.", en: "Log your child's height and weight with interactive charts that show growth trends over time." },
  "tour.vaccines.title": { sq: "Planet e Vaksinave", en: "Vaccine Schedules" },
  "tour.vaccines.body": { sq: "Ndjekni kalendarin zyrtar t\xEB vaksinave t\xEB Shqip\xEBris\xEB. Merrni njoftime kur vaksina \xEBsht\xEB e vonuar ose e ardhshme.", en: "Track Albania's official vaccination schedule. Get alerts when a vaccine is overdue or coming up soon." },
  "tour.settings.title": { sq: "Konfigurimet", en: "Settings" },
  "tour.settings.body": { sq: "Menaxhoni profilet e f\xEBmij\xEBve, ndryshoni gjuh\xEBn, eksportoni t\xEB dh\xEBna dhe personalizoni aplikacionin sipas nevojave tuaja.", en: "Manage child profiles, switch languages, export data, and customize the app to your needs." },
  "tour.next": { sq: "Vazhdo", en: "Next" },
  "tour.finish": { sq: "Filloje !", en: "Get Started!" },
  "tour.skip": { sq: "Mos e trego m\xEB", en: "Don't show again" },
  // Tooltips (Sprint 22)
  "tooltip.tempNormal": { sq: "Temperatura normale (< 37.5\xB0C)", en: "Normal temperature (< 37.5\xB0C)" },
  "tooltip.tempFever": { sq: "Temperatura e lart\xEB (\xE2 \xA5 37.5\xB0C) \u2014 kontaktoni mjekun n\xEBse vazhdon", en: "Fever (\xE2 \xA5 37.5\xB0C) \u2014 contact doctor if persistent" },
  "tooltip.tempHigh": { sq: "Temperatura shum\xEB e lart\xEB (\xE2 \xA5 38.5\xB0C) \u2014 k\xEBrkoni ndihm\xEB mjek\xEBsore", en: "High fever (\xE2 \xA5 38.5\xB0C) \u2014 seek medical attention" },
  "tooltip.vaccineCompleted": { sq: "Vaksina \xEBsht\xEB b\xEBr\xEB me sukses", en: "Vaccine completed successfully" },
  "tooltip.vaccineOverdue": { sq: "Vaksina \xEBsht\xEB e vonuar \u2014 contactoni mjekun", en: "Vaccine is overdue \u2014 contact your doctor" },
  "tooltip.vaccineUpcoming": { sq: "Vaksina \xEBsht\xEB planifikuar s\xEB shpejti", en: "Vaccine is scheduled coming up" },
  "tooltip.percentile": { sq: "P\xEBrqindja n\xEB grafikun e rritjes s\xEB OMS \u2014 tregon krahasimin me f\xEBmij\xEBt e tjer\xEB t\xEB mosh\xEBs s\xEB nj\xEBjt\xEB", en: "Percentile on WHO growth chart \u2014 shows comparison with other children the same age" },
  // Growth Chart
  "growthChart.title": { sq: "Grafiku i Rritjes", en: "Growth Chart" },
  "growthChart.child": { sq: "F\xEBmija", en: "Child" },
  "growthChart.dateFrom": { sq: "Nga data", en: "From date" },
  "growthChart.dateTo": { sq: "Deri n\xEB dat\xEBn", en: "To date" },
  "growthChart.noData": { sq: "S'mund t\xEB vizualizohet \u2014 shtoni t\xEB pakt\xEBn 2 matje", en: "Can't visualize \u2014 add at least 2 measurements" },
  "growthChart.singleEntry": { sq: "Vet\xEBm nj\xEB matje \u2014 nevojiten t\xEB pakt\xEBn 2 p\xEBr grafikun", en: "Only one measurement \u2014 at least 2 needed for chart" },
  "growthChart.noChild": { sq: "Zgjidhni f\xEBmij\xEBn p\xEBr t\xEB par\xEB grafikun", en: "Select a child to view the chart" },
  "growthChart.heightLabel": { sq: "Gjat\xEBsia (cm)", en: "Height (cm)" },
  "growthChart.weightLabel": { sq: "Pesha (kg)", en: "Weight (kg)" },
  "growthChart.heightLabelImperial": { sq: "Gjat\xEBsia (in)", en: "Height (in)" },
  "growthChart.weightLabelImperial": { sq: "Pesha (lb)", en: "Weight (lb)" },
  "growthChart.clearFilter": { sq: "Fshi filtrin", en: "Clear filter" },
  // Sync Status
  "sync.conflictPanelTitle": { sq: "Konflikt i t\xEB Dh\xEBnave", en: "Data Conflict" },
  "sync.conflictPanelSubtitle": { sq: "T\xEB dh\xEBna q\xEB k\xEBrkojn\xEB rishikim manual", en: "Data requiring manual review" },
  "sync.medicalReview": { sq: "Rishikim Mjek\xEBsor", en: "Medical Review" },
  "sync.thisLocal": { sq: "Lokalisht", en: "Local" },
  "sync.server": { sq: "Serveri", en: "Server" },
  "sync.useLocal": { sq: "P\xEBrdor Lokalen", en: "Use Local" },
  "sync.useServer": { sq: "P\xEBrdor Serverin", en: "Use Server" },
  "sync.conflictFooterNote": { sq: "Konfliktet zgjidhen automatikisht p\xEBr t\xEB dh\xEBna jo-mjek\xEBsore.", en: "Non-medical data conflicts are resolved automatically." },
  "sync.syncing": { sq: "Duke sinkronizuar...", en: "Syncing..." },
  "sync.synced": { sq: "Sinkronizuar", en: "Synced" },
  "sync.error": { sq: "Gabim sinkronizimi", en: "Sync error" },
  "sync.conflict": { sq: "Konflikt", en: "Conflict" },
  "sync.retry": { sq: "Provo p\xEBrs\xEBri", en: "Retry" },
  "sync.pendingCount": { sq: "{n} n\xEB pritje", en: "{n} pending" }
};
var I18nService = class _I18nService {
  constructor() {
    this.STORAGE_KEY = "kiddok_locale";
    this.locale = signal(this.loadLocale(), ...ngDevMode ? [{ debugName: "locale" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isSq = computed(() => this.locale() === "sq", ...ngDevMode ? [{ debugName: "isSq" }] : (
      /* istanbul ignore next */
      []
    ));
    this.t = computed(() => {
      const lang = this.locale();
      const result = {};
      for (const key of Object.keys(translations)) {
        const val = translations[key];
        result[key] = val[lang] ?? String(val);
      }
      return result;
    }, ...ngDevMode ? [{ debugName: "t" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  loadLocale() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === "en" || stored === "sq")
        return stored;
    } catch (e) {
    }
    return "sq";
  }
  setLocale(lang) {
    this.locale.set(lang);
    try {
      localStorage.setItem(this.STORAGE_KEY, lang);
    } catch (e) {
    }
  }
  toggleLocale() {
    this.setLocale(this.locale() === "sq" ? "en" : "sq");
  }
  static {
    this.\u0275fac = function I18nService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _I18nService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _I18nService, factory: _I18nService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(I18nService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/notification.service.ts
var PREFS_KEY = "kiddok_notification_prefs";
var VACCINE_DUE_DAYS = 3;
var NotificationService = class _NotificationService {
  constructor() {
    this.i18n = inject(I18nService);
    this.data = inject(DataService);
    this.enabled = signal(false, ...ngDevMode ? [{ debugName: "enabled" }] : (
      /* istanbul ignore next */
      []
    ));
    this.feverAlerts = signal(true, ...ngDevMode ? [{ debugName: "feverAlerts" }] : (
      /* istanbul ignore next */
      []
    ));
    this.vaccineAlerts = signal(true, ...ngDevMode ? [{ debugName: "vaccineAlerts" }] : (
      /* istanbul ignore next */
      []
    ));
    this.dndStart = signal(22, ...ngDevMode ? [{ debugName: "dndStart" }] : (
      /* istanbul ignore next */
      []
    ));
    this.dndEnd = signal(7, ...ngDevMode ? [{ debugName: "dndEnd" }] : (
      /* istanbul ignore next */
      []
    ));
    this._initialized = false;
    this.loadPrefs();
    window.__kiddokNotif = this;
  }
  // ─── Preferences persistence ─────────────────────────────────
  loadPrefs() {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) {
        const prefs = JSON.parse(raw);
        this.enabled.set(prefs.enabled ?? false);
        this.feverAlerts.set(prefs.feverAlerts ?? true);
        this.vaccineAlerts.set(prefs.vaccineAlerts ?? true);
        this.dndStart.set(prefs.dndStart ?? 22);
        this.dndEnd.set(prefs.dndEnd ?? 7);
      }
    } catch (e) {
    }
    if (this.enabled() && Notification.permission === "default") {
      this.requestPermission();
    }
  }
  savePrefs() {
    const prefs = {
      enabled: this.enabled(),
      feverAlerts: this.feverAlerts(),
      vaccineAlerts: this.vaccineAlerts(),
      dndStart: this.dndStart(),
      dndEnd: this.dndEnd()
    };
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch (e) {
    }
  }
  // ─── Permission ──────────────────────────────────────────────
  get permissionLevel() {
    return Notification.permission;
  }
  get isSupported() {
    return typeof Notification !== "undefined";
  }
  requestPermission() {
    return __async(this, null, function* () {
      if (!this.isSupported)
        return false;
      try {
        const result = yield Notification.requestPermission();
        if (result === "granted") {
          this.enabled.set(true);
          this.savePrefs();
          return true;
        }
      } catch (e) {
      }
      return false;
    });
  }
  // ─── Master toggle (used by Settings) ────────────────────────
  toggleEnabled() {
    return __async(this, null, function* () {
      if (this.enabled()) {
        this.enabled.set(false);
        this.savePrefs();
        return;
      }
      if (Notification.permission === "denied") {
        console.warn("[NotificationService] Browser notifications permanently denied.");
        return;
      }
      const granted = yield this.requestPermission();
      if (!granted) {
        this.enabled.set(false);
      }
      this.savePrefs();
    });
  }
  updatePrefs(prefs) {
    if (prefs.enabled !== void 0)
      this.enabled.set(prefs.enabled);
    if (prefs.feverAlerts !== void 0)
      this.feverAlerts.set(prefs.feverAlerts);
    if (prefs.vaccineAlerts !== void 0)
      this.vaccineAlerts.set(prefs.vaccineAlerts);
    if (prefs.dndStart !== void 0)
      this.dndStart.set(prefs.dndStart);
    if (prefs.dndEnd !== void 0)
      this.dndEnd.set(prefs.dndEnd);
    this.savePrefs();
  }
  // ─── Do Not Disturb check ────────────────────────────────────
  isDndActive() {
    if (!this.enabled())
      return true;
    const now = /* @__PURE__ */ new Date();
    const hour = now.getHours();
    const { dndStart, dndEnd } = { dndStart: this.dndStart(), dndEnd: this.dndEnd() };
    if (dndStart < dndEnd) {
      return hour >= dndStart || hour < dndEnd;
    } else {
      return hour >= dndStart || hour < dndEnd;
    }
  }
  // ─── Core send ───────────────────────────────────────────────
  send(title, body, options) {
    if (!this.isSupported)
      return false;
    if (!this.enabled())
      return false;
    if (this.isDndActive())
      return false;
    if (Notification.permission !== "granted")
      return false;
    try {
      const notif = new Notification(title, __spreadValues({
        icon: "/assets/icons/icon-192x192.png",
        badge: "/assets/icons/icon-72x72.png",
        lang: this.i18n.locale() === "sq" ? "sq-AL" : "en-US",
        tag: "kiddok-notif"
      }, options));
      notif.onclick = () => {
        window.focus();
        notif.close();
      };
      return true;
    } catch (err) {
      console.error("[NotificationService] send failed:", err);
      return false;
    }
  }
  // ─── Fever alert ─────────────────────────────────────────────
  /**
   * Call after a temperature entry is saved.
   * Shows a browser notification if temp >= FEVER_THRESHOLD.
   */
  notifyFever(childName, temperature) {
    if (!this.feverAlerts())
      return;
    const t = this.i18n.t();
    const locale = this.i18n.locale();
    const title = t["notifications.fever.title"] ?? (locale === "sq" ? "Temperatura e lart\xEB!" : "High temperature!");
    const body = locale === "sq" ? `${temperature}\xB0C \u2014 ${childName}` : `${temperature}\xB0C \u2014 ${childName}`;
    this.send(title, body);
  }
  // ─── Vaccine alerts ───────────────────────────────────────────
  /**
   * Check all vaccine records for the active child and fire
   * notifications for due/overdue vaccines.
   * Call on app init / child switch.
   */
  checkVaccineAlerts() {
    if (!this.vaccineAlerts())
      return;
    const locale = this.i18n.locale();
    const t = this.i18n.t();
    const childId = this.data.activeChildId();
    if (!childId)
      return;
    const records = this.data.records().filter((r) => r.childId === childId);
    const now = Date.now();
    for (const record of records) {
      if (record.completed)
        continue;
      const dueMs = new Date(record.dueDate).getTime();
      const daysUntilDue = Math.ceil((dueMs - now) / 864e5);
      let shouldNotify = false;
      let title = "";
      let body = "";
      if (daysUntilDue < 0) {
        shouldNotify = true;
        const daysOverdue = Math.abs(daysUntilDue);
        title = t["notifications.vaccine.overdueTitle"] ?? (locale === "sq" ? "Vaksina e vonuar!" : "Vaccine overdue!");
        body = locale === "sq" ? `${record.title} \u2014 e vonuar ${daysOverdue} dit\xEB` : `${record.title} \u2014 ${daysOverdue} day${daysOverdue !== 1 ? "s" : ""} overdue`;
      } else if (daysUntilDue <= VACCINE_DUE_DAYS) {
        shouldNotify = true;
        title = t["notifications.vaccine.dueSoonTitle"] ?? (locale === "sq" ? "Vaksina p\xEBr shkak!" : "Vaccine due soon!");
        body = locale === "sq" ? `${record.title} \u2014 p\xEBr shkak ${daysUntilDue === 0 ? "sot" : `pas ${daysUntilDue} dit\xEBsh`}` : `${record.title} \u2014 due ${daysUntilDue === 0 ? "today" : `in ${daysUntilDue} days`}`;
      }
      if (shouldNotify) {
        this.send(title, body);
        break;
      }
    }
  }
  static {
    this.\u0275fac = function NotificationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

// src/app/services/data.service.ts
var DataService = class _DataService {
  constructor(http) {
    this.http = http;
    this.AUTH_KEY = "kiddok_access_token";
    this.CHILDREN_KEY = "kiddok_children";
    this.PARENT_KEY = "kiddok_parent_profile";
    this.ACTIVE_CHILD_KEY = "kiddok_active_child";
    this.API_URL = environment.apiUrl;
    this.toast = inject(ToastService);
    this.isAuthenticated = signal(!!localStorage.getItem(this.AUTH_KEY), ...ngDevMode ? [{ debugName: "isAuthenticated" }] : (
      /* istanbul ignore next */
      []
    ));
    this.children = signal([], ...ngDevMode ? [{ debugName: "children" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeChildId = signal(null, ...ngDevMode ? [{ debugName: "activeChildId" }] : (
      /* istanbul ignore next */
      []
    ));
    this.currentTab = signal("home", ...ngDevMode ? [{ debugName: "currentTab" }] : (
      /* istanbul ignore next */
      []
    ));
    this.illnesses = signal([], ...ngDevMode ? [{ debugName: "illnesses" }] : (
      /* istanbul ignore next */
      []
    ));
    this.records = signal([], ...ngDevMode ? [{ debugName: "records" }] : (
      /* istanbul ignore next */
      []
    ));
    this.temperatureEntries = signal([], ...ngDevMode ? [{ debugName: "temperatureEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.growthEntries = signal([], ...ngDevMode ? [{ debugName: "growthEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.vaccineRecords = signal([], ...ngDevMode ? [{ debugName: "vaccineRecords" }] : (
      /* istanbul ignore next */
      []
    ));
    this.parentProfile = signal({ name: "", surname: "", phone: "" }, ...ngDevMode ? [{ debugName: "parentProfile" }] : (
      /* istanbul ignore next */
      []
    ));
    this.diaryEntries = signal([], ...ngDevMode ? [{ debugName: "diaryEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.init();
  }
  init() {
    return __async(this, null, function* () {
      yield this.loadChildrenFromApi();
      const storedChildren = this.loadFromStorage(this.CHILDREN_KEY);
      if (storedChildren && storedChildren.length > 0 && this.children().length === 0) {
        this.children.set(storedChildren);
      }
      const storedParent = this.loadFromStorage(this.PARENT_KEY);
      if (storedParent) {
        this.parentProfile.set(storedParent);
      }
      const storedActiveId = localStorage.getItem(this.ACTIVE_CHILD_KEY);
      if (storedActiveId) {
        this.activeChildId.set(storedActiveId);
        this.loadChildDetails(storedActiveId);
      } else if (this.children().length > 0) {
        const first = this.children()[0];
        this.switchChild(first.id);
      }
    });
  }
  addDiaryEntry(entry) {
    const newEntry = __spreadProps(__spreadValues({}, entry), { id: "de_" + Date.now() });
    const updated = [newEntry, ...this.diaryEntries()];
    this.diaryEntries.set(updated);
    const cid = entry.childId;
    if (cid) {
      try {
        localStorage.setItem(`kiddok_diary_${cid}`, JSON.stringify(updated));
      } catch (e) {
      }
    }
    return newEntry;
  }
  getDiaryEntriesByChild(childId) {
    return this.diaryEntries().filter((e) => e.childId === childId);
  }
  loadDiaryEntries(childId) {
    const stored = localStorage.getItem(`kiddok_diary_${childId}`);
    this.diaryEntries.set(stored ? JSON.parse(stored) : []);
  }
  // ─── API calls ───────────────────────────────────────────────
  getHeaders() {
    const token = localStorage.getItem(this.AUTH_KEY);
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
  /** Sanitise avatar URL — only allow https:// DiceBear CDN */
  isValidUrl(url) {
    try {
      const u = new URL(url);
      return u.protocol === "https:" && u.hostname === "api.dicebear.com";
    } catch (e) {
      return false;
    }
  }
  /** Build a consistent DiceBear avatar URL from a child profile */
  getAvatarUrl(child) {
    const seed = child.avatarSeed || child.name;
    return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}`;
  }
  /** Generate a random avatar seed for a new child */
  generateAvatarSeed() {
    return "child_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8);
  }
  /** Load all children from PostgreSQL via REST */
  loadChildrenFromApi() {
    return __async(this, null, function* () {
      const token = localStorage.getItem(this.AUTH_KEY);
      if (!token)
        return;
      try {
        const children = yield firstValueFrom(this.http.get(`${this.API_URL}/children`, this.getHeaders()));
        const profiles = children.map((c) => ({
          id: c.id,
          userId: c.userId,
          name: c.name,
          dateOfBirth: c.dateOfBirth,
          avatarSeed: c.avatarSeed ?? void 0,
          gender: c.gender ?? void 0,
          bloodType: c.bloodType ?? void 0,
          birthWeight: c.birthWeight ?? void 0,
          deliveryDoctor: c.deliveryDoctor ?? void 0,
          criticalAllergies: c.criticalAllergies ?? void 0,
          allergies: c.allergies ?? void 0,
          medicalDocument: c.medicalDocument ?? void 0,
          documentIssueDate: c.documentIssueDate ?? void 0,
          medicalNotes: c.medicalNotes ?? void 0,
          avatarUrl: this.getAvatarUrl({ name: c.name, avatarSeed: c.avatarSeed ?? void 0 })
        }));
        this.children.set(profiles);
        this.saveToStorage(this.CHILDREN_KEY, profiles);
        this.cacheToOffline();
      } catch (err) {
        console.error("[DataService] loadChildrenFromApi failed:", err);
        this.toast.show("Ndodhi nj\xEB gabim, provoni p\xEBrs\xEBri", "error");
        yield this.loadFromOffline();
      }
    });
  }
  /** Create a new child via POST /children */
  createChild(data) {
    return __async(this, null, function* () {
      const avatarSeed = this.generateAvatarSeed();
      const payload = {
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        avatarSeed,
        gender: data.gender ?? null,
        bloodType: data.bloodType ?? null,
        birthWeight: data.birthWeight ?? null,
        deliveryDoctor: data.deliveryDoctor ?? null,
        criticalAllergies: data.criticalAllergies ?? null,
        allergies: data.allergies ?? null,
        medicalDocument: data.medicalDocument ?? null,
        documentIssueDate: data.documentIssueDate ? new Date(data.documentIssueDate) : null,
        medicalNotes: data.medicalNotes ?? null
      };
      try {
        const created = yield firstValueFrom(this.http.post(`${this.API_URL}/children`, payload, this.getHeaders()));
        const profile = {
          id: created.id,
          userId: created.userId,
          name: created.name,
          dateOfBirth: created.dateOfBirth,
          avatarSeed: created.avatarSeed ?? avatarSeed,
          gender: created.gender ?? void 0,
          bloodType: created.bloodType ?? void 0,
          birthWeight: created.birthWeight ?? void 0,
          deliveryDoctor: created.deliveryDoctor ?? void 0,
          criticalAllergies: created.criticalAllergies ?? void 0,
          avatarUrl: this.getAvatarUrl({ name: created.name, avatarSeed: created.avatarSeed ?? avatarSeed })
        };
        const updated = [...this.children(), profile];
        this.children.set(updated);
        this.saveToStorage(this.CHILDREN_KEY, updated);
        return profile;
      } catch (err) {
        console.error("[DataService] createChild failed:", err);
        this.toast.show("Ndodhi nj\xEB gabim, provoni p\xEBrs\xEBri", "error");
        throw err;
      }
    });
  }
  /** Update an existing child via PATCH /children/:id */
  updateChildApi(id, data) {
    return __async(this, null, function* () {
      const payload = {
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender ?? null,
        bloodType: data.bloodType ?? null,
        birthWeight: data.birthWeight ?? null,
        deliveryDoctor: data.deliveryDoctor ?? null,
        criticalAllergies: data.criticalAllergies ?? null,
        allergies: data.allergies ?? null,
        medicalNotes: data.medicalNotes ?? null
      };
      if (data.medicalDocument !== void 0) {
        payload.medicalDocument = data.medicalDocument;
      }
      if (data.documentIssueDate !== void 0) {
        payload.documentIssueDate = data.documentIssueDate ? new Date(data.documentIssueDate) : null;
      }
      try {
        const updated = yield firstValueFrom(this.http.patch(`${this.API_URL}/children/${id}`, payload, this.getHeaders()));
        const profile = {
          id: updated.id,
          userId: updated.userId,
          name: updated.name,
          dateOfBirth: updated.dateOfBirth,
          avatarSeed: updated.avatarSeed ?? void 0,
          gender: updated.gender ?? void 0,
          bloodType: updated.bloodType ?? void 0,
          birthWeight: updated.birthWeight ?? void 0,
          deliveryDoctor: updated.deliveryDoctor ?? void 0,
          criticalAllergies: updated.criticalAllergies ?? void 0,
          allergies: updated.allergies ?? void 0,
          medicalDocument: updated.medicalDocument ?? void 0,
          documentIssueDate: updated.documentIssueDate ?? void 0,
          medicalNotes: updated.medicalNotes ?? void 0,
          avatarUrl: this.getAvatarUrl({ name: updated.name, avatarSeed: updated.avatarSeed ?? void 0 })
        };
        const current = this.children().map((c) => c.id === id ? profile : c);
        this.children.set(current);
        this.saveToStorage(this.CHILDREN_KEY, current);
        return profile;
      } catch (err) {
        console.error("[DataService] updateChildApi failed:", err);
        this.toast.show("Ndodhi nj\xEB gabim, provoni p\xEBrs\xEBri", "error");
        throw err;
      }
    });
  }
  /** Delete a child via DELETE /children/:id */
  deleteChildApi(id) {
    return __async(this, null, function* () {
      try {
        yield firstValueFrom(this.http.delete(`${this.API_URL}/children/${id}`, this.getHeaders()));
      } catch (err) {
        console.error("[DataService] deleteChildApi failed:", err);
        this.toast.show("Ndodhi nj\xEB gabim, provoni p\xEBrs\xEBri", "error");
        throw err;
      }
      const updated = this.children().filter((c) => c.id !== id);
      this.children.set(updated);
      this.saveToStorage(this.CHILDREN_KEY, updated);
    });
  }
  loadTemperatureEntries(childId) {
    return __async(this, null, function* () {
      try {
        const entries = yield firstValueFrom(this.http.get(`${this.API_URL}/temperature-entries/child/${childId}`, this.getHeaders()));
        this.temperatureEntries.set(entries);
        this.cacheTemperaturesToOffline(entries);
        return entries;
      } catch (err) {
        console.error("[DataService] loadTemperatureEntries failed:", err);
        const offlineEntries = yield this.getOfflineTemperatures(childId);
        if (offlineEntries.length > 0)
          this.temperatureEntries.set(offlineEntries);
        return this.temperatureEntries();
      }
    });
  }
  cacheTemperaturesToOffline(entries) {
    return __async(this, null, function* () {
      try {
        const { OfflineService: OfflineService2 } = yield import("./chunk-OA3BFEGT.js");
        const svc = new OfflineService2();
        yield svc.saveTemperaturesToOffline(entries);
      } catch (e) {
      }
    });
  }
  getOfflineTemperatures(childId) {
    return __async(this, null, function* () {
      try {
        const { OfflineService: OfflineService2 } = yield import("./chunk-OA3BFEGT.js");
        const svc = new OfflineService2();
        return yield svc.getTemperaturesFromOffline(childId);
      } catch (e) {
        return [];
      }
    });
  }
  createTemperatureEntry(data) {
    return __async(this, null, function* () {
      try {
        const created = yield firstValueFrom(this.http.post(`${this.API_URL}/temperature-entries`, data, this.getHeaders()));
        const updated = [created, ...this.temperatureEntries()];
        this.temperatureEntries.set(updated);
        return created;
      } catch (err) {
        console.error("[DataService] createTemperatureEntry failed:", err);
        this.toast.show("Ndodhi nj\xEB gabim, provoni p\xEBrs\xEBri", "error");
        return null;
      }
    });
  }
  deleteTemperatureEntry(id) {
    return __async(this, null, function* () {
      try {
        yield firstValueFrom(this.http.delete(`${this.API_URL}/temperature-entries/${id}`, this.getHeaders()));
        const updated = this.temperatureEntries().filter((e) => e.id !== id);
        this.temperatureEntries.set(updated);
      } catch (err) {
        console.error("[DataService] deleteTemperatureEntry failed:", err);
        this.toast.show("Ndodhi nj\xEB gabim, provoni p\xEBrs\xEBri", "error");
      }
    });
  }
  loadGrowthEntries(childId) {
    return __async(this, null, function* () {
      try {
        const entries = yield firstValueFrom(this.http.get(`${this.API_URL}/growth-entries/child/${childId}`, this.getHeaders()));
        this.growthEntries.set(entries);
        this.cacheGrowthToOffline(entries);
        return entries;
      } catch (err) {
        console.error("[DataService] loadGrowthEntries failed:", err);
        const offlineEntries = yield this.getOfflineGrowth(childId);
        if (offlineEntries.length > 0)
          this.growthEntries.set(offlineEntries);
        return this.growthEntries();
      }
    });
  }
  cacheGrowthToOffline(entries) {
    return __async(this, null, function* () {
      try {
        const { OfflineService: OfflineService2 } = yield import("./chunk-OA3BFEGT.js");
        const svc = new OfflineService2();
        yield svc.saveGrowthToOffline(entries);
      } catch (e) {
      }
    });
  }
  getOfflineGrowth(childId) {
    return __async(this, null, function* () {
      try {
        const { OfflineService: OfflineService2 } = yield import("./chunk-OA3BFEGT.js");
        const svc = new OfflineService2();
        return yield svc.getGrowthFromOffline(childId);
      } catch (e) {
        return [];
      }
    });
  }
  loadVaccineRecords(childId) {
    return __async(this, null, function* () {
      try {
        const records = yield firstValueFrom(this.http.get(`${this.API_URL}/vaccines/child/${childId}`, this.getHeaders()));
        this.vaccineRecords.set(records);
        this.cacheVaccinesToOffline(records);
        return records;
      } catch (err) {
        console.error("[DataService] loadVaccineRecords failed:", err);
        const offlineRecords = yield this.getOfflineVaccines(childId);
        if (offlineRecords.length > 0)
          this.vaccineRecords.set(offlineRecords);
        return this.vaccineRecords();
      }
    });
  }
  cacheVaccinesToOffline(records) {
    return __async(this, null, function* () {
      try {
        const { OfflineService: OfflineService2 } = yield import("./chunk-OA3BFEGT.js");
        const svc = new OfflineService2();
        yield svc.saveVaccinesToOffline(records);
      } catch (e) {
      }
    });
  }
  getOfflineVaccines(childId) {
    return __async(this, null, function* () {
      try {
        const { OfflineService: OfflineService2 } = yield import("./chunk-OA3BFEGT.js");
        const svc = new OfflineService2();
        return yield svc.getVaccinesFromOffline(childId);
      } catch (e) {
        return [];
      }
    });
  }
  exportChildCsv(childId) {
    return __async(this, null, function* () {
      try {
        const response = yield firstValueFrom(this.http.get(`${this.API_URL}/export/${childId}/csv`, __spreadProps(__spreadValues({}, this.getHeaders()), {
          responseType: "blob"
        })));
        const url = URL.createObjectURL(response);
        const a = document.createElement("a");
        a.href = url;
        const contentDisposition = response["type"];
        a.download = `kiddok_export_${childId}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("[DataService] exportChildCsv failed:", err);
        this.toast.show("Eksportimi d\xEBshtoi. Provoni p\xEBrs\xEBri.", "error");
      }
    });
  }
  createGrowthEntry(data) {
    return __async(this, null, function* () {
      try {
        const created = yield firstValueFrom(this.http.post(`${this.API_URL}/growth-entries`, data, this.getHeaders()));
        const updated = [created, ...this.growthEntries()];
        this.growthEntries.set(updated);
        return created;
      } catch (err) {
        console.error("[DataService] createGrowthEntry failed:", err);
        this.toast.show("Ndodhi nj\xEB gabim, provoni p\xEBrs\xEBri", "error");
        return null;
      }
    });
  }
  deleteGrowthEntry(id) {
    return __async(this, null, function* () {
      try {
        yield firstValueFrom(this.http.delete(`${this.API_URL}/growth-entries/${id}`, this.getHeaders()));
        const updated = this.growthEntries().filter((e) => e.id !== id);
        this.growthEntries.set(updated);
      } catch (err) {
        console.error("[DataService] deleteGrowthEntry failed:", err);
        this.toast.show("Ndodhi nj\xEB gabim, provoni p\xEBrs\xEBri", "error");
      }
    });
  }
  // ─── Auth ───────────────────────────────────────────────────
  login(username, password) {
    return __async(this, null, function* () {
      if (password === "1234") {
        try {
          const result = yield firstValueFrom(this.http.post("http://localhost:3000/auth/dev-login", {
            pin: "1234",
            name: username || "Dev Parent"
          }));
          localStorage.setItem(this.AUTH_KEY, result.access_token);
          this.isAuthenticated.set(true);
          yield this.loadChildrenFromApi();
          return true;
        } catch (err) {
          console.error("[DataService] dev-login failed:", err);
          this.toast.show("Ndodhi nj\xEB gabim, provoni p\xEBrs\xEBri", "error");
          localStorage.setItem(this.AUTH_KEY, "dev-token-" + Date.now());
          this.isAuthenticated.set(true);
          return true;
        }
      }
      return false;
    });
  }
  logout() {
    localStorage.removeItem(this.AUTH_KEY);
    this.isAuthenticated.set(false);
    this.children.set([]);
    this.activeChildId.set(null);
    this.illnesses.set([]);
    this.records.set([]);
    localStorage.removeItem(this.ACTIVE_CHILD_KEY);
  }
  // ─── Children (local helpers still used for in-memory state) ──
  addChild(name, dateOfBirth, birthWeight, deliveryDoctor, bloodType) {
    const avatarSeed = this.generateAvatarSeed();
    const newChild = {
      id: "child_" + Date.now(),
      userId: "parent_1",
      name,
      dateOfBirth,
      avatarSeed,
      birthWeight,
      deliveryDoctor,
      bloodType,
      avatarUrl: this.getAvatarUrl({ name, avatarSeed })
    };
    const updated = [...this.children(), newChild];
    this.children.set(updated);
    this.saveToStorage(this.CHILDREN_KEY, updated);
    this.switchChild(newChild.id);
  }
  updateChild(id, name, dateOfBirth, birthWeight, deliveryDoctor, bloodType) {
    const updated = this.children().map((c) => {
      if (c.id !== id)
        return c;
      return __spreadProps(__spreadValues({}, c), { name, dateOfBirth, birthWeight, deliveryDoctor, bloodType });
    });
    this.children.set(updated);
    this.saveToStorage(this.CHILDREN_KEY, updated);
  }
  switchChild(id) {
    this.activeChildId.set(id);
    localStorage.setItem(this.ACTIVE_CHILD_KEY, id);
    this.loadChildDetails(id);
  }
  loadChildDetails(childId) {
    const storedIllnesses = localStorage.getItem(`kiddok_illnesses_${childId}`);
    this.illnesses.set(storedIllnesses ? JSON.parse(storedIllnesses) : []);
    const storedRecords = localStorage.getItem(`kiddok_records_${childId}`);
    this.records.set(storedRecords ? JSON.parse(storedRecords) : []);
    this.loadTemperatureEntries(childId);
    this.loadGrowthEntries(childId);
    setTimeout(() => {
      try {
        const notifSvc = new NotificationService();
        notifSvc.checkVaccineAlerts();
      } catch (e) {
      }
    }, 0);
  }
  // ─── Medical Records (localStorage) ─────────────────────────
  addIllness(data) {
    const cid = this.activeChildId();
    if (!cid)
      return;
    const episode = {
      id: "ill_" + Date.now(),
      childId: cid,
      title: data.title || "",
      symptoms: data.symptoms || "",
      medications: data.medications || "",
      loggedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const updated = [...this.illnesses(), episode];
    this.illnesses.set(updated);
    localStorage.setItem(`kiddok_illnesses_${cid}`, JSON.stringify(updated));
  }
  addVaccine(data) {
    const cid = this.activeChildId();
    if (!cid)
      return;
    const record = {
      id: "rec_" + Date.now(),
      childId: cid,
      title: data.title || "",
      dueDate: data.dueDate || "",
      completed: false,
      notes: data.notes || ""
    };
    const updated = [...this.records(), record];
    this.records.set(updated);
    localStorage.setItem(`kiddok_records_${cid}`, JSON.stringify(updated));
  }
  // ─── Parent Profile ──────────────────────────────────────────
  fetchParentProfile() {
    return __async(this, null, function* () {
      const stored = this.loadFromStorage(this.PARENT_KEY);
      if (stored) {
        this.parentProfile.set(stored);
        return stored;
      }
      try {
        const token = localStorage.getItem(this.AUTH_KEY);
        if (!token)
          return { name: "", surname: "", phone: "" };
        const profile = yield firstValueFrom(this.http.get(`${this.API_URL}/parent`, this.getHeaders()));
        this.parentProfile.set(profile);
        this.saveToStorage(this.PARENT_KEY, profile);
        return profile;
      } catch (e) {
        return { name: "", surname: "", phone: "" };
      }
    });
  }
  updateParentProfile(data) {
    return __async(this, null, function* () {
      const updated = __spreadValues(__spreadValues({}, this.parentProfile()), data);
      try {
        const result = yield firstValueFrom(this.http.patch(`${this.API_URL}/parent`, data, this.getHeaders()));
        this.parentProfile.set(result);
        this.saveToStorage(this.PARENT_KEY, result);
        return result;
      } catch (err) {
        console.error("[DataService] updateParentProfile failed:", err);
        this.toast.show("Ndodhi nj\xEB gabim, provoni p\xEBrs\xEBri", "error");
        this.parentProfile.set(updated);
        this.saveToStorage(this.PARENT_KEY, updated);
        return updated;
      }
    });
  }
  deleteChild(childId) {
    return __async(this, null, function* () {
      try {
        yield firstValueFrom(this.http.delete(`${this.API_URL}/children/${childId}`, this.getHeaders()));
      } catch (e) {
      }
      const updated = this.children().filter((c) => c.id !== childId);
      this.children.set(updated);
      this.saveToStorage(this.CHILDREN_KEY, updated);
      try {
        localStorage.removeItem(`kiddok_diary_${childId}`);
        localStorage.removeItem(`kiddok_illnesses_${childId}`);
        localStorage.removeItem(`kiddok_records_${childId}`);
      } catch (e) {
      }
      if (this.activeChildId() === childId) {
        const next = updated[0];
        if (next)
          this.switchChild(next.id);
        else
          this.activeChildId.set(null);
      }
    });
  }
  clearAllData() {
    return __async(this, null, function* () {
      try {
        localStorage.clear();
      } catch (e) {
      }
      this.children.set([]);
      this.parentProfile.set({ name: "", surname: "", phone: "" });
      this.activeChildId.set(null);
      this.illnesses.set([]);
      this.records.set([]);
      this.temperatureEntries.set([]);
      this.growthEntries.set([]);
      this.diaryEntries.set([]);
    });
  }
  exportAllData() {
    const children = this.children();
    const exportData = {
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      version: "1.0.0",
      parentProfile: this.parentProfile(),
      children: children.map((child) => __spreadProps(__spreadValues({}, child), {
        diary: this.getDiaryEntriesByChild(child.id),
        illnesses: this.illnesses().filter((i) => i.childId === child.id),
        records: this.records().filter((r) => r.childId === child.id)
      }))
    };
    return exportData;
  }
  saveParentProfile(profile) {
    this.parentProfile.set(profile);
    this.saveToStorage(this.PARENT_KEY, profile);
  }
  getParentName() {
    return this.parentProfile().name;
  }
  getChildAge(child) {
    const today = /* @__PURE__ */ new Date();
    const dob = new Date(child.dateOfBirth);
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    const dayDiff = today.getDate() - dob.getDate();
    if (dayDiff < 0) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }
    return { years, months };
  }
  // ─── Helpers ────────────────────────────────────────────────
  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
    }
  }
  loadFromStorage(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
  // ─── Offline / IndexedDB helpers ───────────────────────────
  cacheToOffline() {
    return __async(this, null, function* () {
      try {
        const offlineService = new (yield import("./chunk-OA3BFEGT.js")).OfflineService();
        yield offlineService.saveChildrenToOffline(this.children());
        const activeId = this.activeChildId();
        if (activeId) {
          yield offlineService.saveTemperaturesToOffline(this.temperatureEntries());
          yield offlineService.saveGrowthToOffline(this.growthEntries());
          yield offlineService.saveVaccinesToOffline(this.vaccineRecords());
          yield offlineService.saveDiaryToOffline(this.diaryEntries());
        }
      } catch (e) {
      }
    });
  }
  loadFromOffline() {
    return __async(this, null, function* () {
      try {
        const { OfflineService: OfflineService2 } = yield import("./chunk-OA3BFEGT.js");
        const offlineService = new OfflineService2();
        const cachedChildren = yield offlineService.getChildrenFromOffline();
        if (cachedChildren.length > 0) {
          this.children.set(cachedChildren);
          this.saveToStorage(this.CHILDREN_KEY, cachedChildren);
          const firstChild = cachedChildren[0];
          this.activeChildId.set(firstChild.id);
          localStorage.setItem(this.ACTIVE_CHILD_KEY, firstChild.id);
          yield offlineService.loadCachedChildData(firstChild.id);
        }
      } catch (e) {
      }
    });
  }
  static {
    this.\u0275fac = function DataService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DataService, factory: _DataService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/services/offline.service.ts
var DB_NAME = "kiddok_offline";
var DB_VERSION = 1;
var STORE_CHILDREN = "children";
var STORE_TEMPERATURES = "temperatures";
var STORE_GROWTH = "growth";
var STORE_VACCINES = "vaccines";
var STORE_DIARY = "diary";
var STORE_PARENT = "parent";
var STORE_SYNC_QUEUE = "sync_queue";
var OfflineService = class _OfflineService {
  getSyncServiceAsync() {
    return __async(this, null, function* () {
      if (this._syncService)
        return this._syncService;
      const injector = window.__angularInjector__;
      if (injector) {
        const { SyncService } = yield import("./chunk-GAOPM3OG.js");
        this._syncService = injector.get(SyncService);
      }
      if (!this._syncService) {
        throw new Error("SyncService not available \u2014 ensure __angularInjector__ is set");
      }
      return this._syncService;
    });
  }
  constructor() {
    this.http = inject(HttpClient);
    this.dataService = inject(DataService);
    this.toast = inject(ToastService);
    this.ngZone = inject(NgZone);
    this._syncService = null;
    this.isOnline = signal(navigator.onLine, ...ngDevMode ? [{ debugName: "isOnline" }] : (
      /* istanbul ignore next */
      []
    ));
    this.hasPendingSync = signal(false, ...ngDevMode ? [{ debugName: "hasPendingSync" }] : (
      /* istanbul ignore next */
      []
    ));
    this.db = null;
    this.initDb();
    this.setupOnlineListeners();
  }
  // ─── IndexedDB Setup ──────────────────────────────────────────
  initDb() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          this.db = request.result;
          resolve();
        };
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(STORE_CHILDREN)) {
            db.createObjectStore(STORE_CHILDREN, { keyPath: "id" });
          }
          if (!db.objectStoreNames.contains(STORE_TEMPERATURES)) {
            const tempStore = db.createObjectStore(STORE_TEMPERATURES, { keyPath: "id" });
            tempStore.createIndex("childId", "childId", { unique: false });
          }
          if (!db.objectStoreNames.contains(STORE_GROWTH)) {
            const growthStore = db.createObjectStore(STORE_GROWTH, { keyPath: "id" });
            growthStore.createIndex("childId", "childId", { unique: false });
          }
          if (!db.objectStoreNames.contains(STORE_VACCINES)) {
            const vaccineStore = db.createObjectStore(STORE_VACCINES, { keyPath: "id" });
            vaccineStore.createIndex("childId", "childId", { unique: false });
          }
          if (!db.objectStoreNames.contains(STORE_DIARY)) {
            const diaryStore = db.createObjectStore(STORE_DIARY, { keyPath: "id" });
            diaryStore.createIndex("childId", "childId", { unique: false });
          }
          if (!db.objectStoreNames.contains(STORE_PARENT)) {
            db.createObjectStore(STORE_PARENT, { keyPath: "key" });
          }
          if (!db.objectStoreNames.contains(STORE_SYNC_QUEUE)) {
            const syncStore = db.createObjectStore(STORE_SYNC_QUEUE, { keyPath: "id", autoIncrement: true });
            syncStore.createIndex("timestamp", "timestamp", { unique: false });
          }
        };
      });
    });
  }
  getDb() {
    return __async(this, null, function* () {
      if (this.db)
        return this.db;
      yield this.initDb();
      return this.db;
    });
  }
  // ─── Online/Offline Detection ─────────────────────────────────
  setupOnlineListeners() {
    window.addEventListener("online", () => {
      this.ngZone.run(() => {
        this.isOnline.set(true);
        this.toast.show(this.isSq() ? "Jeni online! Duke sinkronizuar t\xEB dh\xEBnat..." : "You are online! Syncing data...", "success");
        this.processSyncQueue();
      });
    });
    window.addEventListener("offline", () => {
      this.ngZone.run(() => {
        this.isOnline.set(false);
        this.toast.show(this.isSq() ? "Jeni offline. T\xEB dh\xEBnat do t\xEB ruhen lokalisht." : "You are offline. Data will be saved locally.", "info");
      });
    });
  }
  isSq() {
    try {
      const locale = localStorage.getItem("kiddok_locale") || "sq";
      return locale === "sq";
    } catch (e) {
      return true;
    }
  }
  // ─── Children ─────────────────────────────────────────────────
  saveChildrenToOffline(children) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_CHILDREN, "readwrite");
      const store = tx.objectStore(STORE_CHILDREN);
      store.clear();
      for (const child of children) {
        store.put(child);
      }
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  getChildrenFromOffline() {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_CHILDREN, "readonly");
      const store = tx.objectStore(STORE_CHILDREN);
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Temperature Entries ──────────────────────────────────────
  saveTemperaturesToOffline(entries) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_TEMPERATURES, "readwrite");
      const store = tx.objectStore(STORE_TEMPERATURES);
      store.clear();
      for (const entry of entries) {
        store.put(entry);
      }
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  getTemperaturesFromOffline(childId) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_TEMPERATURES, "readonly");
      const store = tx.objectStore(STORE_TEMPERATURES);
      const index = store.index("childId");
      return new Promise((resolve, reject) => {
        const request = index.getAll(childId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Growth Entries ───────────────────────────────────────────
  saveGrowthToOffline(entries) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_GROWTH, "readwrite");
      const store = tx.objectStore(STORE_GROWTH);
      store.clear();
      for (const entry of entries) {
        store.put(entry);
      }
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  getGrowthFromOffline(childId) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_GROWTH, "readonly");
      const store = tx.objectStore(STORE_GROWTH);
      const index = store.index("childId");
      return new Promise((resolve, reject) => {
        const request = index.getAll(childId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Vaccine Records ──────────────────────────────────────────
  saveVaccinesToOffline(records) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_VACCINES, "readwrite");
      const store = tx.objectStore(STORE_VACCINES);
      store.clear();
      for (const record of records) {
        store.put(record);
      }
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  getVaccinesFromOffline(childId) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_VACCINES, "readonly");
      const store = tx.objectStore(STORE_VACCINES);
      const index = store.index("childId");
      return new Promise((resolve, reject) => {
        const request = index.getAll(childId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Diary Entries ───────────────────────────────────────────
  saveDiaryToOffline(entries) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_DIARY, "readwrite");
      const store = tx.objectStore(STORE_DIARY);
      store.clear();
      for (const entry of entries) {
        store.put(entry);
      }
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  getDiaryFromOffline(childId) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_DIARY, "readonly");
      const store = tx.objectStore(STORE_DIARY);
      const index = store.index("childId");
      return new Promise((resolve, reject) => {
        const request = index.getAll(childId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Sync Queue ───────────────────────────────────────────────
  getSyncQueueEntries() {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_SYNC_QUEUE, "readonly");
      const store = tx.objectStore(STORE_SYNC_QUEUE);
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  addToSyncQueue(entry) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_SYNC_QUEUE, "readwrite");
      const store = tx.objectStore(STORE_SYNC_QUEUE);
      const queueEntry = __spreadProps(__spreadValues({}, entry), { timestamp: Date.now() });
      store.add(queueEntry);
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => {
          this.hasPendingSync.set(true);
          resolve();
        };
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  processSyncQueue() {
    return __async(this, null, function* () {
      if (!navigator.onLine)
        return;
      const db = yield this.getDb();
      const tx = db.transaction(STORE_SYNC_QUEUE, "readonly");
      const store = tx.objectStore(STORE_SYNC_QUEUE);
      const entries = yield new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      if (entries.length === 0) {
        this.hasPendingSync.set(false);
        return;
      }
      const syncEntries = entries.sort((a, b) => a.timestamp - b.timestamp).map((entry) => ({
        entityType: entry.entity,
        action: entry.action,
        data: entry.body,
        localTimestamp: entry.timestamp
      }));
      try {
        const result = yield (yield this.getSyncServiceAsync()).triggerFullSync(syncEntries);
        if (result.success || result.conflicts.length > 0) {
          const deleteTx = db.transaction(STORE_SYNC_QUEUE, "readwrite");
          const deleteStore = deleteTx.objectStore(STORE_SYNC_QUEUE);
          for (const entry of entries) {
            if (entry.id !== void 0)
              deleteStore.delete(entry.id);
          }
          if (result.conflicts.length > 0) {
            const conflictIds = new Set(result.conflicts.map((c) => c.entityId));
            this.toast.show(this.isSq() ? `${result.conflicts.length} konflikt u.detektua \u2014 rishikoni manualisht` : `${result.conflicts.length} conflict(s) detected \u2014 review manually`, "info");
          }
          const remaining = result.failedCount;
          this.hasPendingSync.set(remaining > 0);
          const successCount = result.syncedCount;
          if (successCount > 0) {
            this.toast.show(this.isSq() ? `${successCount} t\xEB dh\xEBna u sinkronizuan!` : `${successCount} items synced!`, "success");
          }
        } else {
          this.hasPendingSync.set(true);
          this.toast.show(this.isSq() ? "Sinkronizimi d\xEBshtoi. Do t\xEB provohet p\xEBrs\xEBri." : "Sync failed. Will retry automatically.", "error");
        }
      } catch (e) {
        this.hasPendingSync.set(true);
      }
    });
  }
  getSyncQueueCount() {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_SYNC_QUEUE, "readonly");
      const store = tx.objectStore(STORE_SYNC_QUEUE);
      return new Promise((resolve, reject) => {
        const request = store.count();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Cache All Child Data ─────────────────────────────────────
  cacheAllData() {
    return __async(this, null, function* () {
      try {
        yield this.saveChildrenToOffline(this.dataService.children());
        const activeChildId = this.dataService.activeChildId();
        if (activeChildId) {
          yield this.saveTemperaturesToOffline(this.dataService.temperatureEntries());
          yield this.saveGrowthToOffline(this.dataService.growthEntries());
          yield this.saveVaccinesToOffline(this.dataService.vaccineRecords());
          yield this.saveDiaryToOffline(this.dataService.diaryEntries());
        }
      } catch (err) {
        console.error("[OfflineService] cacheAllData failed:", err);
      }
    });
  }
  // ─── Load from Offline (fallback when API fails) ───────────────
  loadCachedChildData(childId) {
    return __async(this, null, function* () {
      const [temps, growth, vaccines, diary] = yield Promise.all([
        this.getTemperaturesFromOffline(childId),
        this.getGrowthFromOffline(childId),
        this.getVaccinesFromOffline(childId),
        this.getDiaryFromOffline(childId)
      ]);
      if (temps.length > 0)
        this.dataService.temperatureEntries.set(temps);
      if (growth.length > 0)
        this.dataService.growthEntries.set(growth);
      if (vaccines.length > 0)
        this.dataService.vaccineRecords.set(vaccines);
      if (diary.length > 0)
        this.dataService.diaryEntries.set(diary);
    });
  }
  loadCachedChildren() {
    return __async(this, null, function* () {
      return this.getChildrenFromOffline();
    });
  }
  static {
    this.\u0275fac = function OfflineService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OfflineService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OfflineService, factory: _OfflineService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OfflineService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  I18nService,
  NotificationService,
  OfflineService,
  DataService
};
//# sourceMappingURL=chunk-GXWKIRAT.js.map
