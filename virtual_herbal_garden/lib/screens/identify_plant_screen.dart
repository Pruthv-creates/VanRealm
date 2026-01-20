import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../database/services/plant_identification_service.dart';
import '../database/firestore.dart';
import '../models/plant.dart';

class IdentifyPlantScreen extends StatefulWidget {
  const IdentifyPlantScreen({super.key});

  @override
  State<IdentifyPlantScreen> createState() =>
      _IdentifyPlantScreenState();
}

class _IdentifyPlantScreenState
    extends State<IdentifyPlantScreen> {
  final ImagePicker _picker = ImagePicker();
  final PlantIdentificationService _aiService =
      PlantIdentificationService();
  final FirestoreService _plantService = FirestoreService();

  bool _loading = false;

  Future<void> _pickImage(ImageSource source) async {
    final XFile? image =
        await _picker.pickImage(source: source);

    if (image == null) return;

    setState(() => _loading = true);

    final File file = File(image.path);

    final scientificName =
        await _aiService.identifyPlant(file);

    if (!mounted) return;

    if (scientificName == null) {
      _showError("Plant could not be identified");
      return;
    }

    /// 🔍 MATCH WITH FIREBASE
    Plant? plant =
        await _plantService.getPlantByScientificName(
      scientificName,
    );

    setState(() => _loading = false);

    if (plant == null) {
      _showError("Plant not found in database");
      return;
    }

    Navigator.pushNamed(
      context,
      '/plant_detail',
      arguments: plant.id,
    );
  }

  void _showError(String message) {
    setState(() => _loading = false);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:
          AppBar(title: const Text("Identify AYUSH Plant")),
      body: Center(
        child: _loading
            ? const CircularProgressIndicator()
            : Column(
                mainAxisAlignment:
                    MainAxisAlignment.center,
                children: [
                  ElevatedButton.icon(
                    icon: const Icon(Icons.camera_alt),
                    label:
                        const Text("Capture from Camera"),
                    onPressed: () =>
                        _pickImage(ImageSource.camera),
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton.icon(
                    icon:
                        const Icon(Icons.photo_library),
                    label:
                        const Text("Upload from Gallery"),
                    onPressed: () =>
                        _pickImage(ImageSource.gallery),
                  ),
                ],
              ),
      ),
    );
  }
}
