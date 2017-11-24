import React, { Component } from 'react';
import { Actions } from "react-native-router-flux";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  AsyncStorage
} from 'react-native';
import { Spinner, Container, Content, Body, Left, Right, Text, Header, Button, Title, Footer, FooterTab, Item, Input, Form, Label, Card, CardItem } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
// var Spinner = require("react-native-spinkit");

export default class Register extends Component {    
    componentDidUpdate() {
        if (this.props.registerStatus == true) {
            AsyncStorage.getItem('account', (err, result) => {
                if (result) {
                    Actions.home();
                }
            });
        }
    }

    render() {
        function handleFirstName (value) {
            this.props.setFirstName(value);
        }

        function handleLastName (value) {
            this.props.setLastName(value);
        }

        function handleMobileNumber (value) {
            this.props.setMobileNumber(value);
        }

        function handleEmail (value) {
            this.props.setEmail(value);
        }

        function handlePassword (value) {
            this.props.setPassword(value);
        }
        
        return (
            <Container>
            <Header style={{backgroundColor: "#E90000"}} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                <Left>
                    <Button transparent onPress={() => Actions.pop()}>
                        <Icon name="arrow-left" style={styles.menu} />
                    </Button>
                </Left>
                <Body>
                    <Text style={styles.headerText}>Register</Text>
                </Body>
                <Right>
                </Right>
            </Header>
            <Content>
                <Card>
                    <Form>
                        <Item inlineLabel>
                            <Label style={styles.labelText}>First Name *</Label>
                            <Input style={styles.inputText} 
                                    onChangeText={ handleFirstName.bind(this) }
                                    value={this.props.firstName }
                                    autoCorrect={false} />
                        </Item>
                        <Item inlineLabel>
                            <Label style={styles.labelText}>Last Name *</Label>
                            <Input style={styles.inputText} 
                                    onChangeText={ handleLastName.bind(this) } 
                                    value={this.props.lastName }
                                    autoCorrect={false} />
                        </Item>
                        <Item inlineLabel>
                            <Label style={styles.labelText}>Mobile +63 *</Label>
                            <Input style={styles.inputText} 
                                    placeholder={"(9182122041)"} 
                                    maxLength={10}
                                    keyboardType = 'numeric'
                                    onChangeText={ handleMobileNumber.bind(this) }
                                    value={this.props.mobileNumber } />
                        </Item>
                        <Item inlineLabel>
                            <Label style={styles.labelText}>Email *</Label>
                            <Input style={styles.inputText} 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={ handleEmail.bind(this) }
                                    value={this.props.email } />
                        </Item>
                        <Item inlineLabel last>
                            <Label style={styles.labelText}>Password *</Label>
                            <Input style={styles.inputText} 
                                    onChangeText={ handlePassword.bind(this) }
                                    value={this.props.password } 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="go"
                                    secureTextEntry />
                        </Item>
                        <Button disabled={this.props.loadingStatus} onPress={() => this.props.addAccount()} full success>
                            <Text style={styles.buttonText}>SUBMIT</Text>
                            { (this.props.loadingStatus == true) &&
                                <Spinner color='white' />
                            }
                        </Button>
                    </Form>
                </Card>
            </Content>
          </Container>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
		color: "#fff",
		fontSize: 20
    },
    headerText:{
		color:"#fff",
        fontSize:18,
        fontWeight: "bold"
    },
    labelText: {
        fontSize: 14
    },
    inputText: {
        fontSize: 14
    },
    buttonText: {
        fontWeight: "bold"
    }
});