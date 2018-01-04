import React from "react";
import { Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import { View, InputGroup, Input } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./SearchBoxStyles.js"

export const SearchBox = ({
                        getInputData, 
                        toggleSearchResultmodal, 
                        getAddressPredictions, 
                        getSelectedAddress,
                        selectedAddress,
                        showExtraDropOff,
                        hideExtraDropOff,
                        showExtraDropOff1,
                        showExtraDropOff2,
                        showExtraDropOff3,
                        showExtraDropOff4,
                        fare,
                        reCalculateFare
                    }) => {

    const { selectedPickUp, selectedDropOff, selectedExtraDropOff1, selectedExtraDropOff2, selectedExtraDropOff3, selectedExtraDropOff4 } = selectedAddress || {};
    
    function handleInput(key, value) {
        getInputData({
            key,
            value: value
        });
        getAddressPredictions();
        toggleSearchResultmodal(key);
    }

    function handleShowExtraDropOff(value) {
        showExtraDropOff(value);
    }

    function handleHideExtraDropOff(value) {
        hideExtraDropOff(value);
        reCalculateFare();
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.searchBox}>
            <ScrollView 
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight)=>{        
                        this.scrollView.scrollToEnd({animated: false});
                    }} >
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
                        { (showExtraDropOff1 == false && fare) &&
                            <TouchableOpacity onPress={() => showExtraDropOff(1)}>
                                <Icon name="plus-circle" size={25} color="#00cc00" />
                            </TouchableOpacity>
                        }
                    </InputGroup>
                </View>

                { (showExtraDropOff1 == true) &&
                    <View style={styles.secondInputWrapper}>
                        <Text style={styles.label}>DROP-OFF 1</Text>
                        <InputGroup>
                            <Icon name="search" size={15} color="#E90000" />
                            <Input onFocus={() => toggleSearchResultmodal("extraDropOff1")} 
                                    style={styles.inputSearch} 
                                    placeholder="Choose drop-off location" 
                                    onChangeText={handleInput.bind(this, "extraDropOff1")} 
                                    value={selectedExtraDropOff1 && selectedExtraDropOff1.name}
                            />

                            { (showExtraDropOff2 == false && selectedExtraDropOff1) &&
                                <TouchableOpacity onPress={() => handleShowExtraDropOff(2)}>
                                    <Icon name="plus-circle" size={25} color="#00cc00" />
                                </TouchableOpacity>
                            }

                            { (showExtraDropOff1 == true && showExtraDropOff2 == false) &&
                                <TouchableOpacity onPress={() => handleHideExtraDropOff(1)}>
                                    <Icon style={{marginLeft: 5}} name="minus-circle" size={25} color="#E90000" />
                                </TouchableOpacity>
                            }
                        </InputGroup>
                    </View> 
                }

                { (showExtraDropOff2 == true) &&
                    <View style={styles.secondInputWrapper}>
                        <Text style={styles.label}>DROP-OFF 2</Text>
                        <InputGroup>
                            <Icon name="search" size={15} color="#E90000" />
                            <Input onFocus={() => toggleSearchResultmodal("extraDropOff2")} 
                                    style={styles.inputSearch} 
                                    placeholder="Choose drop-off location" 
                                    onChangeText={handleInput.bind(this, "extraDropOff2")} 
                                    value={selectedExtraDropOff2 && selectedExtraDropOff2.name}
                            />

                            { (showExtraDropOff3 == false && selectedExtraDropOff2) &&
                                <TouchableOpacity onPress={() => handleShowExtraDropOff(3)}>
                                    <Icon name="plus-circle" size={25} color="#00cc00" />
                                </TouchableOpacity>
                            }

                            { (showExtraDropOff2 == true && showExtraDropOff3 == false) &&
                                <TouchableOpacity onPress={() => handleHideExtraDropOff(2)}>
                                    <Icon style={{marginLeft: 5}} name="minus-circle" size={25} color="#E90000" />
                                </TouchableOpacity>
                            }
                        </InputGroup>
                    </View> 
                }

                { (showExtraDropOff3 == true) &&
                    <View style={styles.secondInputWrapper}>
                        <Text style={styles.label}>DROP-OFF 3</Text>
                        <InputGroup>
                            <Icon name="search" size={15} color="#E90000" />
                            <Input onFocus={() => toggleSearchResultmodal("extraDropOff3")} 
                                    style={styles.inputSearch} 
                                    placeholder="Choose drop-off location" 
                                    onChangeText={handleInput.bind(this, "extraDropOff3")} 
                                    value={selectedExtraDropOff3 && selectedExtraDropOff3.name}
                            />

                            { (showExtraDropOff4 == false && selectedExtraDropOff3) &&
                                <TouchableOpacity onPress={() => handleShowExtraDropOff(4)}>
                                    <Icon name="plus-circle" size={25} color="#00cc00" />
                                </TouchableOpacity>
                            }

                            { (showExtraDropOff3 == true && showExtraDropOff4 == false) &&
                                <TouchableOpacity onPress={() => handleHideExtraDropOff(3)}>
                                    <Icon style={{marginLeft: 5}} name="minus-circle" size={25} color="#E90000" />
                                </TouchableOpacity>
                            }
                        </InputGroup>
                    </View> 
                }

                { (showExtraDropOff4 == true) &&
                    <View style={styles.secondInputWrapper}>
                        <Text style={styles.label}>DROP-OFF 4</Text>
                        <InputGroup>
                            <Icon name="search" size={15} color="#E90000" />
                            <Input onFocus={() => toggleSearchResultmodal("extraDropOff4")} 
                                    style={styles.inputSearch} 
                                    placeholder="Choose drop-off location" 
                                    onChangeText={handleInput.bind(this, "extraDropOff4")} 
                                    value={selectedExtraDropOff4 && selectedExtraDropOff4.name}
                            />

                            { (showExtraDropOff4 == true) &&
                                <TouchableOpacity onPress={() => handleHideExtraDropOff(4)}>
                                    <Icon style={{marginLeft: 5}} name="minus-circle" size={25} color="#E90000" />
                                </TouchableOpacity>
                            }
                        </InputGroup>
                    </View> 
                }
            </ScrollView>
            {/* <View style={styles.additionalContainer}>
                <TouchableOpacity>
                    <Text style={styles.additionalText}>Add Destination <Icon name="plus-circle" size={13} color="#E90000" /></Text>
                </TouchableOpacity>
            </View> */}
        </KeyboardAvoidingView>
    );
};

export default SearchBox;