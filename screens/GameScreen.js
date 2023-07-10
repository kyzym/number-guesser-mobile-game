import { StyleSheet, Text, View } from 'react-native';
import { Title } from '../components/Title';

export const GameScreen = () => {
  return (
    <View style={styles.screen}>
      <View>
        <Title>Opponent's guess</Title>
        <Text>Higher or lower?</Text>
      </View>
      <Text>Log rounds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 56,
  },
});
