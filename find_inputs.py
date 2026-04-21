#!/usr/bin/env python3
with open(r'C:\Users\g_gus\Desktop\jona\kiddok\src\app\components\shell.component.ts', 'rb') as f:
    raw = f.read()

# Find editName input
positions = []
pos = 0
while True:
    pos = raw.find(b'editName', pos)
    if pos == -1 or pos > 50000:
        break
    positions.append(pos)
    pos += 1

for p in positions[:8]:
    print(f'{p}: {repr(raw[p:p+50])}')

print()
# newChildName
positions2 = []
pos = 0
while True:
    pos = raw.find(b'newChildName', pos)
    if pos == -1 or pos > 50000:
        break
    positions2.append(pos)
    pos += 1

for p in positions2[:8]:
    print(f'{p}: {repr(raw[p:p+50])}')

print()
# bloodType select
idx = raw.find(b'newChildBloodType')
print('newChildBloodType:', repr(raw[idx:idx+250]))
print()
idx2 = raw.find(b'editBloodType')
print('editBloodType:', repr(raw[idx2:idx2+250]))
