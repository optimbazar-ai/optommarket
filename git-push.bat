@echo off
echo ====================================
echo GIT SETUP AND PUSH TO GITHUB
echo ====================================
echo.

echo [1/7] Setting git config...
git config user.name "OptoMarketDev"
git config user.email "dev@optommarket.uz"

echo [2/7] Adding all files...
git add .

echo [3/7] Creating commit...
git commit -m "Initial commit: Full-stack OptoMarket.uz marketplace with admin panel"

echo [4/7] Adding remote...
git remote add origin https://github.com/optimbazar-ai/Optom_market.git

echo [5/7] Renaming branch to main...
git branch -M main

echo [6/7] Pushing to GitHub...
git push -u origin main

echo [7/7] Verifying remote...
git remote -v

echo.
echo ====================================
echo DONE! Check GitHub repository:
echo https://github.com/optimbazar-ai/Optom_market
echo ====================================
pause
