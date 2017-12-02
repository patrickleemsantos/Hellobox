import React from "react";
import { Text, Image } from "react-native";
import { Header, Left, Body, Right, Button, Drawer } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./HeaderComponentStyles";

export const HeaderComponent = ({logo, showAdditionalModal, resetBooking}) => {
    return (
        <Header style={{backgroundColor: "#E90000"}} iosBarStyle="light-content" androidStatusBarColor="#E90000">
            <Left>
                <Button transparent>
                    <Icon name="bars" style={styles.menu} onPress={() => this.openDrawer()} /> 
                </Button>
            </Left>
            <Body>
                <Text style={styles.headerText}>Hellobox</Text>
            </Body>
            <Right>
                <Button transparent onPress={() => resetBooking()}>
                    <Icon name="refresh" style={styles.menu} /> 
                </Button>
            </Right>
        </Header>
    );
}

export default HeaderComponent;