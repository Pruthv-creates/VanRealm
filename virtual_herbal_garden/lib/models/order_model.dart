import 'package:cloud_firestore/cloud_firestore.dart';

class Order {
  final String id;
  final List<String> items;
  final String status;
  final DateTime createdAt;

  Order({
    required this.id,
    required this.items,
    required this.status,
    required this.createdAt,
  });

  factory Order.fromFirestore(String id, Map<String, dynamic> data) {
    return Order(
      id: id,
      items: List<String>.from(data['items'] ?? []),
      status: data['status'] ?? 'placed',
      createdAt: (data['createdAt'] as Timestamp).toDate(),
    );
  }
}
