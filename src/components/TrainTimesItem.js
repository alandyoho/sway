import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ScaleAndOpacity } from 'react-native-motion';
import dateFormat from "dateformat"


class TrainTimesItem extends Component {
    render() {
        const { item, isSelected, style, isHidden, animateOnDidMount } = this.props;
        const { name, isReceived, ...rest } = item;
        return (
            <ScaleAndOpacity isHidden={isHidden} animateOnDidMount={animateOnDidMount}>
                <TouchableWithoutFeedback >
                    <View style={[styles.container, style]} pointerEvents="box-only">
                        <Text style={[{ fontFamily: 'Roboto-Black', color: "#0e5a77", fontSize: 15 }, item.key === "1" && { color: "#FFF" }]}>{new Date(item['arrivalTime'] * 1000).toLocaleTimeString("en-US")}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScaleAndOpacity >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 75,
        marginVertical: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },
});

export default TrainTimesItem;
