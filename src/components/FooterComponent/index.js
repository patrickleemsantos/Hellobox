import React from "react";
import { Text } from "react-native";
import { Footer, FooterTab, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./FooterComponentStyles";

export const FooterComponent = () => {

    //tab bar items
    const tabs = [{
            title: "Motorcycle",
            subTitle: "",
            icon: "motorcycle"
        },
        {
            title: "Van",
            subTitle: "",
            icon: "bus"
        },
        {
            title: "L300",
            subTitle: "",
            icon: "truck"
        }];

    return (
        <Footer>
            <FooterTab style={styles.footerContainer} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                {
                    tabs.map((obj, index) => {
                        return (
                            <Button key={index}>
                                <Icon size={20} name={obj.icon} color={(index === 0) ? "#E90000" : "grey"} />
                                <Text style={{fontSize:12, color:(index === 0) ? "#E90000" : "grey"}}>{obj.title}</Text>
                                <Text style={styles.subText}>{obj.subTitle}</Text>
                            </Button>
                        )
                    })
                }
            </FooterTab>
        </Footer>
    );
}

export default FooterComponent;