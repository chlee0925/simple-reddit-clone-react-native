import React from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { Topic } from '../topic/topic.js';

let sampleData = [
    {key: 1, topic: 'topic1', upvote: 1, downvote: 0},
    {key: 2, topic: 'topic2', upvote: 3, downvote: 1},
    {key: 3, topic: 'topic3', upvote: 2, downvote: 4},
];

export class TopicListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: sampleData, newKey: 4}; // populate with sample data
    }

    upvote(index) {
        let data = this.state.data;
        data[index].upvote += 1;
        this.setState({data: data});
    }

    downvote(index) {
        let data = this.state.data;
        data[index].downvote += 1;
        this.setState({data: data});
    }

    createTopic(topic) {
        if (!topic) return;
        let data = this.state.data;
        let key = this.state.newKey;
        data.push({key: key, topic: topic, upvote: 0, downvote: 0});
        this.setState({data: data, newKey: ++key})
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{marginBottom: 10}}>
                    <Button
                        title='+ Create a new topic'
                        onPress={() => this.props.navigation.navigate('CreateTopic', {
                            createTopic: this.createTopic.bind(this)
                        })}
                    />
                 </View>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={({ item, index }) => 
                        <Topic 
                            index={index}
                            topic={item.topic}
                            upvote={item.upvote}
                            downvote={item.downvote}
                            upvoteFn={this.upvote.bind(this)}
                            downvoteFn={this.downvote.bind(this)}
                        />
                    }
                 />
            </View>
        )
    }
}