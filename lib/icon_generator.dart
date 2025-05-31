import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

class IconGenerator extends StatelessWidget {
  const IconGenerator({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 1024,
      height: 1024,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Colors.blue.shade500,
            Colors.purple.shade500,
          ],
        ),
        borderRadius: BorderRadius.circular(200),
      ),
      child: const Center(
        child: Icon(
          Icons.shopping_cart,
          size: 512,
          color: Colors.white,
        ),
      ),
    );
  }
}

Future<void> saveIcon() async {
  final RenderRepaintBoundary boundary = RenderRepaintBoundary();
  final IconGenerator iconWidget = IconGenerator();
  final BuildContext context = BuildContext();
  
  final RenderObject renderObject = iconWidget.createRenderObject(context);
  boundary.child = renderObject as RenderBox;
  boundary.layout(const BoxConstraints(maxWidth: 1024, maxHeight: 1024));
  
  final ui.Image image = await boundary.toImage(pixelRatio: 1);
  final ByteData? byteData = await image.toByteData(format: ui.ImageByteFormat.png);
  
  if (byteData != null) {
    final File file = File('assets/icon/icon.png');
    await file.writeAsBytes(byteData.buffer.asUint8List());
  }
} 