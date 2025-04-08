import React from 'react';
import { View, Text } from 'react-native';

export const BorderedAccordion = ({ title, content }) => (
  <View style={{ borderWidth: 1, borderColor: '#aaa', padding: 12, borderRadius: 8 }}>
    <Text style={{ fontWeight: 'bold' }}>{title}</Text>
    <Text>{content}</Text>
  </View>
);
