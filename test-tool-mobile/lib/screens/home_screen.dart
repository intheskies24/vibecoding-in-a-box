import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  static const _templates = [
    ('nano', 'Local personal tool', 'Vite + React + Zustand'),
    ('micro', 'Simple hosted web app', 'Next.js + Vercel'),
    ('standard', 'Full-stack web app', 'Next.js + Supabase + Clerk'),
    ('pro', 'AI-powered web app', 'Next.js + Supabase + Clerk + Claude'),
    ('mobile', 'Cross-platform mobile', 'Flutter + Supabase'),
    ('mobile-pro', 'AI-powered mobile app', 'Flutter + Supabase + Claude'),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 32),

              // Headline
              Text(
                'You are set up with the mobile template from vibecoding-in-a-box!',
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'This template is designed for cross-platform iOS and Android apps '
                'backed by Supabase. It\'s a great starting point for note-taking apps, '
                'task managers, or any tool that needs a real database and cloud sync.',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurface.withOpacity(0.65),
                  height: 1.6,
                ),
              ),

              const SizedBox(height: 40),

              // Template table header
              Text(
                'WANT TO BUILD SOMETHING ELSE?',
                style: theme.textTheme.labelSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                  letterSpacing: 1.0,
                  color: theme.colorScheme.onSurface.withOpacity(0.5),
                ),
              ),
              const SizedBox(height: 12),

              // Template table
              Container(
                decoration: BoxDecoration(
                  border: Border.all(
                    color: theme.colorScheme.outlineVariant,
                  ),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Column(
                  children: _templates.asMap().entries.map((entry) {
                    final i = entry.key;
                    final t = entry.value;
                    final isActive = t.$1 == 'mobile';
                    final isLast = i == _templates.length - 1;

                    return Container(
                      decoration: BoxDecoration(
                        color: isActive
                            ? theme.colorScheme.primary.withOpacity(0.05)
                            : null,
                        border: isLast
                            ? null
                            : Border(
                                bottom: BorderSide(
                                  color: theme.colorScheme.outlineVariant,
                                ),
                              ),
                        borderRadius: isLast
                            ? const BorderRadius.vertical(
                                bottom: Radius.circular(8))
                            : (i == 0
                                ? const BorderRadius.vertical(
                                    top: Radius.circular(8))
                                : null),
                      ),
                      padding: const EdgeInsets.symmetric(
                          horizontal: 16, vertical: 12),
                      child: Row(
                        children: [
                          SizedBox(
                            width: 80,
                            child: Text(
                              t.$1,
                              style: theme.textTheme.bodySmall?.copyWith(
                                fontFamily: 'monospace',
                                fontWeight: isActive
                                    ? FontWeight.w700
                                    : FontWeight.normal,
                              ),
                            ),
                          ),
                          Expanded(
                            child: Text(
                              t.$2,
                              style: theme.textTheme.bodySmall?.copyWith(
                                color:
                                    theme.colorScheme.onSurface.withOpacity(0.6),
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),
              ),

              const SizedBox(height: 12),
              Text(
                'Run ./scripts/scaffold.sh <template> <project-name> from the\nvibecoding-in-a-box root to switch templates.',
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurface.withOpacity(0.45),
                ),
              ),

              const SizedBox(height: 40),

              // Reference tasks screen link
              OutlinedButton(
                onPressed: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => const _TasksReferenceScreen(),
                  ),
                ),
                child: const Text('View reference: Tasks screen'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Reference task manager screen — shows Supabase CRUD patterns.
/// Delete this and build your own feature.
class _TasksReferenceScreen extends StatelessWidget {
  const _TasksReferenceScreen();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Tasks (reference)')),
      body: const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Text(
            'Replace this with your feature.\n\n'
            'See lib/services/task_service.dart for\nSupabase CRUD examples.',
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}
