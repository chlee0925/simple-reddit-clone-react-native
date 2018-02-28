import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Topic } from '../topic/topic.js';

let sampleData = [
    {key: 1, topic: "topic1", upvote: 1, downvote: 0},
    {key: 2, topic: "topic2", upvote: 3, downvote: 1},
    {key: 3, topic: "topic3", upvote: 2, downvote: 4},
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

    render() {
        return (
            <View style={{ flex: 1 }}>
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