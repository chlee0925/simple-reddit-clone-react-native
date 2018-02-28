import React from 'react';
import { TopicListScreen } from './topiclist.js';

import renderer from 'react-test-renderer';

it('renders TopicListScreen Component', () => {
    const screen = renderer.create(
        <TopicListScreen />
    );
    expect(screen.toJSON()).toMatchSnapshot();

    const instance = screen.getInstance();
    expect(instance.state.data.length).toEqual(3);
    expect(instance.state.data[0].key).toEqual(2);
    expect(instance.state.data[1].key).toEqual(3);
    expect(instance.state.data[2].key).toEqual(1);
});

it('test upvote', () => {
    const instance = renderer.create(
        <TopicListScreen />
    ).getInstance();

    expect(instance.state.data[1].key).toEqual(3);
    instance.upvote(1);
    expect(instance.state.data[1].key).toEqual(3);
    instance.upvote(1);
    expect(instance.state.data[1].key).toEqual(2);
    expect(instance.state.data[0]).toEqual(
        {
            downvote: 4,
            key: 3,
            topic: 'Best ways to bargain with sellers in Carousell',
            upvote: 3,
        }
    );
});

it('test downvote', () => {
    const instance = renderer.create(
        <TopicListScreen />
    ).getInstance();

    const before = instance.state.data[0].downvote;
    instance.downvote(0);
    expect(instance.state.data[0].downvote).toEqual(before + 1);
});

it('test createTopic', () => {
    const instance = renderer.create(
        <TopicListScreen />
    ).getInstance();

    instance.createTopic('test topic');
    expect(instance.state.data.length).toEqual(4);
    expect(instance.state.data[3]).toEqual(
        {
            downvote: 0,
            key: 4,
            topic: 'test topic',
            upvote: 0,
        }
    );
});