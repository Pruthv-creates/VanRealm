import 'package:flutter/material.dart';

ThemeData darkMode = ThemeData(
  useMaterial3: true,
  brightness: Brightness.dark,

  scaffoldBackgroundColor: const Color.fromARGB(255, 31, 68, 44),

  colorScheme: const ColorScheme.dark(
    surface: Color.fromARGB(255, 57, 79, 64),          // main surfaces
    primary: Color.fromARGB(255, 81, 185, 124),           // herbal green (soft)
    secondary: Color(0xFFCBBE7A),         // warm ayush accent
    inversePrimary: Color(0xFFEAF7EE),

    onSurface: Color(0xFFE5EEE9),
    onPrimary: Color(0xFF0F1411),
    onSecondary: Color(0xFF1C1C1C),
  ),

  appBarTheme: const AppBarTheme(
    backgroundColor: Color(0xFF0F1411),
    elevation: 0,
    centerTitle: true,
  ),

  cardTheme: CardThemeData(
    color: const Color.fromARGB(255, 111, 136, 122),
    elevation: 4,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(20),
    ),
  ),

  drawerTheme: const DrawerThemeData(
    backgroundColor: Color(0xFF161C18),
  ),

  listTileTheme: const ListTileThemeData(
    iconColor: Color(0xFFEAF7EE),
    textColor: Color(0xFFEAF7EE),
  ),

  iconTheme: const IconThemeData(
    color: Color(0xFFEAF7EE),
  ),

  dividerTheme: DividerThemeData(
    color: Colors.grey.shade700,
    thickness: 0.6,
  ),

  textTheme: ThemeData.dark().textTheme.apply(
    bodyColor: const Color(0xFFE5EEE9),
    displayColor: Colors.white,
  ),
);
