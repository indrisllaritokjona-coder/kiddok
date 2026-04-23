$path = 'C:\Users\g_gus\Desktop\jona\kiddok\src\app\core\i18n\i18n.service.ts'
$bytes = [System.IO.File]::ReadAllBytes($path)
if ($bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191) {
    $bytes = $bytes[3..($bytes.Length - 1)]
    [System.IO.File]::WriteAllBytes($path, $bytes)
    Write-Host "BOM removed"
} else {
    Write-Host "No BOM found or unexpected bytes"
}
