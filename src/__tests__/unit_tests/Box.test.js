import React from 'react'
import { shallow } from 'enzyme';
import {
  Div
} from '@cbryant24/styled-react';
import 'jest-styled-components';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
// import { updateComponent } from '../utils';

let component;

async function updateComponent(component, amount = 0) {
	await act(async () => {
		await wait(amount);
		component.update();
	});
}

describe('styled-box', () => {
  beforeEach(async () => {
    component = shallow(
      <Div width="75%"></Div>
    )

    await updateComponent(component);
  });
  it('has a div with margin 50%', () => {
    expect(component).toMatchSnapshot()
    expect(component).toHaveStyleRule('width', '75%')
  })
});