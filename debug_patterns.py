#!/usr/bin/env python3
with open(r'C:\Users\g_gus\Desktop\jona\kiddok\src\app\components\shell.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Test editName pattern
old1 = (
    '<input type="text" [(ngModel)]="editName"' + '\r\n' +
    '\r\n' + '                         class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800">' + '\r\n' +
    '\r\n' + '                </div>'
)
print('old1 in content:', old1 in content)

# Find actual editName input
idx = content.find('<input type="text" [(ngModel)]="editName"')
print('actual at:', idx)
if idx >= 0:
    print(repr(content[idx:idx+250]))
