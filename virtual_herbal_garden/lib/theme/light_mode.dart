import 'package:flutter/material.dart';

ThemeData lightMode = ThemeData(
  useMaterial3: true,
  brightness: Brightness.light,

  colorScheme: const ColorScheme.light(
    /// Base surfaces
    surface: Color(0xFFF3FBF4),           // very light green-white
    background: Color(0xFFF7FCF8),

    /// Primary (Herbal Green)
    primary: Color(0xFF4CAF50),
    primaryContainer: Color(0xFFDFF3E1),

    /// Secondary (Earth / AYUSH tone)
    secondary: Color(0xFF9E8B4E),
    secondaryContainer: Color(0xFFF1EAD3),

    /// Accent & contrast
    inversePrimary: Color(0xFF1B5E20),

    /// Text colors
    onPrimary: Colors.white,
    onSecondary: Color(0xFF3E3A2F),
    onSurface: Color(0xFF2E2E2E),
    onBackground: Color(0xFF2E2E2E),
  ),

  scaffoldBackgroundColor: const Color(0xFFF7FCF8),

  /// 📝 Text Theme
  textTheme: const TextTheme(
    titleLarge: TextStyle(
      fontSize: 22,
      fontWeight: FontWeight.bold,
    ),
    titleMedium: TextStyle(
      fontSize: 18,
      fontWeight: FontWeight.w600,
    ),
    bodyLarge: TextStyle(
      fontSize: 16,
    ),
    bodyMedium: TextStyle(
      fontSize: 14,
    ),
    bodySmall: TextStyle(
      fontSize: 12,
      color: Color(0xFF5F6F61),
    ),
  ),

  /// 🟢 AppBar Theme
  appBarTheme: const AppBarTheme(
    elevation: 4,
    backgroundColor: Color(0xFF4CAF50),
    foregroundColor: Colors.white,
    centerTitle: true,
  ),

  /// 🔘 Button Theme
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: const Color(0xFF4CAF50),
      foregroundColor: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
      ),
      padding: const EdgeInsets.symmetric(
        horizontal: 20,
        vertical: 14,
      ),
    ),
  ),

  /// 🧩 Card Theme
  cardTheme: CardThemeData(
  elevation: 4,
  color: const Color(0xFFDFF3E1),
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(16),
  ),
),


  /// 🏷 Chip Theme
  chipTheme: ChipThemeData(
    backgroundColor: const Color(0xFFE6F2E6),
    selectedColor: const Color(0xFF4CAF50),
    labelStyle: const TextStyle(color: Color(0xFF2E2E2E)),
    secondaryLabelStyle:
        const TextStyle(color: Colors.white),
    padding: const EdgeInsets.symmetric(horizontal: 10),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12),
    ),
  ),

  /// 🧭 Input Fields
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: const Color(0xFFE6F2E6),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(14),
      borderSide: BorderSide.none,
    ),
  ),
);
