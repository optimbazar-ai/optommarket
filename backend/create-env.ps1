$envContent = @"
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://akramfarmonov998_db_user:Er9F2ERiKYQUUBBX@cluster0.nxc5sbb.mongodb.net/optommarket?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=optommarket_secret_key_2024_change_in_production
JWT_EXPIRE=7d
"@

$envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
Write-Host "✅ .env fayl yaratildi!" -ForegroundColor Green
Write-Host ""
Write-Host "MongoDB Atlas connection configured:" -ForegroundColor Cyan
Write-Host "Database: optommarket" -ForegroundColor Yellow
Write-Host "Cluster: cluster0.nxc5sbb.mongodb.net" -ForegroundColor Yellow
