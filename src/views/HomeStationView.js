import React, { Component } from "react"
import { View, Content, Image, Dimensions, StyleSheet, FlatList, Text, Animated, TextInput, TouchableWithoutFeedback, Keyboard, LayoutAnimation } from "react-native"
import ListItem from "../components/ListItem"
import { functions } from "../firebase/firebase"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addStations, storeHomeStation } from "../actions"
import data from "./data"

class HomeStationView extends Component {
    constructor() {
        super()
        this.state = {
            stations: [],
            filteredStations: [],
            homeStation: "",
            expanded: false,
            homeStationView: {
                flex: 9 / 20,
                alignItems: "center",
                backgroundColor: "#FFF"
            },
            homeImageView: {
                flex: 11 / 20,
                backgroundColor: "#FFF"
            }
        }
    }

    search = (text) => {
        const { stations } = this.state
        const filt = stations.filter(val => val["stop_name"].toLowerCase().includes(text.toLowerCase()))
        this.setState({ filteredStations: filt })
    }

    async componentDidMount() {
        this.setState({ stations: data, filteredStations: data })
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
            homeStationView: {
                flex: 1,
                alignItems: "center",
                backgroundColor: "#FFF"
            },
            homeImageView: {
                flex: 0
            },
            expanded: true
        })
    }
    selectHomeStation = (station) => {
        this.props.storeHomeStation(station)
        this.props.navigation.navigate("WorkStationView")

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
            homeStationView: {
                flex: 9 / 20,
                alignItems: "center",
                backgroundColor: "#FFF"
            },
            homeImageView: {
                flex: 11 / 20,
                backgroundColor: "#FFF"
            },
            expanded: false
        })
        Keyboard.dismiss()
    }
    renderItem = ({ item }) => {
        const { expanded } = this.state
        return (
            <View
                style={{
                    opacity: 1,
                    backgroundColor: 'transparent',
                    borderRadius: 5
                }}
            >
                <ListItem
                    item={item}
                    isHidden={!expanded}
                    onPress={this.selectHomeStation}
                />
            </View>
        );
    };
    render() {
        const { filteredStations, homeStationView, expanded } = this.state
        return (
            <TouchableWithoutFeedback onPress={this.contractElement} accessible={false}>
                <View style={styles.container}>
                    <View style={this.state.homeImageView}>
                        <Image resizeMode={"cover"} source={require("../assets/home.png")} style={styles.image} />
                    </View>
                    <View style={homeStationView}>
                        <View style={styles.homeStationTextInputContainer}>
                            <TextInput placeholderTextColor={"#6F8FA9"} placeholder={"What station do you take from home?"} style={styles.homeStationTextInput} onTouchStart={this.expandElement} onChangeText={(text) => this.search(text)} />
                            <Image source={require("../assets/searchIcon.png")} style={styles.searchIcon} />
                        </View>
                        {expanded && <View style={[styles.homeStationList, { height: this.state.filteredStations.length !== this.state.stations.length && this.state.filteredStations.length * 45 < 315 ? this.state.filteredStations.length * 45 - 1 : 314 }]}>
                            <FlatList
                                keyboardShouldPersistTaps={"handled"}
                                showsVerticalScrollIndicator={true}
                                data={filteredStations}
                                renderItem={this.renderItem}
                            />
                        </View>}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}


const mapStateToProps = (state) => {
    const { stations, homeStation } = state
    return { stations, homeStation }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addStations,
        storeHomeStation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeStationView);







const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    image: {
        flex: 1,
        width: Dimensions.get('window').width
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
    homeStationList: {
        shadowColor: 'black',
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        borderRadius: 5,
        backgroundColor: "white",
        top: 95,
        width: Dimensions.get("window").width * .73,
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
