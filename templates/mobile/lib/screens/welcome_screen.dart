import 'package:flutter/material.dart';

class WelcomeScreen extends StatelessWidget {
  final VoidCallback? onGoToTasks;

  const WelcomeScreen({super.key, this.onGoToTasks});

  static const _templates = [
    ('nano', 'Local personal tool', 'Vite + React + Zustand'),
    ('micro', 'Simple hosted web app', 'Next.js + Vercel'),
    ('standard', 'Full-stack web app', 'Next.js + Supabase + Vercel'),
    ('pro', 'AI-powered full-stack', 'Next.js + Supabase + Clerk + Claude'),
    ('mobile', 'Cross-platform mobile', 'Flutter + Supabase'),
    ('mobile-pro', 'AI-powered mobile app', 'Flutter + Supabase + Claude'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _GradientHeader(),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _FactCardsRow(),
                  const SizedBox(height: 20),
                  _ReadyToBuildCard(onGoToTasks: onGoToTasks),
                  const SizedBox(height: 20),
                  _TemplateSection(),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _GradientHeader extends StatelessWidget {
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
          padding: const EdgeInsets.fromLTRB(24, 24, 24, 32),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Badge
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(999),
                ),
                child: const Text(
                  'mobile template',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              // Icon
              Container(
                width: 52,
                height: 52,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(
                  Icons.smartphone,
                  color: Colors.white,
                  size: 28,
                ),
              ),
              const SizedBox(height: 16),
              // Title
              const Text(
                'vibecoding-in-a-box',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                  height: 1.2,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Flutter + Supabase · Cross-platform iOS & Android',
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

class _FactCardsRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final facts = [
      (Icons.flutter_dash, 'Framework', 'Flutter'),
      (Icons.storage_outlined, 'Backend', 'Supabase'),
      (Icons.devices, 'Targets', 'iOS & Android'),
    ];

    return Row(
      children: facts.asMap().entries.map((entry) {
        final i = entry.key;
        final f = entry.value;
        return Expanded(
          child: Padding(
            padding: EdgeInsets.only(left: i == 0 ? 0 : 8),
            child: _FactCard(icon: f.$1, label: f.$2, value: f.$3),
          ),
        );
      }).toList(),
    );
  }
}

class _FactCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;

  const _FactCard({required this.icon, required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: const Color(0xFFE5E7EB)),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: const Color(0xFF4F46E5), size: 20),
          const SizedBox(height: 8),
          Text(
            label,
            style: const TextStyle(
              fontSize: 11,
              color: Color(0xFF6B7280),
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            value,
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w700,
              color: Color(0xFF111827),
            ),
          ),
        ],
      ),
    );
  }
}

class _ReadyToBuildCard extends StatelessWidget {
  final VoidCallback? onGoToTasks;

  const _ReadyToBuildCard({this.onGoToTasks});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: const Color(0xFFE5E7EB)),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Ready to build?',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: Color(0xFF111827),
            ),
          ),
          const SizedBox(height: 6),
          Text(
            'This template includes a working Supabase CRUD example. '
            'Check out the Tasks tab to see it in action.',
            style: TextStyle(
              fontSize: 13,
              color: Colors.grey.shade600,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              onPressed: onGoToTasks,
              icon: const Icon(Icons.check_box_outlined, size: 18),
              label: const Text('Go to Tasks'),
              style: FilledButton.styleFrom(
                backgroundColor: const Color(0xFF4F46E5),
                padding: const EdgeInsets.symmetric(vertical: 12),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _TemplateSection extends StatelessWidget {
  const _TemplateSection();

  static const _templates = WelcomeScreen._templates;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'WANT TO BUILD SOMETHING ELSE?',
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.8,
            color: Color(0xFF6B7280),
          ),
        ),
        const SizedBox(height: 12),
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(color: const Color(0xFFE5E7EB)),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            children: _templates.asMap().entries.map((entry) {
              final i = entry.key;
              final t = entry.value;
              final isActive = t.$1 == 'mobile';
              final isFirst = i == 0;
              final isLast = i == _templates.length - 1;

              return Container(
                decoration: BoxDecoration(
                  color: isActive
                      ? const Color(0xFF4F46E5).withOpacity(0.05)
                      : null,
                  border: isLast
                      ? null
                      : const Border(
                          bottom: BorderSide(color: Color(0xFFE5E7EB)),
                        ),
                  borderRadius: BorderRadius.vertical(
                    top: isFirst ? const Radius.circular(11) : Radius.zero,
                    bottom: isLast ? const Radius.circular(11) : Radius.zero,
                  ),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Row(
                  children: [
                    SizedBox(
                      width: 80,
                      child: Text(
                        t.$1,
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 12,
                          fontWeight: isActive ? FontWeight.w700 : FontWeight.w500,
                          color: isActive
                              ? const Color(0xFF4F46E5)
                              : const Color(0xFF111827),
                        ),
                      ),
                    ),
                    Expanded(
                      child: Text(
                        t.$2,
                        style: const TextStyle(
                          fontSize: 12,
                          color: Color(0xFF6B7280),
                        ),
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ),
        const SizedBox(height: 10),
        const Text(
          './scripts/scaffold.sh <template> <project-name>',
          style: TextStyle(
            fontFamily: 'monospace',
            fontSize: 11,
            color: Color(0xFF9CA3AF),
          ),
        ),
      ],
    );
  }
}
