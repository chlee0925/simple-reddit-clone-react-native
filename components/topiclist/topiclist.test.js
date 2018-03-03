import React from 'react';
import { TopicListScreen, numOfTopTopics } from './topiclist.js';

import renderer from 'react-test-renderer';

it('renders TopicListScreen Component', () => {
    const screen = renderer.create(
        <TopicListScreen />
    );
    expect(screen.toJSON()).toMatchSnapshot();

    const instance = screen.getInstance();
    expect(instance.state.topTopics.length).toEqual(3);
    expect(instance.state.topTopics[0].key).toEqual(2);
    expect(instance.state.topTopics[1].key).toEqual(1);
    expect(instance.state.topTopics[2].key).toEqual(3);
});

it('test upvote', () => {
    const screen = renderer.create(
        <TopicListScreen />
    );
    const instance = screen.getInstance();

    for (i = 0; i < 2; i++) {
        instance.upvote(1);
        expect(screen.toJSON()).toMatchSnapshot();
    }
});

it('test downvote', () => {
    const screen = renderer.create(
        <TopicListScreen />
    );
    const instance = screen.getInstance();

    for (i = 0; i < 3; i++) {
        instance.downvote(1);
        expect(screen.toJSON()).toMatchSnapshot();
    }
});

it('test createTopic', () => {
    const screen = renderer.create(
        <TopicListScreen />
    );
    const instance = screen.getInstance();

    for (i = 0; i < (numOfTopTopics + 1); i++) {
        instance.createTopic('test topic');
        expect(screen.toJSON()).toMatchSnapshot();
    }
});