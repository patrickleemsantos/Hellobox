import React from "react";
import { Text } from "react-native";
import { Footer, FooterTab, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./SelectVehicleStyles";

export const SelectVehicle = ({getSelectedVehicle, selectedVehicle}) => {

    const tabs = [{
            title: "Motorcycle",
            vehicle: "motorcycle",
            subTitle: "",
            icon: "motorcycle"
        },
        {
            title: "Van",
            vehicle: "van",
            subTitle: "",
            icon: "bus"
        },
        {
            title: "Moving Service",
            vehicle: "truck",
            subTitle: "",
            icon: "truck"
        }];

    function handleSelectedVehicle(value) {
        getSelectedVehicle(value);
    }

    return (
        <Footer>
            <FooterTab style={styles.footerContainer} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                {
                    tabs.map((obj, index) => {
                        return (
                            <Button key={index} onPress={() => handleSelectedVehicle(obj.vehicle)}>
                                <Icon size={20} name={obj.icon} color={(selectedVehicle === obj.vehicle) ? "#E90000" : "grey"} />
                                <Text style={{fontSize:12, color:(selectedVehicle === obj.vehicle) ? "#E90000" : "grey"}}>{obj.title}</Text>
                                <Text style={styles.subText}>{obj.subTitle}</Text>
                            </Button>
                        )
                    })
                }
            </FooterTab>
        </Footer>
    );
}

export default SelectVehicle;