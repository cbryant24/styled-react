import React from 'react'
import { shallow, mount } from 'enzyme';
import {
  Div
} from '@cbryant24/styled-react';
import { updateComponent } from '../utils';

let component;

// TODO: ADD ALIAS's FOR CONTINUOUS ANIMATION FOR MISSPELLING
describe('applied styles', () => {

  it('has a div with margin 75%', () => {
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

  describe('animations', () => {

    it('displays animation using the "in" type', async () => {
      component = mount(
        <Div
          animation={{
            in: {
              from: { opacity: 0 },
              to: { opacity: 1 }
            },
            duration_in: 3,
            iteration: 2
          }}
        />
      );

      await updateComponent(component, 10);
      expect(component).toMatchSnapshot();
      expect(component).toHaveStyleRule('animation-name', expect.any(String));
      expect(component).toHaveStyleRule('animation-play-state', 'running');
      expect(component).toHaveStyleRule('animation-duration', '3s');
      expect(component).toHaveStyleRule('animation-iteration-count', '2');
    });

    it('displays animation using the "out" type', async () => {
      component = mount(
        <Div
          animation={{
            out: {
              from: { opacity: 0 },
              to: { opacity: 1 }
            },
            duration_out: 4,
            iteration: 5
          }}
        />
      );

      await updateComponent(component, 1000);
      expect(component).toMatchSnapshot();
      expect(component).toHaveStyleRule('animation-name', expect.any(String));
      expect(component).toHaveStyleRule('animation-play-state', 'running');
      expect(component).toHaveStyleRule('animation-duration', '4s');
      expect(component).toHaveStyleRule('animation-iteration-count', '5');
    });

    it('displays animation using the "continuous" type', async () => {
      component = mount(
        <Div
          animation={{
            continuous: {
              from: { opacity: 0 },
              to: { opacity: 1 }
            },
            duration_continuous: 4
          }}
        />
      );

      await updateComponent(component, 10);
      expect(component).toMatchSnapshot();
      expect(component).toHaveStyleRule('animation-name', expect.any(String));
      expect(component).toHaveStyleRule('animation-play-state', 'running');
      expect(component).toHaveStyleRule('animation-duration', '4s');
      expect(component).toHaveStyleRule('animation-iteration-count', 'infinite');
    });

    it('has seperate animations when using the "delay_between" with "in" and "out" animations', async () => {
      component = mount(
        <Div
          animation={{
            in: {
              from: { opacity: 0 },
              to: { opacity: 1 }
            },
            delay_between: 4,
            out: {
              from: { 'background-color': 'red' },
              to: { 'background-color': 'yellow' }
            },
            duration_out: 1,
            duration_in: 2,
            animation_fill_mode: 'forwards'
          }}
        />

      );
      await updateComponent(component, 10);

      expect(component).toMatchSnapshot();
      expect(component).toHaveStyleRule('animation-name', expect.any(String));
      expect(component).toHaveStyleRule('animation-play-state', 'running');
      expect(component).toHaveStyleRule('animation-duration', '2s');
      expect(component).toHaveStyleRule('animation-fill-mode', 'forwards');

      // ADD UPDATE AND CHECK FOR A SNAPSHOT TO NOT MATCH THE PREVIOUS SNAPSHOT
      await updateComponent(component, 2000);

      // expect(component).toNotMatchSnapshot();
      expect(component).toHaveStyleRule('animation-name', expect.any(String));
      expect(component).toHaveStyleRule('animation-duration', '2s');

    });

    describe('errors', () => {
      // USED TO SUPPRESS CONSOLE ERRORS WHEN TESTING ERRORS AS A RESULT OF REACT 16 UNTIL JEST/ENZYME FIX
      // https://stackoverflow.com/questions/44467657/jest-better-way-to-disable-console-inside-unit-tests
      beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
      });

      it('throws an error when no duration_in property for "in" animation', () => {
        // SEE SO FOR DEALING WITH REACT 16 THROWING ERRORS FOR SYNTAX BELOW
        // https://stackoverflow.com/questions/49420305/how-to-get-coverage-for-jest-tothrow-without-failing-test
        expect(() => mount(
          <Div
            animation={{
              in: {
                from: { opacity: 0 },
                to: { opacity: 1 },
              }
            }}
          />
        )).toThrowError('If you have an in animation you need to specify a duration for that animation see https://github.com/cbryant24/chapivia/');
      });

      it('throws an error when duration_in property for "in" animation is not an integer', () => {
        // SEE SO FOR DEALING WITH REACT 16 THROWING ERRORS FOR SYNTAX BELOW
        // https://stackoverflow.com/questions/49420305/how-to-get-coverage-for-jest-tothrow-without-failing-test
        expect(() => mount(
          <Div
            animation={{
              in: {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
              duration_in: 'Hello'
            }}
          />
        )).toThrowError('Hello is not a valid duration in for an animation should be an integer 0 or greater');
      });

      it('throws an error when no duration_out property for "out" animation', () => {
        // SEE SO FOR DEALING WITH REACT 16 THROWING ERRORS FOR SYNTAX BELOW
        // https://stackoverflow.com/questions/49420305/how-to-get-coverage-for-jest-tothrow-without-failing-test
        expect(() => mount(
          <Div
            animation={{
              out: {
                from: { opacity: 1 },
                to: { opacity: 0 },
              }
            }}
          />
        )).toThrowError('If you have an out animation you need to specify a duration for that animation see https://github.com/cbryant24/chapivia/');
      });

      it('throws an error when duration_out property for "out" animation is not an integer', () => {
        // SEE SO FOR DEALING WITH REACT 16 THROWING ERRORS FOR SYNTAX BELOW
        // https://stackoverflow.com/questions/49420305/how-to-get-coverage-for-jest-tothrow-without-failing-test
        expect(() => mount(
          <Div
            animation={{
              out: {
                from: { opacity: 1 },
                to: { opacity: 0 },
              },
              duration_out: 'world'
            }}
          />
        )).toThrowError('world is not a valid duration out for an animation should be an integer 0 or greater');
      });

      it('throws an error when no duration_continuous property for "continuous" animation', () => {
        // SEE SO FOR DEALING WITH REACT 16 THROWING ERRORS FOR SYNTAX BELOW
        // https://stackoverflow.com/questions/49420305/how-to-get-coverage-for-jest-tothrow-without-failing-test
        expect(() => mount(
          <Div
            animation={{
              continuous: {
                from: { opacity: 1 },
                to: { opacity: 0 },
              }
            }}
          />
        )).toThrowError('If you have a continous animation and you must specify a duration_continuous see https://github.com/cbryant24/chapivia/');
      });

      it('throws an error when duration_continuous property for "continuous" animation is not an integer', () => {
        // SEE SO FOR DEALING WITH REACT 16 THROWING ERRORS FOR SYNTAX BELOW
        // https://stackoverflow.com/questions/49420305/how-to-get-coverage-for-jest-tothrow-without-failing-test
        expect(() => mount(
          <Div
            animation={{
              continuous: {
                from: { opacity: 1 },
                to: { opacity: 0 },
              },
              duration_continuous: 'Hello'
            }}
            
          />
        )).toThrowError('Hello is not a valid duration for a continuous animation should be an integer 0 or greater');
      });

      it('throws an error when no "delay_between" is used when using "in" and "out" animation', () => {
        expect(() => mount(
          <Div 
          animation={{
            in: {
              from: { opacity: 0 },
              to: { opacity: 1 }
            },
            out: {
              from: { 'background-color': 'red' },
              to: { 'background-color': 'yellow' }
            },
            duration_out: 1,
            duration_in: 2,
            animation_fill_mode: 'forwards'
          }}
          />
        )).toThrowError('If you have an in animation and an out animation you need to specify a delay between those animations see https://github.com/cbryant24/chapivia/')
      });
    });

    it('throws an error when using "delay_between" is used when using "in" and "continuous" animation', () => {
      expect(() => mount(
        <Div 
        animation={{
          in: {
            from: { opacity: 0 },
            to: { opacity: 1 }
          },
          continuous: {
            from: { 'background-color': 'red' },
            to: { 'background-color': 'yellow' }
          },
          delay_between: 2,
          duration_continuous: 1,
          duration_in: 2,
          animation_fill_mode: 'forwards'
        }}
        />
      )).toThrowError('You cannot have a delay_between animations if not using out animation see https://github.com/cbryant24/chapivia/')
    });
  });
});