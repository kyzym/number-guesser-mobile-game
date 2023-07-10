import { StyleSheet, View } from 'react-native';
import { Color } from '../../utils/colors';

export const Card = ({ children }) => {
  return <View style={styles.inputContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Color.primary700,
    borderRadius: 8,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
