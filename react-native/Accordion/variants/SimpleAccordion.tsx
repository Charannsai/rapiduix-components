import React from 'react';
import { View, Text } from 'react-native';

export const SimpleAccordion = ({ title, content }) => (
  <View style={{ backgroundColor: '#f1f1f1', padding: 12, borderRadius: 8 }}>
    <Text style={{ fontWeight: 'bold' }}>{title}</Text>
    <Text>{content}</Text>
  </View>
);
