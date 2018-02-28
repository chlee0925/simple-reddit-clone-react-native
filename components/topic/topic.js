import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export class Topic extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <Text style={style.topic}>Topic: {this.props.topic}</Text>
                <View style={style.propertyContainer}>
                    <Text>index: {this.props.index}</Text>
                    <Text>upvote: {this.props.upvote}</Text>
                    <Text>downvote: {this.props.downvote}</Text>
                </View>
                
                <View style={style.buttonContainer}>
                    <Button
                        title='Vote Up'
                        onPress={() => this.props.upvoteFn(this.props.index)}
                     /> 
                     <Button
                        title='Vote Down'
                        onPress={() => this.props.downvoteFn(this.props.index)}
                     />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3b5bc',
        marginBottom: 3,
    },
    topic: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    propertyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
