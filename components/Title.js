import { StyleSheet, Text } from 'react-native';
import { Color } from '../utils/colors';

export const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.secondary,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Color.secondary,
    padding: 12,
    borderRadius: 3,
  },
});
