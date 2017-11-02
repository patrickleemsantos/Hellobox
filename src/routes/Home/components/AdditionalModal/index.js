import React from "react";
import { Modal } from 'react-native';
import { Header, Left, Right, Button, Body, Title, Text, View, Content, Label, Item, Card, CardItem, CheckBox, ListItem, Footer } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./AdditionalModalStyles.js"

export const AdditionalModal = ({fare, additionalPrice, isAdditionalModalVisible, showAdditionalModal, addAdditionalServices, removeAdditionalServices, addAdditionalPrice, removeAdditionalPrice, additionalService1, additionalService2, additionalService3, additionalService4, additionalService5, additionalService6, updateAdditionalService}) => {
    function handAdditionalService(price, service, description, value){
        updateAdditionalService({
            service,
            value: value
        });

        if (value == true) {
            addAdditionalPrice(price);
            addAdditionalServices({
                service,
                price,
                value: description
            });
        } 

        if (value == false) {
            removeAdditionalPrice(price);
            removeAdditionalServices({
                service,
                price,
                value: description
            });
        }
    }

    return(
        <View style={styles.container}>
            <Modal 
                animationType="slide"
                presentationStyle="formSheet"
                transparent={false}
                visible={isAdditionalModalVisible}
                onRequestClose={() => showAdditionalModal(false)}
            >
            <Header style={{backgroundColor: "#E90000"}} iosBarStyle="light-content" androidStatusBarColor="#E90000">
            <Left>
                <Button transparent onPress={() => showAdditionalModal(false)} >
                    <Icon name="arrow-left" style={styles.menu} />
                </Button>
            </Left>
            <Body>
                <Text style={styles.headerText}>Additional</Text>
            </Body>
            <Right>
                {/* <Button transparent onPress={() => showAdditionalModal(false)} >
                    <Icon name="close" style={styles.menu} />
                </Button> */}
            </Right>
            </Header>
                <Content style={styles.modalContainer}>
                    {/* <Card>
                        <CardItem header>
                            <Text style={styles.title}>Passenger</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Grid>
                                    <Col style={styles.btnPassenger}>
                                        <Button transparent>
                                            <Icon name="minus" style={styles.btnIcons} /> 
                                        </Button>
                                    </Col>
                                    <Col style={styles.btnPassenger}>
                                        <Text>
                                        1 Passenger
                                        </Text>
                                    </Col>
                                    <Col style={styles.btnPassenger}>
                                        <Button transparent>
                                            <Icon name="plus" style={styles.btnIcons} /> 
                                        </Button>
                                    </Col>
                                </Grid>

                            </Body>
                        </CardItem>
                        <CardItem footer>
                        </CardItem>
                    </Card> */}
                    <Card>
                        <CardItem header>
                            <Text style={styles.title}>Extra Requirements</Text>
                        </CardItem>
                        <CardItem>
                            <Content>
                                <ListItem>
                                    <CheckBox 
                                        checked={additionalService1} 
                                        color="#E90000"
                                        onPress={() => handAdditionalService(50, 1, "Goods longer than 6ft", !additionalService1)}
                                    />
                                    <Body>
                                        <Text>Goods longer than 6ft (₱50)</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <CheckBox 
                                        checked={additionalService2} 
                                        color="#E90000"
                                        onPress={() => handAdditionalService(60, 2, "Borrow cart(s)", !additionalService2)}
                                    />
                                    <Body>
                                        <Text>Borrow cart(s) (₱60)</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <CheckBox 
                                        checked={additionalService3}
                                        color="#E90000"
                                        onPress={() => handAdditionalService(100, 3, "Mover", !additionalService3)}
                                    />
                                    <Body>
                                        <Text>Mover (₱100)</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <CheckBox 
                                        checked={additionalService4}
                                        color="#E90000"
                                        onPress={() => handAdditionalService(50, 4, "Pets", !additionalService4)}
                                    />
                                    <Body>
                                        <Text>Pets (₱50)</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <CheckBox 
                                        checked={additionalService5} 
                                        color="#E90000"
                                        onPress={() => handAdditionalService(100, 5, "New car", !additionalService5)}
                                    />
                                    <Body>
                                        <Text>New car (₱100)</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <CheckBox 
                                        checked={additionalService6}
                                        color="#E90000"
                                        onPress={() => handAdditionalService(65, 6, "Dumper / Construction waste", !additionalService6)}
                                    />
                                    <Body>
                                        <Text>Dumper / Construction waste (₱65)</Text>
                                    </Body>
                                </ListItem>
                            </Content>
                        </CardItem>
                        <CardItem footer>
                        </CardItem>
                    </Card>
                </Content>
                {(fare == undefined) ? (
                    <Footer style={styles.footerContainer}>
                        <Text style={styles.fare}> FARE: </Text><Text style={styles.amount}>₱ 0</Text>
                    </Footer>
                ) : (
                    <Footer style={styles.footerContainer}>
                        <Text style={styles.fare}> FARE: </Text><Text style={styles.amount}>₱ {fare + additionalPrice}</Text>
                    </Footer>
                )}
            </Modal>
        </View>
    )
}

export default AdditionalModal;