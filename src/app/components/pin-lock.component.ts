import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';

@Component({
    selector: 'app-pin-lock',
    imports: [CommonModule, FormsModule, LucideAngularModule],
    template: `
    <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 font-sans overflow-hidden relative">

      <!-- Background blobs -->
      <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-teal-200/20 blur-3xl pointer-events-none"></div>

      <!-- Login Card -->
      <div class="relative z-10 w-full max-w-md">

        <!-- Branding header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1a3c8f] to-[#0a1f5c] shadow-2xl mb-6">
            <lucide-icon name="baby" class="text-4xl text-white"></lucide-icon>
          </div>
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">KidDok<span class="text-[#1a3c8f]">.</span></h1>
          <p class="text-slate-400 mt-2 text-sm font-medium">{{ brandSubtitle() }}</p>
        </div>

        <!-- Card -->
        <div class="bg-white rounded-[2rem] shadow-[0_24px_80px_-12px_rgba(45,27,105,0.18)] border border-slate-100 overflow-hidden">

          <!-- Card Top accent bar (e-Albania blue) -->
          <div class="h-2 bg-gradient-to-r from-[#1a3c8f] via-[#2a5fc8] to-[#1a3c8f]"></div>

          <div class="p-10">

            <!-- ══════════════════════════════════════════
                 NORMAL LOGIN VIEW
                 ══════════════════════════════════════════ -->
            @if (!isForgotMode()) {

              <h2 class="text-2xl font-black text-gray-800 mb-1">{{ welcomeTitle() }}</h2>
              <p class="text-slate-400 text-sm mb-8 font-medium leading-relaxed">{{ welcomeSubtitle() }}</p>

              <div class="space-y-5">

                <!-- NID / NIPT field -->
                <div>
                  <label class="block text-xs font-bold text-[#1a3c8f] mb-2.5 ml-1 uppercase tracking-wider">
                    {{ usernameLabel() }}
                  </label>
                  <div class="relative">
                    <lucide-icon name="user" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></lucide-icon>
                    <input type="text"
                           [(ngModel)]="userId"
                           (blur)="touchUserId()"
                           (input)="clearUserIdError()"
                           [class]="userIdBorderClass()"
                           class="w-full pl-12 pr-5 py-4 rounded-2xl border-2 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#1a3c8f]/10 outline-none transition-all text-gray-800 text-base placeholder-slate-300"
                           [placeholder]="usernamePlaceholder()">
                  </div>
                  @if (userIdError()) {
                    <div class="flex items-center gap-1.5 mt-2 ml-1">
                      <lucide-icon name="alert-triangle" class="text-red-500 text-base"></lucide-icon>
                      <p class="text-red-500 text-xs font-medium">{{ userIdError() }}</p>
                    </div>
                  }
                </div>

                <!-- Password field -->
                <div>
                  <label class="block text-xs font-bold text-[#1a3c8f] mb-2.5 ml-1 uppercase tracking-wider">
                    {{ passwordLabel() }}
                  </label>
                  <div class="relative">
                    <lucide-icon name="key" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></lucide-icon>
                    <input [type]="showPassword() ? 'text' : 'password'"
                           [(ngModel)]="password"
                           (blur)="touchPassword()"
                           (input)="clearPasswordError()"
                           [class]="passwordBorderClass()"
                           class="w-full pl-12 pr-14 py-4 rounded-2xl border-2 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#1a3c8f]/10 outline-none transition-all text-gray-800 text-base"
                           [placeholder]="passwordPlaceholder()">
                    <button type="button" (click)="showPassword.set(!showPassword())"
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      <lucide-icon [name]="showPassword() ? 'eyeOff' : 'eye'" class="text-xl"></lucide-icon>
                    </button>
                  </div>
                  @if (passwordError()) {
                    <div class="flex items-center gap-1.5 mt-2 ml-1">
                      <lucide-icon name="alert-triangle" class="text-red-500 text-base"></lucide-icon>
                      <p class="text-red-500 text-xs font-medium">{{ passwordError() }}</p>
                    </div>
                  }
                </div>

                <!-- Forgot password link -->
                <div class="text-right -mt-1">
                  <button type="button" (click)="enterForgotMode()"
                          class="text-xs font-semibold text-[#1a3c8f] hover:text-[#2a5fc8] transition-colors hover:underline">
                    {{ forgotLinkText() }}
                  </button>
                </div>

                <!-- Global error -->
                @if (errorMsg()) {
                  <div class="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 animate-fade-in">
                    <lucide-icon name="alert-circle" class="text-red-500 text-lg"></lucide-icon>
                    <p class="text-red-600 text-xs font-medium">{{ errorMsg() }}</p>
                  </div>
                }

                <!-- Submit button -->
                <button (click)="submit()"
                        [disabled]="loading()"
                        class="w-full border-2 border-[#c8102e] bg-gradient-to-r from-[#c8102e] to-[#e0173a] hover:from-[#a00d26] hover:to-[#c8102e] disabled:from-slate-300 disabled:to-slate-300 disabled:border-slate-300 text-white font-bold py-4 rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:hover:shadow-none disabled:translate-y-0 flex items-center justify-center gap-3 text-base mt-1">
                  @if (loading()) {
                    <lucide-icon name="refresh-cw" class="text-xl animate-spin"></lucide-icon>
                    {{ loadingText() }}
                  } @else {
                    <lucide-icon name="arrowRight" class="text-xl"></lucide-icon>
                    {{ submitText() }}
                  }
                </button>

              </div>
            }

            <!-- ══════════════════════════════════════════
                 FORGOT PASSWORD VIEW
                 ══════════════════════════════════════════ -->
            @if (isForgotMode()) {

              <!-- Back link -->
              <button (click)="backToLogin()" class="flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#1a3c8f] transition-colors mb-6 -ml-1">
                <lucide-icon name="arrow-left" class="text-lg"></lucide-icon>
                <span class="font-semibold">{{ backText() }}</span>
              </button>

              <!-- Title -->
              <h2 class="text-2xl font-black text-[#1a3c8f] mb-1">{{ forgotTitle() }}</h2>
              <p class="text-slate-400 text-sm mb-8 font-medium leading-relaxed">{{ forgotSubtitle() }}</p>

              <div class="space-y-5">

                <!-- NID confirmation field (before OTP) -->
                @if (!otpSent()) {
                  <div>
                    <label class="block text-xs font-bold text-[#1a3c8f] mb-2.5 ml-1 uppercase tracking-wider">
                      {{ confirmLabel() }}<span class="text-red-500 ml-0.5">*</span>
                    </label>
                    <div class="relative">
                      <lucide-icon name="user" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></lucide-icon>
                      <input type="text"
                             [(ngModel)]="forgotNid"
                             (blur)="touchForgotNid()"
                             (input)="clearForgotNidError()"
                             [class]="forgotNidBorderClass()"
                             class="w-full pl-12 pr-5 py-4 rounded-2xl border-2 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#1a3c8f]/10 outline-none transition-all text-gray-800 text-base placeholder-slate-300"
                             [placeholder]="usernamePlaceholder()">
                    </div>
                    @if (forgotNidError()) {
                      <div class="flex items-center gap-1.5 mt-2 ml-1">
                        <lucide-icon name="alert-triangle" class="text-red-500 text-base"></lucide-icon>
                        <p class="text-red-500 text-xs font-medium">{{ forgotNidError() }}</p>
                      </div>
                    }
                  </div>
                }

                <!-- Success message + OTP entry (after nid submitted) -->
                @if (otpSent()) {
                  <!-- Green success banner -->
                  <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-fade-in">
                    <div class="flex items-start gap-3">
                      <lucide-icon name="check-circle" class="text-emerald-500 text-lg mt-0.5"></lucide-icon>
                      <p class="text-emerald-700 text-xs font-medium leading-relaxed">
                        {{ otpSuccessMsg() }}
                      </p>
                    </div>
                  </div>

                  <!-- OTP input field -->
                  <div>
                    <label class="block text-xs font-bold text-[#1a3c8f] mb-2.5 ml-1 uppercase tracking-wider">
                      {{ otpLabel() }}<span class="text-red-500 ml-0.5">*</span>
                    </label>
                    <div class="relative">
                      <lucide-icon name="lock" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></lucide-icon>
                      <input type="text"
                             [(ngModel)]="otpCode"
                             (blur)="touchOtp()"
                             (input)="clearOtpError()"
                             [class]="otpBorderClass()"
                             maxlength="6"
                             class="w-full pl-12 pr-5 py-4 rounded-2xl border-2 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#1a3c8f]/10 outline-none transition-all text-gray-800 text-base tracking-widest font-mono placeholder-slate-300 text-center text-lg"
                             placeholder="● ● ● ● ● ●">
                    </div>
                    @if (otpError()) {
                      <div class="flex items-center gap-1.5 mt-2 ml-1">
                        <lucide-icon name="alert-triangle" class="text-red-500 text-base"></lucide-icon>
                        <p class="text-red-500 text-xs font-medium">{{ otpError() }}</p>
                      </div>
                    }
                  </div>
                }

                <!-- Global error -->
                @if (errorMsg()) {
                  <div class="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 animate-fade-in">
                    <lucide-icon name="alert-circle" class="text-red-500 text-lg"></lucide-icon>
                    <p class="text-red-600 text-xs font-medium">{{ errorMsg() }}</p>
                  </div>
                }

                <!-- Submit button -->
                <button (click)="submit()"
                        [disabled]="loading()"
                        class="w-full border-2 border-[#c8102e] bg-gradient-to-r from-[#c8102e] to-[#e0173a] hover:from-[#a00d26] hover:to-[#c8102e] disabled:from-slate-300 disabled:to-slate-300 disabled:border-slate-300 text-white font-bold py-4 rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:hover:shadow-none disabled:translate-y-0 flex items-center justify-center gap-3 text-base mt-1">
                  @if (loading()) {
                    <lucide-icon name="refresh-cw" class="text-xl animate-spin"></lucide-icon>
                    {{ loadingText() }}
                  } @else {
                    <lucide-icon name="arrowRight" class="text-xl"></lucide-icon>
                    {{ submitText() }}
                  }
                </button>

              </div>
            }

            <!-- Language toggle -->
            <div class="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-3">
              <span class="text-slate-300 text-xs font-medium">{{ languageLabel() }}</span>
              <button (click)="i18n.setLocale('sq')"
                      class="px-4 py-1.5 rounded-full text-xs font-bold transition-all border-2 {{ i18n.locale() === 'sq' ? 'bg-[#1a3c8f] text-white border-[#1a3c8f]' : 'bg-white text-slate-400 border-slate-200 hover:border-[#1a3c8f]' }}">
                SQ
              </button>
              <button (click)="i18n.setLocale('en')"
                      class="px-4 py-1.5 rounded-full text-xs font-bold transition-all border-2 {{ i18n.locale() === 'en' ? 'bg-[#1a3c8f] text-white border-[#1a3c8f]' : 'bg-white text-slate-400 border-slate-200 hover:border-[#1a3c8f]' }}">
                EN
              </button>
            </div>

          </div>
        </div>

        <!-- Footer note -->
        <p class="text-center text-slate-300 text-xs mt-6 font-medium">{{ footerText() }}</p>

      </div>
    </div>
  `
})
export class PinLockComponent {
  dataService = inject(DataService);
  i18n = inject(I18nService);
  router = inject(Router);

  // Form state
  userId = '';
  password = '';
  forgotNid = '';
  otpCode = '';

  // UI signals
  showPassword = signal(false);
  loading = signal(false);
  errorMsg = signal('');
  isForgotMode = signal(false);
  otpSent = signal(false);        // true after NID submitted, shows OTP input

  // Field touch state
  userIdTouched = signal(false);
  passwordTouched = signal(false);
  forgotNidTouched = signal(false);
  otpTouched = signal(false);

  // Per-field errors
  userIdError = signal('');
  passwordError = signal('');
  forgotNidError = signal('');
  otpError = signal('');

  // ── Computed strings ────────────────────────────────────────
  isSq = computed(() => this.i18n.locale() === 'sq');

  brandSubtitle = computed(() => this.i18n.t()['pin.dashboard']);
  welcomeTitle = computed(() => this.i18n.t()['pin.welcome']);
  welcomeSubtitle = computed(() => this.i18n.t()['child.welcomeSub']);
  usernameLabel = computed(() => this.i18n.t()['pin.enterUserId']);
  usernamePlaceholder = computed(() => this.i18n.t()['pin.userIdHint']);
  passwordLabel = computed(() => this.i18n.t()['pin.enterPassword']);
  passwordPlaceholder = computed(() => this.i18n.t()['pin.yourPassword']);
  submitText = computed(() => this.i18n.t()['pin.continueSignIn']);
  loadingText = computed(() => this.i18n.t()['pin.authenticating']);
  languageLabel = computed(() => this.i18n.t()['pin.language']);
  footerText = computed(() => this.i18n.t()['pin.safeData']);
  forgotLinkText = computed(() => this.i18n.t()['pin.forgotPassword']);
  backText = computed(() => this.i18n.t()['pin.goBack']);

  forgotTitle = computed(() => this.i18n.t()['pin.resetPassword']);
  forgotSubtitle = computed(() =>
    this.i18n.isSq()
      ? 'Vendosni NID / NIPT për t\'u identifikuar dhe për të rikthyer qasjen në llogarinë tuaj.'
      : 'Enter your NID / NIPT to verify your identity and recover access to your account.'
  );
  confirmLabel = computed(() => this.i18n.t()['pin.nid']);
  otpLabel = computed(() => this.i18n.t()['pin.confirmationCode']);
  otpSuccessMsg = computed(() => this.i18n.t()['pin.otpSent']);

  // ── Border classes ─────────────────────────────────────────

  userIdBorderClass = computed(() =>
    this.userIdTouched() && !this.userId
      ? 'border-red-500 bg-red-50/50'
      : 'border-slate-200 focus:border-[#1a3c8f]'
  );

  passwordBorderClass = computed(() =>
    this.passwordTouched() && !this.password
      ? 'border-red-500 bg-red-50/50'
      : 'border-slate-200 focus:border-[#1a3c8f]'
  );

  forgotNidBorderClass = computed(() =>
    this.forgotNidTouched() && !this.forgotNid
      ? 'border-red-500 bg-red-50/50'
      : 'border-slate-200 focus:border-[#1a3c8f]'
  );

  otpBorderClass = computed(() =>
    this.otpTouched() && (!this.otpCode || this.otpCode.length < 6)
      ? 'border-red-500 bg-red-50/50'
      : 'border-slate-200 focus:border-[#1a3c8f]'
  );

  // ── Mode switching ─────────────────────────────────────────

  enterForgotMode() {
    this.isForgotMode.set(true);
    this.otpSent.set(false);
    this.errorMsg.set('');
    this.userIdError.set('');
    this.passwordError.set('');
  }

  backToLogin() {
    this.isForgotMode.set(false);
    this.otpSent.set(false);
    this.forgotNid = '';
    this.otpCode = '';
    this.forgotNidTouched.set(false);
    this.otpTouched.set(false);
    this.forgotNidError.set('');
    this.otpError.set('');
    this.errorMsg.set('');
  }

  // ── Field touch / error helpers ─────────────────────────────

  touchUserId() {
    this.userIdTouched.set(true);
    if (!this.userId) {
      this.userIdError.set(this.i18n.t()['pin.enterNid']);
    }
  }

  clearUserIdError() {
    if (this.userId) { this.userIdError.set(''); this.errorMsg.set(''); }
  }

  touchPassword() {
    this.passwordTouched.set(true);
    if (!this.password) {
      this.passwordError.set(this.i18n.t()['pin.enterPassword']);
    }
  }

  clearPasswordError() {
    if (this.password) { this.passwordError.set(''); this.errorMsg.set(''); }
  }

  touchForgotNid() {
    this.forgotNidTouched.set(true);
    if (!this.forgotNid) {
      this.forgotNidError.set(this.i18n.t()['pin.enterNidConfirm']);
    }
  }

  clearForgotNidError() {
    if (this.forgotNid) { this.forgotNidError.set(''); this.errorMsg.set(''); }
  }

  touchOtp() {
    this.otpTouched.set(true);
    if (!this.otpCode || this.otpCode.length < 6) {
      this.otpError.set(this.i18n.t()['pin.enterOtp']);
    }
  }

  clearOtpError() {
    if (this.otpCode) { this.otpError.set(''); this.errorMsg.set(''); }
  }

  // ── Submit ───────────────────────────────────────────────────

  submit() {
    if (this.isForgotMode()) {
      this.handleForgot();
    } else {
      this.handleLogin();
    }
  }

  private handleLogin() {
    this.userIdTouched.set(true);
    this.passwordTouched.set(true);
    if (!this.userId) {
      this.userIdError.set(this.i18n.t()['pin.enterNid']);
    }
    if (!this.password) {
      this.passwordError.set(this.i18n.t()['pin.enterPassword']);
    }
    if (!this.userId || !this.password) return;

    this.loading.set(true);
    this.errorMsg.set('');
    setTimeout(async () => {
      const success = await this.dataService.login(this.userId, this.password);
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.errorMsg.set(this.i18n.t()['pin.invalidCredentials']);
        this.loading.set(false);
      }
    }, 700);
  }

  private handleForgot() {
    // OTP step not yet reached — validate NID first
    if (!this.otpSent()) {
      this.forgotNidTouched.set(true);
      if (!this.forgotNid) {
        this.forgotNidError.set(this.i18n.t()['pin.enterNidConfirm']);
        return;
      }
      // NID valid — show OTP step
      this.loading.set(true);
      setTimeout(() => {
        this.loading.set(false);
        this.otpSent.set(true);
      }, 900);
      return;
    }

    // OTP step — validate code
    this.otpTouched.set(true);
    if (!this.otpCode || this.otpCode.length < 6) {
      this.otpError.set(this.i18n.t()['pin.enterOtp']);
      return;
    }

    // OTP valid — complete login
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      // Mock: treat OTP as valid, complete the "login" and redirect
      this.dataService.login(this.forgotNid, '1234');
      this.router.navigate(['/']);
    }, 700);
  }
}