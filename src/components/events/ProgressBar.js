import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import CurrentStep from '../../../assets/onboarding/CurrentStep';
import NextStep from '../../../assets/onboarding/NextStep';
import CheckedStep from '../../../assets/onboarding/CheckedStep';

const ProgressBar = ({ current }) => {
  const getStepIcon = (step) => {
    if (step < current) {
      return CheckedStep;
    } else if (step === current) {
      return CurrentStep;
    } else {
      return NextStep;
    }
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((step, index) => (
        <React.Fragment key={step}>
          <View style={styles.circleContainer}>
            <SvgXml xml={getStepIcon(step)} />
            <Text style={styles.text}>{step}</Text>
          </View>
          {step < 5 && (
            <View
              style={[
                styles.line,
                step < current ? styles.checkedLine : styles.nextLine,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    gap: 4,
  },
  text: {
    color: '#3C3C4399',
    fontSize: 13
  },
  line: {
    height: 1.5,
    flex: 1,
    marginBottom: 22
  },
  checkedLine: {
    backgroundColor: '#49A078',
  },
  nextLine: {
    backgroundColor: '#D1D5DB',
  },
});

export default ProgressBar;