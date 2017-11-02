import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './src/components/Login';
import Registration from './src/components/Registration';

const Navigation = StackNavigator({
  Login: {screen: Login,
            headerMode: 'none',
            header: null,
            navigationOptions: {
                header: null
            }
          },
  Registration: {screen: Registration}
})

export default Navigation;