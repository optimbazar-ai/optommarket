# Create Frontend .env.local
$frontendEnv = @"
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=OPTOMMARKET
"@
$frontendEnv | Out-File -FilePath "frontend\.env.local" -Encoding utf8 -NoNewline

# Create Backend .env
$backendEnv = @"
DATABASE_URL=postgresql://user:password@host/optommarket_db
JWT_SECRET=your_super_secret_key_12345
PORT=5000
NODE_ENV=development
"@
$backendEnv | Out-File -FilePath "backend\.env" -Encoding utf8 -NoNewline

Write-Host "✅ .env files created successfully!"
