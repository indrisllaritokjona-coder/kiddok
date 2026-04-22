export interface ScheduleEntry {
  code: string;
  nameSq: string;
  nameEn: string;
  doses: number;
  defaultIntervalDays: number;
  earliestDay: number;
  recommendedDay: number;
}

export const VACCINE_SCHEDULE: ScheduleEntry[] = [
  // Birth
  { code: 'BCG',         nameSq: 'Vaksina e Tuberkulozit',    nameEn: 'BCG',                doses: 1, defaultIntervalDays: 0,   earliestDay: 0,     recommendedDay: 0     },
  { code: 'HepB-1',      nameSq: 'Hepatiti B (Doza 1)',       nameEn: 'Hepatitis B (Dose 1)', doses: 1, defaultIntervalDays: 0,   earliestDay: 0,     recommendedDay: 0     },
  // 2 months
  { code: 'DTaP-1',      nameSq: 'DTaP (Doza 1)',             nameEn: 'DTaP (Dose 1)',      doses: 5, defaultIntervalDays: 30,  earliestDay: 60,    recommendedDay: 60    },
  { code: 'Hib-1',       nameSq: 'Hib (Doza 1)',              nameEn: 'Hib (Dose 1)',       doses: 4, defaultIntervalDays: 30,  earliestDay: 60,    recommendedDay: 60    },
  { code: 'IPV-1',       nameSq: 'Polio IPV (Doza 1)',        nameEn: 'IPV (Dose 1)',       doses: 4, defaultIntervalDays: 30,  earliestDay: 60,    recommendedDay: 60    },
  { code: 'HepB-2',      nameSq: 'Hepatiti B (Doza 2)',       nameEn: 'Hepatitis B (Dose 2)', doses: 1, defaultIntervalDays: 30,  earliestDay: 60,    recommendedDay: 60    },
  { code: 'PCV-1',       nameSq: 'PCV (Doza 1)',              nameEn: 'PCV (Dose 1)',       doses: 3, defaultIntervalDays: 30,  earliestDay: 60,    recommendedDay: 60    },
  { code: 'Rotavirus-1', nameSq: 'Rotavirus (Doza 1)',        nameEn: 'Rotavirus (Dose 1)', doses: 2, defaultIntervalDays: 30,  earliestDay: 60,    recommendedDay: 60    },
  // 3 months
  { code: 'DTaP-2',      nameSq: 'DTaP (Doza 2)',             nameEn: 'DTaP (Dose 2)',      doses: 5, defaultIntervalDays: 30,  earliestDay: 90,    recommendedDay: 90    },
  { code: 'Hib-2',       nameSq: 'Hib (Doza 2)',              nameEn: 'Hib (Dose 2)',       doses: 4, defaultIntervalDays: 30,  earliestDay: 90,    recommendedDay: 90    },
  { code: 'IPV-2',       nameSq: 'Polio IPV (Doza 2)',        nameEn: 'IPV (Dose 2)',       doses: 4, defaultIntervalDays: 30,  earliestDay: 90,    recommendedDay: 90    },
  // 4 months
  { code: 'DTaP-3',      nameSq: 'DTaP (Doza 3)',             nameEn: 'DTaP (Dose 3)',      doses: 5, defaultIntervalDays: 30,  earliestDay: 120,   recommendedDay: 120   },
  { code: 'Hib-3',       nameSq: 'Hib (Doza 3)',              nameEn: 'Hib (Dose 3)',       doses: 4, defaultIntervalDays: 30,  earliestDay: 120,   recommendedDay: 120   },
  { code: 'IPV-3',       nameSq: 'Polio IPV (Doza 3)',        nameEn: 'IPV (Dose 3)',       doses: 4, defaultIntervalDays: 30,  earliestDay: 120,   recommendedDay: 120   },
  { code: 'PCV-2',       nameSq: 'PCV (Doza 2)',              nameEn: 'PCV (Dose 2)',       doses: 3, defaultIntervalDays: 30,  earliestDay: 120,   recommendedDay: 120   },
  { code: 'Rotavirus-2', nameSq: 'Rotavirus (Doza 2)',        nameEn: 'Rotavirus (Dose 2)', doses: 2, defaultIntervalDays: 30,  earliestDay: 120,   recommendedDay: 120   },
  // 12 months
  { code: 'HepB-3',      nameSq: 'Hepatiti B (Doza 3)',       nameEn: 'Hepatitis B (Dose 3)', doses: 1, defaultIntervalDays: 180, earliestDay: 360,   recommendedDay: 360   },
  { code: 'PCV-3',       nameSq: 'PCV (Doza 3)',              nameEn: 'PCV (Dose 3)',       doses: 3, defaultIntervalDays: 180, earliestDay: 360,   recommendedDay: 360   },
  { code: 'MMR-1',       nameSq: 'MMR (Doza 1)',              nameEn: 'MMR (Dose 1)',       doses: 2, defaultIntervalDays: 0,   earliestDay: 365,   recommendedDay: 365   },
  // 18 months
  { code: 'DTaP-4',      nameSq: 'DTaP (Doza 4)',             nameEn: 'DTaP (Dose 4)',      doses: 5, defaultIntervalDays: 180, earliestDay: 540,   recommendedDay: 540   },
  { code: 'Hib-4',       nameSq: 'Hib (Doza 4)',              nameEn: 'Hib (Dose 4)',       doses: 4, defaultIntervalDays: 180, earliestDay: 540,   recommendedDay: 540   },
  { code: 'IPV-4',       nameSq: 'Polio IPV (Doza 4)',        nameEn: 'IPV (Dose 4)',       doses: 4, defaultIntervalDays: 180, earliestDay: 540,   recommendedDay: 540   },
  // 5 years
  { code: 'DTaP-5',      nameSq: 'DTaP (Doza 5)',             nameEn: 'DTaP (Dose 5)',      doses: 5, defaultIntervalDays: 730, earliestDay: 1825,  recommendedDay: 1825  },
  { code: 'MMR-2',       nameSq: 'MMR (Doza 2)',              nameEn: 'MMR (Dose 2)',       doses: 2, defaultIntervalDays: 0,   earliestDay: 1460,  recommendedDay: 1460  },
  // 11 years
  { code: 'Tdap',        nameSq: 'Tdap',                      nameEn: 'Tdap',               doses: 1, defaultIntervalDays: 0,   earliestDay: 4015,  recommendedDay: 4015  },
  // 12 years
  { code: 'HPV',         nameSq: 'HPV',                      nameEn: 'HPV',                doses: 2, defaultIntervalDays: 180, earliestDay: 4380,  recommendedDay: 4380  },
];