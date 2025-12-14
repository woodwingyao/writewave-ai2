# Build Android AAB Instructions

## Prerequisites
- Android Studio installed
- Java JDK 11 or higher installed
- Android SDK Platform 34 or higher

## Steps to Build the AAB

1. **Sync the Android project with the latest build:**
   ```bash
   npm run android:sync
   ```

2. **Open Android Studio:**
   - Open the `android` folder in Android Studio
   - Wait for Gradle sync to complete

3. **Build the Release AAB:**

   **Option A: Using Android Studio GUI**
   - Go to: Build → Generate Signed Bundle / APK
   - Select "Android App Bundle"
   - Create or select a keystore
   - Choose "release" build variant
   - Click "Finish"

   **Option B: Using Command Line**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

4. **Locate the AAB file:**
   - The AAB will be created at:
     ```
     android/app/build/outputs/bundle/release/app-release.aab
     ```

## For Testing (Debug Build)

To create an unsigned debug AAB for testing:
```bash
cd android
./gradlew bundleDebug
```

Debug AAB location:
```
android/app/build/outputs/bundle/debug/app-debug.aab
```

## Signing the AAB (For Production)

If you built an unsigned AAB, you'll need to sign it:

1. **Create a keystore (if you don't have one):**
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore \
     -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Sign the AAB:**
   ```bash
   jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
     -keystore my-release-key.keystore \
     app/build/outputs/bundle/release/app-release.aab my-key-alias
   ```

## Upload to Google Play

1. Go to Google Play Console
2. Select your app
3. Navigate to "Production" or "Testing"
4. Click "Create new release"
5. Upload the signed AAB file
6. Complete the release form and publish

## Troubleshooting

**Error: SDK location not found**
- Solution: Create `android/local.properties` with:
  ```
  sdk.dir=/path/to/your/Android/Sdk
  ```

**Error: Gradle build failed**
- Solution: Ensure you have enough memory allocated to Gradle
- Edit `android/gradle.properties`:
  ```
  org.gradle.jvmargs=-Xmx2048m
  ```

**Error: Missing dependencies**
- Solution: Run `npm run android:sync` to ensure all dependencies are installed
