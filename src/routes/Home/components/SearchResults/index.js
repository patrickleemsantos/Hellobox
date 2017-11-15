import React from "react";
import { ScrollView, Text } from "react-native";
import { View, List, ListItem, Left, Body, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./SearchResultsStyles.js"
var Spinner = require("react-native-spinkit");

export const SearchResults = ({isSearchAddressLoading, 
                                predictions, 
                                getSelectedAddress, 
                                closeResultType}) => {
                                    
    function handleSelectedAddress (placeID) {
        getSelectedAddress(placeID);
    }

    return(
        <View style={styles.searchResultsWrapper} >
            {/* <Button onPress={() => closeResultType()} transparent style={styles.button}>
                <Icon name="window-close" style={styles.icon} />
            </Button> */}
            <Spinner style={styles.spinner} isVisible={isSearchAddressLoading} size={40} type="Wave" color="#ffffff"/>
            <List 
                dataArray={predictions}
                renderRow={(item)=>
                    <ScrollView>
                        <ListItem style={styles.listWrapper} onPress={() => handleSelectedAddress(item.placeID)} button avatar>
                            <Left style={styles.leftContainer}>
                                <Icon style={styles.leftIcon} name="location-arrow" />
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