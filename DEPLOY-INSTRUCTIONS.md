# Инструкция по деплою на GitHub

## Шаг 1: Установите Git

Скачайте и установите Git для Windows:
https://git-scm.com/download/win

Или используйте команду:
```powershell
winget install --id Git.Git -e
```

## Шаг 2: Перезапустите терминал

После установки Git закройте и откройте терминал заново, чтобы Git был доступен.

## Шаг 3: Запустите скрипт для пуша

```powershell
.\push-to-github.ps1
```

Или выполните команды вручную:

```powershell
git init
git remote add origin https://github.com/mirtimur/27-pocker-club.git
git config user.name "mirtimur"
git config user.email "your-email@example.com"
git add .
git commit -m "Add Start New Game button"
git push -u origin main --force
```

## Шаг 4: Проверьте сайт

После пуша подождите 1-2 минуты и проверьте изменения на:
https://mirtimur.github.io/27-pocker-club/

## Примечание

При первом пуше GitHub может попросить авторизацию. Используйте свой GitHub логин и Personal Access Token (не пароль).

Как создать токен:
1. Перейдите на https://github.com/settings/tokens
2. Создайте новый токен (classic)
3. Дайте права: repo
4. Используйте этот токен как пароль
