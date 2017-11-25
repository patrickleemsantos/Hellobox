import React, { Component } from 'react';
import { Actions } from "react-native-router-flux";
import {
  StyleSheet,
  View
} from 'react-native';
import { Spinner, Container, Content, Body, Left, Right, Text, Header, Button, Title, Footer, FooterTab, Item, Input, Form, Label, Card, CardItem } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AccountInformation extends Component {    
    render() {
        return (
            <Container>
            <Header style={{backgroundColor: "#E90000"}} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                <Left>
                    <Button transparent onPress={() => Actions.pop()}>
                        <Icon name="arrow-left" style={styles.menu} />
                    </Button>
                </Left>
                <Body>
                    <Text style={styles.headerText}>Account</Text>
                </Body>
                <Right>
                </Right>
            </Header>
            <Content>
                { this.props.account &&
                <Card>
                    <Form>
                        <Item inlineLabel>
                            <Label style={styles.labelText}><Icon name="user" size={15} /></Label>
                            <Text style={styles.text}>{this.props.account.first_name + " " + this.props.account.last_name}</Text>
                        </Item>
                        <Item inlineLabel>
                            <Label style={styles.labelText}><Icon name="envelope" size={15} /></Label>
                            <Text style={styles.text}>{this.props.account.email}</Text>
                        </Item>
                        <Item inlineLabel>
                            <Label style={styles.labelText}><Icon name="mobile-phone" size={18} /></Label>
                            <Text style={styles.text}>+63 {this.props.account.mobile_number}</Text>
                        </Item>
                    </Form>
                </Card>
                }
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
    text: {
        marginTop: 10,
        marginBottom: 10
    }
});