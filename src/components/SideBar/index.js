import React from "react";
import { Text, Image, View, Alert, AsyncStorage } from "react-native";
import { Container, Button, Content, List, ListItem, Left, Body, Right } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";

const routes = ["Home", "Chat", "Profile"];

export const SideBar = ({ account }) => {

    bookings = () => {
        Actions.bookings();
    }

    logout = () => {
        AsyncStorage.setItem('account', '');
        Actions.login({type: "reset"});
    };    
    
    return (
        <Container>
            <Content style={{
                    backgroundColor: "#FFFFFF"
                }}>
                <View style={{
                        height: 200,
                        alignSelf: "stretch",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#E90000"
                    }}>
                     <Image
                        circle
                        style={{ height: 90, width: 90, borderRadius: 50 }}
                        source={{ uri: account.profile_picture }}
                        />
                    <Text
                        style={{
                            marginTop: 10,
                            color: "#FFFFFF",
                            fontSize: 16,
                            fontWeight: "bold"
                        }}
                        >{account.first_name + " " + account.last_name}</Text>
                </View>
                {/* <Image
                    source={{
                    uri: "http://designstacks.net/content_images/AdobePhotoshop/ART-D/tutorial598/3.jpg"
                    }}
                    style={{
                        height: 120,
                        alignSelf: "stretch",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#E90000"
                    }}>
                    <Image
                    square
                    style={{ height: 80, width: 70 }}
                    source={profilePicture}
                    />
                </Image> */}
                {/* <List
                    dataArray={routes}
                    renderRow={data => {
                    return (
                        <ListItem
                        button
                        onPress={() => this.props.navigation.navigate(data)}>
                        <Text>{data}</Text>
                        </ListItem>
                    );
                    }}
                /> */}
                <List>
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