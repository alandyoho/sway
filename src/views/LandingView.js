import React, { Component } from "react"
import { View, Image, Dimensions, StyleSheet, FlatList, Button, Text, Animated, TextInput, TouchableWithoutFeedback, Keyboard, LayoutAnimation, TouchableOpacity } from "react-native"
import TrainTimesItem from "../components/TrainTimesItem"
import SlidingUpPanel from 'rn-sliding-up-panel';
import data from "./data"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addStations, storeWorkStation } from "../actions"
import { functions } from "../firebase/firebase"


class LandingView extends Component {
    constructor() {
        super()
        this.state = {
            station: [],
            workStation: "Van Cortlandt Park - 242 St",
            homeStation: "Van Cortlandt Park - 242 St",
            left: false,
            settingsViewVisible: false,
            homeInputSelected: false,
            workInputSelected: false,
            trainTimes: ""
        }
    }
    async componentDidMount() {
        this.setState({ workStation: this.props.workStation["stop_name"], homeStation: this.props.homeStation["stop_name"] })
        const stopId = this.props.workStation["stop_id"]
        const { data } = await functions.httpsCallable("fetchStationTimes")({ stopId: stopId })
        const trainTimes = data.schedule[stopId]["N"]
        console.log("here are the station times", trainTimes)
        this.setState({ trainTimes: trainTimes })
        // console.log("here are the stations", this.props.homeStation, this.props.workStation)
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
                    <TouchableOpacity onPress={() => this.setState({ left: true })} style={styles.homeWorkViewContents}>
                        <Image source={this.state.left ? require("../assets/selectedHomeIcon.png") : require("../assets/homeIcon.png")} style={styles.image} />
                        <Text style={{ fontFamily: !this.state.left ? "Merriweather" : "Merriweather-Bold", color: "#6F8FA9", textAlign: "center", textDecorationLine: this.state.left ? "underline" : "none" }}>{this.state.homeStation}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ left: !this.state.left })} style={styles.frame}>
                        <Image source={this.state.left ? require("../assets/arrowLeft.png") : require("../assets/arrow.png")} style={styles.arrow} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ left: false })} style={styles.homeWorkViewContents}>
                        <Image source={this.state.left ? require("../assets/workIcon.png") : require("../assets/selectedWorkIcon.png")} style={styles.image} />
                        <Text style={{ fontFamily: this.state.left ? "Merriweather" : "Merriweather-Bold", color: "#6F8FA9", textAlign: "center", textDecorationLine: !this.state.left ? "underline" : "none" }}>{this.state.workStation}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.changeStationView}>
                </View>
                <View style={styles.trainTimes}>
                    <FlatList
                        data={this.state.trainTimes}
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


const mapStateToProps = (state) => {
    const { stations, homeStation, workStation } = state
    return { stations, homeStation, workStation }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addStations,
        storeWorkStation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LandingView);







const styles = StyleSheet.create({
    homeWorkViewContents: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
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
        alignItems: "center",
        flex: 2 / 8,
        justifyContent: "space-evenly",
        padding: 15
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
