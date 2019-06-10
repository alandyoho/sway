import React, { Component } from "react"
import { View, Image, Dimensions, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native"
import TrainTimesItem from "../components/TrainTimesItem"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeWorkStation, storeHomeStation } from "../actions"
import { functions } from "../firebase/firebase"
import Dialog, { DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import UpdateStation from "../components/UpdateStation"
import { FloatingAction } from 'react-native-floating-action';

const actions = [
    {
        text: 'Update Work Station',
        name: 'work',
        position: 1,
        color: "#FFF",
        textColor: "#6F8FA9",
        icon: require("../assets/selectedWorkIcon.png")
    },
    {
        text: 'Update Home Station',
        name: 'home',
        position: 2,
        color: "#FFF",
        textColor: "#6F8FA9",
        icon: require("../assets/selectedHomeIcon.png")
    }];

class LandingView extends Component {
    constructor() {
        super()
        this.state = {
            workStation: "Work Station",
            homeStation: "Home Station",
            left: false,
            trainTimes: "",
            updateStationDialogVisible: false,
            stationToModify: ""
        }
    }
    async componentDidMount() {
        await this.fetchData()
    }
    updateHomeStation = async (station) => {
        this.props.storeHomeStation(station)
        await this.fetchData()
        this.setState({ updateStationDialogVisible: false })
    }
    updateWorkStation = async (station) => {
        this.props.storeWorkStation(station)
        await this.fetchData()
        this.setState({ updateStationDialogVisible: false })
    }
    renderItem = ({ item }) => {
        const opacityOfSelectedItem = 1
        return (
            <View
                style={{
                    opacity: opacityOfSelectedItem,
                    backgroundColor: 'transparent',
                }}
            >
                <TrainTimesItem
                    item={item}
                    onPress={this.selectHomeStation}
                    style={item.key === "1" && { backgroundColor: "#0e5a77" }}
                />
            </View>
        );
    };
    fetchData = async () => {
        this.setState({ workStation: this.props.workStation.train_station, homeStation: this.props.homeStation.train_station })
        const homeOrWork = this.state.left ? this.props.workStation : this.props.homeStation
        const trainCode = homeOrWork["train_id"].slice(0, -1)
        const direction = homeOrWork["train_id"].slice(-1)
        const { data } = await functions.httpsCallable("fetchStationTimes")({ stopId: trainCode })
        const trainTimes = data["schedule"][trainCode][direction]
        trainTimes[0].key = "1"
        trainTimes.length = Math.min(trainTimes.length, 4)
        this.setState({ trainTimes: trainTimes })
    }
    trainTimesSwitch = async () => {
        this.setState({ left: !this.state.left })
        await this.fetchData()
    }

    render() {
        const { left, homeStation, workStation, trainTimes, updateStationDialogVisible, stationToModify } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.settingsView}>
                </View>
                <View style={styles.homeWorkView}>
                    <TouchableOpacity onPress={this.trainTimesSwitch} style={styles.homeWorkViewContents}>
                        <Image source={left ? require("../assets/selectedHomeIcon.png") : require("../assets/homeIcon.png")} style={styles.image} />
                        <Text style={{ fontFamily: !left ? "Merriweather" : "Merriweather-Bold", color: "#6F8FA9", textAlign: "center", textDecorationLine: left ? "underline" : "none" }}>{homeStation}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.trainTimesSwitch} style={styles.frame}>
                        <Image source={left ? require("../assets/arrowLeft.png") : require("../assets/arrow.png")} style={styles.arrow} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.trainTimesSwitch} style={styles.homeWorkViewContents}>
                        <Image source={left ? require("../assets/workIcon.png") : require("../assets/selectedWorkIcon.png")} style={styles.image} />
                        <Text style={{ fontFamily: left ? "Merriweather" : "Merriweather-Bold", color: "#6F8FA9", textAlign: "center", textDecorationLine: !left ? "underline" : "none" }}>{workStation}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.changeStationView}>
                </View>
                <View style={styles.trainTimes}>
                    <FlatList
                        data={trainTimes}
                        renderItem={this.renderItem}
                        scrollEnabled={false}
                    />
                </View>
                <FloatingAction
                    actions={actions}
                    position={"left"}
                    color={"transparent"}
                    floatingIcon={require("../assets/settingsGearIcon.png")}
                    iconWidth={45}
                    iconHeight={45}
                    onPressItem={
                        (name) => {
                            this.setState({ stationToModify: name, updateStationDialogVisible: true });
                        }
                    }
                />
                <Dialog
                    visible={updateStationDialogVisible}
                    dialogStyle={{ backgroundColor: "transparent" }}
                    onTouchOutside={() => {
                        this.setState({ updateStationDialogVisible: false });
                    }}
                    dialogAnimation={new ScaleAnimation({})}
                    width={0.9}
                    height={0.60}
                >
                    <DialogContent style={{ flex: 1, backgroundColor: "transparent", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
                        <UpdateStation stationToModify={stationToModify} updateHomeStation={this.updateHomeStation} updateWorkStation={this.updateWorkStation} closeDialog={() => this.setState({ updateStationDialogVisible: false })} />
                    </DialogContent>
                </Dialog>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    const { homeStation, workStation } = state
    return { homeStation, workStation }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        storeWorkStation,
        storeHomeStation
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
        flex: 1 / 8,
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
