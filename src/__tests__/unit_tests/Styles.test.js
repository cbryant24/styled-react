import React from 'react'
import { shallow, mount } from 'enzyme';
import {
  Div
} from '@cbryant24/styled-react';
import 'jest-styled-components';
import { before } from 'lodash';
import { updateComponent } from '../utils'


let component;


describe('applied styles', () => {

  it('has a div with margin 50%', () => {
    component = shallow( <Div width="75%"/>);
    
    expect(component).toMatchSnapshot();
    expect(component).toHaveStyleRule('width', '75%');
  });

  it('properly displays camelcase css', () => {
    component = shallow( <Div backgroundColor="red"/>);
    expect(component).toMatchSnapshot();
    expect(component).toHaveStyleRule('background-color', 'red');
  });

  it('properly displays destructed object styles', () => {
    const styles = {clipPath: "circle(40%)", height: '200px'};
    component = shallow(<Div {...styles}/>);
    expect(component).toMatchSnapshot();
    expect(component).toHaveStyleRule('clip-path', 'circle(40%)');
    expect(component).toHaveStyleRule('height', '200px');
  });

  describe('pseudo', () => {
    beforeEach(() => {
      component = shallow(
       <Div
        pseudo
        hover={{ 
          fontSize: '2.4rem', 
          height: '200px', 
          width: '300px',
          color: 'blue'
        }}
        transition="font-size 4s linear, height 2s linear, width 3s linear"
       />
      );
    });

    it('has hover styles', () => {
      expect(component).toMatchSnapshot();
      expect(component).toHaveStyleRule('font-size', '2.4rem', {
        modifier: ':hover'
      });
      expect(component).toHaveStyleRule('height', '200px', {
        modifier: ':hover'
      });
      expect(component).toHaveStyleRule('width', '300px', {
        modifier: ':hover'
      });
      expect(component).toHaveStyleRule('transition', 'font-size 4s linear,height 2s linear,width 3s linear');
    });
  });

  describe('animation', () => {
    beforeEach(async () => {
      component = mount(
        <Div
          animation={{
            in: {
              from: { opacity: 0 },
              to: { opacity: 1 }
            },
            duration_in: 3
          }}
        />
      );

      await updateComponent(component, 10);
    });

    it('has all animation css rules', () => {
      expect(component).toMatchSnapshot();
      expect(component).toHaveStyleRule('animation-name', expect.any(String));
      expect(component).toHaveStyleRule('animation-play-state', 'running');
      expect(component).toHaveStyleRule('animation-duration', '3s');
    })
  })
});