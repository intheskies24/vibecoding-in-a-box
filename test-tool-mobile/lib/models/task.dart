class Task {
  final String id;
  final String title;
  final String? description;
  final String status; // 'todo' | 'in_progress' | 'done'
  final DateTime createdAt;

  const Task({
    required this.id,
    required this.title,
    this.description,
    required this.status,
    required this.createdAt,
  });

  factory Task.fromMap(Map<String, dynamic> map) {
    return Task(
      id: map['id'] as String,
      title: map['title'] as String,
      description: map['description'] as String?,
      status: map['status'] as String,
      createdAt: DateTime.parse(map['created_at'] as String),
    );
  }

  Task copyWith({String? status}) {
    return Task(
      id: id,
      title: title,
      description: description,
      status: status ?? this.status,
      createdAt: createdAt,
    );
  }
}
