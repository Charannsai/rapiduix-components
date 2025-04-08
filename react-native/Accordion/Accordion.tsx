import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SimpleAccordion } from './variants/SimpleAccordion';
import { BorderedAccordion } from './variants/BorderedAccordion';
import { IconAccordion } from './variants/IconAccordion';

const AccordionVariants = () => {
  const accordionVariants = [
    {
      label: 'Simple Accordion',
      Component: SimpleAccordion,
      props: { title: 'Simple', content: 'This is a basic accordion.' },
    },
    {
      label: 'Bordered Accordion',
      Component: BorderedAccordion,
      props: { title: 'Bordered', content: 'This has a border around it.' },
    },
    {
      label: 'Icon Accordion',
      Component: IconAccordion,
      props: { title: 'Icon', content: 'This uses icons for expansion.' },
    },
  ];

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Accordion Variants</Text>

      {accordionVariants.map((variant, index) => (
        <View key={index} style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, marginBottom: 8 }}>{index + 1}. {variant.label}</Text>
          <variant.Component {...variant.props} />
        </View>
      ))}
    </ScrollView>
  );
};

export default AccordionVariants;
