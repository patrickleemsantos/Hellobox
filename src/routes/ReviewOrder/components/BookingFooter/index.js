import React from "react";
import { Text, Alert } from "react-native";
import { Footer, FooterTab, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./BookingFooterStyles";

export const BookingFooter = ({onPressAction, fare}) => {
    return (
        <Footer>
            <FooterTab style={styles.footerContainer} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                <Button success disabled={(fare ? false: true)} style={styles.button}  onPress={onPressAction}>
                    <Text style={styles.subText}>BOOK NOW</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
}

export default BookingFooter;