import 'package:flutter/material.dart';

class GettingStartedScreen extends StatelessWidget {
  const GettingStartedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _GettingStartedHeader(),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  _StepCard(
                    number: 1,
                    title: 'Create a Supabase project',
                    children: [
                      _stepText('Go to '),
                      _stepBold('supabase.com'),
                      _stepText(' (free tier available)'),
                      _stepItem('Create a new project'),
                      _stepItem('Copy your Project URL and Anon Key'),
                      _stepItem('Find them under Settings → API'),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _StepCard(
                    number: 2,
                    title: 'Fill in .env',
                    children: [
                      _stepText('Open .env in your project root and fill in:'),
                    ],
                    codeSnippet:
                        'SUPABASE_URL=https://xxxx.supabase.co\nSUPABASE_ANON_KEY=eyJ...',
                    footer: 'Then restart the app:',
                    footerCode: 'flutter run -d macos',
                  ),
                  const SizedBox(height: 12),
                  _StepCard(
                    number: 3,
                    title: 'Run the migration SQL',
                    children: [
                      _stepItem('Open Supabase → SQL Editor'),
                      _stepItem('Paste contents of supabase/migrations/001_tasks.sql'),
                      _stepItem('Click Run'),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _StepCard(
                    number: 4,
                    title: 'Start building',
                    children: [
                      _stepItem('The Tasks tab shows a working CRUD example'),
                      _stepItem(
                          'Edit lib/screens/tasks_screen.dart to replace with your feature'),
                      _stepItem(
                          'Add new screens to lib/screens/ and register them in app_shell.dart'),
                    ],
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  static Widget _stepText(String text) => Padding(
        padding: const EdgeInsets.only(top: 4),
        child: Text(
          text,
          style: const TextStyle(fontSize: 13, color: Color(0xFF4B5563)),
        ),
      );

  static Widget _stepBold(String text) => Text(
        text,
        style: const TextStyle(
          fontSize: 13,
          color: Color(0xFF4F46E5),
          fontWeight: FontWeight.w600,
        ),
      );

  static Widget _stepItem(String text) => Padding(
        padding: const EdgeInsets.only(top: 6),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.only(top: 5, right: 8),
              child: Icon(Icons.circle, size: 5, color: Color(0xFF9CA3AF)),
            ),
            Expanded(
              child: Text(
                text,
                style: const TextStyle(
                  fontSize: 13,
                  color: Color(0xFF4B5563),
                  height: 1.5,
                ),
              ),
            ),
          ],
        ),
      );
}

class _GettingStartedHeader extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF4F46E5), Color(0xFF7C3AED)],
        ),
      ),
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(24, 20, 24, 28),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Get Started',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'Set up Supabase in 4 steps',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.7),
                  fontSize: 14,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _StepCard extends StatelessWidget {
  final int number;
  final String title;
  final List<Widget> children;
  final String? codeSnippet;
  final String? footer;
  final String? footerCode;

  const _StepCard({
    required this.number,
    required this.title,
    required this.children,
    this.codeSnippet,
    this.footer,
    this.footerCode,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: const Color(0xFFE5E7EB)),
        borderRadius: BorderRadius.circular(12),
      ),
      padding: const EdgeInsets.all(16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Number circle
          Container(
            width: 28,
            height: 28,
            decoration: BoxDecoration(
              color: const Color(0xFF4F46E5),
              borderRadius: BorderRadius.circular(999),
            ),
            alignment: Alignment.center,
            child: Text(
              '$number',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 13,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF111827),
                  ),
                ),
                const SizedBox(height: 8),
                ...children,
                if (codeSnippet != null) ...[
                  const SizedBox(height: 12),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: const Color(0xFF1F2937),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      codeSnippet!,
                      style: const TextStyle(
                        fontFamily: 'monospace',
                        fontSize: 12,
                        color: Color(0xFF86EFAC),
                        height: 1.6,
                      ),
                    ),
                  ),
                ],
                if (footer != null) ...[
                  const SizedBox(height: 10),
                  Text(
                    footer!,
                    style: const TextStyle(
                      fontSize: 13,
                      color: Color(0xFF4B5563),
                    ),
                  ),
                ],
                if (footerCode != null) ...[
                  const SizedBox(height: 6),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
                    decoration: BoxDecoration(
                      color: const Color(0xFF1F2937),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      footerCode!,
                      style: const TextStyle(
                        fontFamily: 'monospace',
                        fontSize: 12,
                        color: Color(0xFF86EFAC),
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}
