# How to Test Your AAB File Before Uploading to Google Play

## Method 1: Using bundletool (Recommended)

### Step 1: Install bundletool
Download bundletool from: https://github.com/google/bundletool/releases
Or use this direct command:
```bash
wget https://github.com/google/bundletool/releases/download/1.15.6/bundletool-all-1.15.6.jar
```

### Step 2: Generate APKs from your AAB
```bash
java -jar bundletool-all-1.15.6.jar build-apks --bundle=app-release.aab --output=app-release.apks --mode=universal
```

This creates a universal APK that works on all devices.

### Step 3: Extract the APK
```bash
unzip app-release.apks -d extracted_apks
```

### Step 4: Install on your device
```bash
adb install extracted_apks/universal.apk
```

Or just drag the `universal.apk` file onto your connected device/emulator in Android Studio.

---

## Method 2: Upload to Google Play Internal Testing (Safest)

### Step 1: Create Internal Testing Track
1. Go to Google Play Console
2. Select your app
3. Go to **Testing** → **Internal testing**
4. Click **Create new release**

### Step 2: Upload AAB
1. Upload your AAB file
2. Add release notes (e.g., "Testing new feature")
3. Click **Save** then **Review release**

### Step 3: Add yourself as tester
1. Go to **Testers** tab
2. Create a tester list
3. Add your email address
4. Save

### Step 4: Install and test
1. You'll receive an email with a test link
2. Open on your Android device
3. Click "Download it on Google Play"
4. Install and test thoroughly

**Benefits:**
- Tests the EXACT version users will get
- No need for bundletool
- Can share with team members easily
- Doesn't affect production users

---

## Quick Verification Checklist

Before installing, verify your AAB:
- [ ] File size looks reasonable (should be 5-15MB typically)
- [ ] Built from latest code (`npm run build && npm run android:sync`)
- [ ] No build errors in Android Studio

After installing:
- [ ] App opens successfully
- [ ] New feature is visible
- [ ] New feature works as expected
- [ ] No crashes or errors
- [ ] All existing features still work

---

## Troubleshooting

**If your new feature isn't showing:**
1. Delete `dist/` folder: `rm -rf dist`
2. Rebuild: `npm run build`
3. Resync: `npm run android:sync`
4. Clean Android project: Build → Clean Project in Android Studio
5. Rebuild AAB

**If app crashes:**
- Check Android Studio Logcat for errors
- Verify all environment variables are set
- Test in Chrome DevTools first (web version)

---

## My Recommendation

**Use Method 2 (Internal Testing)** because:
- It's how Google will actually deliver your app
- Tests the complete installation process
- Easy to share with beta testers
- No technical tools needed
- Takes 5-10 minutes to be available

**Use Method 1 only if:**
- You need to test immediately (no wait time)
- You're comfortable with command line tools
- You want to test locally before uploading
