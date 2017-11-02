import React, { Component } from 'react';
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
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
    static navigationOptions = {
        title: "Login",
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#E90000'
        }
    };

    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }
    }

    async onLoginPressed() {

    }

    render() {
        var {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
                />
                <Text style={styles.title}></Text>
            </View>
            <View style={styles.formContainer}>
                <StatusBar
                barStyle="light-content"
                />
                <TextInput
                    onChangeText={ (text)=> this.setState({email: text}) }
                    placeholder="E-mail address"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={ (text)=> this.setState({password: text}) }
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    returnKeyType="go"
                    secureTextEntry
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    ref={(input) => this.passwordInput = input}
                />

                <TouchableOpacity
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}><Icon name="sign-in" size={15} color="#FFF" />  LOGIN</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginOptions}>
                <TouchableOpacity>
                    <Text>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate("Registration", {})}>
                    <Text>Create an Account</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.oAuthbuttons}>
                <Icon.Button
                    name="facebook"
                    backgroundColor="#3b5998">
                    Login via Facebook
                </Icon.Button>
                <Icon.Button
                    name="google"
                    backgroundColor="#DD4B39">
                    Login via Google
                </Icon.Button>
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
        marginRight: 20
    },
    oAuthbuttons: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 20,
        marginBottom: 30,
    }
  });