import 'package:flutter/material.dart';
void main() {
  runApp(const AccordionApp());
}

class AccordionItem extends StatefulWidget {
  final String title;
  final String content;
  final int index;
  final int? activeIndex;
  final Function(int?) setActiveIndex;

  const AccordionItem({
    Key? key,
    required this.title,
    required this.content,
    required this.index,
    required this.activeIndex,
    required this.setActiveIndex,
  }) : super(key: key);

  @override
  State<AccordionItem> createState() => _AccordionItemState();
}

class _AccordionItemState extends State<AccordionItem>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _arrowRotation;
  late Animation<double> _height;
  late Animation<double> _opacity;

  bool get isExpanded => widget.index == widget.activeIndex;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );

    _arrowRotation = Tween<double>(begin: 0, end: 0.5).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    _height = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    _opacity = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void didUpdateWidget(covariant AccordionItem oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (isExpanded) {
      _controller.forward();
    } else {
      _controller.reverse();
    }
  }

  void _toggleExpand() {
    widget.setActiveIndex(isExpanded ? null : widget.index);
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 400),
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        border: Border.all(color: const Color(0xFFE0E0E0)),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: [
          GestureDetector(
            onTap: _toggleExpand,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    widget.title,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF333333),
                    ),
                  ),
                  RotationTransition(
                    turns: _arrowRotation,
                    child: Icon(
                      isExpanded
                          ? Icons.keyboard_arrow_up
                          : Icons.keyboard_arrow_down,
                      size: 18,
                      color: const Color(0xFF666666),
                    ),
                  ),
                ],
              ),
            ),
          ),
          SizeTransition(
            sizeFactor: _height,
            axisAlignment: 1,
            child: FadeTransition(
              opacity: _opacity,
              child: Container(
                padding: const EdgeInsets.all(16),
                alignment: Alignment.centerLeft,
                child: Text(
                  widget.content,
                  style: const TextStyle(
                    fontSize: 14,
                    height: 1.6,
                    color: Color(0xFF555555),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class StylishAccordion extends StatefulWidget {
  final List<Map<String, String>> data;
  final int? initialActiveIndex;

  const StylishAccordion({
    Key? key,
    required this.data,
    this.initialActiveIndex,
  }) : super(key: key);

  @override
  State<StylishAccordion> createState() => _StylishAccordionState();
}

class _StylishAccordionState extends State<StylishAccordion> {
  int? activeIndex;

  @override
  void initState() {
    super.initState();
    activeIndex = widget.initialActiveIndex;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: widget.data.asMap().entries.map((entry) {
        int index = entry.key;
        var item = entry.value;
        return AccordionItem(
          title: item['title']!,
          content: item['content']!,
          index: index,
          activeIndex: activeIndex,
          setActiveIndex: (i) => setState(() => activeIndex = i),
        );
      }).toList(),
    );
  }
}

// Example usage
class AccordionApp extends StatelessWidget {
  const AccordionApp({super.key});

  @override
  Widget build(BuildContext context) {
    final accordionData = [
      {
        'title': 'Interactive Experience',
        'content':
            'Our platform offers an unparalleled interactive experience designed to engage users at every level. The responsive interface adapts to your specific needs and preferences.',
      },
      {
        'title': 'Advanced Animation System',
        'content':
            'Built with sophisticated animation techniques, this component provides buttery-smooth transitions between states. Every interaction feels natural and delightful.',
      },
      {
        'title': 'Customizable Design',
        'content':
            'The styling system allows for complete customization to match your brand identity. Modify colors, typography, spacing, and animations to create a unique look and feel.',
      },
      {
        'title': 'Performance Optimized',
        'content':
            'Engineered for maximum performance on all devices, this accordion component minimizes re-renders and utilizes hardware acceleration for animations whenever possible.',
      },
    ];

    return MaterialApp(
      home: Scaffold(
        body: Padding(
          padding: const EdgeInsets.all(20),
          child: Center(
            child: StylishAccordion(data: accordionData),
          ),
        ),
      ),
    );
  }
}
