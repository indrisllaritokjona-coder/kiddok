const fs = require('fs');
const path = 'C:/Users/g_gus/Desktop/jona/kiddok/src/app/core/i18n/i18n.service.ts';
const buf = fs.readFileSync(path);
const content = buf.toString('utf8');
// Strip any leading BOM-like Unicode characters
const stripped = content.replace(/^[\u00bb\u00bf\u00c2\u007f]+/, '');
console.log('Was stripped:', stripped.length !== content.length);
fs.writeFileSync(path, stripped, 'utf8');
console.log('Done');
