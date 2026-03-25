# Flutter Setup Guide

Everything you need to install Flutter and run your first mobile app from vibecoding-in-a-box.

---

## Step 1 — Install Flutter

Choose your OS:

### macOS (Homebrew — recommended)

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Flutter
brew install --cask flutter

# Verify
flutter --version
```

### macOS (manual)

1. Download the Flutter SDK from [flutter.dev/get-started/install/macos](https://docs.flutter.dev/get-started/install/macos)
2. Unzip to `~/development/flutter`
3. Add to your PATH in `~/.zshrc` or `~/.bash_profile`:
   ```bash
   export PATH="$PATH:$HOME/development/flutter/bin"
   ```
4. Reload: `source ~/.zshrc`

### Linux (snap)

```bash
sudo snap install flutter --classic
```

### Windows

```powershell
winget install -e --id Google.Flutter
```

Or download the installer from [flutter.dev/get-started/install/windows](https://docs.flutter.dev/get-started/install/windows).

---

## Step 2 — Run `flutter doctor`

```bash
flutter doctor
```

This checks your environment and tells you what's missing. You need to fix any items marked with ✗ before you can build apps.

### Common issues and fixes

**Android licenses not accepted:**
```bash
flutter doctor --android-licenses
# Press 'y' to accept each
```

**Xcode not found (macOS):**
```bash
# Install Xcode from the App Store, then:
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

**Android Studio not found:**

You don't need Android Studio to run on a simulator, but you do need it for Android. Download from [developer.android.com/studio](https://developer.android.com/studio), install, then rerun `flutter doctor`.

---

## Step 3 — Run on a Device

### macOS Desktop (no phone or simulator needed)

vibecoding-in-a-box scaffolds Flutter projects with macOS desktop support included. This is the fastest way to test on your Mac — no device, no simulator, no Xcode required.

```bash
flutter run -d macos
```

A native macOS window opens with your app. Hot reload works exactly as it does on mobile.

### iOS Simulator (macOS only)

```bash
# Open the Simulator app
open -a Simulator

# Flutter auto-detects it
flutter run
```

If you have multiple simulators, pick one:
```bash
flutter devices           # list available simulators
flutter run -d <id>       # run on a specific one
```

### Android Emulator

1. Open Android Studio
2. Go to **Virtual Device Manager** (from the Tools menu)
3. Create a virtual device — Pixel 8 with the latest API is a safe default
4. Click the ▶ Play button to start it
5. Run `flutter run` — it will auto-detect the running emulator

### Physical device

Connect your phone via USB and enable **Developer Options + USB Debugging** (Android) or trust the computer (iOS). Then:

```bash
flutter devices      # list connected devices
flutter run -d <id>  # run on a specific device
```

---

## Step 4 — Scaffold and Run

Once `flutter doctor` is happy:

```bash
# From the vibecoding-in-a-box root:
./scripts/scaffold.sh mobile my-app
cd my-app

# Configure Supabase
cp .env.example .env
# Edit .env with your Supabase URL and anon key

# Install dependencies
flutter pub get

# Run (pick a simulator/device from the menu)
flutter run
```

---

## Supabase Setup for Mobile

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/migrations/001_tasks.sql`
3. Copy your **Project URL** and **Anon Key** from **Settings → API**
4. Paste them into `.env`:
   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_ANON_KEY=eyJ...
   ```

---

## Useful Flutter Commands

| Command | What it does |
|---------|-------------|
| `flutter run` | Run app on connected device/simulator |
| `flutter run -d chrome` | Run as web app (for quick testing) |
| `flutter hot reload` | Press `r` in terminal while running |
| `flutter hot restart` | Press `R` in terminal while running |
| `flutter pub get` | Install dependencies from `pubspec.yaml` |
| `flutter pub add <package>` | Add a new dependency |
| `flutter build ios` | Build release for iOS |
| `flutter build appbundle` | Build release for Android |
| `flutter doctor` | Check environment health |
| `flutter devices` | List connected devices |

---

## Recommended Tools

- **[VS Code + Flutter extension](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter)** — best Flutter DX with AI assistants
- **[Android Studio](https://developer.android.com/studio)** — needed for Android emulators
- **[Xcode](https://apps.apple.com/app/xcode/id497799835)** (macOS only) — needed to build for iOS

---

## Troubleshooting

**`flutter: command not found` after install:**
Your PATH is not set correctly. If you used Homebrew, try reopening your terminal. If manual install, check that the `flutter/bin` path is in your `.zshrc` or `.bash_profile`.

**`CocoaPods not installed` (macOS/iOS):**
```bash
sudo gem install cocoapods
```

**Gradle build failed (Android):**
Make sure you have the Android SDK installed (comes with Android Studio) and that `ANDROID_HOME` is set:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk   # macOS
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

**`flutter pub get` fails with network error:**
Check your internet connection. If behind a proxy, see [flutter.dev/community/china](https://docs.flutter.dev/community/china) for mirror configuration.
