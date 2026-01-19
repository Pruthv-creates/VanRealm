import 'package:flutter/material.dart';
import 'package:virtual_herbal_garden/helper/helper_functions.dart';

class MyDrawer extends StatelessWidget {
  const MyDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;

    return Drawer(
      backgroundColor: colors.primaryContainer,
      child: SafeArea(
        child: Column(
          children: [
            /// 🌿 HEADER
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 24),
              child: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.all(18),
                    decoration: BoxDecoration(
                      color: colors.primary,
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      Icons.eco,
                      size: 42,
                      color: colors.inversePrimary,
                    ),
                  ),
                  const SizedBox(height: 14),
                  Text(
                    'Virtual Herbal Garden',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: colors.inversePrimary,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Explore • Learn • Preserve',
                    style: TextStyle(
                      fontSize: 13,
                      color: colors.onPrimaryContainer.withOpacity(0.8),
                    ),
                  ),
                ],
              ),
            ),

            const Divider(thickness: 1),

            /// 📂 NAV ITEMS
            _drawerTile(
              context,
              icon: Icons.home,
              title: 'Home',
              onTap: () {
                Navigator.pop(context);
              },
            ),

            _drawerTile(
              context,
              icon: Icons.person,
              title: 'Profile',
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/profile_page');
              },
            ),

            _drawerTile(
              context,
              icon: Icons.local_florist,
              title: 'Explore Plants',
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/explore_plants');
              },
            ),

            _drawerTile(
              context,
              icon: Icons.bookmark,
              title: 'Bookmarks',
              onTap: () {
                Navigator.pop(context);
                // TODO: bookmarks page
              },
            ),

            const Spacer(),

            const Divider(thickness: 1),

            /// 🚪 LOGOUT
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: _drawerTile(
                context,
                icon: Icons.logout,
                title: 'Logout',
                isLogout: true,
                onTap: logout,
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// 🔹 Reusable Drawer Tile
  Widget _drawerTile(
    BuildContext context, {
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    bool isLogout = false,
  }) {
    final colors = Theme.of(context).colorScheme;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      child: ListTile(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
        ),
        leading: Icon(
          icon,
          color: isLogout
              ? Colors.redAccent
              : colors.inversePrimary,
        ),
        title: Text(
          title,
          style: TextStyle(
            fontWeight: FontWeight.w600,
            color: isLogout
                ? Colors.redAccent
                : colors.inversePrimary,
          ),
        ),
        onTap: onTap,
      ),
    );
  }
}
