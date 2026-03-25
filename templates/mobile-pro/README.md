# mobile-pro template

**Stack:** Flutter + Supabase + Anthropic Claude API (via HTTP) — Dart-native
**Use case:** AI-powered cross-platform iOS and Android app

This template extends `mobile` with a Claude-powered chat screen. Claude is called directly via HTTP from Dart — there is no official Flutter/Dart SDK, but the REST API works perfectly.

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
```

**Windows:**
```powershell
winget install -e --id Google.Flutter
```

> Run `flutter doctor` and fix any critical issues before scaffolding. Full install guide: `docs/flutter-setup.md` in the vibecoding-in-a-box repo.

### Other prerequisites

- A [Supabase](https://supabase.com) account (free)
- An [Anthropic API key](https://console.anthropic.com/settings/keys)

---

## Setup

### 1. Scaffold (from vibecoding-in-a-box root)

```bash
./scripts/scaffold.sh mobile-pro my-app
cd my-app
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_tasks.sql` in the Supabase SQL editor
3. Copy your project URL and anon key

### 3. Get an Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com/settings/keys)
2. Create an API key

### 4. Configure environment

```bash
cp .env.example .env
# Fill in SUPABASE_URL, SUPABASE_ANON_KEY, and ANTHROPIC_API_KEY
```

### 5. Run

```bash
flutter pub get
flutter run
```

---

## ⚠️ API Key Security

The `.env` file is bundled into the app binary during `flutter build`. For a **production** app, you should proxy Claude API calls through a backend (e.g. a Supabase Edge Function) so the key never leaves the server.

For prototyping and internal tools, loading directly from `.env` is fine.

---

## Project Structure

```
lib/
├── main.dart
├── models/
│   └── task.dart
├── screens/
│   ├── home_screen.dart       # Welcome screen with Chat + Tasks buttons
│   ├── chat_screen.dart       # Claude chat UI
│   └── tasks_screen.dart      # Reference Supabase CRUD screen
└── services/
    ├── ai_service.dart        # Claude REST API client
    └── task_service.dart      # Supabase queries
```

---

## How the Claude API Works in Dart

```dart
// lib/services/ai_service.dart
final response = await http.post(
  Uri.parse('https://api.anthropic.com/v1/messages'),
  headers: {
    'x-api-key': _apiKey,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json',
  },
  body: jsonEncode({
    'model': 'claude-opus-4-6',
    'max_tokens': 1024,
    'system': systemPrompt,
    'messages': messages,
  }),
);
```

See `lib/services/ai_service.dart` for the full implementation.
To customise the AI behaviour, change `systemPrompt` when calling `aiService.chat(...)`.

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `supabase_flutter` | Database, Auth, Storage |
| `flutter_dotenv` | Load `.env` credentials |
| `http` | HTTP client for Claude REST API |
