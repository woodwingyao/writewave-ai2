# Android App Bundle Build Guide

This guide explains how to build an Android App Bundle (AAB) for AI Copywriter Studio.

## Prerequisites

Before building the Android app, you need:

1. **Java Development Kit (JDK) 17 or higher**
   - Download from: https://adoptium.net/
   - Verify installation: `java -version`

2. **Android Studio**
   - Download from: https://developer.android.com/studio
   - During installation, make sure to install:
     - Android SDK
     - Android SDK Platform
     - Android SDK Build-Tools
     - Android SDK Command-line Tools

3. **Environment Variables**
   - Set `ANDROID_HOME` to your Android SDK location
   - Example (Linux/Mac): `export ANDROID_HOME=$HOME/Android/Sdk`
   - Example (Windows): `set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk`

## Project Setup

The project is already configured with Capacitor for Android. The configuration includes:

- **App ID**: `com.aicopywriter.studio`
- **App Name**: AI Copywriter Studio
- **Package**: Located in `android/` directory

## Build Instructions

### Step 1: Build Web Assets

First, build the React web application:

```bash
npm run build
```

This creates the production-ready web assets in the `dist/` folder.

### Step 2: Sync with Android

Sync the web assets with the Android project:

```bash
npx cap sync android
```

This copies the web assets to the Android project and updates native plugins.

### Step 3: Open in Android Studio

Open the Android project in Android Studio:

```bash
npx cap open android
```

Or manually open Android Studio and select: `File > Open` → navigate to the `android/` folder.

### Step 4: Build the App Bundle

#### Option A: Using Android Studio (Recommended for beginners)

1. In Android Studio, go to: `Build > Generate Signed Bundle / APK`
2. Select **Android App Bundle**
3. Click **Next**

**First time setup:**
- Click **Create new...** to create a keystore
- Fill in the keystore information:
  - Key store path: Choose a secure location (e.g., `~/keystores/aicopywriter.jks`)
  - Password: Create a strong password (save this!)
  - Alias: `upload` or your preferred alias
  - Alias password: Can be same as keystore password
  - Validity: 25 years minimum (Google Play requirement)
  - Certificate info: Fill in your organization details

**Subsequent builds:**
- Click **Choose existing...** and select your keystore
- Enter keystore and key passwords

5. Select build variant: **release**
6. Click **Finish**

The AAB will be generated in: `android/app/release/app-release.aab`

#### Option B: Using Command Line

1. **Create a keystore (first time only):**

```bash
keytool -genkey -v -keystore ~/keystores/aicopywriter.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

2. **Create key.properties file:**

Create `android/key.properties` with:

```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=upload
storeFile=/path/to/your/keystore.jks
```

**IMPORTANT**: Add `key.properties` to `.gitignore` to keep your credentials secure!

3. **Update build.gradle:**

Edit `android/app/build.gradle` and add before the `android` block:

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Update the `signingConfigs` in the `android` block:

```gradle
android {
    ...
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

4. **Build the bundle:**

```bash
cd android
./gradlew bundleRelease
```

The AAB will be at: `android/app/build/outputs/bundle/release/app-release.aab`

## Testing the App

### Test on Device/Emulator (Debug Build)

To test without building a release:

```bash
npx cap run android
```

This builds a debug APK and installs it on a connected device or running emulator.

### Test the Release Bundle Locally

You can test the AAB using bundletool:

1. Download bundletool from: https://github.com/google/bundletool/releases

2. Generate APKs from the bundle:

```bash
java -jar bundletool.jar build-apks --bundle=app-release.aab --output=app.apks --mode=universal
```

3. Install on device:

```bash
java -jar bundletool.jar install-apks --apks=app.apks
```

## Updating the App

When you make changes to your web app:

1. Make code changes in `src/`
2. Build web assets: `npm run build`
3. Sync with Android: `npx cap sync android`
4. Build new AAB following Step 4 above

## Version Management

Update app version in two places:

1. **package.json**: Update `version` field
2. **android/app/build.gradle**:
   ```gradle
   versionCode 2      // Increment by 1 for each release
   versionName "1.1"  // Semantic version
   ```

## Publishing to Google Play Store

1. Create a Google Play Developer account ($25 one-time fee)
2. Go to: https://play.google.com/console
3. Click **Create app**
4. Fill in app details (name, description, screenshots, etc.)
5. Under **Release > Production**, upload your AAB file
6. Complete all required store listing information
7. Submit for review

### Important Google Play Requirements

- Privacy Policy URL (required if app collects user data)
- App screenshots (at least 2)
- High-res icon (512x512 PNG)
- Feature graphic (1024x500)
- Content rating questionnaire
- Target audience and content

## Troubleshooting

### "JAVA_HOME is not set"

Set JAVA_HOME environment variable:

```bash
# Linux/Mac
export JAVA_HOME=/path/to/jdk
export PATH=$JAVA_HOME/bin:$PATH

# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%
```

### "Android SDK not found"

Set ANDROID_HOME:

```bash
# Linux/Mac
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$ANDROID_HOME/platform-tools:$PATH

# Windows
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
set PATH=%ANDROID_HOME%\platform-tools;%PATH%
```

### "Build failed with Gradle"

1. Clean the build:
   ```bash
   cd android
   ./gradlew clean
   ```

2. Rebuild:
   ```bash
   ./gradlew bundleRelease
   ```

### "Unable to load script from assets"

Make sure you've synced after building:

```bash
npm run build
npx cap sync android
```

### Icon/Splash Screen Issues

Generate proper Android icons and splash screens:

```bash
npm install -g cordova-res
cordova-res android --skip-config --copy
```

## File Size Optimization

To reduce the AAB size:

1. Enable code shrinking in `android/app/build.gradle`:
   ```gradle
   buildTypes {
       release {
           minifyEnabled true
           shrinkResources true
       }
   }
   ```

2. Optimize web assets before building
3. Use WebP images instead of PNG/JPG
4. Remove unused dependencies

## Security Notes

- **NEVER commit your keystore file** to version control
- **NEVER commit key.properties** with passwords
- Store keystore in a secure backup location
- Use strong passwords for keystore and keys
- Keep keystore password in a password manager

## Support and Resources

- Capacitor Docs: https://capacitorjs.com/docs
- Android Developer Guide: https://developer.android.com/guide
- Google Play Console Help: https://support.google.com/googleplay/android-developer
- Capacitor Android: https://capacitorjs.com/docs/android

## Quick Command Reference

```bash
# Build and sync in one go
npm run build && npx cap sync android

# Open in Android Studio
npx cap open android

# Run on device
npx cap run android

# Build release bundle (after setup)
cd android && ./gradlew bundleRelease

# Check Capacitor setup
npx cap doctor android
```
