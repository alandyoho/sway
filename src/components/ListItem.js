import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScaleAndOpacity } from 'react-native-motion';
import { CollapsibleCard } from 'react-native-btr';


class ListItem extends Component {
    onPressed = (item) => {
        this.props.onPress(item)
    }
    render() {
        const { item, isSelected, style, isHidden, animateOnDidMount } = this.props;
        const { name, isReceived, ...rest } = item;
        return (
            <ScaleAndOpacity isHidden={isHidden} animateOnDidMount={animateOnDidMount}>
                <TouchableWithoutFeedback >
                    <CollapsibleCard
                        visibleByDefault={false}
                        style={styles.container}
                        title={item["stop_name"]}
                        titleStyle={{ fontFamily: "Roboto", color: "#6F8FA9", fontSize: 15 }}
                    >
                        <View style={styles.subContainer}>
                            {item["stop_trains"].map(train => {
                                var uri;
                                if (train["train_name"] === "1") uri = require("../assets/1.png")
                                if (train["train_name"] === "2") uri = require("../assets/2.png")
                                if (train["train_name"] === "3") uri = require("../assets/3.png")
                                return (
                                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }} onPress={() => this.onPressed(train)}>
                                        <Image source={uri} style={{ width: 20, height: 20 }} />
                                        <Text style={{ fontFamily: "Roboto", color: "#6F8FA9", fontSize: 15 }}> → </Text>
                                        <Text style={{ fontFamily: "Roboto", color: "#6F8FA9", fontSize: 15 }}>{train["train_direction"]}</Text>
                                    </TouchableOpacity>
                                )

                            })}
                        </View>
                    </CollapsibleCard>
                    {/* </View> */}


                    {/* <CollapsibleCard /> */}
                </TouchableWithoutFeedback>
            </ScaleAndOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 0,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: "black",
        borderBottomWidth: 0.5,
        zIndex: 5
    },
    subContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 0,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: "black",
        borderBottomWidth: 0.5,
        zIndex: 5
    }
});

export default ListItem;
