import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard } from 'react-native';

/**
 * Screen where user can create new topic
 */
export class CreateTopicScreen extends React.Component {
    static navigationOptions = {
        title: 'Create a new topic',
    };

    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text style={style.header}>Write your own topic!</Text>
                <TextInput style={style.textInput}
                    placeholder='Type your new topic'
                    onChangeText={(text) => this.setState({text})}
                />
                <Button title='Create Topic' onPress={() => {
                    Keyboard.dismiss();
                    params.createTopic(this.state.text);
                    this.props.navigation.goBack();
                }} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        height: 100,
        margin: 10
    }
});
