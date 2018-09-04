import React, { PureComponent } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ScaleAndOpacity } from 'react-native-motion';


class ListItem extends PureComponent {
    onPressed = () => {
        this.props.onPress()
    };
    render() {
        const { item, isSelected, style, isHidden, animateOnDidMount } = this.props;
        const { name, isReceived, ...rest } = item;
        return (
            <ScaleAndOpacity
                isHidden={isHidden}
                animateOnDidMount={animateOnDidMount}
            >
                <TouchableWithoutFeedback onPress={this.onPressed}>
                    <View style={[styles.container, style]} pointerEvents="box-only">
                        <Text style={{ fontFamily: 'Roboto', color: "#6F8FA9" }}>{item.stationName}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScaleAndOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,

        shadowColor: 'black',
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,

    },
});

export default ListItem;
