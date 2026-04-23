f = open(r'C:\Users\g_gus\Desktop\jona\kiddok\src\app\core\i18n\i18n.service.ts', 'r', encoding='utf-8')
c = f.read()
f.close()

# Find the header.profileLabel line and insert new keys after it
idx = c.find("'header.profileLabel':")
if idx < 0:
    print("NOT FOUND")
else:
    # Find end of that line
    line_end = c.find('\n', idx)
    # Insert new keys after this line
    insert = "\n  'header.quickSwitch': { sq: 'Ndërrim i shpejtë', en: 'Quick Switch' },\n  'header.altShortcut': { sq: 'Alt+C', en: 'Alt+C' },"
    c = c[:line_end+1] + insert + c[line_end+1:]
    f = open(r'C:\Users\g_gus\Desktop\jona\kiddok\src\app\core\i18n\i18n.service.ts', 'w', encoding='utf-8')
    f.write(c)
    f.close()
    print("REPLACED OK")