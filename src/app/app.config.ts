import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import itLocale from '@angular/common/locales/it';
import { LucideAngularModule } from 'lucide-angular';

import {
  PartyPopper, Plus, Pencil, Droplet, LogIn, UserPlus, AlertCircle,
  Calendar, BadgeCheck, ChevronDown, CheckCircle, Save, X, AlertTriangle,
  Trash2, Trash, Loader, ArrowLeft, Menu, Globe, User, Users, Check,
  ArrowLeftRight, CirclePlus, Hand, Settings, ChevronLeft, ChevronRight,
  FileText, Clock, History, Inbox, TrendingUp, Thermometer, Ruler,
  Dumbbell, PlusCircle, CalendarClock, CheckCircle2, Hourglass,
  FolderOpen, Zap, RefreshCw, Cloud, Cake, Syringe, CalendarX,
  Baby, Database, Download, Heart, CalendarDays, CalendarCheck,
  Activity, FileCheck, Bell, ThermometerSun, FilePlus,
  ClipboardList, LayoutList, Shield, Scale, HeartPulse, Stethoscope,
  Pill, Target, ChartBar, Waves
} from 'lucide-angular';

import { routes } from './app.routes';

// Register Italian locale — same DD/MM/YYYY and Monday-first week as Albania
registerLocaleData(itLocale);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'it' },
    importProvidersFrom(
      LucideAngularModule.pick({
        PartyPopper, Plus, Pencil, Droplet, LogIn, UserPlus, AlertCircle,
        Calendar, BadgeCheck, ChevronDown, CheckCircle, Save, X, AlertTriangle,
        Trash2, Trash, Loader, ArrowLeft, Menu, Globe, User, Users, Check,
        ArrowLeftRight, CirclePlus, Hand, Settings, ChevronLeft, ChevronRight,
        FileText, Clock, History, Inbox, TrendingUp, Thermometer, Ruler,
        Dumbbell, PlusCircle, CalendarClock, CheckCircle2, Hourglass,
        FolderOpen, Zap, RefreshCw, Cloud, Cake, Syringe, CalendarX,
        Baby, Database, Download, Heart, CalendarDays, CalendarCheck,
        Activity, FileCheck, Bell, ThermometerSun, FilePlus,
        ClipboardList, LayoutList, Shield, Scale, HeartPulse, Stethoscope,
        Pill, Target, ChartBar, Waves
      })
    ),
  ]
};
