import React, { Component } from "react"
import { View, Image, Dimensions, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native"

export default class HomeStationView extends Component {
    constructor() {
        super()
        this.state = {
            homeStation: ""
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image resizeMode={"cover"} source={require("../assets/home.png")} style={styles.image} />
                    </View>
                    <View style={styles.homeStationContainer}>
                        <View style={styles.homeStationTextInputContainer}>
                            <TextInput placeholderTextColor={"#6F8FA9"} placeholder={"What train do you take to work?"} style={styles.homeStationTextInput} />
                            <Image source={require("../assets/searchIcon.png")} style={styles.searchIcon} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    imageContainer: {
        flex: 5 / 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    image: {
        flex: 1,
        width: Dimensions.get('window').width
    },
    homeStationContainer: {
        flex: 5 / 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative'
    },
    homeStationTextInputContainer: {
        shadowColor: 'black',
        backgroundColor: "#FFF",
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        borderRadius: 5,
        width: Dimensions.get('window').width * .83,
        height: 41,
        top: 94,
        justifyContent: "center"
    },
    homeStationTextInput: {
        alignItems: "center",
        left: 6,
        fontFamily: "Merriweather-Bold",
        color: "#6F8FA9"
    },
    searchIcon: {
        position: "absolute",
        height: 13,
        width: 13,
        right: 10,
    }
});
