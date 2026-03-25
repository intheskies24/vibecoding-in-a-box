import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../main.dart' show supabaseConfigured;

class ConfigurationScreen extends StatelessWidget {
  const ConfigurationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final url = dotenv.env['SUPABASE_URL'] ?? '';
    final key = dotenv.env['SUPABASE_ANON_KEY'] ?? '';
    final isConnected = supabaseConfigured;

    final maskedUrl = url.isEmpty
        ? 'Not set'
        : (url.length > 30 ? '${url.substring(0, 30)}...' : url);
    final maskedKey = key.isEmpty
        ? 'Not set'
        : '${key.substring(0, key.length.clamp(0, 10))}...';

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _ConfigHeader(),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Supabase status card
                  _SectionCard(
                    title: 'Supabase',
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const Text(
                              'Status',
                              style: TextStyle(
                                fontSize: 13,
                                color: Color(0xFF6B7280),
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            const Spacer(),
                            _StatusBadge(
                              configured: isConnected,
                            ),
                          ],
                        ),
                        const SizedBox(height: 14),
                        _EnvRow(label: 'SUPABASE_URL', value: maskedUrl),
                        const SizedBox(height: 8),
                        _EnvRow(
                            label: 'SUPABASE_ANON_KEY', value: maskedKey),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Setup instructions card
                  _SectionCard(
                    title: 'How to configure',
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _InstructionStep(
                          number: 1,
                          text: 'Open .env in your project root',
                        ),
                        _InstructionStep(
                          number: 2,
                          text:
                              'Fill in SUPABASE_URL and SUPABASE_ANON_KEY',
                        ),
                        _InstructionStep(
                          number: 3,
                          text:
                              'Get values from supabase.com → your project → Settings → API',
                        ),
                        _InstructionStep(
                          number: 4,
                          text: 'Restart the app:',
                        ),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: const Color(0xFF1F2937),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Text(
                            'flutter run -d macos',
                            style: TextStyle(
                              fontFamily: 'monospace',
                              fontSize: 12,
                              color: Color(0xFF86EFAC),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Helpful links card
                  _SectionCard(
                    title: 'Helpful links',
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _LinkRow(
                          icon: Icons.open_in_new,
                          label: 'Supabase Dashboard',
                          url: 'supabase.com/dashboard',
                        ),
                        const Divider(height: 20, color: Color(0xFFE5E7EB)),
                        _LinkRow(
                          icon: Icons.add_circle_outline,
                          label: 'Create a new project',
                          url: 'supabase.com/dashboard/new/_',
                        ),
                        const Divider(height: 20, color: Color(0xFFE5E7EB)),
                        _SqlExpander(),
                      ],
                    ),
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
}

class _ConfigHeader extends StatelessWidget {
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
                'Configuration',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'Connect your services',
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

class _StatusBadge extends StatelessWidget {
  final bool configured;

  const _StatusBadge({required this.configured});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: configured
            ? const Color(0xFFDCFCE7)
            : const Color(0xFFFEF3C7),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            configured
                ? Icons.check_circle_outline
                : Icons.warning_amber_rounded,
            size: 14,
            color: configured
                ? const Color(0xFF166534)
                : const Color(0xFF92400E),
          ),
          const SizedBox(width: 5),
          Text(
            configured ? 'Connected' : 'Not configured',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: configured
                  ? const Color(0xFF166534)
                  : const Color(0xFF92400E),
            ),
          ),
        ],
      ),
    );
  }
}

class _EnvRow extends StatelessWidget {
  final String label;
  final String value;

  const _EnvRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    final isNotSet = value == 'Not set';

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: const Color(0xFFF9FAFB),
        border: Border.all(color: const Color(0xFFE5E7EB)),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          Text(
            label,
            style: const TextStyle(
              fontFamily: 'monospace',
              fontSize: 11,
              color: Color(0xFF6B7280),
              fontWeight: FontWeight.w500,
            ),
          ),
          const Spacer(),
          Text(
            value,
            style: TextStyle(
              fontFamily: 'monospace',
              fontSize: 11,
              color: isNotSet
                  ? const Color(0xFF9CA3AF)
                  : const Color(0xFF374151),
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}

class _InstructionStep extends StatelessWidget {
  final int number;
  final String text;

  const _InstructionStep({required this.number, required this.text});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 20,
            height: 20,
            decoration: BoxDecoration(
              color: const Color(0xFF4F46E5).withOpacity(0.1),
              borderRadius: BorderRadius.circular(999),
            ),
            alignment: Alignment.center,
            child: Text(
              '$number',
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: Color(0xFF4F46E5),
              ),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                fontSize: 13,
                color: Color(0xFF4B5563),
                height: 1.4,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _LinkRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String url;

  const _LinkRow({
    required this.icon,
    required this.label,
    required this.url,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, size: 16, color: const Color(0xFF4F46E5)),
        const SizedBox(width: 10),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF111827),
                ),
              ),
              Text(
                url,
                style: const TextStyle(
                  fontSize: 11,
                  color: Color(0xFF6B7280),
                  fontFamily: 'monospace',
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _SqlExpander extends StatefulWidget {
  const _SqlExpander();

  @override
  State<_SqlExpander> createState() => _SqlExpanderState();
}

class _SqlExpanderState extends State<_SqlExpander> {
  bool _expanded = false;

  static const _sql = '''-- Tasks table for mobile template
create type task_status as enum ('todo', 'in_progress', 'done');

create table tasks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  title       text not null,
  description text,
  status      task_status not null default 'todo',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger tasks_updated_at
  before update on tasks
  for each row execute function update_updated_at();

alter table tasks enable row level security;

create policy "Users can view their own tasks"
  on tasks for select using (auth.uid() = user_id);

create policy "Users can insert their own tasks"
  on tasks for insert with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
  on tasks for update using (auth.uid() = user_id);

create policy "Users can delete their own tasks"
  on tasks for delete using (auth.uid() = user_id);''';

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GestureDetector(
          onTap: () => setState(() => _expanded = !_expanded),
          child: Row(
            children: [
              const Icon(Icons.code, size: 16, color: Color(0xFF4F46E5)),
              const SizedBox(width: 10),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'View migration SQL',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF111827),
                      ),
                    ),
                    Text(
                      'supabase/migrations/001_tasks.sql',
                      style: TextStyle(
                        fontSize: 11,
                        color: Color(0xFF6B7280),
                        fontFamily: 'monospace',
                      ),
                    ),
                  ],
                ),
              ),
              Icon(
                _expanded ? Icons.expand_less : Icons.expand_more,
                color: const Color(0xFF9CA3AF),
                size: 20,
              ),
            ],
          ),
        ),
        if (_expanded) ...[
          const SizedBox(height: 12),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFF1F2937),
              borderRadius: BorderRadius.circular(8),
            ),
            child: SelectableText(
              _sql,
              style: const TextStyle(
                fontFamily: 'monospace',
                fontSize: 11,
                color: Color(0xFF86EFAC),
                height: 1.6,
              ),
            ),
          ),
        ],
      ],
    );
  }
}

class _SectionCard extends StatelessWidget {
  final String title;
  final Widget child;

  const _SectionCard({required this.title, required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: const Color(0xFFE5E7EB)),
        borderRadius: BorderRadius.circular(12),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w700,
              color: Color(0xFF374151),
              letterSpacing: 0.2,
            ),
          ),
          const SizedBox(height: 14),
          child,
        ],
      ),
    );
  }
}
