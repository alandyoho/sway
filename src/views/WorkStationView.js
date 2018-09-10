import React, { Component } from "react"
import { View, Image, Dimensions, StyleSheet, FlatList, Text, Animated, TextInput, TouchableWithoutFeedback, Keyboard, LayoutAnimation } from "react-native"
import ListItem from "../components/ListItem"
import data from "./data"
export default class WorkStationView extends Component {
    constructor() {
        super()
        this.state = {
            workStation: "",
            stations: [],
            expanded: false,
            workStationView: {
                flex: 9 / 20,
                alignItems: "center",
                backgroundColor: "#FFF"
            },
            workImageView: {
                flex: 11 / 20,
                backgroundColor: "#FFF"
            }
        }
    }
    search = (text) => {
        const filt = data.filter(val => val.stationName.toLowerCase().includes(text.toLowerCase()))
        this.setState({ stations: filt })
    }
    componentDidMount() {
        this.setState({ stations: data })

    }
    selectWorkStation = (name) => {
        this.setState({ workStation: name })
        this.props.navigation.navigate("LandingView")

    }
    expandElement = () => {
        LayoutAnimation.configureNext({
            duration: 1500,
            create: {
                type: LayoutAnimation.Types.spring,
                property: LayoutAnimation.Properties.scaleXY,
                springDamping: 0.7,
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 0.7,
            },
        });
        this.setState({
            workStationView: {
                flex: 1,
                alignItems: "center",
                backgroundColor: "#FFF"
            },
            workImageView: {
                flex: 0
            },
            expanded: true
        })
    }
    contractElement = () => {
        LayoutAnimation.configureNext({
            duration: 1500,
            create: {
                type: LayoutAnimation.Types.spring,
                property: LayoutAnimation.Properties.scaleXY,
                springDamping: 0.7,
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 0.7,
            },

        });
        this.setState({
            workStationView: {
                flex: 9 / 20,
                alignItems: "center",
                backgroundColor: "#FFF"
            },
            workImageView: {
                flex: 11 / 20,
                backgroundColor: "#FFF"
            },
            expanded: false
        })
        Keyboard.dismiss()
    }
    renderItem = ({ item }) => {
        return (
            <View
                style={{
                    opacity: 1,
                    backgroundColor: 'transparent',
                }}
            >
                <ListItem
                    item={item}
                    isHidden={!this.state.expanded}
                    onPress={this.selectWorkStation}
                />
            </View>
        );
    };
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.contractElement} accessible={false}>
                <View style={styles.container}>
                    <View style={this.state.workImageView}>
                        <Image resizeMode={"cover"} source={require("../assets/work.png")} style={styles.image} />
                    </View>
                    <View style={this.state.workStationView}>
                        <View style={styles.workStationTextInputContainer}>
                            <TextInput placeholderTextColor={"#6F8FA9"} placeholder={"What station do you take from work?"} style={styles.workStationTextInput} onTouchStart={this.expandElement} onChangeText={this.search} />
                            <Image source={require("../assets/searchIcon.png")} style={styles.searchIcon} />
                        </View>
                        <View style={{ top: 95, width: Dimensions.get('window').width * .83, height: Dimensions.get("window").height }}>
                            {this.state.expanded && (<FlatList
                                data={this.state.stations}
                                renderItem={this.renderItem}
                            />)}
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
    image: {
        flex: 1,
        width: Dimensions.get('window').width
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
        justifyContent: "center",
        zIndex: 10

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