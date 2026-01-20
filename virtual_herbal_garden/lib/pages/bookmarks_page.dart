import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:virtual_herbal_garden/database/services/bookmark_service.dart';
import 'package:virtual_herbal_garden/models/plant.dart';

class BookmarksPage extends StatelessWidget {
  const BookmarksPage({super.key});

  @override
  Widget build(BuildContext context) {
    final bookmarkService = BookmarkService();

    return Scaffold(
      appBar: AppBar(title: const Text('My Bookmarks')),
      body: StreamBuilder<List<String>>(
        stream: bookmarkService.bookmarkIdsStream(),
        builder: (context, snapshot) {
          final ids = snapshot.data ?? [];

          if (ids.isEmpty) {
            return const Center(
              child: Text('No bookmarks yet'),
            );
          }

          return ListView.builder(
            itemCount: ids.length,
            itemBuilder: (context, index) {
              return FutureBuilder<DocumentSnapshot>(
                future: FirebaseFirestore.instance
                    .collection('plants')
                    .doc(ids[index])
                    .get(),
                builder: (context, snap) {
                  if (!snap.hasData) return const SizedBox();

                  final plant = Plant.fromFirestore(
                    snap.data!.id,
                    snap.data!.data() as Map<String, dynamic>,
                  );

                  return ListTile(
                    title: Text(plant.commonName),
                    subtitle: Text(plant.botanicalName),
                    leading: const Icon(Icons.local_florist),
                    trailing: const Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        '/plant_detail',
                        arguments: plant.id,
                      );
                    },
                  );
                },
              );
            },
          );
        },
      ),
    );
  }
}
