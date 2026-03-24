# mobile template

**Stack:** Flutter + Supabase (Dart-native)
**Use case:** Cross-platform iOS and Android app with a real database

When you first run this template you'll see a welcome screen. Start building from `lib/screens/home_screen.dart`. Reference Supabase CRUD patterns are in `lib/services/task_service.dart`.

---

## Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install) installed
- `flutter doctor` passes with no critical errors
- A Supabase project

---

## Setup

### 1. Scaffold the project (from vibecoding-in-a-box root)

The scaffold script runs `flutter create` and overlays this template's source files:

```bash
./scripts/scaffold.sh mobile my-app
cd my-app
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_tasks.sql` in the Supabase SQL editor
3. Copy your project URL and anon key

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

## Deploy

- **iOS:** Build and submit via Xcode → App Store Connect
- **Android:** `flutter build appbundle` → Google Play Console
- **TestFlight / Internal Testing:** Distribute `.ipa` / `.aab` before full release

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `supabase_flutter` | Database, Auth, Storage, Realtime |
| `flutter_dotenv` | Load `.env` credentials |
