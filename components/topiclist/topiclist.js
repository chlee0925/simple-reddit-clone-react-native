import React from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { Topic } from '../topic/topic.js';
import buckets from 'buckets-js';

export const numOfTopTopics = 20; // Number of top topics to show

// Sample topic data to populate initially
let sampleData = [
    { key: 1, topic: 'I am looking for good restaurants in town', upvote: 0, downvote: 0 },
    { key: 2, topic: 'Help! I just dropped my phone into the pool.', upvote: 2, downvote: 1 },
    { key: 3, topic: 'Best ways to bargain with sellers in Carousell', upvote: 1, downvote: 2 },
];

/**
 * Compare function to rank topics. vote sum (upvote - downvote) is considered to rank topics in descending order.
 * @param {object} a Topic object 1 to compare
 * @param {object} b Topic object 2 to compare
 * @returns non-positive number if in order or positive number if out of order
 */
let voteCompareFn = function (a, b) { return (b.upvote - b.downvote) - (a.upvote - a.downvote); };

/**
 * Screen displaying current top topics.
 */
export class TopicListScreen extends React.Component {
    static navigationOptions = {
        title: 'Topics',
    };

    constructor(props) {
        super(props);
        sampleData.sort(voteCompareFn);

        let topTopics = sampleData.slice(0, numOfTopTopics);
        let otherTopics = new buckets.Heap(voteCompareFn);
        if (sampleData.length > numOfTopTopics) {
            sampleData.slice(numOfTopTopics).forEach((value) => otherTopics.add(value));
        };

        // populate with sample data
        this.state = {
            topTopics: topTopics,
            otherTopics: otherTopics, 
            newKey: (sampleData.length + 1)
        };
    }

    /**
     * callback function for 'Topic' component to invoke when user presses 'upvote' button.
     * @param {number} index index of current topic in the topTopics array.
     */
    upvote(index) {
        let topTopics = this.state.topTopics;
        topTopics[index].upvote += 1;
        topTopics.sort(voteCompareFn);
        this.setState({ topTopics: topTopics });
    }

    /**
     * callback function for 'Topic' component to invoke when user presses 'downvote' button.
     * @param {number} index index of current topic in the topTopics array.
     */
    downvote(index) {
        let topTopics = this.state.topTopics;
        let otherTopics = this.state.otherTopics;
        topTopics[index].downvote += 1;
        topTopics.sort(voteCompareFn);
        
        // If the number of votes of the last topic in 'topTopics' is less than the first topic in 'otherTopics', swap two topics.
        if (!otherTopics.isEmpty()) {
            let firstInOtherTopics = otherTopics.peek();
            if (voteCompareFn(topTopics[topTopics.length - 1], firstInOtherTopics) > 0) {
                firstInOtherTopics = otherTopics.removeRoot();
                otherTopics.add(topTopics[topTopics.length - 1]);
                topTopics[topTopics.length - 1] = firstInOtherTopics;
            }
        }

        this.setState({ topTopics: topTopics, otherTopics: otherTopics});
    }

    /**
     * callback function for 'CreateTopicScreen' to invoke to create a new topic.
     * @param {string} topic topic text user enters
     */
    createTopic(topic) {
        if (!topic) return;
        let topTopics = this.state.topTopics;
        let key = this.state.newKey;
        topTopics.push({ key: key, topic: topic, upvote: 0, downvote: 0 });
        key += 1;
        topTopics.sort(voteCompareFn);

        // If topTopics array 'overflows', move the last into 'otherTopics'
        if (topTopics.length > numOfTopTopics) {
            let otherTopics = this.state.otherTopics;
            otherTopics.add(topTopics.pop());
            this.setState({ topTopics: topTopics, newKey: key, otherTopics: otherTopics });    
        } else {
            this.setState({ topTopics: topTopics, newKey: key });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 5 }}>
                    <Button
                        title='+ Create a new topic'
                        onPress={() => this.props.navigation.navigate('CreateTopic', {
                            createTopic: this.createTopic.bind(this)
                        })}
                    />
                </View>
                <FlatList
                    data={this.state.topTopics}
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