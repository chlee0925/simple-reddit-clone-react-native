import React from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { Topic } from '../topic/topic.js';

const numOfTopTopics = 20; // Number of top topics to show

// Sample topic data to populate initially
let sampleData = [
    { key: 1, topic: 'I am looking for good restaurants in town', upvote: 0, downvote: 0 },
    { key: 2, topic: 'Help! I just dropped my phone into the pool.', upvote: 2, downvote: 1 },
    { key: 3, topic: 'Best ways to bargain with sellers in Carousell', upvote: 1, downvote: 4 },
];
/**
 * Compare function to rank topics. Only 'upvote' property is considered as per requirements. 
 * Ranked in descending order.
 * @param {object} a Topic object 1 to compare
 * @param {object} b Topic object 2 to compare
 * @returns non-positive number if in order or positive number if out of order
 */
let upvoteCompareFn = function (a, b) { return b.upvote - a.upvote; };

/**
 * Screen displaying current top topics.
 */
export class TopicListScreen extends React.Component {
    constructor(props) {
        super(props);
        sampleData.sort(upvoteCompareFn);
        this.state = { 
            data: sampleData, 
            newKey: (sampleData.length + 1)
        }; // populate with sample data
    }

    /**
     * callback function for 'Topic' component to invoke when user presses 'upvote' button.
     * @param {number} index index of current topic in the data array.
     */
    upvote(index) {
        let data = this.state.data;
        data[index].upvote += 1;
        this._bubbleUpTopic(data, index);
        this.setState({ data: data });
    }

    /**
     * bubble up the topic in ranked data array. When a topic's upvote increases, this function
     * should be invoked to ensure the correct rank order of topics.
     * @param {object} data data array that holds topics
     * @param {number} index index of topic whose upvote has increased.
     */
    _bubbleUpTopic(data, index) {
        for (i = index; i > 0 && (upvoteCompareFn(data[i - 1], data[i]) > 0); i--) {                
            let temp = data[i - 1];
            data[i - 1] = data[i];
            data[i] = temp;
        }
    }

    /**
     * callback function for 'Topic' component to invoke when user presses 'downvote' button.
     * @param {number} index index of current topic in the data array.
     */
    downvote(index) {
        let data = this.state.data;
        data[index].downvote += 1;
        this.setState({ data: data });
    }

    /**
     * callback function for 'CreateTopicScreen' to invoke to create a new topic. New topic is appended
     * to the data array that holds topics.
     * @param {string} topic topic text user enters
     */
    createTopic(topic) {
        if (!topic) return;
        let data = this.state.data;
        let key = this.state.newKey;
        data.push({ key: key, topic: topic, upvote: 0, downvote: 0 });
        this.setState({ data: data, newKey: ++key })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 10 }}>
                    <Button
                        title='+ Create a new topic'
                        onPress={() => this.props.navigation.navigate('CreateTopic', {
                            createTopic: this.createTopic.bind(this)
                        })}
                    />
                </View>
                <FlatList
                    data={this.state.data.slice(0, numOfTopTopics)}
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