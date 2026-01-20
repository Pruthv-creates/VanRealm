import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:virtual_herbal_garden/models/plant.dart';
import 'package:virtual_herbal_garden/pages/plant_details_page.dart';
import '../database/services/cart_service.dart';
import '../database/services/order_service.dart';

class CartPage extends StatefulWidget {
  const CartPage({super.key});

  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  final CartService cartService = CartService();
  List<String> cartIds = [];

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text("My Cart"),
        centerTitle: true,
      ),

      body: StreamBuilder<List<String>>(
        stream: cartService.cartPlantIdsStream(),
        builder: (context, snapshot) {
          cartIds = snapshot.data ?? [];

          if (cartIds.isEmpty) {
            return const Center(
              child: Text(
                "Your cart is empty 🌱",
                style: TextStyle(fontSize: 16),
              ),
            );
          }

          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: cartIds.length,
            itemBuilder: (context, index) {
              final plantId = cartIds[index];

              return FutureBuilder<DocumentSnapshot<Map<String, dynamic>>>(
                future: FirebaseFirestore.instance
                    .collection('plants')
                    .doc(plantId)
                    .get(),
                builder: (context, plantSnap) {
                  if (!plantSnap.hasData || !plantSnap.data!.exists) {
                    return const SizedBox();
                  }

                  final plant = Plant.fromFirestore(
                    plantSnap.data!.id,
                    plantSnap.data!.data()!,
                  );

                  return Card(
                    margin: const EdgeInsets.only(bottom: 14),
                    elevation: 6,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: ListTile(
                      contentPadding: const EdgeInsets.all(12),
                      leading: const Icon(Icons.local_florist, size: 36),
                      title: Text(
                        plant.commonName,
                        style: const TextStyle(fontWeight: FontWeight.w600),
                      ),
                      subtitle: Text(plant.botanicalName),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete_outline),
                        color: Colors.redAccent,
                        onPressed: () async {
                          await cartService.removeFromCart(plant.id);

                          if (!context.mounted) return;

                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text("Removed from cart"),
                              duration: Duration(seconds: 1),
                            ),
                          );
                        },
                      ),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) =>
                                PlantDetailsPage(plant: plant),
                          ),
                        );
                      },
                    ),
                  );
                },
              );
            },
          );
        },
      ),

      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16),
        child: ElevatedButton.icon(
          icon: const Icon(Icons.shopping_bag),
          label: const Text("Place Order"),
          onPressed: cartIds.isEmpty
              ? null
              : () async {
                  await OrderService().placeOrder(cartIds);

                  if (!context.mounted) return;

                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Order placed successfully"),
                    ),
                  );
                },
        ),
      ),
    );
  }
}
