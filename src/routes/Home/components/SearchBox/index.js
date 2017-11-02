import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./SearchBoxStyles.js"

export const SearchBox = ({getInputData, toggleSearchResultmodal, getAddressPredictions, selectedAddress}) => {
    const { selectedPickUp, selectedDropOff } = selectedAddress || {};
    function handleInput(key, value){
        getInputData({
            key,
            value: value
        });

        getAddressPredictions();
    }

    return (
        <View style={styles.searchBox}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>PICK UP</Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#E90000" />
                    <Input onFocus={() => toggleSearchResultmodal("pickUp")} 
                            style={styles.inputSearch} 
                            placeholder="Choose pick-up location" 
                            onChangeText={handleInput.bind(this, "pickUp")} 
                            value={selectedPickUp && selectedPickUp.name}
                    />
                </InputGroup>
            </View>
            <View style={styles.secondInputWrapper}>
                <Text style={styles.label}>DROP-OFF</Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#E90000" />
                    <Input onFocus={() => toggleSearchResultmodal("dropOff")} 
                            style={styles.inputSearch} 
                            placeholder="Choose drop-off location" 
                            onChangeText={handleInput.bind(this, "dropOff")} 
                            value={selectedDropOff && selectedDropOff.name}
                    />
                </InputGroup>
            </View>
        </View>
    );
};

export default SearchBox;