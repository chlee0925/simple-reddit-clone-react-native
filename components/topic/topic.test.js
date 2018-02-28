import React from 'react';
import { Topic } from './topic.js';

import renderer from 'react-test-renderer';

it('renders Topic Component', () => {
    const mockTopicProps = {
        index: 1,
        item: {
            topic: 'test topic',
            upvote: 1,
            downvote: 2,
            upvoteFn: jest.fn(),
            downvoteFn: jest.fn()
        }
    }
    const screen = renderer.create(
        <Topic
            index={mockTopicProps.index}
            topic={mockTopicProps.item.topic}
            upvote={mockTopicProps.item.upvote}
            downvote={mockTopicProps.item.downvote}
            upvoteFn={mockTopicProps.item.upvoteFn}
            downvoteFn={mockTopicProps.item.downvoteFn}
        />
    ).toJSON();
    expect(screen).toMatchSnapshot();
});