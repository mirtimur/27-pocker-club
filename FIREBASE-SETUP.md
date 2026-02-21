# Firebase Setup Instructions

To enable real-time multiplayer synchronization, you need to set up a free Firebase project.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `27-poker-club`
4. Follow the setup wizard (you can disable Google Analytics if you want)

## Step 2: Enable Realtime Database

1. In your Firebase project, go to **Build** → **Realtime Database**
2. Click **Create Database**
3. Choose location (closest to your region)
4. Start in **Test mode** (we'll secure it later)
5. Click **Enable**

## Step 3: Get Your Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register your app (name: `27 Poker Club`)
5. Copy the `firebaseConfig` object

## Step 4: Update room.html

1. Open `room.html`
2. Find this section (around line 280):

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDemoKey-Replace-With-Your-Key",
    authDomain: "poker-club-demo.firebaseapp.com",
    databaseURL: "https://poker-club-demo-default-rtdb.firebaseio.com",
    projectId: "poker-club-demo",
    storageBucket: "poker-club-demo.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

3. Replace it with your Firebase config from Step 3

## Step 5: Set Database Rules (Optional - for security)

In Firebase Console → Realtime Database → Rules, use:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        "players": {
          ".indexOn": ["timestamp"]
        }
      }
    }
  }
}
```

## Step 6: Deploy

Push your changes to GitHub:

```powershell
git add .
git commit -m "Add Firebase configuration"
git push origin main
```

## Without Firebase

If you don't set up Firebase, the app will use localStorage with polling (updates every 2 seconds).

**Note:** localStorage only works within the same browser, so players from different devices won't see each other.

## Testing

1. Open the room page in two different browser tabs
2. Change your name in one tab
3. The other tab should update automatically (if Firebase is configured)

## Troubleshooting

- **"Firebase not available"** in console: Firebase config may be incorrect
- **Players not syncing**: Check Firebase Database Rules
- **CORS errors**: Make sure your domain is allowed in Firebase settings
