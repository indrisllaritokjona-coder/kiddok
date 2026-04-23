# -*- coding: utf-8 -*-
# Analyze the encoding by comparing specific mojibake sequences

path = 'C:/Users/g_gus/Desktop/jona/kiddok/src/app/core/i18n/i18n.service.ts'

with open(path, 'rb') as f:
    raw = f.read()

# Find specific strings
sidebar_activeChild = raw[raw.find(b'sidebar.activeChild'):raw.find(b'sidebar.activeChild')+200]
print("sidebar.activeChild hex:", sidebar_activeChild[:60].hex())
print("sidebar.activeChild raw:", sidebar_activeChild[:60])

# Decode as UTF-8
as_utf8 = raw.decode('utf-8', errors='replace')
# Find the sidebar.activeChild value
idx = as_utf8.find("sidebar.activeChild")
print("\nUTF-8 decoded (hex of value area):")
val_utf8 = as_utf8[idx:idx+200]
print("Value area:", repr(val_utf8[:100]))

# Now let's look at the actual bytes of just the sq value part
val_start = as_utf8.find("sq: '", idx) + 4
val_end = as_utf8.find("',", val_start)
val = as_utf8[val_start:val_end]
print("\nActual sq value (first 50):", repr(val[:50]))
print("Hex of that value:", val[:50].encode('utf-8').hex())

# What SHOULD the correct value be?
correct = "Fëmija Aktiv"
print("\nCorrect value:", repr(correct))
print("Correct hex:", correct.encode('utf-8').hex())
