import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {
  Card,
  InstructionText,
  NumberContainer,
  PrimaryButton,
} from '../components';
import { Title } from '../components/';
const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

export const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const minBoundaryRef = useRef(1);
  const maxBoundaryRef = useRef(100);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = useCallback(
    (direction) => {
      if (
        (direction === 'lower' && currentGuess < userNumber) ||
        (direction === 'greater' && currentGuess > userNumber)
      ) {
        return Alert.alert('You are cheating!', 'You know it', [
          { text: 'Sorry', style: 'cancel' },
        ]);
      }

      if (direction === 'lower') {
        maxBoundaryRef.current = currentGuess;
      } else {
        minBoundaryRef.current = currentGuess + 1;
      }

      const newRndNumber = generateRandomBetween(
        minBoundaryRef.current,
        maxBoundaryRef.current,
        currentGuess
      );
      setCurrentGuess(newRndNumber);
    },
    [currentGuess, userNumber]
  );

  return (
    <View style={styles.screen}>
      <Title>Opponent's guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <PrimaryButton onPress={() => nextGuessHandler('lower')}>
              -
            </PrimaryButton>
          </View>

          <View style={styles.button}>
            <PrimaryButton onPress={() => nextGuessHandler('greater')}>
              +
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <Text>Log rounds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    columnGap: 6,
  },
  button: { flex: 1 },
});
