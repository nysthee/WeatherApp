import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  bigText: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  mainText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

const Forecast = (props) => {
  return (
    <View>
      <Text style={styles.bigText}>
        {props.main}
      </Text>
      <Text style={styles.mainText}>
        Current conditions: {props.description}
      </Text>
      <Text style={styles.bigText}>
        {props.temp} ℃
      </Text>
    </View>
  );
};

export default Forecast;
