const fs = require('fs');

let content = fs.readFileSync('src/app/components/shell.component.ts', 'utf-8');

// 1. Fix header add button: showChildModal.set(true) -> modal.openAddChild()
content = content.replace(
    '(addChildRequested)="showChildModal.set(true)"',
    '(addChildRequested)="modal.openAddChild()"'
);

// 2. Remove showChildModal = signal(false)
content = content.replace(/\n  showChildModal = signal\(false\);?/, '');

// 3. Remove editingChild = signal<ChildProfile | null>(null);
content = content.replace(/\n  editingChild = signal<ChildProfile \| null>\(null\);?/, '');

// 4. Remove openEditModal method
content = content.replace(/\n  openEditModal\(child: ChildProfile\) \{[^}]+\n    this\.editingChild\.set\(child\);\n  \}\n/, '\n');

// 5. Remove closeEditModal method
content = content.replace(/\n  closeEditModal\(\) \{[^}]+\n    this\.editingChild\.set\(null\);\n  \}\n/, '\n');

// 6. Remove saveEditChild method (complex multi-line)
const saveEditChildMatch = content.match(/\n  saveEditChild\(\) \{[\s\S]+?\n  \}\n/);
if (saveEditChildMatch) {
    content = content.replace(saveEditChildMatch[0], '\n');
    console.log('Removed saveEditChild method');
}

// 7. Remove confirmDeleteChild method
const confirmDeleteMatch = content.match(/\n  confirmDeleteChild\(\) \{[\s\S]+?\n  \}\n/);
if (confirmDeleteMatch) {
    content = content.replace(confirmDeleteMatch[0], '\n');
    console.log('Removed confirmDeleteChild method');
}

// 8. Remove closeModal/onChildSaved (the local ones that delegate to showChildModal)
content = content.replace(/\n  closeModal\(\): void \{[^}]+\n    this\.showChildModal\.set\(false\);\n  \}\n/, '\n');
content = content.replace(/\n  onChildSaved\(child: ChildProfile\): void \{[\s\S]+?\n  \}\n/, '\n');

fs.writeFileSync('src/app/components/shell.component.ts', content);
console.log('Shell fixed, length:', content.length);
