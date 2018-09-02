import React, { Component } from "react"
import { View, Image, Dimensions, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native"

export default class WorkStationView extends Component {
    constructor() {
        super()
        this.state = {
            workStation: ""
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image resizeMode={"cover"} source={require("../assets/work.png")} style={styles.image} />
                    </View>
                    <View style={styles.workStationContainer}>
                        <View style={styles.workStationTextInputContainer}>
                            <TextInput placeholderTextColor={"#6F8FA9"} placeholder={"What train do you take home?"} style={styles.workStationTextInput} />
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
    workStationContainer: {
        flex: 5 / 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative'
    },
    workStationTextInputContainer: {
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
    workStationTextInput: {
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
