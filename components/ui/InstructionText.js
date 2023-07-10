import { StyleSheet, Text } from 'react-native';
import { Color } from '../../utils/colors';

export const InstructionText = ({ children, style }) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  instructionText: { color: Color.secondary, fontSize: 24 },
});
