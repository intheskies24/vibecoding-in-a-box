import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

/// Claude API client via HTTP.
///
/// There is no official Dart/Flutter SDK for Anthropic, so we call
/// the REST API directly using the `http` package.
///
/// ⚠️  Production note: Never ship your API key inside the app binary.
/// For a production app, proxy these calls through your own backend
/// (e.g. a Supabase Edge Function) so the key stays server-side.
class AiService {
  static const _baseUrl = 'https://api.anthropic.com/v1';
  static const _model = 'claude-opus-4-6';
  static const _apiVersion = '2023-06-01';

  final String _apiKey;

  AiService() : _apiKey = dotenv.env['ANTHROPIC_API_KEY'] ?? '';

  /// Send a list of messages and return Claude's reply.
  ///
  /// [messages] should be a list of maps with 'role' ('user' | 'assistant')
  /// and 'content' (String) keys.
  Future<String> chat({
    required List<Map<String, String>> messages,
    String systemPrompt = 'You are a helpful assistant.',
    int maxTokens = 1024,
  }) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/messages'),
      headers: {
        'x-api-key': _apiKey,
        'anthropic-version': _apiVersion,
        'content-type': 'application/json',
      },
      body: jsonEncode({
        'model': _model,
        'max_tokens': maxTokens,
        'system': systemPrompt,
        'messages': messages,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Claude API error ${response.statusCode}: ${response.body}');
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final content = data['content'] as List;
    return (content.first as Map<String, dynamic>)['text'] as String;
  }
}
