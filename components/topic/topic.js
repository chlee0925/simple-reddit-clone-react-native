import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class Topic extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <Text style={style.topic}>Topic: {this.props.topic}</Text>
                <Text>  index: {this.props.index}</Text>
                <Text>  upvote: {this.props.upvote}</Text>
                <Text>  downvote: {this.props.downvote}</Text>
                <Text>  vote sum: {this.props.upvote - this.props.downvote}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e3b5bc",
        marginBottom: 3,
    },
    topic: {
        fontWeight: "bold",
    }
});
