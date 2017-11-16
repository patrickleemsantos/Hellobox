import React, { Component } from 'react';
import { Actions } from "react-native-router-flux";
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  Navigator,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
var Spinner = require("react-native-spinkit");

const helloBoxLogo = require("../../../assets/images/logo.png");

export default class Login extends Component {    
    componentDidMount(){
        AsyncStorage.getItem('account', (err, result) => {
            if (result) {
                this.props.setAccount(JSON.parse(result));
                Actions.home();
            }
        });
    }

    render() {
        const {status, message} = this.props.loginResult;
        
        if (status === true ){
            Actions.home();
        }
                
        function handleUsername (value) {
            this.props.getUsername(value);
        }

        function handlePassword (value) {
            this.props.getPassword(value);
        }
        
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                style={styles.logo}
                source={helloBoxLogo}
                />
                <Text style={styles.title}></Text>
            </View>

            <View style={styles.floatView}>
                <Spinner style={styles.spinner} isVisible={ this.props.isLoading } size={40} type="Wave" color="#ffffff"/>
            </View>

            {/* <ActivityIndicator 
                    animating = {this.props.isLoading}
                    color = '#E90000'
                    size="large"/> */}

            <View style={styles.formContainer}>
                <StatusBar
                barStyle="light-content"
                />
                <TextInput
                    onChangeText={ handleUsername.bind(this) }
                    placeholder="Account ID"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    style={styles.input}
                    value={this.props.username}
                />
                <TextInput
                    onChangeText={ handlePassword.bind(this) }
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    returnKeyType="go"
                    secureTextEntry
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    ref={(input) => this.passwordInput = input}
                    value={this.props.password}
                />

                <TouchableOpacity
                    onPress={(this.props.login.bind(this))}
                    disabled={this.props.isLoading}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}><Icon name="sign-in" size={15} color="#FFF" />  LOGIN</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginOptions}>
                <TouchableOpacity
                    disabled={this.props.isLoading}>
                    <Text>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate("Registration", {})}
                    disabled={this.props.isLoading}>
                    <Text>Create an Account</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
    },
    logo: {
      width: 250,
      height: 250
    },
    formContainer: {
      padding: 20
    },
    title: {
      color: '#FFF',
      marginTop: 10,
      width: 200,
      textAlign: 'center',
      opacity: 0.9,
      fontWeight: '700'
    },
    input: {
      height: 40,
      backgroundColor: '#C0C0C0',
      marginBottom: 10,
      color: '#FFFFFF',
      paddingHorizontal: 10
    },
    buttonContainer: {
      backgroundColor: '#E90000',
      paddingVertical: 15
    },
    buttonText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '700'
    },
    loginOptions: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 30
    },
    oAuthbuttons: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 20,
        marginBottom: 30,
    },
    spinner: {
        color: "#E90000",
        // marginTop: 100,
        alignSelf: "center"
    },
    floatView: {
        position: 'absolute',
        width: 100,
        height: 100,
        top: 350,
        alignSelf: "center"
    }
  });