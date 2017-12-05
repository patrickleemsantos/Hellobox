import React from "react";
import { Image, TextInput, Alert } from 'react-native';
import { Text, View, Content, Container, Button, Header, Body, Title, Left, Right } from "native-base";
import Modal from 'react-native-modalbox';
import Icon from "react-native-vector-icons/FontAwesome";
import StarRating from 'react-native-star-rating';

import styles from "./RatingModalStyles.js"

export const RatingModal = ({ showRatingModal, booking, selectedStar, setSelectedStar, getComment, comment, saveComment }) => {

    function handleSaveComment() {
        if (selectedStar === 0) {
            Alert.alert("Hellobox", "Please select a rating");
        } else {
            if (comment === "") {
                Alert.alert("Hellobox", "Please enter a comment");
            } else {
                saveComment();
            }
        }
    }

    return(
        <Modal 
            style={[styles.modal, styles.modalContainer]} 
            position={"center"} 
            isOpen={showRatingModal}
            swipeToClose={false}
            backdropPressToClose={false}>
            <View style={{flex: 1, flexDirection: "column"}}>
                <View style={styles.header}>
                    <Text style={styles.title}>RATE YOUR DRIVER</Text>
                </View>
                <Text style={styles.smallText}>Delivered By</Text>
                <View style={ styles.profilePictureContainer }>
                    <Image
                        circle
                        style={ styles.profilePicture }
                        source={{ uri: booking.driver.profile_picture }}
                        />
                </View>
                <Text style={styles.textName}>{ booking.driver.first_name + " " + booking.driver.last_name }</Text>
                <Text style={styles.priceText}>Your billed amount</Text>
                <Text style={styles.price}>P {parseInt(booking.fare) + parseInt(booking.additional_price)}</Text>
                <Text style={styles.ratingText}>Rate & Review</Text>
                <View style={styles.startContainer}>
                    <StarRating
                        style={styles.starRating}
                        maxStars={5}
                        rating={selectedStar}
                        selectedStar={(rating) => setSelectedStar(rating)}
                        starColor={'red'}
                    />
                </View>
                <View style={styles.inputCommentContainer}>
                    <TextInput
                        style={styles.inputComment}
                        multiline = {true}
                        numberOfLines = {4}
                        placeholder="Please add comment here..."
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="go"
                        onChangeText={ (text)=> getComment(text) }
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button block success style={styles.button} onPress={() => handleSaveComment()}><Text style={styles.subText}>Submit</Text></Button>
                </View>
            </View>
        </Modal>
    )
}

export default RatingModal;