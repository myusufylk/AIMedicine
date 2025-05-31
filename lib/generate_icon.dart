import 'package:flutter/material.dart';

void main() {
  runApp(const IconGeneratorApp());
}

class IconGeneratorApp extends StatelessWidget {
  const IconGeneratorApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Container(
        width: 1024,
        height: 1024,
        color: Colors.blue,
        child: const Center(
          child: Icon(
            Icons.shopping_cart,
            size: 512,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
} 