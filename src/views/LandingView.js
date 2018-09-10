import React, { Component } from "react"
import { View, Image, Dimensions, StyleSheet, FlatList, Button, Text, Animated, TextInput, TouchableWithoutFeedback, Keyboard, LayoutAnimation, TouchableOpacity } from "react-native"
import TrainTimesItem from "../components/TrainTimesItem"
import SlidingUpPanel from 'rn-sliding-up-panel';
import data from "./data"

export default class LandingView extends Component {
    constructor() {
        super()
        this.state = {
            station: [],
            workStation: "96th St",
            homeStation: "Penn Station",
            left: false,
            settingsViewVisible: false,
            homeInputSelected: false,
            workInputSelected: false
        }
    }
    componentDidMount() {
        this.fetchData()
    }
    renderItem = ({ item }) => {
        const opacityOfSelectedItem = 1
        const { selectedItem } = this.props;
        return (
            <View
                style={{
                    opacity: opacityOfSelectedItem,
                    backgroundColor: 'transparent',
                }}
            >
                <TrainTimesItem
                    item={item}
                    isHidden={!this.state.workInputSelected}
                    onPress={this.selectHomeStation}
                    style={item.key === "1" && { backgroundColor: "#0e5a77" }}
                />
            </View>
        );
    };
    search = (text) => {
        const filt = data.filter(val => val.stationName.toLowerCase().includes(text.toLowerCase()))
        this.setState({ stations: filt })
    }
    fetchData = async () => {
        try {
            const data = await fetch("http://datamine.mta.info/mta_esi.php?key=ad8e9ea7b72089fe0ee8d43a747754a1&feed_id=1")
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    expandHomeElement = () => {
        this.setState({ homeInputSelected: true, workInputSelected: false })
    }
    expandWorkElement = () => {
        this.setState({ workInputSelected: true, homeInputSelected: false })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.settingsView}>
                    <TouchableOpacity onPress={() => this.setState({ settingsViewVisible: true })}>
                        <Image source={require("../assets/settingsGearIcon.png")} style={styles.settingsGear} />
                    </TouchableOpacity>
                </View>
                <View style={styles.homeWorkView}>
                    <TouchableOpacity onPress={() => this.setState({ left: true })}>
                        <Image source={this.state.left ? require("../assets/selectedHomeIcon.png") : require("../assets/homeIcon.png")} style={styles.image} />
                        <Text style={{ fontFamily: !this.state.left ? "Merriweather" : "Merriweather-Bold", color: "#6F8FA9", textAlign: "center", textDecorationLine: this.state.left ? "underline" : "none" }}>{this.state.homeStation}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ left: !this.state.left })} style={styles.frame}>
                        <Image source={this.state.left ? require("../assets/arrowLeft.png") : require("../assets/arrow.png")} style={styles.arrow} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ left: false })}>
                        <Image source={this.state.left ? require("../assets/workIcon.png") : require("../assets/selectedWorkIcon.png")} style={styles.image} />
                        <Text style={{ fontFamily: this.state.left ? "Merriweather" : "Merriweather-Bold", color: "#6F8FA9", textAlign: "center", textDecorationLine: !this.state.left ? "underline" : "none" }}>{this.state.workStation}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.changeStationView}>
                </View>
                <View style={styles.trainTimes}>
                    <FlatList
                        data={[{ key: "1", stationName: "8:33" }, { key: "2", stationName: "8:35" }, { key: "3", stationName: "8:39" }, { key: "5", stationName: "8:43" }]}
                        renderItem={this.renderItem}
                        scrollEnabled={false}
                    />
                </View>
                <SlidingUpPanel
                    visible={this.state.settingsViewVisible}
                    onRequestClose={() => this.setState({ settingsViewVisible: false })}
                    onDragStart={() => this.setState({ settingsViewVisible: false })}
                    draggableRange={{ top: Dimensions.get("window").height * 0.9, bottom: 0 }}	>
                    <View style={styles.homeStationView}>
                        <TouchableOpacity onPress={() => this.setState({ settingsViewVisible: false })}>
                            <Image source={require("../assets/downArrow.png")} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                </SlidingUpPanel>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    settingsGear: {
        width: 30,
        height: 30,
        flexDirection: "row",
        left: 30,
        top: 30
    },
    settingsView: {
        flex: 1 / 8
    },
    frame: {
        padding: 50
    },
    image: {
        width: 75,
        height: 75,
    },
    selectedImage: {
        width: 90,
        height: 90,
    },
    arrow: {
        width: 35,
        height: 35
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    homeWorkView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 2 / 8
    },
    changeStationView: {
        flex: 1 / 8
    },
    trainTimes: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1 / 2
    },
    homeStationView: {
        height: Dimensions.get("window").height * 0.9,
        alignItems: "center",
        backgroundColor: "#FFF",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
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
        justifyContent: "center",
        zIndex: 10
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
    homeStationTextInput: {
        alignItems: "center",
        left: 6,
        fontFamily: "Merriweather-Bold",
        color: "#6F8FA9"
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
