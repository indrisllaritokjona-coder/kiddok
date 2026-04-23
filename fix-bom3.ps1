$path = 'C:\Users\g_gus\Desktop\jona\kiddok\src\app\core\i18n\i18n.service.ts'
$lines = Get-Content $path -Raw
$lines | Out-File $path -Encoding ASCII
Write-Host "Rewritten with ASCII encoding"
