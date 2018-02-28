import React from 'react';
import { CreateTopicScreen } from './createtopic.js';

import renderer from 'react-test-renderer';

it('renders CreateTopicScreen Component', () => {
    const mockNavigation = {
        state: {
            params: {
                createTopic: jest.fn()
            }
        },
        goBack: jest.fn()
    }
    const screen = renderer.create(<CreateTopicScreen navigation={mockNavigation} />).toJSON();
    expect(screen).toMatchSnapshot();
});