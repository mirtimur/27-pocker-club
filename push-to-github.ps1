# Скрипт для пуша изменений на GitHub

# Инициализация git репозитория (если еще не инициализирован)
git init

# Добавление remote origin (если еще не добавлен)
git remote remove origin 2>$null
git remote add origin https://github.com/mirtimur/27-pocker-club.git

# Настройка пользователя (замените на свои данные если нужно)
git config user.name "mirtimur"
git config user.email "your-email@example.com"

# Добавление всех файлов
git add .

# Создание коммита
git commit -m "Add Start New Game button"

# Пуш на GitHub
git push -u origin main --force

Write-Host "Changes pushed to GitHub successfully!" -ForegroundColor Green
Write-Host "Your site will be updated at: https://mirtimur.github.io/27-pocker-club/" -ForegroundColor Cyan
