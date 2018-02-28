import React from 'react';
import { TopicListScreen } from './topiclist.js';

import renderer from 'react-test-renderer';

it('renders TopicListScreen Component', () => {
    const screen = renderer.create(
        <TopicListScreen />
    ).toJSON();
    expect(screen).toMatchSnapshot();
});