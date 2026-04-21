import { Injectable, signal, computed } from '@angular/core';

export type Locale = 'sq' | 'en';

type RawTranslations = typeof translations;
const translations = {
  // Sidebar
  'sidebar.brand': { sq: 'KidDok', en: 'KidDok' },
  'sidebar.activeChild': { sq: 'Fëmija Aktiv', en: 'Active Child' },
  'sidebar.noChildSelected': { sq: 'Zgjidhni Profilin', en: 'Select Profile' },
  'sidebar.ageFormat': { sq: '{n} vjeç', en: '{n} years' },
  'sidebar.ageFormatMonths': { sq: '{n} muaj', en: '{n} months' },
  'sidebar.nav.home': { sq: 'Ekrani Kryesor', en: 'Dashboard' },
  'sidebar.nav.temperature': { sq: 'Temperatura', en: 'Temperature' },
  'sidebar.nav.growth': { sq: 'Rritja', en: 'Growth' },
  'sidebar.nav.diary': { sq: 'Ditari', en: 'Diary' },
  'sidebar.nav.vaccines': { sq: 'Vaksinat', en: 'Vaccines' },
  'sidebar.nav.settings': { sq: 'Konfigurime', en: 'Settings' },
  'sidebar.footer.settings': { sq: 'Konfigurime', en: 'Settings' },
  'sidebar.footer.logout': { sq: 'Dil nga Sistemi', en: 'Sign Out' },
  // Bottom Nav
  'bottomNav.home': { sq: 'Ballina', en: 'Home' },
  'bottomNav.temperature': { sq: 'Temperatura', en: 'Temperature' },
  'bottomNav.growth': { sq: 'Rritja', en: 'Growth' },
  'bottomNav.diary': { sq: 'Ditari', en: 'Diary' },
  'bottomNav.vaccines': { sq: 'Vaksinat', en: 'Vaccines' },
  // Navigation
  'nav.home': { sq: 'Ekrani Kryesor', en: 'Dashboard' },
  'nav.diary': { sq: 'Ditari Mjekësor', en: 'Medical Diary' },
  'nav.records': { sq: 'Dosja & Vaksinat', en: 'Records & Vaccines' },
  'nav.settings': { sq: 'Konfigurime', en: 'Settings' },
  'nav.temperatureDiary': { sq: 'Ditari i Temperaturës', en: 'Temperature Diary' },
  'nav.growthTracking': { sq: 'Rritja', en: 'Growth' },
  // Sidebar
  'sidebar.logout': { sq: 'Dil nga Sistemi', en: 'Sign Out' },
  // Language
  'language.label': { sq: 'Gjuha', en: 'Language' },
  // Child form labels
  'child.addNew': { sq: 'Regjistro Profilin e Fëmijës', en: 'Register Child Profile' },
  'child.addNewBtn': { sq: 'Shto Pjestar të Ri', en: 'Add New Member' },
  'child.switchProfile': { sq: 'Profili i Fëmijës', en: 'Child Profile' },
  'child.born': { sq: 'Lindur', en: 'Born' },
  'child.fullName': { sq: 'Emri i Plotë', en: 'Full Name' },
  'child.dateOfBirth': { sq: 'Data e Lindjes', en: 'Date of Birth' },
  'child.birthWeight': { sq: 'Pesha në Lindje (kg)', en: 'Birth Weight (kg)' },
  'child.bloodType': { sq: 'Grupi i Gjakut', en: 'Blood Type' },
  'child.deliveryDoctor': { sq: 'Doktori që ndihmoi në lindje', en: 'Delivery Doctor' },
  'child.saveProfile': { sq: 'Ruaj Profilin', en: 'Save Profile' },
  'child.save': { sq: 'Ruaj', en: 'Save' },
  'child.cancel': { sq: 'Anulo', en: 'Cancel' },
  'child.welcome': { sq: 'Mirësevini në KidDok', en: 'Welcome to KidDok' },
  'child.welcomeSub': {
    sq: 'Ky është laboratori juaj dixhital. Gjithçka është gati dhe e lidhur me bazën e të dhënave. Shtoni profilin e parë për të nisur!',
    en: 'This is your digital health companion. Everything is set up and connected. Add your first profile to get started!',
  },
  'child.selectChild': { sq: 'Zgjidhni ose shtoni një fëmijë', en: 'Select or add a child' },
  'child.switchChild': { sq: 'Ndërro Fëmijën', en: 'Switch Child' },
  // Header
  'header.switchChild': { sq: 'Ndërro Fëmijën', en: 'Switch Child' },
  'header.addNewMember': { sq: 'Shto Pjestar të Ri', en: 'Add New Member' },
  'header.noChildrenPlaceholder': { sq: 'Akzni s\'ka fëmijë', en: 'No children added yet' },
  'header.profileLabel': { sq: 'Profili i Fëmijës', en: 'Child Profile' },
  'nav.back': { sq: 'Kthehu', en: 'Back' },
  'child.goToSelector': { sq: 'Shko te Zgjidhni Fëmijën', en: 'Go to Child Selector' },
  'welcome.loggedIn': { sq: 'Mirëserdhje', en: 'Welcome back' },
  // Diary / Calendar
  'diary.title': { sq: 'Ditari Mjekësor', en: 'Medical Diary' },
  'diary.subtitle': { sq: 'Klikoni një datë për të regjistruar simptoma, temperaturë ose ilaçe.', en: 'Click a date to log symptoms, temperature, or medications.' },
  'diary.addEntry': { sq: 'Shto Regjistrim', en: 'Add Entry' },
  'diary.noEntries': { sq: 'Nuk ka regjistrime për këtë datë.', en: 'No entries for this date.' },
  'diary.today': { sq: 'Sot', en: 'Today' },
  'diary.symptoms': { sq: 'Simptomat', en: 'Symptoms' },
  'diary.temperature': { sq: 'Temperatura', en: 'Temperature' },
  'diary.medication': { sq: 'Medikamenti', en: 'Medication' },
  'diary.symptomTypes.fever': { sq: 'Ethet', en: 'Fever' },
  'diary.symptomTypes.cough': { sq: 'Kollë', en: 'Cough' },
  'diary.symptomTypes.vomit': { sq: 'Dridhje', en: 'Vomiting' },
  'diary.symptomTypes.diarrhea': { sq: 'Diarre', en: 'Diarrhea' },
  'diary.symptomTypes.headache': { sq: 'Dhimbje kokë', en: 'Headache' },
  'diary.symptomTypes.rash': { sq: 'Skuqje', en: 'Rash' },
  'diary.temperatureReading': { sq: 'Leximi i temperaturës (°C)', en: 'Temperature reading (°C)' },
  'diary.temperatureTime': { sq: 'Ora e matjes', en: 'Time of reading' },
  'diary.medicationName': { sq: 'Emri i ilaçit', en: 'Medication name' },
  'diary.medicationDose': { sq: 'Doza', en: 'Dose' },
  'diary.medicationTime': { sq: 'Ora e marrjes', en: 'Time taken' },
  'diary.effectiveness': { sq: 'Efektiviteti', en: 'Effectiveness' },
  'diary.effectivenessOptions.none': { sq: 'Pa efekt', en: 'No effect' },
  'diary.effectivenessOptions.mild': { sq: 'Efekt i lehtë', en: 'Mild' },
  'diary.effectivenessOptions.good': { sq: 'Efekt i mirë', en: 'Good' },
  'diary.effectivenessOptions.great': { sq: 'Shumë i mirë', en: 'Very good' },
  'diary.save': { sq: 'Ruaj', en: 'Save' },
  'diary.cancel': { sq: 'Anulo', en: 'Cancel' },
  'diary.close': { sq: 'Mbyll', en: 'Close' },
  'diary.notes': { sq: 'Shënime', en: 'Notes' },
  'settings.parentProfile': { sq: 'Profili i Prindit', en: 'Parent Profile' },
  'settings.name': { sq: 'Emri', en: 'First Name' },
  'settings.surname': { sq: 'Mbiemri', en: 'Surname' },
  'settings.phone': { sq: 'Numri i Telefonit', en: 'Phone Number' },
  'settings.saveChanges': { sq: 'Ruaj Ndryshimet', en: 'Save Changes' },
  'settings.saved': { sq: 'Të dhënat u ruajtën!', en: 'Changes saved!' },
  // Placeholders
  'placeholder.fullName': { sq: 'P.sh. Elena Hoxha', en: 'e.g. Elena Hoxha' },
  'placeholder.deliveryDoctor': { sq: 'P.sh. Dr. Blerina Doko', en: 'e.g. Dr. John Smith' },
  'placeholder.birthWeight': { sq: 'P.sh. 3.2', en: 'e.g. 7.1' },
  'placeholder.allergies': { sq: 'P.sh. Alergji ndaj penicilinës...', en: 'e.g. Penicillin allergy...' },
  'placeholder.medicalNotes': { sq: 'Shënime shtesë...', en: 'Additional medical notes...' },
  // Child medical fields
  'child.criticalAllergies': { sq: 'Alergji Kritike', en: 'Critical Allergies' },
  'child.medicalNotes': { sq: 'Shënime Mjekësore', en: 'Medical Notes' },
  'child.medicalDocument': { sq: 'Dokument Mjekësor', en: 'Medical Document' },
  'child.documentIssueDate': { sq: 'Data e Lëshimit', en: 'Issue Date' },
  'child.documentAttached': { sq: 'Dokument i ngarkuar', en: 'Document attached' },
  // Temperature Diary
  'temperature.current': { sq: 'Temperatura aktuale', en: 'Current Temperature' },
  // ─── HOME PAGE ───────────────────────────────────────────────
  'home.welcome.morning': { sq: 'Mirëmëngjes', en: 'Good morning' },
  'home.welcome.afternoon': { sq: 'Mirëmbrëma', en: 'Good afternoon' },
  'home.welcome.evening': { sq: 'Natën e mirë', en: 'Good evening' },
  'home.welcome.greeting': { sq: 'Mirësevje, {name}!', en: 'Welcome, {name}!' },
  'home.welcome.greetingNoChild': { sq: 'Mirësevje!', en: 'Welcome!' },
  'home.welcome.ageYears': { sq: '{n} vjeç', en: '{n} years old' },
  'home.welcome.ageMonths': { sq: '{n} muaj', en: '{n} months old' },
  'home.welcome.addChild': { sq: 'Shto fëmijën', en: 'Add child' },
  'home.quickActions.title': { sq: 'Veprimet e Shpejta', en: 'Quick Actions' },
  'home.quickActions.temperature': { sq: 'Temperatura', en: 'Temperature' },
  'home.quickActions.temperatureDesc': { sq: 'Monitoroni temperaturën', en: 'Track temperature' },
  'home.quickActions.growth': { sq: 'Rritja', en: 'Growth' },
  'home.quickActions.growthDesc': { sq: 'Gjatësia dhe pesha', en: 'Height & weight' },
  'home.quickActions.diary': { sq: 'Ditari', en: 'Diary' },
  'home.quickActions.diaryDesc': { sq: 'Simptomat dhe shënime', en: 'Symptoms & notes' },
  'home.quickActions.vaccines': { sq: 'Vaksinat', en: 'Vaccines' },
  'home.quickActions.vaccinesDesc': { sq: 'Planet dhe alertet', en: 'Schedule & alerts' },
  'home.alerts.title': { sq: 'Alerte Shëndetësore', en: 'Health Alerts' },
  'home.alerts.fever': { sq: 'Temperatura e lartë!', en: 'Fever detected!' },
  'home.alerts.feverDesc': { sq: '{value}°C — u matur {time}', en: '{value}°C — measured {time}' },
  'home.alerts.overdueVaccine': { sq: 'Vaksina e vonuar', en: 'Overdue vaccine' },
  'home.alerts.overdueVaccineDesc': { sq: '{name} — e vonuar {days} ditë', en: '{name} — {days} days overdue' },
  'home.alerts.takeAction': { sq: 'Merrni masë', en: 'Take action' },
  'home.alerts.clear': { sq: 'Gjithçka në rregull!', en: 'All clear!' },
  'home.recentActivity.title': { sq: 'Aktiviteti i Funts', en: 'Recent Activity' },
  'home.recentActivity.empty': { sq: 'Akzni s\'ka ende', en: 'No activity yet' },
  'home.recentActivity.emptyDesc': { sq: 'Shtoni të parën duke përdorur veprimet e shpejta', en: 'Add your first entry using quick actions' },
  'home.recentActivity.today': { sq: 'Sot', en: 'Today' },
  'home.recentActivity.yesterday': { sq: 'Dje', en: 'Yesterday' },
  'home.recentActivity.thisWeek': { sq: 'Këtë javë', en: 'This week' },
  'home.recentActivity.earlier': { sq: 'Më herët', en: 'Earlier' },
  'home.recentActivity.minutesAgo': { sq: '{n} minuta më parë', en: '{n} minutes ago' },
  'home.recentActivity.hoursAgo': { sq: '{n} orë më parë', en: '{n} hours ago' },
  'home.recentActivity.daysAgo': { sq: '{n} ditë më parë', en: '{n} days ago' },
  'home.recentActivity.tempRecorded': { sq: 'Temperatura u regjistrua', en: 'Temperature recorded' },
  'home.recentActivity.growthUpdated': { sq: 'Rritja u përditësua', en: 'Growth updated' },
  // ─────────────────────────────────────────────────────────────
  'temperature.quickAdd': { sq: 'Shto shpejt', en: 'Quick Add' },
  'temperature.location': { sq: 'Matja në', en: 'Measured at' },
  'temperature.notes': { sq: 'Shënime', en: 'Notes' },
  'temperature.save': { sq: 'Ruaj', en: 'Save' },
  'temperature.alertHigh': { sq: 'Ka ethe të larta! Kontaktoni mjekun.', en: 'High temperature detected! Contact the doctor.' },
  'temperature.trend': { sq: 'Tendeca 7 ditore', en: '7-Day Trend' },
  'temperature.recent': { sq: 'Leximet e fundit', en: 'Recent Readings' },
  'temperature.saving': { sq: 'Duke ruajtur...', en: 'Saving...' },
  'temperature.saved': { sq: 'U ruajt!', en: 'Saved!' },
  'temperature.noReadings': { sq: 'Nuk ka lexime akoma.', en: 'No readings yet.' },
  'temperature.allGood': { sq: 'Të gjitha temperaturas mirë! 🎉', en: 'All temperatures normal! 🎉' },
  'temperature.addFirst': { sq: 'Shtani leximin e parë', en: 'Add your first reading' },
  'temperature.deleteConfirm': { sq: 'Fshi këtë lexim?', en: 'Delete this reading?' },
  'temperature.delete': { sq: 'Fshi', en: 'Delete' },
  'temperature.cancel': { sq: 'Anulo', en: 'Cancel' },
  'temperature.newReading': { sq: 'Lexim i Ri', en: 'New Reading' },
  'temperature.value': { sq: 'Temperatura (°C)', en: 'Temperature (°C)' },
  'temperature.time': { sq: 'Ora', en: 'Time' },
  'temperature.location.forehead': { sq: 'Koka', en: 'Forehead' },
  'temperature.location.ear': { sq: 'Veshthi', en: 'Ear' },
  'temperature.location.oral': { sq: 'Goja', en: 'Mouth' },
  'temperature.location.axillary': { sq: 'Armpiti', en: 'Armpit' },
  'temperature.location.rectal': { sq: 'Rektali', en: 'Rectal' },
  'temperature.contextFever': { sq: 'Kontroll temperature', en: 'Fever Check' },
  'temperature.contextRoutine': { sq: 'Rutinore', en: 'Routine' },
  'temperature.contextPostMed': { sq: 'Pas ilaçit', en: 'After Medication' },
  // Growth Tracking
  'growth.height': { sq: 'Gjatësia (cm)', en: 'Height (cm)' },
  'growth.weight': { sq: 'Pesha (kg)', en: 'Weight (kg)' },
  'growth.measuredAt': { sq: 'Data e matjes', en: 'Measurement Date' },
  'growth.notes': { sq: 'Shënime', en: 'Notes' },
  'growth.save': { sq: 'Ruaj', en: 'Save' },
  'growth.chart': { sq: 'Diagrama e rritjes', en: 'Growth Chart' },
  'growth.recent': { sq: 'Matjet e fundit', en: 'Recent Measurements' },
  'growth.noData': { sq: 'Nuk ka të dhëna ende', en: 'No data yet' },
  'growth.addFirst': { sq: 'Shtoni matjen e parë', en: 'Add the first measurement' },
  'growth.heightLabel': { sq: 'Gjatësia', en: 'Height' },
  'growth.weightLabel': { sq: 'Pesha', en: 'Weight' },
  'growth.kg': { sq: 'kg', en: 'kg' },
  'growth.cm': { sq: 'cm', en: 'cm' },
  'growth.title': { sq: 'Rritja', en: 'Growth' },
  'growth.currentStats': { sq: 'Statistikat aktuale', en: 'Current Stats' },
  'growth.addMeasurement': { sq: 'Shto Matje', en: 'Add Measurement' },
  'growth.delete': { sq: 'Fshi', en: 'Delete' },
  'growth.saving': { sq: 'Duke ruajtur...', en: 'Saving...' },
  'growth.saved': { sq: 'U ruajt!', en: 'Saved!' },
  'growth.lastUpdated': { sq: 'Përditësuar së fundi', en: 'Last updated' },
  'growth.noHeight': { sq: '--', en: '--' },
  'growth.noWeight': { sq: '--', en: '--' },
  // Error messages
  'error.documentTooLarge': { sq: 'Dokumenti është shumë i madh. Maksimumi 5MB.', en: 'Document too large. Maximum 5MB.' },
  'error.invalidDocType': { sq: 'Lejohen vetëm PDF ose imazhe.', en: 'Only PDF or image files allowed.' },
  // Child Form (Sprint 7)
  'childForm.titleAdd': { sq: 'Shto Pjestar', en: 'Add Member' },
  'childForm.titleEdit': { sq: 'Redakto Profilin', en: 'Edit Profile' },
  'childForm.step1.basics': { sq: 'Bazat', en: 'Basics' },
  'childForm.step2.medical': { sq: 'Mjekësore', en: 'Medical' },
  'childForm.step3.documents': { sq: 'Dokumente', en: 'Documents' },
  'childForm.name.label': { sq: 'Emri', en: 'Name' },
  'childForm.name.placeholder': { sq: 'Emri i fëmijës', en: "Child's name" },
  'childForm.name.error': { sq: 'Emri duhet të përmbajë vetëm shkronja', en: 'Name must contain only letters' },
  'childForm.dob.label': { sq: 'Data e lindjes', en: 'Date of Birth' },
  'childForm.dob.error': { sq: 'Data e lindjes është e detyrueshme', en: 'Date of birth is required' },
  'childForm.dob.futureError': { sq: 'Data e lindjes nuk mund të jetë në të ardhmen', en: 'Date of birth cannot be in the future' },
  'childForm.gender.male': { sq: 'Mashkull', en: 'Male' },
  'childForm.gender.female': { sq: 'Femër', en: 'Female' },
  'childForm.gender.other': { sq: 'Tjetër', en: 'Other' },
  'childForm.bloodType': { sq: 'Grupi i gjakut', en: 'Blood Type' },
  'childForm.birthWeight': { sq: 'Pesha e lindjes (kg)', en: 'Birth Weight (kg)' },
  'childForm.allergies': { sq: 'Alergji', en: 'Allergies' },
  'childForm.allergies.placeholder': { sq: 'Shëno alergjitë...', en: 'List any allergies...' },
  'childForm.next': { sq: 'Vazhdo', en: 'Next' },
  'childForm.back': { sq: 'Mbrapa', en: 'Back' },
  'childForm.save': { sq: 'Ruaj', en: 'Save' },
  'childForm.cancel': { sq: 'Anulo', en: 'Cancel' },
  'childForm.uploadDocument': { sq: 'Ngarko Dokument Mjekësor', en: 'Upload Medical Document' },
  'childForm.uploadHint': { sq: 'PDF ose imazhe, maks 5MB', en: 'PDF or images, max 5MB' },
  'childForm.success': { sq: 'Profili u ruajt me sukses!', en: 'Profile saved successfully!' },
  'childForm.error': { sq: 'Diçka shkoi keq. Provo përsëri.', en: 'Something went wrong. Please try again.' },
  'childForm.fileTooBig': { sq: 'Skedari tejkalon 5MB', en: 'File exceeds 5MB' },
  'childForm.fileTypeError': { sq: 'Lloji i skedarit nuk mbështetët', en: 'File type not supported' },
  'childForm.optional': { sq: 'Opsionale', en: 'Optional' },
} as const;

type TranslationKey = keyof RawTranslations;

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly STORAGE_KEY = 'kiddok_locale';

  locale = signal<Locale>(this.loadLocale());

  private loadLocale(): Locale {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'en' || stored === 'sq') return stored;
    } catch {}
    return 'sq';
  }

  setLocale(lang: Locale) {
    this.locale.set(lang);
    try {
      localStorage.setItem(this.STORAGE_KEY, lang);
    } catch {}
  }

  toggleLocale() {
    this.setLocale(this.locale() === 'sq' ? 'en' : 'sq');
  }

  /** Returns true if current locale is Albanian */
  isSq = computed(() => this.locale() === 'sq');

  /** Returns a flat key→value map for the current locale */
  readonly t = computed(() => {
    const lang = this.locale();
    const result: Record<string, string> = {};
    for (const key of Object.keys(translations) as TranslationKey[]) {
      const val = translations[key];
      result[key] = (val as Record<Locale, string>)[lang] ?? String(val);
    }
    return result;
  });
}