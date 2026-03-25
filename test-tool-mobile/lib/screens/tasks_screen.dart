import 'package:flutter/material.dart';

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
    setState(() => _loading = true);
    final tasks = await _service.fetchTasks();
    setState(() {
      _tasks = tasks;
      _loading = false;
    });
  }

  Future<void> _addTask() async {
    final title = _titleController.text.trim();
    if (title.isEmpty) return;
    _titleController.clear();
    await _service.createTask(title);
    await _loadTasks();
  }

  Future<void> _toggleTask(Task task) async {
    final newStatus = task.status == 'done' ? 'todo' : 'done';
    await _service.updateTaskStatus(task.id, newStatus);
    await _loadTasks();
  }

  Future<void> _deleteTask(String id) async {
    await _service.deleteTask(id);
    await _loadTasks();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tasks'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadTasks,
          ),
        ],
      ),
      body: Column(
        children: [
          // Add task input
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _titleController,
                    decoration: const InputDecoration(
                      hintText: 'New task...',
                      border: OutlineInputBorder(),
                      isDense: true,
                    ),
                    onSubmitted: (_) => _addTask(),
                  ),
                ),
                const SizedBox(width: 8),
                FilledButton(
                  onPressed: _addTask,
                  child: const Text('Add'),
                ),
              ],
            ),
          ),

          // Task list
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator())
                : _tasks.isEmpty
                    ? const Center(
                        child: Text(
                          'No tasks yet.',
                          style: TextStyle(color: Colors.grey),
                        ),
                      )
                    : ListView.separated(
                        itemCount: _tasks.length,
                        separatorBuilder: (_, __) =>
                            const Divider(height: 1),
                        itemBuilder: (context, i) {
                          final task = _tasks[i];
                          final done = task.status == 'done';
                          return ListTile(
                            leading: Checkbox(
                              value: done,
                              onChanged: (_) => _toggleTask(task),
                            ),
                            title: Text(
                              task.title,
                              style: TextStyle(
                                decoration: done
                                    ? TextDecoration.lineThrough
                                    : null,
                                color: done ? Colors.grey : null,
                              ),
                            ),
                            trailing: IconButton(
                              icon: const Icon(Icons.delete_outline,
                                  size: 20),
                              onPressed: () => _deleteTask(task.id),
                            ),
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}
