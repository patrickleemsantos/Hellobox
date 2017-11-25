import React from "react";
import { Text, Image, View, Alert, AsyncStorage } from "react-native";
import { Container, Button, Content, List, ListItem, Left, Body, Right } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";

const routes = ["Home", "Chat", "Profile"];

export const SideBar = ({ account }) => {
    
    accountInformation = () => {
        Actions.accountInformation();
    }

    bookings = () => {
        Actions.bookings();
    }

    logout = () => {
        AsyncStorage.setItem('account', '');
        Actions.login();
    };    
    
    return (
        <Container>
            <Content style={{
                    backgroundColor: "#FFFFFF"
                }}>
                {/* <View style={{
                        height: 100,
                        alignSelf: "stretch",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#E90000"
                    }}>
                    <Text
                        style={{
                            marginTop: 10,
                            color: "#FFFFFF",
                            fontSize: 16,
                            fontWeight: "bold"
                        }}
                        >{account.first_name + " " + account.last_name}</Text>
                </View> */}
                <List>
                    <ListItem icon onPress={() => this.accountInformation()}>
                        <Left>
                            <Icon name="user" size={15} />
                        </Left>
                        <Body>
                            <Text>Account</Text>
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                    <ListItem icon onPress={() => this.bookings()}>
                        <Left>
                            <Icon name="book" size={15} />
                        </Left>
                        <Body>
                            <Text>Bookings</Text>
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                    <ListItem icon onPress={() => this.logout()}>
                        <Left>
                            <Icon name="sign-out" size={15} />
                        </Left>
                        <Body>
                            <Text>Logout</Text>
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                </List>
            </Content>
        </Container>
    );
}

export default SideBar;