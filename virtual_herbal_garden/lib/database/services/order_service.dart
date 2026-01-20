import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class OrderService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<void> placeOrder(List<String> plantIds) async {
    final user = FirebaseAuth.instance.currentUser;

    if (user == null) {
      throw Exception("User not logged in");
    }

    // Create order document
    await _firestore.collection('orders').add({
      'userId': user.uid,
      'plantIds': plantIds,
      'status': 'placed',
      'createdAt': FieldValue.serverTimestamp(),
    });
  }

  Stream<QuerySnapshot<Map<String, dynamic>>> ordersStream() {
    final user = FirebaseAuth.instance.currentUser;
    return _firestore
        .collection('orders')
        .where('userId', isEqualTo: user?.uid ?? '')
        .orderBy('createdAt', descending: true)
        .snapshots();
  }
}
