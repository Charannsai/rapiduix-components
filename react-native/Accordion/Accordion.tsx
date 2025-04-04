import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionItem = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <AntDesign
          name={expanded ? 'up' : 'down'}
          size={18}
          color="#666"
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      )}
    </View>
  );
};

const AccordionScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>FAQs</Text>

      <AccordionItem
        title="What is React Native?"
        content="React Native is an open-source framework developed by Meta for building cross-platform mobile applications using JavaScript and React."
      />
      <AccordionItem
        title="How does the accordion work?"
        content="An accordion is a UI component that lets users expand and collapse sections to show or hide content. It improves readability and keeps interfaces clean."
      />
      <AccordionItem
        title="Is React Native good for production?"
        content="Yes, many companies use React Native in production including Facebook, Instagram, and Shopify. It allows faster development with a shared codebase for iOS and Android."
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF', // Set the entire screen background to pure white
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  accordionContainer: {
    backgroundColor: '#FFFFFF', // Set accordion background to pure white
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF', // Set header background to pure white
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    padding: 16,
    backgroundColor: '#FFFFFF', // Set content background to pure white
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  contentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default AccordionScreen;
