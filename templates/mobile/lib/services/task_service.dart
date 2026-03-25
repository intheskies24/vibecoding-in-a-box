import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/task.dart';

/// Supabase CRUD operations for tasks.
/// Use this as a reference pattern for your own data models.
class TaskService {
  static const _table = 'tasks';

  SupabaseClient get _client => Supabase.instance.client;

  Future<List<Task>> fetchTasks() async {
    final data = await _client
        .from(_table)
        .select()
        .order('created_at', ascending: false);

    return (data as List).map((e) => Task.fromMap(e)).toList();
  }

  Future<Task> createTask(String title, {String? description}) async {
    final data = await _client
        .from(_table)
        .insert({'title': title, 'description': description})
        .select()
        .single();

    return Task.fromMap(data);
  }

  Future<void> updateTaskStatus(String id, String status) async {
    await _client.from(_table).update({'status': status}).eq('id', id);
  }

  Future<void> deleteTask(String id) async {
    await _client.from(_table).delete().eq('id', id);
  }
}
