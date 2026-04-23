import re

# ===== FIX SHELL COMPONENT =====
with open('src/app/components/shell.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
new_lines = []
i = 0
while i < len(lines):
    line = lines[i]

    # Fix: (openEditChild)="openEditModal($event)" -> modal.openEditChild($event)
    if '(openEditChild)="openEditModal($event)"' in line:
        new_lines.append(line.replace('openEditModal($event)', 'modal.openEditChild($event)'))
        i += 1
        continue

    # Skip @if (showChildModal()) { block
    if '@if (showChildModal())' in line and i > 300:
        depth = 0
        while i < len(lines):
            stripped = lines[i].strip()
            if stripped.startswith('@if') or stripped.startswith('@for') or stripped.startswith('@switch'):
                depth += 1
            if stripped == '}':
                depth -= 1
                if depth <= 0:
                    i += 1
                    break
            i += 1
        continue

    new_lines.append(line)
    i += 1

print(f'Shell: {len(lines)} -> {len(new_lines)} lines')
with open('src/app/components/shell.component.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))

# ===== FIX SETTINGS PAGE =====
with open('src/app/components/settings/settings-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add ModalService import after ThemeService import
content = content.replace(
    "import { ThemeService } from '../../services/theme.service';",
    "import { ThemeService } from '../../services/theme.service';\nimport { ModalService } from '../../services/modal.service';"
)

# Add private modal after themeService
content = content.replace(
    "private readonly themeService = inject(ThemeService);",
    "private readonly themeService = inject(ThemeService);\n  private readonly modal = inject(ModalService);"
)

# Replace outputs with modal calls
content = content.replace('openEditChild.emit(child)', 'modal.openEditChild(child)')
content = content.replace('openAddChild.emit()', 'modal.openAddChild()')

# Remove @Output lines
content = content.replace("  @Output() openEditChild = new EventEmitter<any>();\n", "")
content = content.replace("  @Output() openAddChild = new EventEmitter<void>();\n", "")

# Remove Output, EventEmitter from imports
content = content.replace(', Output, EventEmitter, ', ', ')

print('Settings page fixed')
with open('src/app/components/settings/settings-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
