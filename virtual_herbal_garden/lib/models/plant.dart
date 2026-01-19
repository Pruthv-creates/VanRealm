class Plant {
  final String id;
  final String commonName;
  final String botanicalName;
  final List<String> ayushSystems;
  final List<String> medicinalProperties;
  final List<String> therapeuticUses;
  final List<String> precautions;
  final List<String> diseaseCategories;
  final List<String> plantPartsUsed;
  final String? model3D;
  final List<String> images;

  Plant({
    required this.id,
    required this.commonName,
    required this.botanicalName,
    required this.ayushSystems,
    required this.medicinalProperties,
    required this.therapeuticUses,
    required this.precautions,
    required this.diseaseCategories,
    required this.plantPartsUsed,
    this.model3D,
    required this.images,
  });

  factory Plant.fromFirestore(String id, Map<String, dynamic> data) {
    final media = data['media'] ?? {};

    return Plant(
      id: id,
      commonName: data['commonName'] ?? '',
      botanicalName: data['botanicalName'] ?? '',
      ayushSystems: List<String>.from(data['ayushSystems'] ?? []),
      medicinalProperties: List<String>.from(data['medicinalProperties'] ?? []),
      therapeuticUses: List<String>.from(data['therapeuticUses'] ?? []),
      precautions: List<String>.from(data['precautions'] ?? []),
      diseaseCategories: List<String>.from(data['diseaseCategories'] ?? []),
      plantPartsUsed: List<String>.from(data['plantPartsUsed'] ?? []),
      images: List<String>.from(media['images'] ?? []),
      model3D: media['model3D'],
    );
  }
}
