import React, { Component } from "react"
import { View, Image, Dimensions, StyleSheet, FlatList, Button, Text, Animated, TextInput, TouchableWithoutFeedback, Keyboard, LayoutAnimation, TouchableOpacity } from "react-native"
import TrainTimesItem from "../components/TrainTimesItem"
import SlidingUpPanel from 'rn-sliding-up-panel';

export default class LandingView extends Component {
    constructor() {
        super()
        this.state = {
            workStation: "",
            homeStation: "",
            left: false,
            settingsViewVisible: false
        }
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
                    isHidden={!this.state.expanded}
                    onPress={this.selectHomeStation}
                    style={item.key === "1" && { backgroundColor: "#0e5a77" }}
                />
            </View>
        );
    };
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
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ left: !this.state.left })} style={styles.frame}>
                        <Image source={this.state.left ? require("../assets/arrowLeft.png") : require("../assets/arrow.png")} style={styles.arrow} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ left: false })}>
                        <Image source={this.state.left ? require("../assets/workIcon.png") : require("../assets/selectedWorkIcon.png")} style={styles.image} />
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
                    <View style={{ backgroundColor: "#FFF", height: Dimensions.get("window").height * 0.9, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                        <Button title='Hide' onPress={() => this.setState({ settingsViewVisible: false })} />
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
    }
});
