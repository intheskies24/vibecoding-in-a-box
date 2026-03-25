# mobile template

**Stack:** Flutter + Supabase (Dart-native)
**Use case:** Cross-platform iOS and Android app with a real database

When you first run this template you'll see a welcome screen. Start building from `lib/screens/home_screen.dart`. Reference Supabase CRUD patterns are in `lib/services/task_service.dart`.

---

## Prerequisites

### Flutter (required before scaffolding)

The scaffold script requires Flutter to be installed — it runs `flutter create` to generate the native iOS/Android project shell.

**macOS (Homebrew — fastest):**
```bash
brew install --cask flutter
flutter doctor
```

**Linux:**
```bash
sudo snap install flutter --classic
flutter doctor
```

**Windows:**
```powershell
winget install -e --id Google.Flutter
```

> Run `flutter doctor` and fix any critical issues before scaffolding. Full install guide: `docs/flutter-setup.md` in the vibecoding-in-a-box repo.

### Other prerequisites

- A device/simulator ready to run (iOS Simulator, Android Emulator, or physical device)
- A [Supabase](https://supabase.com) account (free)

---

## Setup

### 1. Scaffold the project (from vibecoding-in-a-box root)

```bash
./scripts/scaffold.sh mobile my-app
cd my-app
```

The scaffold script runs `flutter create` to generate the native project shell, then overlays the vibecoding-in-a-box Dart source files.

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com) (free tier)
2. Go to **SQL Editor** and run `supabase/migrations/001_tasks.sql`
3. Copy your **Project URL** and **Anon Key** from **Settings → API**

### 3. Configure environment

```bash
cp .env.example .env
# Fill in SUPABASE_URL and SUPABASE_ANON_KEY
```

### 4. Install dependencies and run

```bash
flutter pub get
flutter run
```

Select your simulator or device from the menu. The task manager app will launch.

---

## Project Structure

```
lib/
├── main.dart                  # Entry point: Supabase init, MaterialApp
├── models/
│   └── task.dart              # Task data model
├── screens/
│   ├── home_screen.dart       # Welcome screen (start here)
│   └── tasks_screen.dart      # Reference CRUD screen
└── services/
    └── task_service.dart      # Supabase query patterns

supabase/
└── migrations/
    └── 001_tasks.sql          # DB schema + RLS policies
```

---

## How Supabase Works in Flutter

```dart
// Initialize once in main.dart
await Supabase.initialize(url: '...', anonKey: '...');
final supabase = Supabase.instance.client;

// Query
final data = await supabase.from('tasks').select().order('created_at');

// Insert
await supabase.from('tasks').insert({'title': 'Buy milk'});

// Update
await supabase.from('tasks').update({'status': 'done'}).eq('id', id);

// Delete
await supabase.from('tasks').delete().eq('id', id);
```

See `lib/services/task_service.dart` for complete working examples.

---

## Adding Auth (Supabase Auth)

Supabase Auth is built in. To add sign-in:

```dart
// Email/password sign up
await supabase.auth.signUp(email: email, password: password);

// Sign in
await supabase.auth.signInWithPassword(email: email, password: password);

// Current user
final user = supabase.auth.currentUser;

// Sign out
await supabase.auth.signOut();
```

RLS policies in `001_tasks.sql` already use `auth.uid()` to scope data per user.

---

## Building Your Feature

To replace the task manager with your own feature:

1. **Database:** Add a new migration in `supabase/migrations/`
2. **Model:** Add a Dart model class in `lib/models/`
3. **Service:** Add a Supabase service in `lib/services/`
4. **Screen:** Add screens in `lib/screens/`

---

## Deploy

- **iOS:** `flutter build ipa` → Xcode → App Store Connect
- **Android:** `flutter build appbundle` → Google Play Console
- **TestFlight / Internal Testing:** Distribute `.ipa` / `.aab` before full review

See `docs/deployment.md` for step-by-step build and submission instructions.

---

## Useful Commands

| Command | What it does |
|---------|-------------|
| `flutter run` | Run on connected device/simulator |
| `flutter pub get` | Install dependencies |
| `flutter pub add <package>` | Add a dependency |
| `flutter hot reload` | Press `r` while running |
| `flutter doctor` | Check environment health |

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `supabase_flutter` | Database, Auth, Storage, Realtime |
| `flutter_dotenv` | Load `.env` credentials |
