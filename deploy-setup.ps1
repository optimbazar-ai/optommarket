# OptoMarket.uz - GitHub Push Script
# PowerShell script for initial setup

Write-Host "🚀 OptoMarket.uz - GitHub Push Script" -ForegroundColor Green
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Please enter your GitHub username:" -ForegroundColor Cyan
$username = Read-Host

Write-Host ""
Write-Host "📝 Repository name (default: optommarket-uz):" -ForegroundColor Cyan
$repoName = Read-Host
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "optommarket-uz"
}

Write-Host ""
Write-Host "🔍 Checking for changes..." -ForegroundColor Yellow

# Add all files
git add .

# Commit
$commitMessage = "Initial commit - OptoMarket.uz ready for production"
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $commitMessage

# Check if remote exists
$remoteExists = git remote | Select-String "origin"
if ($remoteExists) {
    Write-Host "⚠️  Remote 'origin' already exists, removing..." -ForegroundColor Yellow
    git remote remove origin
}

# Add remote
$remoteUrl = "https://github.com/$username/$repoName.git"
Write-Host "🔗 Adding remote: $remoteUrl" -ForegroundColor Yellow
git remote add origin $remoteUrl

# Set main branch
git branch -M main

Write-Host ""
Write-Host "🚀 Ready to push!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Make sure you have created the repository on GitHub first!" -ForegroundColor Yellow
Write-Host "   Go to: https://github.com/new" -ForegroundColor Cyan
Write-Host "   Repository name: $repoName" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Enter when ready to push..." -ForegroundColor Yellow
Read-Host

# Push
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host "1. Deploy Frontend to Netlify: https://app.netlify.com" -ForegroundColor White
Write-Host "2. Deploy Backend to Render: https://dashboard.render.com" -ForegroundColor White
Write-Host ""
Write-Host "📚 See DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Yellow
