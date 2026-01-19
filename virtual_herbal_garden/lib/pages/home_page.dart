import 'package:flutter/material.dart';
import 'package:virtual_herbal_garden/theme/dark_mode.dart';
import 'package:virtual_herbal_garden/theme/light_mode.dart';
import 'package:virtual_herbal_garden/components/my_drawer.dart';
import 'package:virtual_herbal_garden/screens/seed_data.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = theme.colorScheme;

    Widget _featureCard(
  BuildContext context, {
  required IconData icon,
  required String title,
  required String subtitle,
  required VoidCallback onTap,
}) {
  final colors = Theme.of(context).colorScheme;

  return Expanded(
    child: InkWell(
      borderRadius: BorderRadius.circular(16),
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 6),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: colors.secondaryContainer,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          children: [
            Icon(icon, size: 34, color: colors.onSecondaryContainer),
            const SizedBox(height: 10),
            Text(
              title,
              textAlign: TextAlign.center,
              style: const TextStyle(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 4),
            Text(
              subtitle,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
      ),
    ),
  );
}


    return Scaffold(
      drawer: MyDrawer(),
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.primary,
        title: Text('Virtual Herbal Garden',style: TextStyle(
          fontWeight: FontWeight.w700, 
        ),),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () {
              Navigator.pushNamed(context, '/profile_page');
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
  padding: const EdgeInsets.all(16),
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [

      /// 🌿 HERO CARD
      Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.primaryContainer,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.eco,
                    size: 36,
                    color: Theme.of(context).colorScheme.inversePrimary),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Virtual Herbal Garden',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context)
                          .colorScheme
                          .inversePrimary,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              'Explore medicinal plants used in AYUSH systems through interactive 2D/3D models, curated knowledge, and guided learning.',
              style: TextStyle(
                fontSize: 15,
                color:
                    Theme.of(context).colorScheme.inversePrimary,
              ),
            ),
          ],
        ),
      ),

      const SizedBox(height: 24),

      /// 🔍 SEARCH
      TextField(
        decoration: InputDecoration(
          hintText: 'Search plants, diseases, or uses',
          prefixIcon: const Icon(Icons.search),
          filled: true,
          fillColor: Theme.of(context).colorScheme.primary,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide.none,
          ),
        ),
        onSubmitted: (query) {
          if (query.trim().isEmpty) return;
          Navigator.pushNamed(
            context,
            '/explore_plants',
            arguments: query.trim(),
          );
        },
      ),

      const SizedBox(height: 28),

      /// 🚀 FEATURES
      Text(
        'Explore & Learn',
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
            ),
      ),
      const SizedBox(height: 14),

      Row(
        children: [
          _featureCard(
            context,
            icon: Icons.local_florist,
            title: 'Explore Plants',
            subtitle: '2D / 3D plant views',
            onTap: () {
              Navigator.pushNamed(context, '/explore_plants');
            },
          ),
          _featureCard(
            context,
            icon: Icons.map,
            title: 'Guided Tours',
            subtitle: 'Learn by themes',
            onTap: () {},
          ),
          _featureCard(
            context,
            icon: Icons.bookmark,
            title: 'Bookmarks_          ',
            subtitle: 'Save & revisit',
            onTap: () {},
          ),
        ],
      ),

      const SizedBox(height: 32),

      /// 🌱 THEMES
      Text(
        'Start with a Health Theme',
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
            ),
      ),
      const SizedBox(height: 6),
      Text(
        'Curated collections of plants for focused learning',
        style: Theme.of(context).textTheme.bodySmall,
      ),
      const SizedBox(height: 14),

      Wrap(
        spacing: 10,
        runSpacing: 10,
        children: [
          _themeChip(context, 'Immunity'),
          _themeChip(context, 'Digestion'),
          _themeChip(context, 'Respiratory'),
          _themeChip(context, 'Stress Relief'),
          _themeChip(context, 'Skin Care'),
        ],
      ),

      const SizedBox(height: 30),

      /// ⚠️ ADMIN (OPTIONAL)
      ElevatedButton(
        onPressed: () async {
          await SeedDataService().addPlants();
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Plants added to Firestore')),
          );
        },
        child: const Text('Seed Plants (Admin)'),
      ),
    ],
  ),
),

    );
  }

  /// Feature Card
  Widget _featureCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    final colors = Theme.of(context).colorScheme;

    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 6),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: colors.primaryContainer,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            children: [
              Icon(icon, size: 32, color: Theme.of(context).colorScheme.inversePrimary),
              const SizedBox(height: 8),
              Text(
                title,
                textAlign: TextAlign.center,
                style: TextStyle(
                      color: Theme.of(context).colorScheme.inversePrimary,
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  

  /// Theme Chip
  Widget _themeChip(BuildContext context, String theme) {
    final colors = Theme.of(context).colorScheme;

    return ActionChip(
      label: Text(theme),
      backgroundColor: colors.secondaryContainer,
      labelStyle: TextStyle(color: colors.onSecondaryContainer),
      onPressed: () {
        // Later: navigate to filtered plant list page
      },
    );
  }
}
