import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class PlantIdentificationService {
  static const String _apiKey = "YOUR_PLANTNET_API_KEY";

  Future<String?> identifyPlant(File imageFile) async {
    final uri = Uri.parse(
      "https://my-api.plantnet.org/v2/identify/all?api-key=$_apiKey",
    );

    final request = http.MultipartRequest('POST', uri);

    request.files.add(
      await http.MultipartFile.fromPath(
        'images',
        imageFile.path,
      ),
    );

    try {
      final response = await request.send();

      if (response.statusCode == 200) {
        final responseBody = await response.stream.bytesToString();
        final data = json.decode(responseBody);

        if (data['results'] != null && data['results'].isNotEmpty) {
          return data['results'][0]['species']
              ['scientificNameWithoutAuthor'];
        }
      }
    } catch (e) {
      print("PlantNet error: $e");
    }

    return null;
  }
}
