import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const IconAccordion = ({ title, content }) => (
  <View style={{ padding: 12 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="chevron-down" size={16} />
      <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>{title}</Text>
    </View>
    <Text>{content}</Text>
  </View>
);
