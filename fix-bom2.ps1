$path = 'C:\Users\g_gus\Desktop\jona\kiddok\src\app\core\i18n\i18n.service.ts'
$bytes = [System.IO.File]::ReadAllBytes($path)
Write-Host "First 10 bytes: $($bytes[0..9] -join ',')"
Write-Host "Total length: $($bytes.Length)"
# Try to write as UTF8 without BOM
$content = [System.Text.Encoding]::UTF8.GetString($bytes)
$utf8noBOM = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($path, $content, $utf8noBOM)
Write-Host "Rewritten as UTF8 without BOM"
