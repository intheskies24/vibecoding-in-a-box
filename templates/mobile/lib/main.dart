import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'screens/app_shell.dart';

bool supabaseConfigured = false;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: '.env');
  final url = dotenv.env['SUPABASE_URL'] ?? '';
  final key = dotenv.env['SUPABASE_ANON_KEY'] ?? '';
  if (url.startsWith('https://') && key.isNotEmpty) {
    try {
      await Supabase.initialize(url: url, anonKey: key);
      supabaseConfigured = true;
    } catch (_) {}
  }
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF4F46E5)),
        useMaterial3: true,
      ),
      home: const AppShell(),
    );
  }
}
