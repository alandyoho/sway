import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ScaleAndOpacity } from 'react-native-motion';


class ListItem extends Component {
    onPressed = () => {
        this.props.onPress(this.props.item)
    }
    render() {
        const { item, isSelected, style, isHidden, animateOnDidMount } = this.props;
        const { name, isReceived, ...rest } = item;
        return (
            <ScaleAndOpacity isHidden={isHidden} animateOnDidMount={animateOnDidMount}>
                <TouchableWithoutFeedback onPress={this.onPressed}>
                    <View style={[styles.container, style]} pointerEvents="box-only">
                        <Text style={{ fontFamily: 'Roboto', color: "#6F8FA9", fontSize: 15 }}>{item["stop_name"]}</Text>
                    </View>
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
});

export default ListItem;
