import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class BookmarkService {
  final _db = FirebaseFirestore.instance;
  final _auth = FirebaseAuth.instance;

  String get _uid => _auth.currentUser!.uid;

  DocumentReference get _userRef =>
      _db.collection('users').doc(_uid);

  /// Stream of bookmarked plant IDs
  Stream<List<String>> bookmarkIdsStream() {
    return _userRef.snapshots().map((doc) {
      final data = doc.data() as Map<String, dynamic>? ?? {};
      return List<String>.from(data['bookmarks'] ?? []);
    });
  }

  /// Toggle bookmark
  Future<void> toggleBookmark(String plantId, bool isBookmarked) async {
    await _userRef.update({
      'bookmarks': isBookmarked
          ? FieldValue.arrayRemove([plantId])
          : FieldValue.arrayUnion([plantId])
    });
  }
}
