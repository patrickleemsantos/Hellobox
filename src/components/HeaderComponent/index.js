import React from "react";
import { Text, Image } from "react-native";
import { Header, Left, Body, Right, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./HeaderComponentStyles";

export const HeaderComponent = ({logo, showAdditionalModal}) => {
    return (
        <Header style={{backgroundColor: "#E90000"}} iosBarStyle="light-content" androidStatusBarColor="#E90000">
            <Left>
                <Button transparent>
                    <Icon name="bars" style={styles.menu} /> 
                </Button>
            </Left>
            <Body>
                <Text style={styles.headerText}>Hellobox</Text>
                {/* ||
				<Text style={styles.headerText}>Driver on the way</Text> */}
                {/* <Image resizeMode="contain" style={styles.logo} source={logo} /> */}
            </Body>
            <Right>
                <Button transparent>
                    {<Icon name="plus" onPress={() => showAdditionalModal(true)} style={styles.menu} /> }
                </Button>
            </Right>
        </Header>
    );
}

export default HeaderComponent;