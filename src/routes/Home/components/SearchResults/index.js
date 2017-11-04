import React from "react";
import { ScrollView, Text } from "react-native";
import { View, List, ListItem, Left, Body } from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./SearchResultsStyles.js"
var Spinner = require("react-native-spinkit");

export const SearchResults = ({isSearchAddressLoading, predictions, getSelectedAddress}) => {
    function handleSelectedAddress (placeID) {
        getSelectedAddress(placeID);
    }

    return(
        <View style={styles.searchResultsWrapper} >
            <Spinner style={styles.spinner} isVisible={isSearchAddressLoading} size={40} type="FadingCircleAlt" color="#ffffff"/>
            <List 
                dataArray={predictions}
                renderRow={(item)=>
                    <ScrollView>
                        <ListItem style={styles.listWrapper} onPress={() => handleSelectedAddress(item.placeID)} button avatar>
                            <Left style={styles.leftContainer}>
                                <Icon style={styles.leftIcon} name="location-on" />
                            </Left>
                            <Body>
                                <Text style={styles.primaryText}>{item.primaryText}</Text>
                                <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                            </Body>
                        </ListItem>
                    </ScrollView>
                }
            />
        </View>

    );
};

export default SearchResults;