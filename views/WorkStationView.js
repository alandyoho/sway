import React, { Component } from "react"
import { View, Image, Dimensions, StyleSheet, FlatList, Text, Animated, TextInput, TouchableWithoutFeedback, Keyboard, LayoutAnimation } from "react-native"
import ListItem from "./ListItem"
import data from "./data"
export default class WorkStationView extends Component {
    constructor() {
        super()
        this.state = {
            workStation: "",
            expanded: false,
            workStationView: {
                flex: 1 / 2,
                alignItems: "center",
                backgroundColor: "#FFF"
            },
            workImageView: {
                flex: 1 / 2,
                backgroundColor: "#FFF"
            }
        }
    }
    expandElement = () => {
        LayoutAnimation.configureNext({
            duration: 1000,
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
            duration: 1000,
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
                flex: 1 / 2,
                alignItems: "center",
                backgroundColor: "#FFF"
            },
            workImageView: {
                flex: 1 / 2,
                backgroundColor: "#FFF"
            },
            expanded: false
        })
        Keyboard.dismiss()
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
                <ListItem
                    item={item}
                    isHidden={!this.state.expanded}
                    onPress={() => this.props.navigation.navigate("WorkStationView")}
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
                        <View style={{ top: 100, width: Dimensions.get('window').width * .83 }}>
                            {this.state.expanded && (<FlatList
                                data={data}
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
    imageContainer: {
        // flex: 5 / 10,
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
        position: 'relative',
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
