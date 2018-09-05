import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ScaleAndOpacity } from 'react-native-motion';

class TrainTimesItem extends Component {
    render() {
        const { item, isSelected, style, isHidden, animateOnDidMount } = this.props;
        const { name, isReceived, ...rest } = item;
        return (
            <ScaleAndOpacity isHidden={isHidden} animateOnDidMount={animateOnDidMount}>
                <TouchableWithoutFeedback >
                    <View style={[styles.container, style]} pointerEvents="box-only">
                        <Text style={[{ fontFamily: 'Roboto', color: "#0e5a77", fontSize: 40 }, item.key === "1" && { color: "#FFF" }]}>{item.stationName}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScaleAndOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 60,
        marginVertical: 4,
        paddingVertical: 8,
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
