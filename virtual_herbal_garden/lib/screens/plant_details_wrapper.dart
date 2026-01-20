import 'package:flutter/material.dart';
import '../database/firestore.dart';
import '../models/plant.dart';
import 'package:virtual_herbal_garden/pages/plant_details_page.dart';

class PlantDetailsWrapper extends StatelessWidget {
  final String plantId;

  const PlantDetailsWrapper({super.key, required this.plantId});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Plant?>(
      future: FirestoreService().getPlantById(plantId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        if (!snapshot.hasData || snapshot.data == null) {
          return const Scaffold(
            body: Center(child: Text('Plant not found')),
          );
        }

        return PlantDetailsPage(plant: snapshot.data!);
      },
    );
  }
}
