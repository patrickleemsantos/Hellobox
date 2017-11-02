import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  AsyncStorage,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormLabel, FormInput, Button, CheckBox } from 'react-native-elements'

export default class Registration extends Component {
    static navigationOptions = {
        title: "Registration",
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#E90000'
        }
    };

    constructor() {
        super()
        this.state = {
                        email: "",
                        mobile_no: "",
                        first_name: "",
                        last_name: "",
                        password: "",
                        checked: false,
                        error: false
                    }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FormLabel>E-mail</FormLabel>
                <FormInput
                    onChangeText={ (text)=> this.setState({email: text}) }
                    underlineColorAndroid="#ff0000"
                    returnKeyType="next"
                    shake={!this.state.error ? false : true}/>
                <FormLabel>Mobile Number</FormLabel>
                <FormInput
                    onChangeText={ (text)=> this.setState({mobile_no: text}) }
                    underlineColorAndroid="#ff0000"
                    returnKeyType="next"/>
                <FormLabel>First Name</FormLabel>
                <FormInput
                    onChangeText={ (text)=> this.setState({first_name: text}) }
                    underlineColorAndroid="#ff0000"
                    returnKeyType="next"/>
                <FormLabel>Last Name</FormLabel>
                <FormInput
                    onChangeText={ (text)=> this.setState({last_name: text}) }
                    underlineColorAndroid="#ff0000"
                    returnKeyType="next"/>
                <FormLabel>Password</FormLabel>
                <FormInput
                    onChangeText={ (text)=> this.setState({password: text}) }
                    underlineColorAndroid="#ff0000"
                    secureTextEntry
                    returnKeyType="go"/>
                <Button
                    title="Register"
                    backgroundColor="#E90000"
                    buttonStyle={styles.button}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    button: {
        marginTop: 30,
    }
})