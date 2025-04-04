import 'package:flutter/material.dart';

class AccordionScreen extends StatelessWidget {
  const AccordionScreen({Key? key}) : super(key: key);

  final List<Map<String, String>> faqs = const [
    {
      'title': 'What is React Native?',
      'content':
          'React Native is an open-source framework developed by Meta for building cross-platform mobile applications using JavaScript and React.'
    },
    {
      'title': 'How does the accordion work?',
      'content':
          'An accordion is a UI component that lets users expand and collapse sections to show or hide content. It improves readability and keeps interfaces clean.'
    },
    {
      'title': 'Is React Native good for production?',
      'content':
          'Yes, many companies use React Native in production including Facebook, Instagram, and Shopify. It allows faster development with a shared codebase for iOS and Android.'
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('FAQs'),
        centerTitle: true,
        backgroundColor: Colors.blueGrey,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: faqs.length,
        itemBuilder: (context, index) {
          final item = faqs[index];
          return AccordionItem(
            title: item['title']!,
            content: item['content']!,
          );
        },
      ),
    );
  }
}

class AccordionItem extends StatefulWidget {
  final String title;
  final String content;

  const AccordionItem({
    Key? key,
    required this.title,
    required this.content,
  }) : super(key: key);

  @override
  State<AccordionItem> createState() => _AccordionItemState();
}

class _AccordionItemState extends State<AccordionItem> {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      margin: const EdgeInsets.symmetric(vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ExpansionTile(
        title: Text(
          widget.title,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
        childrenPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        trailing: Icon(
          _expanded ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
          color: Colors.grey[700],
        ),
        onExpansionChanged: (expanded) {
          setState(() {
            _expanded = expanded;
          });
        },
        children: [
          Text(
            widget.content,
            style: const TextStyle(
              fontSize: 14,
              height: 1.5,
              color: Colors.black87,
            ),
          ),
        ],
      ),
    );
  }
}
