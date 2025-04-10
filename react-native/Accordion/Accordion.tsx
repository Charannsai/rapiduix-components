import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Easing,
  LayoutAnimation, 
  Platform, 
  UIManager 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';



const AccordionItem = ({ title, content, index, activeIndex, setActiveIndex }) => {
  // Track if this item is expanded
  const isExpanded = index === activeIndex;
  
  // Animation values
  const animatedRotation = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const animatedHeight = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const animatedOpacity = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  // Toggle expansion
  const toggleExpand = () => {
    // Create custom animation config for smoother transitions
    const customConfig = {
      duration: 400,
      update: {
        duration: 400,
        property: LayoutAnimation.Properties.scaleY,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    };
    LayoutAnimation.configureNext(customConfig);
    
    // Set the active index (or collapse if already active)
    setActiveIndex(isExpanded ? null : index);
    
    // Animate the rotation for the arrow
    Animated.timing(animatedRotation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();
    
    // Animate the height
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : 1,
      duration: 400,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
    
    // Animate the opacity
    Animated.timing(animatedOpacity, {
      toValue: isExpanded ? 0 : 1,
      duration: 400,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  // Calculate rotated value for the arrow
  const arrowRotation = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          activeOpacity={0.7}
          style={styles.header} 
          onPress={toggleExpand}
        >
          <Text style={styles.headerText}>{title}</Text>
          <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
            <AntDesign
          name={isExpanded ? 'up' : 'down'}
          size={18}
          color="#666"
        />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <Animated.View 
          style={[
            styles.contentContainer, 
            { 
              opacity: animatedOpacity,
              maxHeight: animatedHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1000]
              })
            }
          ]}
        >
          <View style={styles.content}>
            <Text style={styles.contentText}>{content}</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const StylishAccordion = ({ data, initialActiveIndex = null }) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  return (
    <View style={styles.accordionContainer}>
      {data.map((item, index) => (
        <AccordionItem 
          key={index} 
          title={item.title} 
          content={item.content} 
          index={index}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    marginBottom: 8,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'transparent',
  },
  headerContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 14,
    color: '#666',
  },
  contentContainer: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  content: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
});

// Example usage
const Accordion = () => {
  const accordionData = [
    {
      title: 'Interactive Experience',
      content: 'Our platform offers an unparalleled interactive experience designed to engage users at every level. The responsive interface adapts to your specific needs and preferences.'
    },
    {
      title: 'Advanced Animation System',
      content: 'Built with sophisticated animation techniques, this component provides buttery-smooth transitions between states. Every interaction feels natural and delightful.'
    },
    {
      title: 'Customizable Design',
      content: 'The styling system allows for complete customization to match your brand identity. Modify colors, typography, spacing, and animations to create a unique look and feel.'
    },
    {
      title: 'Performance Optimized',
      content: 'Engineered for maximum performance on all devices, this accordion component minimizes re-renders and utilizes hardware acceleration for animations whenever possible.'
    }
  ];

  return (
    <View style={appStyles.container}>
     
      <StylishAccordion data={accordionData} />
    </View>
  );
};

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default Accordion;