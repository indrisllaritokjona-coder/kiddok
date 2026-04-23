const fs = require('fs');

const shell = fs.readFileSync('src/app/components/shell.component.ts', 'utf-8');
let lines = shell.split('\n');
const newLines = [];
let i = 0;
while (i < lines.length) {
    const line = lines[i];

    // Fix: (openEditChild)="openEditModal($event)" -> modal.openEditChild($event)
    if (line.includes('(openEditChild)="openEditModal($event)"')) {
        newLines.push(line.replace('openEditModal($event)', 'modal.openEditChild($event)'));
        i++; continue;
    }

    // Skip @if (showChildModal()) { block
    if (line.includes('@if (showChildModal())') && i > 300) {
        let depth = 0;
        while (i < lines.length) {
            const stripped = lines[i].trim();
            if (stripped.startsWith('@if') || stripped.startsWith('@for') || stripped.startsWith('@switch')) depth++;
            if (stripped === '}') { depth--; if (depth <= 0) { i++; break; } }
            i++;
        }
        continue;
    }

    newLines.push(line);
    i++;
}

console.log(`Shell: ${lines.length} -> ${newLines.length} lines`);
fs.writeFileSync('src/app/components/shell.component.ts', newLines.join('\n'));

// ===== FIX SETTINGS PAGE =====
let settings = fs.readFileSync('src/app/components/settings/settings-page.component.ts', 'utf-8');

// Add ModalService import after NotificationService
settings = settings.replace(
    "import { NotificationService } from '../../services/notification.service';",
    "import { NotificationService } from '../../services/notification.service';\nimport { ModalService } from '../../services/modal.service';"
);
settings = settings.replace(
    "themeSvc = inject(ThemeService);",
    "themeSvc = inject(ThemeService);\n  modal = inject(ModalService);"
);
settings = settings.replace('openEditChild.emit(child)', 'modal.openEditChild(child)');
settings = settings.replace('openAddChild.emit()', 'modal.openAddChild()');
settings = settings.replace("  @Output() openEditChild = new EventEmitter<any>();\n", '');
settings = settings.replace("  @Output() openAddChild = new EventEmitter<void>();\n", '');
// Remove Output, EventEmitter from angular core import
settings = settings.replace(', Output, EventEmitter, ', ', ');

console.log('Settings page fixed');
fs.writeFileSync('src/app/components/settings/settings-page.component.ts', settings);
console.log('Done');
