import { StyleSheet, Text } from 'react-native';
import { Color } from '../../utils/colors';

export const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'open-sans-bold',
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    borderRadius: 4,
  },
});
