#!/usr/bin/env python3
"""Apply template changes to shell.component.ts."""

with open(r'C:\Users\g_gus\Desktop\jona\kiddok\src\app\components\shell.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0
CRLF = '\r\n'

def do_replace(old, new, label):
    global changes, content
    if old in content:
        content = content.replace(old, new, 1)
        print('[OK]', label)
        changes += 1
    else:
        print('[SKIP]', label)

# ── 1. editName input: add validation ────────────────────────────────
old1 = (
    '<input type="text" [(ngModel)]="editName"' + CRLF +
    CRLF + '                         class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800">' + CRLF +
    CRLF + '                </div>'
)
new1 = (
    '<input type="text" [(ngModel)]="editName"' + CRLF +
    CRLF + '                           (input)="onNameInput($any($event.target).value, v => editName = v)"' + CRLF +
    CRLF + '                           [class.border-red-500]="nameError() && nameValidated()"' + CRLF +
    CRLF + '                         class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800">' + CRLF +
    CRLF + '                    @if (nameError() && nameValidated()) {' + CRLF +
    CRLF + '                      <p class="text-red-500 text-xs mt-1 ml-1">{{ nameError() }}</p>' + CRLF +
    CRLF + '                    }' + CRLF +
    CRLF + '                </div>'
)
do_replace(old1, new1, 'editName validation + error')

# ── 2. newChildName input: add validation ────────────────────────────
old2 = (
    '<input type="text" [(ngModel)]="newChildName"' + CRLF +
    CRLF + '                         class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 placeholder-gray-300"' + CRLF +
    CRLF + '                         [placeholder]="i18n.t()[\'placeholder.fullName\']">'
)
new2 = (
    '<input type="text" [(ngModel)]="newChildName"' + CRLF +
    CRLF + '                         (input)="onNameInput($any($event.target).value, v => newChildName = v)"' + CRLF +
    CRLF + '                         [class.border-red-500]="nameError() && nameValidated()"' + CRLF +
    CRLF + '                         class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 placeholder-gray-300"' + CRLF +
    CRLF + '                         [placeholder]="i18n.t()[\'placeholder.fullName\']">' + CRLF +
    CRLF + '                    @if (nameError() && nameValidated()) {' + CRLF +
    CRLF + '                      <p class="text-red-500 text-xs mt-1 ml-1">{{ nameError() }}</p>' + CRLF +
    CRLF + '                    }'
)
do_replace(old2, new2, 'newChildName validation + error')

# ── 3. newChildBloodType select: add (change) handler ────────────────
old3 = (
    '<select [(ngModel)]="newChildBloodType"' + CRLF +
    CRLF + '                            class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 shadow-sm">' + CRLF +
    CRLF + '                      <option value="">--</option>'
)
new3 = (
    '<select [(ngModel)]="newChildBloodType"' + CRLF +
    CRLF + '                            (change)="bloodTypeSelected.set(true)"' + CRLF +
    CRLF + '                            class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 shadow-sm">' + CRLF +
    CRLF + '                      <option value="">--</option>'
)
do_replace(old3, new3, 'newChildBloodType (change) handler')

# ── 4. newChildBloodType verified badge ──────────────────────────────
old4 = (
    CRLF + '                    </select>' + CRLF +
    CRLF + CRLF + '                  </div>' + CRLF +
    CRLF + CRLF + '                </div>' + CRLF +
    CRLF + CRLF + '                <div>' + CRLF +
    CRLF + CRLF + '                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()[\'child.deliveryDoctor\'] }}</label>'
)
new4 = (
    CRLF + '                    </select>' + CRLF +
    CRLF + '                    @if (newChildBloodType) {' + CRLF +
    CRLF + '                      <span class="material-icons text-green-500 text-lg absolute right-10 bottom-2">verified</span>' + CRLF +
    CRLF + '                    }' + CRLF +
    CRLF + CRLF + '                  </div>' + CRLF +
    CRLF + CRLF + '                </div>' + CRLF +
    CRLF + CRLF + '                <div>' + CRLF +
    CRLF + CRLF + '                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()[\'child.deliveryDoctor\'] }}</label>'
)
do_replace(old4, new4, 'newChildBloodType verified badge')

# ── 5. editBloodType select: add (change) handler ────────────────────
old5 = (
    '<select [(ngModel)]="editBloodType"' + CRLF +
    CRLF + '                           class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600">' + CRLF +
    CRLF + '                      <option value="">--</option>'
)
new5 = (
    '<select [(ngModel)]="editBloodType"' + CRLF +
    CRLF + '                           (change)="bloodTypeSelected.set(true)"' + CRLF +
    CRLF + '                           class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600">' + CRLF +
    CRLF + '                      <option value="">--</option>'
)
do_replace(old5, new5, 'editBloodType (change) handler')

# ── 6. editBloodType verified badge ──────────────────────────────────
old6 = (
    CRLF + '                    </select>' + CRLF +
    CRLF + CRLF + '                  </div>' + CRLF +
    CRLF + CRLF + '' + CRLF +
    CRLF + CRLF + '                  <!-- Actions -->'
)
new6 = (
    CRLF + '                    </select>' + CRLF +
    CRLF + '                    @if (editBloodType) {' + CRLF +
    CRLF + '                      <span class="material-icons text-green-500 text-lg absolute right-12 bottom-2">verified</span>' + CRLF +
    CRLF + '                    }' + CRLF +
    CRLF + CRLF + '                  </div>' + CRLF +
    CRLF + CRLF + '' + CRLF +
    CRLF + CRLF + '                  <!-- Actions -->'
)
do_replace(old6, new6, 'editBloodType verified badge')

with open(r'C:\Users\g_gus\Desktop\jona\kiddok\src\app\components\shell.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(str(changes) + ' template changes applied.')
