import React, { Component } from 'react';
import { Actions } from "react-native-router-flux";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  Navigator,
  TextInput,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Spinner, ListItem, CheckBox, Body, Text } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';

const helloBoxLogo = require("../../../assets/images/logo.png");

export default class Login extends Component {    
    componentDidMount(){
        console.disableYellowBox = true;
        AsyncStorage.getItem('account', (err, result) => {
            if (result) {
                this.props.setAccount(JSON.parse(result));
                Actions.home();
            }
        });
    }

    componentDidUpdate() {
        const {status, message} = this.props.loginResult;
        
        if (status === true ){
            Actions.home();
        }
    }

    render() {
        handleLoginPreference = (value) => {
            this.props.setLoginPreference(value);
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

            { (this.props.isLoading == true) &&
                <Spinner color='red' />
            }

            <View style={styles.loginPreference}>
                <View style={styles.loginPreferenceMobileNo}>
                    <CheckBox 
                        checked={this.props.loginPreference == "mobile" ? true : false}
                        onPress={() => handleLoginPreference("mobile")} />
                    <Body>
                        <Text stlye={styles.cbMobileNoText}>Mobile Number</Text>
                    </Body>
                </View>
                <View style={styles.loginPreferenceEmail}>
                    <CheckBox 
                        checked={this.props.loginPreference == "email" ? true : false}
                        onPress={() => handleLoginPreference("email")} />
                    <Body>
                        <Text stlye={styles.cbEmailText}>E-mail</Text>
                    </Body>
                </View>
            </View>
            <View style={styles.formContainer}>
                <StatusBar
                barStyle="light-content"
                />
                <TextInput
                    onChangeText={ handleUsername.bind(this) }
                    placeholder={this.props.loginPreference == "mobile" ? "Mobile number (9081234567)" : "E-mail address" }
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    // keyboardType="email-address"
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
                    <Text style={styles.optionText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Actions.register()}
                    disabled={this.props.isLoading}>
                    <Text style={styles.optionText}>Create an Account</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.oAuthbuttons}>
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
            </View> */}
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
      paddingTop: 5,
      paddingLeft: 20,
      paddingBottom: 20,
      paddingRight: 20
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
      fontWeight: '700',
      fontSize: 15
    },
    loginPreference: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    loginPreferenceMobileNo: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginPreferenceEmail: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    cbEmailText: {
        fontSize: 13,
        color: "#000",
    },
    cbMobileNoText: {
        fontSize: 13,
        color: "#000",
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
        top: 300,
        alignSelf: "center"
    },
    optionText: {
        fontSize: 13,
        color: "#808080"
    }
  });