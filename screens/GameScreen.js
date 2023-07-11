import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import {
  Card,
  InstructionText,
  NumberContainer,
  PrimaryButton,
} from '../components';
import { Title } from '../components/';

import { Ionicons } from '@expo/vector-icons';
import { GuessLogItem } from '../components/game/GuessLogItem';

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
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const minBoundaryRef = useRef(1);
  const maxBoundaryRef = useRef(100);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
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
      setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
    },
    [currentGuess, userNumber]
  );

  const guessRoundsListLength = guessRounds.length;

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
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>

          <View style={styles.button}>
            <PrimaryButton onPress={() => nextGuessHandler('greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={({ item, index }) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - index}
              guess={item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
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
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
