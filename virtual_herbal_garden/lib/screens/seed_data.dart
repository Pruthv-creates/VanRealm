import 'package:cloud_firestore/cloud_firestore.dart';

class SeedDataService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> addPlants() async {
    final plants = [
      {
        "commonName": "Ginger",
        "botanicalName": "Zingiber officinale",
        "ayushSystems": ["Ayurveda", "Unani"],
        "medicinalProperties": [
          "Anti-nausea",
          "Anti-inflammatory",
          "Digestive stimulant"
        ],
        "therapeuticUses": [
          "Relieves nausea",
          "Improves digestion",
          "Reduces joint pain"
        ],
        "precautions": [
          "Avoid excessive intake with blood thinners"
        ],
        "diseaseCategories": ["Digestive", "Respiratory"],
        "plantPartsUsed": ["Rhizome"],
        "model3D": "assets/3dModels/ginger.glb",
        "images": [
          "assets/images/ginger1.jpg",
          "assets/images/ginger2.jpg"
        ]
      },
      {
        "commonName": "Aloe Vera",
        "botanicalName": "Aloe barbadensis miller",
        "ayushSystems": ["Ayurveda", "Siddha"],
        "medicinalProperties": [
          "Anti-inflammatory",
          "Cooling",
          "Moisturizing"
        ],
        "therapeuticUses": [
          "Soothes skin burns",
          "Improves digestion",
          "Promotes wound healing"
        ],
        "precautions": ["Avoid excessive oral consumption"],
        "diseaseCategories": ["Skin", "Digestive"],
        "plantPartsUsed": ["Gel"],
        "model3D": "assets/3dModels/aloe_vera.glb",
        "images": [
          "assets/images/aloe1.jpg",
          "assets/images/aloe2.jpg"
        ]
      }
      {
        "commonName": "Lemon",
        "botanicalName": "Citrus limon",
        "ayushSystems": ["Ayurveda", "Siddha", "Unani"],
        "medicinalProperties": ["Antioxidant", "Detoxifying", "Digestive"],
        "therapeuticUses": ["Boosts immunity", "Aids digestion", "Prevents scurvy"],
        "precautions": ["Avoid excessive intake if acid sensitive"],
        "diseaseCategories": ["Digestive", "Indigestion", "Nausea", "Immune"],
        "plantPartsUsed": ["Fruit", "Peel"],
        "media": {
          "images": [
            "assets/images/lemon1.jpg",
            "assets/images/lemon2.jpg"
          ],
          "model3D": "assets/3dModels/lemon.glb"
        }
      },
      {
        "commonName": "Ginger",
        "botanicalName": "Zingiber officinale",
        "ayushSystems": ["Ayurveda", "Siddha", "Unani"],
        "medicinalProperties": ["Anti-nausea", "Anti-inflammatory", "Digestive stimulant"],
        "therapeuticUses": ["Relieves nausea", "Reduces joint pain", "Improves digestion"],
        "precautions": ["Avoid excessive intake with blood thinners"],
        "diseaseCategories": ["Digestive", "Nausea", "Joint pain", "Inflammation"],
        "plantPartsUsed": ["Rhizome"],
        "media": {
          "images": [
            "assets/images/ginger1.jpg",
            "assets/images/ginger2.jpg"
          ],
          "model3D": "https://example.com/models/ginger.glb"
        }
      },
      {
        "commonName": "Cucumber",
        "botanicalName": "Cucumis sativus",
        "ayushSystems": ["Ayurveda", "Siddha", "Unani"],
        "medicinalProperties": ["Cooling", "Hydrating", "Anti-inflammatory"],
        "therapeuticUses": ["Hydrates body", "Soothes skin", "Reduces acidity"],
        "precautions": ["Avoid excessive consumption if cold-sensitive"],
        "diseaseCategories": ["Digestive", "Acidity", "Skin", "Hydration"],
        "plantPartsUsed": ["Fruit"],
        "media": {
          "images": [
            "assets/images/cucumber1.jpg",
            "assets/images/cucumber2.jpg"
          ],
          "model3D": "assets/3dModels/cucumber.glb"
        }
      },
      {
        "commonName": "Senna",
        "botanicalName": "Senna alexandrina",
        "ayushSystems": ["Ayurveda", "Siddha", "Unani"],
        "medicinalProperties": ["Laxative", "Detoxifying"],
        "therapeuticUses": ["Relieves constipation", "Cleanses colon"],
        "precautions": ["Do not use long-term; avoid in pregnancy"],
        "diseaseCategories": ["Digestive", "Constipation"],
        "plantPartsUsed": ["Leaves", "Pods"],
        "media": {
          "images": [
            "assets/images/senna1.jpg",
            "assets/images/senna2.jpg"
          ],
          "model3D": "assets/3dModels/senna.glb"
        }
      },
      {
        "commonName": "Licorice",
        "botanicalName": "Glycyrrhiza glabra",
        "ayushSystems": ["Ayurveda", "Siddha", "Unani"],
        "medicinalProperties": ["Anti-inflammatory", "Soothing", "Expectorant"],
        "therapeuticUses": ["Soothes throat", "Relieves cough", "Supports digestion"],
        "precautions": ["Avoid excessive intake; may raise blood pressure"],
        "diseaseCategories": ["Respiratory", "Cough", "Digestive"],
        "plantPartsUsed": ["Root"],
        "media": {
          "images": [
            "assets/images/licorice1.jpg",
            "assets/images/licorice2.jpg"
          ],
          "model3D": "assets/3dModels/licorice.glb"
        }
      },
      {
        "commonName": "Rose",
        "botanicalName": "Rosa indica",
        "ayushSystems": ["Ayurveda", "Siddha", "Unani", "Homeopathy"],
        "medicinalProperties": ["Anti-inflammatory", "Cooling", "Antioxidant"],
        "therapeuticUses": ["Soothes skin", "Reduces stress", "Improves digestion"],
        "precautions": ["Avoid if allergic"],
        "diseaseCategories": ["Skin", "Stress", "Digestive", "Inflammation"],
        "plantPartsUsed": ["Petals", "Leaves"],
        "media": {
          "images": [
            "assets/images/rose1.jpg",
            "assets/images/rose2.jpg"
          ],
          "model3D": "assets/3dModels/rose.glb"
        }
      },
      {
        "commonName": "Nux vomica",
        "botanicalName": "Strychnos nux-vomica",
        "ayushSystems": ["Homeopathy"],
        "medicinalProperties": ["Stimulant", "Digestive"],
        "therapeuticUses": ["Improves digestion in microdoses", "Stimulates nervous system"],
        "precautions": ["Highly toxic; only homeopathic use"],
        "diseaseCategories": ["Digestive", "Nervous system", "Toxicity"],
        "plantPartsUsed": ["Seeds"],
        "media": {
          "images": [
            "assets/images/nuxvomica1.jpg",
            "assets/images/nuxvomica2.jpg"
          ],
          "model3D": "assets/3dModels/nuxvomica.glb"
        }
      },
      {
        "commonName": "Calendula officinalis",
        "botanicalName": "Calendula officinalis",
        "ayushSystems": ["Ayurveda", "Siddha", "Unani"],
        "medicinalProperties": ["Anti-inflammatory", "Antimicrobial", "Healing"],
        "therapeuticUses": ["Promotes wound healing", "Reduces skin inflammation"],
        "precautions": ["Avoid if allergic to daisies"],
        "diseaseCategories": ["Skin", "Wounds", "Inflammation", "Infections"],
        "plantPartsUsed": ["Flowers"],
        "media": {
          "images": [
            "assets/images/calendula1.jpg",
            "assets/images/calendula2.jpg"
          ],
          "model3D": "assets/3dModels/calendula.glb"
        }
      },
      {
        "commonName": "Fennel",
        "botanicalName": "Foeniculum vulgare",
        "ayushSystems": ["Ayurveda", "Siddha", "Unani"],
        "medicinalProperties": ["Digestive", "Carminative", "Anti-inflammatory"],
        "therapeuticUses": ["Reduces bloating", "Relieves gas", "Supports digestion"],
        "precautions": ["Avoid in excessive amounts"],
        "diseaseCategories": ["Digestive", "Bloating", "Gas"],
        "plantPartsUsed": ["Seeds"],
        "media": {
          "images": [
            "assets/images/fennel1.jpg",
            "assets/images/fennel2.jpg"
          ],
          "model3D": "assets/3dModels/fennel.glb"
        }
      },
      {
        "commonName": "Adathoda",
        "botanicalName": "Adhatoda vasica",
        "ayushSystems": ["Ayurveda", "Siddha", "Unani"],
        "medicinalProperties": ["Expectorant", "Bronchodilator", "Anti-inflammatory"],
        "therapeuticUses": ["Relieves cough", "Improves respiratory health"],
        "precautions": ["Avoid in pregnancy"],
        "diseaseCategories": ["Respiratory", "Cough", "Asthma"],
        "plantPartsUsed": ["Leaves"],
        "media": {
          "images": [
            "assets/images/adathoda1.jpg",
            "assets/images/adathoda2.jpg"
          ],
          "model3D": "assets/3dModels/adathoda.glb"
        }
      },
      {
        "commonName": "Nilavembu",
        "botanicalName": "Andrographis paniculata",
        "ayushSystems": ["Ayurveda", "Siddha", "Unani"],
        "medicinalProperties": ["Anti-malarial", "Immunity booster", "Digestive"],
        "therapeuticUses": ["Prevents malaria", "Boosts immunity", "Supports liver function"],
        "precautions": ["Avoid excessive consumption"],
        "diseaseCategories": ["Infections", "Immune", "Digestive", "Malaria"],
        "plantPartsUsed": ["Leaves", "Stem"],
        "media": {
          "images": [
            "assets/images/nilavembu1.jpg",
            "assets/images/nilavembu2.jpg"
          ],
          "model3D": "assets/3dModels/nilavembu.glb"
        }
      },
      {
        "commonName": "Thuthuvalai",
        "botanicalName": "Solanum trilobatum",
        "ayushSystems": ["Ayurveda", "Siddha", "Unani"],
        "medicinalProperties": ["Respiratory tonic", "Anti-inflammatory", "Expectorant"],
        "therapeuticUses": ["Treats cough", "Improves lung health"],
        "precautions": ["Avoid if allergic to nightshades"],
        "diseaseCategories": ["Respiratory", "Cough", "Asthma", "Inflammation"],
        "plantPartsUsed": ["Leaves", "Stem"],
        "media": {
          "images": [
            "assets/images/thuthuvalai1.jpg",
            "assets/images/thuthuvalai2.jpg"
          ],
          "model3D": "assets/3dModels/thuthuvalai.glb"
        }
      },
      {
        "commonName": "Arnica montana",
        "botanicalName": "Arnica montana",
        "ayushSystems": ["Homeopathy", "Ayurveda"],
        "medicinalProperties": ["Anti-inflammatory", "Pain relief", "Healing"],
        "therapeuticUses": ["Reduces bruises", "Relieves muscle pain", "Heals wounds"],
        "precautions": ["Do not ingest; topical use only"],
        "diseaseCategories": ["Musculoskeletal", "Pain", "Bruises", "Inflammation"],
        "plantPartsUsed": ["Flowers", "Leaves"],
        "media": {
          "images": [
            "assets/images/arnica1.jpg",
            "assets/images/arnica2.jpg"
          ],
          "model3D": "assets/3dModels/arnica.glb"
        }
      }
    ];

    for (final plant in plants) {
      final media = {
        "images": plant['images'],
        "model3D": plant['model3D']
      };

      final clean = Map.of(plant);
      clean.remove('images');
      clean.remove('model3D');
      clean['media'] = media;

      final id = plant['commonName'].toString().toLowerCase().replaceAll(' ', '_');

      await _db.collection('plants').doc(id).set(clean);
    }
  }
}