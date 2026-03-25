import 'package:flutter/material.dart';

class ComponentsScreen extends StatefulWidget {
  const ComponentsScreen({super.key});

  @override
  State<ComponentsScreen> createState() => _ComponentsScreenState();
}

class _ComponentsScreenState extends State<ComponentsScreen> {
  bool _chip1Selected = true;
  bool _chip2Selected = false;
  bool _chip3Selected = true;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _ComponentsHeader(),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Buttons
                  _SectionCard(
                    title: 'Buttons',
                    child: Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        FilledButton(
                          onPressed: () {},
                          style: FilledButton.styleFrom(
                            backgroundColor: const Color(0xFF4F46E5),
                          ),
                          child: const Text('Filled'),
                        ),
                        OutlinedButton(
                          onPressed: () {},
                          style: OutlinedButton.styleFrom(
                            foregroundColor: const Color(0xFF4F46E5),
                            side: const BorderSide(color: Color(0xFF4F46E5)),
                          ),
                          child: const Text('Outlined'),
                        ),
                        TextButton(
                          onPressed: () {},
                          style: TextButton.styleFrom(
                            foregroundColor: const Color(0xFF4F46E5),
                          ),
                          child: const Text('Text'),
                        ),
                        FilledButton.tonal(
                          onPressed: () {},
                          child: const Text('Tonal'),
                        ),
                        IconButton.filled(
                          onPressed: () {},
                          icon: const Icon(Icons.add),
                          style: IconButton.styleFrom(
                            backgroundColor: const Color(0xFF4F46E5),
                            foregroundColor: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Input
                  _SectionCard(
                    title: 'Input',
                    child: TextField(
                      decoration: InputDecoration(
                        hintText: 'Type something...',
                        hintStyle:
                            const TextStyle(color: Color(0xFF9CA3AF)),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide:
                              const BorderSide(color: Color(0xFFE5E7EB)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide:
                              const BorderSide(color: Color(0xFFE5E7EB)),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: const BorderSide(
                              color: Color(0xFF4F46E5), width: 2),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                        contentPadding: const EdgeInsets.symmetric(
                            horizontal: 14, vertical: 12),
                        prefixIcon: const Icon(Icons.search,
                            color: Color(0xFF9CA3AF)),
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Chips
                  _SectionCard(
                    title: 'Chips',
                    child: Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        FilterChip(
                          label: const Text('todo'),
                          selected: _chip1Selected,
                          onSelected: (v) =>
                              setState(() => _chip1Selected = v),
                          selectedColor:
                              const Color(0xFF4F46E5).withOpacity(0.12),
                          checkmarkColor: const Color(0xFF4F46E5),
                          labelStyle: TextStyle(
                            color: _chip1Selected
                                ? const Color(0xFF4F46E5)
                                : const Color(0xFF4B5563),
                            fontWeight: FontWeight.w500,
                            fontSize: 13,
                          ),
                          side: BorderSide(
                            color: _chip1Selected
                                ? const Color(0xFF4F46E5)
                                : const Color(0xFFE5E7EB),
                          ),
                        ),
                        FilterChip(
                          label: const Text('in progress'),
                          selected: _chip2Selected,
                          onSelected: (v) =>
                              setState(() => _chip2Selected = v),
                          selectedColor:
                              const Color(0xFFFEF3C7),
                          checkmarkColor: const Color(0xFF92400E),
                          labelStyle: TextStyle(
                            color: _chip2Selected
                                ? const Color(0xFF92400E)
                                : const Color(0xFF4B5563),
                            fontWeight: FontWeight.w500,
                            fontSize: 13,
                          ),
                          side: BorderSide(
                            color: _chip2Selected
                                ? const Color(0xFFF59E0B)
                                : const Color(0xFFE5E7EB),
                          ),
                        ),
                        FilterChip(
                          label: const Text('done'),
                          selected: _chip3Selected,
                          onSelected: (v) =>
                              setState(() => _chip3Selected = v),
                          selectedColor: const Color(0xFFDCFCE7),
                          checkmarkColor: const Color(0xFF166534),
                          labelStyle: TextStyle(
                            color: _chip3Selected
                                ? const Color(0xFF166534)
                                : const Color(0xFF4B5563),
                            fontWeight: FontWeight.w500,
                            fontSize: 13,
                          ),
                          side: BorderSide(
                            color: _chip3Selected
                                ? const Color(0xFF22C55E)
                                : const Color(0xFFE5E7EB),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Cards
                  _SectionCard(
                    title: 'Cards',
                    child: Row(
                      children: [
                        Expanded(
                          child: Card(
                            elevation: 0,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                              side: const BorderSide(
                                  color: Color(0xFFE5E7EB)),
                            ),
                            child: const Padding(
                              padding: EdgeInsets.all(14),
                              child: Column(
                                crossAxisAlignment:
                                    CrossAxisAlignment.start,
                                children: [
                                  Icon(Icons.article_outlined,
                                      color: Color(0xFF4F46E5), size: 20),
                                  SizedBox(height: 8),
                                  Text(
                                    'Flat card',
                                    style: TextStyle(
                                      fontWeight: FontWeight.w600,
                                      fontSize: 13,
                                    ),
                                  ),
                                  Text(
                                    'No elevation',
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: Color(0xFF6B7280),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Card(
                            elevation: 2,
                            shadowColor:
                                Colors.black.withOpacity(0.08),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: const Padding(
                              padding: EdgeInsets.all(14),
                              child: Column(
                                crossAxisAlignment:
                                    CrossAxisAlignment.start,
                                children: [
                                  Icon(Icons.layers_outlined,
                                      color: Color(0xFF7C3AED), size: 20),
                                  SizedBox(height: 8),
                                  Text(
                                    'Elevated card',
                                    style: TextStyle(
                                      fontWeight: FontWeight.w600,
                                      fontSize: 13,
                                    ),
                                  ),
                                  Text(
                                    'With shadow',
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: Color(0xFF6B7280),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Status Badges
                  _SectionCard(
                    title: 'Status Badges',
                    child: Row(
                      children: [
                        _StatusBadge(
                          label: 'Configured',
                          bgColor: const Color(0xFFDCFCE7),
                          textColor: const Color(0xFF166534),
                          icon: Icons.check_circle_outline,
                        ),
                        const SizedBox(width: 10),
                        _StatusBadge(
                          label: 'Not configured',
                          bgColor: const Color(0xFFFEF3C7),
                          textColor: const Color(0xFF92400E),
                          icon: Icons.warning_amber_rounded,
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Color swatches
                  _SectionCard(
                    title: 'Colors',
                    child: Wrap(
                      spacing: 10,
                      runSpacing: 10,
                      children: [
                        _ColorSwatch(
                            color: scheme.primary, label: 'Primary'),
                        _ColorSwatch(
                            color: scheme.secondary, label: 'Secondary'),
                        _ColorSwatch(
                            color: scheme.tertiary, label: 'Tertiary'),
                        _ColorSwatch(color: scheme.error, label: 'Error'),
                        _ColorSwatch(
                            color: scheme.surface, label: 'Surface',
                            bordered: true),
                        _ColorSwatch(
                            color: scheme.outline, label: 'Outline'),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Typography
                  _SectionCard(
                    title: 'Typography',
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Display Small',
                            style: Theme.of(context)
                                .textTheme
                                .displaySmall
                                ?.copyWith(fontSize: 28)),
                        const SizedBox(height: 6),
                        Text('Headline Medium',
                            style: Theme.of(context)
                                .textTheme
                                .headlineMedium
                                ?.copyWith(fontSize: 22)),
                        const SizedBox(height: 6),
                        Text('Title Large',
                            style:
                                Theme.of(context).textTheme.titleLarge),
                        const SizedBox(height: 6),
                        Text('Body Medium',
                            style:
                                Theme.of(context).textTheme.bodyMedium),
                        const SizedBox(height: 6),
                        Text('Label Small',
                            style:
                                Theme.of(context).textTheme.labelSmall),
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

class _ComponentsHeader extends StatelessWidget {
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
                'Components',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'Material 3 design system showcase',
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
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}

class _StatusBadge extends StatelessWidget {
  final String label;
  final Color bgColor;
  final Color textColor;
  final IconData icon;

  const _StatusBadge({
    required this.label,
    required this.bgColor,
    required this.textColor,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: textColor),
          const SizedBox(width: 5),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: textColor,
            ),
          ),
        ],
      ),
    );
  }
}

class _ColorSwatch extends StatelessWidget {
  final Color color;
  final String label;
  final bool bordered;

  const _ColorSwatch({
    required this.color,
    required this.label,
    this.bordered = false,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(10),
            border: bordered
                ? Border.all(color: const Color(0xFFE5E7EB))
                : null,
          ),
        ),
        const SizedBox(height: 5),
        Text(
          label,
          style: const TextStyle(
            fontSize: 10,
            color: Color(0xFF6B7280),
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}
