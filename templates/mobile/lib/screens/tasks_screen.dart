import 'package:flutter/material.dart';
import '../main.dart' show supabaseConfigured;
import '../services/task_service.dart';
import '../models/task.dart';

/// Reference task manager screen demonstrating Supabase CRUD.
/// Use this as a starting point or delete it and build your own feature.
class TasksScreen extends StatefulWidget {
  const TasksScreen({super.key});

  @override
  State<TasksScreen> createState() => _TasksScreenState();
}

class _TasksScreenState extends State<TasksScreen> {
  final _service = TaskService();
  final _titleController = TextEditingController();
  List<Task> _tasks = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadTasks();
  }

  @override
  void dispose() {
    _titleController.dispose();
    super.dispose();
  }

  Future<void> _loadTasks() async {
    if (!supabaseConfigured) {
      setState(() => _loading = false);
      return;
    }
    setState(() => _loading = true);
    try {
      final tasks = await _service.fetchTasks();
      setState(() {
        _tasks = tasks;
        _loading = false;
      });
    } catch (_) {
      setState(() => _loading = false);
    }
  }

  Future<void> _addTask() async {
    if (!supabaseConfigured) return;
    final title = _titleController.text.trim();
    if (title.isEmpty) return;
    _titleController.clear();
    await _service.createTask(title);
    await _loadTasks();
  }

  Future<void> _toggleTask(Task task) async {
    if (!supabaseConfigured) return;
    final newStatus = task.status == 'done' ? 'todo' : 'done';
    await _service.updateTaskStatus(task.id, newStatus);
    await _loadTasks();
  }

  Future<void> _deleteTask(String id) async {
    if (!supabaseConfigured) return;
    await _service.deleteTask(id);
    await _loadTasks();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // Gradient header
          _TasksHeader(onRefresh: _loadTasks),

          // Not configured banner
          if (!supabaseConfigured)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              color: const Color(0xFFFEF3C7),
              child: Row(
                children: [
                  const Icon(Icons.warning_amber_rounded,
                      color: Color(0xFF92400E), size: 18),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Supabase not configured — go to Config tab to set up your credentials.',
                      style: const TextStyle(
                        fontSize: 12,
                        color: Color(0xFF92400E),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
            ),

          // Add task input
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _titleController,
                    decoration: InputDecoration(
                      hintText: 'New task...',
                      hintStyle: const TextStyle(color: Color(0xFF9CA3AF)),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(
                            color: Color(0xFF4F46E5), width: 2),
                      ),
                      filled: true,
                      fillColor: Colors.white,
                      isDense: true,
                      contentPadding: const EdgeInsets.symmetric(
                          horizontal: 14, vertical: 12),
                    ),
                    onSubmitted: (_) => _addTask(),
                  ),
                ),
                const SizedBox(width: 10),
                FilledButton(
                  onPressed: _addTask,
                  style: FilledButton.styleFrom(
                    backgroundColor: const Color(0xFF4F46E5),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 18, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child: const Text('Add'),
                ),
              ],
            ),
          ),

          // Task list
          Expanded(
            child: _loading
                ? const Center(
                    child: CircularProgressIndicator(
                      color: Color(0xFF4F46E5),
                    ),
                  )
                : _tasks.isEmpty
                    ? _EmptyState()
                    : ListView.separated(
                        padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                        itemCount: _tasks.length,
                        separatorBuilder: (_, __) =>
                            const SizedBox(height: 8),
                        itemBuilder: (context, i) {
                          final task = _tasks[i];
                          final done = task.status == 'done';
                          return _TaskCard(
                            task: task,
                            done: done,
                            onToggle: () => _toggleTask(task),
                            onDelete: () => _deleteTask(task.id),
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}

class _TasksHeader extends StatelessWidget {
  final VoidCallback onRefresh;

  const _TasksHeader({required this.onRefresh});

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
          padding: const EdgeInsets.fromLTRB(24, 20, 16, 24),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Tasks',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 26,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Manage your tasks',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.7),
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
              IconButton(
                onPressed: onRefresh,
                icon: const Icon(Icons.refresh, color: Colors.white),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _EmptyState extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                color: const Color(0xFF4F46E5).withOpacity(0.08),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Icon(
                Icons.check_box_outline_blank,
                color: Color(0xFF4F46E5),
                size: 32,
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'No tasks yet',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: Color(0xFF111827),
              ),
            ),
            const SizedBox(height: 6),
            const Text(
              'Add your first task above to get started.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 13, color: Color(0xFF6B7280)),
            ),
          ],
        ),
      ),
    );
  }
}

class _TaskCard extends StatelessWidget {
  final Task task;
  final bool done;
  final VoidCallback onToggle;
  final VoidCallback onDelete;

  const _TaskCard({
    required this.task,
    required this.done,
    required this.onToggle,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: const Color(0xFFE5E7EB)),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 4),
            child: Checkbox(
              value: done,
              onChanged: (_) => onToggle(),
              activeColor: const Color(0xFF4F46E5),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(4),
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 14),
              child: Text(
                task.title,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  decoration: done ? TextDecoration.lineThrough : null,
                  color: done ? const Color(0xFF9CA3AF) : const Color(0xFF111827),
                ),
              ),
            ),
          ),
          if (done)
            Padding(
              padding: const EdgeInsets.only(right: 6),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: const Color(0xFFDCFCE7),
                  borderRadius: BorderRadius.circular(999),
                ),
                child: const Text(
                  'done',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF166534),
                  ),
                ),
              ),
            ),
          IconButton(
            icon: const Icon(Icons.delete_outline, size: 18, color: Color(0xFF9CA3AF)),
            onPressed: onDelete,
          ),
        ],
      ),
    );
  }
}
