import React from "react";
import { View, Alert, AsyncStorage, StyleSheet } from "react-native";
import { Container, Content, Body, Left, Right, Text, Header, Button, Title, Footer, FooterTab, Thumbnail, List, ListItem, Card, CardItem, CheckBox, Item, Input } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import DatePicker from 'react-native-datepicker'
var dateFormat = require('dateformat');

class AdditionalServices extends React.Component {
    componentDidMount() {
        
        this.props.setPickUpDateTime(dateFormat(new Date(), "mmmm do yyyy, h:MM:ss TT"));
        console.log(dateFormat(new Date(), "mmmm do yyyy, h:MM:ss TT"));
    }

    render () {    
        handAdditionalService = (price, service, description, value) => {
            this.props.updateAdditionalService({
                service,
                value: value
            });
    
            if (value == true) {
                this.props.addAdditionalPrice(price);
                this.props.addAdditionalServices({
                    service,
                    price,
                    value: description
                });
            } 
    
            if (value == false) {
                this.props.removeAdditionalPrice(price);
                this.props.removeAdditionalServices({
                    service,
                    price,
                    value: description
                });
            }
        }

        handleSetBookingNote = (value) => {
            this.props.setBookingNote(value);
        }

        return (
            <Container>
                <Header style={{backgroundColor: "#E90000"}} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                <Left>
                    <Button transparent onPress={() => Actions.pop()}>
                        <Icon name="arrow-left" style={styles.menu} />
                    </Button>
                </Left>
                <Body>
                    <Text style={styles.headerText}>Additional</Text>
                </Body>
                <Right>
                </Right>
                </Header>
                    <Content>
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
                            <CardItem>
                                <View style={{flex: 1, flexDirection: "column"}}>
                                    <Text style={styles.title}>Pick-up Time</Text>
                                    {/* <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}> */}
                                        <DatePicker
                                            style={{width: 300}}
                                            date={this.props.pickUpDateTime}
                                            mode="datetime"
                                            placeholder="select date"
                                            format="MMMM Do YYYY, h:mm:ss a"
                                            minDate={this.props.pickUpDateTime}
                                            // maxDate="2016-06-01"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={true}
                                            customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 4,
                                                    marginLeft: 0
                                                },
                                                dateInput: {
                                                    marginLeft: 36,
                                                    borderWidth: 0
                                                }
                                            }}
                                            onDateChange={(date) => {this.props.setPickUpDateTime(date)}}
                                            />
                                    {/* </View> */}
                                </View>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                                <View style={{flex: 1, flexDirection: "column"}}>
                                    <Text style={styles.title}>Extra Requirements</Text>
                                    <ListItem>
                                        <CheckBox 
                                            checked={this.props.additionalService1} 
                                            color="#E90000"
                                            onPress={() => handAdditionalService(50, 1, "Goods longer than 6ft", !this.props.additionalService1)}
                                        />
                                        <Body>
                                            <Text style={styles.additionalText}>Goods longer than 6ft (₱50)</Text>
                                        </Body>
                                    </ListItem>
                                    <ListItem>
                                        <CheckBox 
                                            checked={this.props.additionalService2} 
                                            color="#E90000"
                                            onPress={() => handAdditionalService(60, 2, "Borrow cart(s)", !this.props.additionalService2)}
                                        />
                                        <Body>
                                            <Text style={styles.additionalText}>Borrow cart(s) (₱60)</Text>
                                        </Body>
                                    </ListItem>
                                    <ListItem>
                                        <CheckBox 
                                            checked={this.props.additionalService3}
                                            color="#E90000"
                                            onPress={() => handAdditionalService(0, 3, "Mover", !this.props.additionalService3)}
                                        />
                                        <Body>
                                            <Text style={styles.additionalText}>Mover (₱0)</Text>
                                        </Body>
                                    </ListItem>
                                    <ListItem>
                                        <CheckBox 
                                            checked={this.props.additionalService4}
                                            color="#E90000"
                                            onPress={() => handAdditionalService(50, 4, "Pets", !this.props.additionalService4)}
                                        />
                                        <Body>
                                            <Text style={styles.additionalText}>Pets (₱50)</Text>
                                        </Body>
                                    </ListItem>
                                    <ListItem>
                                        <CheckBox 
                                            checked={this.props.additionalService5} 
                                            color="#E90000"
                                            onPress={() => handAdditionalService(100, 5, "New car", !this.props.additionalService5)}
                                        />
                                        <Body>
                                            <Text style={styles.additionalText}>New car (₱100)</Text>
                                        </Body>
                                    </ListItem>
                                    <ListItem>
                                        <CheckBox 
                                            checked={this.props.additionalService6}
                                            color="#E90000"
                                            onPress={() => handAdditionalService(65, 6, "Dumper / Construction waste", !this.props.additionalService6)}
                                        />
                                        <Body>
                                            <Text style={styles.additionalText}>Dumper / Construction waste (₱65)</Text>
                                        </Body>
                                    </ListItem>
                                </View>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                                <View style={{flex: 1, flexDirection: "column"}}>
                                    <Text style={styles.title}>Note</Text>
                                    <View style={{flex: 1, flexDirection: "column"}}>
                                        <Item>
                                            <Input style={{fontSize: 14}} placeholder={"Enter note..."} multiline={true} onChangeText={ handleSetBookingNote.bind(this) }/>
                                        </Item>
                                    </View>
                                </View>
                            </CardItem>
                        </Card>
                    </Content>
                    {(this.props.fare == undefined) ? (
                        <Footer style={styles.footerContainer}>
                            <Text style={styles.fare}> PRICE: </Text><Text style={styles.amount}>₱ 0</Text>
                        </Footer>
                    ) : (
                        <Footer style={styles.footerContainer}>
                            <Text style={styles.fare}> PRICE: </Text><Text style={styles.amount}>₱ {this.props.fare + this.props.additionalPrice}</Text>
                        </Footer>
                    )}
                    <Footer>
                        <FooterTab style={styles.btnFooterContainer} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                            <Button success style={styles.button} onPress={() => Actions.reviewOrder()}>
                                <Text style={styles.subText}>REVIEW ORDER</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({    
    menu: {
		color: "#fff",
		fontSize: 20
    },
    btnIcons: {
        color: "#E90000",
		fontSize: 20
    },
    headerText:{
		color:"#fff",
		fontSize:18
    },
    title: {
        color: "#808080",
        fontSize: 14,
        marginBottom: 10
    },
    btnPassenger: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    footerContainer: {
        backgroundColor: '#fff'
    },
    fare:{
        paddingTop:15,
        fontWeight:"bold",
        fontSize: 18,
    },
    amount:{
        paddingTop:15,
        fontWeight:"bold",
        fontSize: 18,
    },
    additionalText: {
        fontSize: 13
    },
    btnFooterContainer:{
		backgroundColor:"#424949",
	},
	button: {
		margin: 5,
		height: 40
	},
	subText:{
		fontSize:14,
		fontWeight: "bold",
		color: "#FFFF"
	}
});

export default AdditionalServices;