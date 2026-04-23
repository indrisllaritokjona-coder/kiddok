const fs = require('fs');

let lines = fs.readFileSync('src/app/components/shell.component.ts', 'utf-8').split('\n');

function removeRange(startLine, endLine) {
    // startLine and endLine are 1-indexed
    const before = lines.slice(0, startLine - 1);
    const after = lines.slice(endLine);
    lines = before.concat(after);
    console.log(`Removed lines ${startLine}-${endLine}, new length: ${lines.length}`);
}

// Remove in REVERSE order (bottom to top) so line numbers stay valid
// closeModal and onChildSaved + Child Modal section (lines 769-776)
removeRange(769, 776);

// confirmDeleteChild method (lines 611-613)
removeRange(611, 613);

// saveEditChild + closeEditModal call inside it (lines 543-579)
removeRange(543, 579);

// closeEditModal method (lines 531-533)
removeRange(531, 533);

// openEditModal method (lines 505-529)
removeRange(505, 529);

fs.writeFileSync('src/app/components/shell.component.ts', lines.join('\n'));
console.log('Final length:', lines.length);

// Verify no bad refs remain
const content = lines.join('\n');
const badRefs = ['showChildModal', 'editingChild = signal', 'openEditModal', 'closeEditModal', 'saveEditChild', 'confirmDeleteChild', 'closeModal()'];
for (const ref of badRefs) {
    if (content.includes(ref)) {
        console.log('STILL HAS:', ref);
    }
}
console.log('Done');
