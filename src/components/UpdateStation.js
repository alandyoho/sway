import React, { Component } from "react"
import { View, Image, Dimensions, StyleSheet, FlatList, Text, Animated, TextInput, TouchableWithoutFeedback, Keyboard, LayoutAnimation } from "react-native"
import ListItem from "./ListItem"
import data from "../views/data"



class UpdateWorkStation extends Component {
    constructor() {
        super()
        this.state = {
            stations: [],
            filteredStations: [],
            workStation: "",
        }
    }
    search = (text) => {
        const { stations } = this.state
        const filt = stations.filter(val => val["stop_name"].toLowerCase().includes(text.toLowerCase()))
        this.setState({ filteredStations: filt })
    }
    componentDidMount() {
        this.setState({ stations: data, filteredStations: data })
    }
    selectWorkStation = (station) => {
        if (this.props.stationToModify == "work") {
            this.props.storeWorkStation(station)
        } else if (this.props.stationToModify == "home") {
            this.props.storeHomeStation(station)
        }
    }
    renderItem = ({ item }) => {
        const { stationToModify, updateWorkStation, updateHomeStation } = this.props
        return (
            <View
                style={{
                    opacity: 1,
                    backgroundColor: 'transparent',
                }}
            >
                <ListItem
                    item={item}
                    key={item["stop_name"]}
                    isHidden={!this.state.expanded}
                    onPress={stationToModify == "work" ? updateWorkStation : updateHomeStation}
                />
            </View>
        );
    };
    render() {
        const { stationToModify } = this.props
        return (
            <TouchableWithoutFeedback accessible={false}>
                <View style={styles.container}>
                    <View style={styles.workStationTextInputContainer}>
                        <TextInput placeholderTextColor={"#6F8FA9"} placeholder={`What station do you take from ${stationToModify == "work" ? "work" : "home"}?`} style={styles.workStationTextInput} onTouchStart={this.expandElement} onChangeText={this.search} />
                        <Image source={require("../assets/searchIcon.png")} style={styles.searchIcon} />
                    </View>
                    <View style={[styles.workStationList, { height: this.state.filteredStations.length !== this.state.stations.length && this.state.filteredStations.length * 45 < 315 ? this.state.filteredStations.length * 45 - 1 : 314 }]}>
                        <FlatList
                            keyboardShouldPersistTaps={"handled"}
                            data={this.state.filteredStations}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default UpdateWorkStation







const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "column",
        alignItems: "center"
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
        top: 15,
        justifyContent: "center",
        zIndex: 10

    },
    workStationTextInput: {
        alignItems: "center",
        left: 6,
        fontFamily: "Merriweather-Bold",
        color: "#6F8FA9"
    },
    workStationList: {
        shadowColor: 'black',
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        borderRadius: 5,
        backgroundColor: "white",
        top: 16,
        width: Dimensions.get("window").width * .73,
    },

    searchIcon: {
        position: "absolute",
        height: 13,
        width: 13,
        right: 10,
    }
});
