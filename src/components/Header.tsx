import React from 'react';
import { View, Text } from 'react-native';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default Header;
