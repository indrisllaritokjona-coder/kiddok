import { Injectable, signal, computed } from '@angular/core';

export type Locale = 'sq' | 'en';

type RawTranslations = typeof translations;
const translations = {
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