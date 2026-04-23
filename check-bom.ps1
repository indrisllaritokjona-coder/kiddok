$b = [System.IO.File]::ReadAllBytes('C:\Users\g_gus\Desktop\jona\kiddok\src\app\core\i18n\i18n.service.ts')
$ascii = [System.Text.Encoding]::ASCII.GetString($b, 0, [Math]::Min(30, $b.Length))
Write-Host "First 30 bytes as ASCII: $ascii"
Write-Host "Hex: $($b[0..15] -join ' ')"
