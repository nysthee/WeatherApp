import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Forecast from './Forecast';
import config from '../config';

const baseFontSize = 16;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column',
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30,
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
  },
  zipCode: {
    width: 50,
    height: baseFontSize,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF',
  },
});

class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      zip: '',
      forecast: null,
    };
  }

  handleTextChange(event) {
    const zip = event.nativeEvent.text;
    this.setState({
      zip,
    }, function () {
      fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},be&units=metric&APPID=${config.owm_api_key}`)
        .then(response => response.json())
        .then((responseJSON) => {
          this.setState({
            forecast: {
              main: responseJSON.weather[0].main,
              description: responseJSON.weather[0].description,
              temp: responseJSON.main.temp,
            },
          });
        }
      )
      .catch((error) => {
        console.warn(error);
      });
    });
  }

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (<Forecast
        main={this.state.forecast.main}
        description={this.state.forecast.description}
        temp={this.state.forecast.temp}
      />);
    }
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/background.jpg')}
          resizeMode="cover"
          style={styles.backdrop}
        >
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  returnKeyType="go"
                  onSubmitEditing={this.handleTextChange}
                />
              </View>
            </View>
            {content}
          </View>
        </Image>
      </View>
    );
  }
}

export default WeatherProject;
