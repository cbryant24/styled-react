import React from 'react'
import { shallow, mount } from 'enzyme';
import {
  Div,P, ThemeProvider
} from '@cbryant24/styled-react';
// import 'jest-styled-components';
import { updateComponent } from '../utils';
import { theme } from '../utils';
import { at } from 'lodash';

let component;

describe('theme', () => {
  beforeEach(async () => {
    component = mount(
      <ThemeProvider>
        <Div width={[3]} fontSize={[4]} margin={[2]} color="primary" lineHeight="condensed" fontWeight="light"></Div>
      </ThemeProvider>
    );
    
    await updateComponent(component)
  });

  it('applies theme styles', () => {
    expect(component).toMatchSnapshot();
    expect(component).toHaveStyleRule('width', '33%');

    expect(component).toHaveStyleRule('font-size', '2.4em');

    expect(component).toHaveStyleRule('margin', '2em');

    expect(component).toHaveStyleRule('color', '#FE2711');

    expect(component).toHaveStyleRule('line-height', '1.25');

    expect(component).toHaveStyleRule('font-weight', '300')

  });

  it('applies custom defined theme properties', async () => {
    component = mount(
      <ThemeProvider>
        <Div fontSizeModule={[1]} />
      </ThemeProvider>
    );

    await updateComponent(component, 1000);

    expect(component).toHaveStyleRule('font-size', '1rem');
  })

  describe('aliases', () => {
    beforeEach( async () => {
      component = mount(
        <ThemeProvider>
          <Div mx={[1]} py={[1]} my={[2]} px={[2]} fontSize="md"/>
        </ThemeProvider>
      );
  
      await updateComponent(component);
    });

    it('displays css with appropriate aliases', () => {
      expect(component).toMatchSnapshot();
      expect(component).toHaveStyleRule('margin-left', '1em');
      expect(component).toHaveStyleRule('margin-right', '1em');
      expect(component).toHaveStyleRule('margin-top', '2em');
      expect(component).toHaveStyleRule('margin-bottom', '2em');
      expect(component).toHaveStyleRule('padding-left', '2em');
      expect(component).toHaveStyleRule('padding-right', '2em');
      expect(component).toHaveStyleRule('padding-top', '1em');
      expect(component).toHaveStyleRule('padding-bottom', '1em');
    });
  });

  describe('responsive styles', () => {
    beforeEach( async () => {
      component = mount(
      <ThemeProvider>
        <Div id="font-size-module-responsive" fontSizeModule={[1,2,3,4,'5rem']}>
          <Div
            className="div-responsive"
            mx={[1,2,3]} 
            py={[1,null,2,null,3]} 
          >
            <P
              className="paragraph-responsive"
              fontSize={[1,2,3,4]} 
              lineHeight={['default', 'condensed', 'condensedUltra']}
              letterSpacing={['normal', '', null, 'tight']}
            >
            </P>
          </Div>
        </Div>
      </ThemeProvider>);

      updateComponent(component, 1000);
    });

    it('applys appropriate styling at less than 544px', () => {
      expect(component).toMatchSnapshot();
      expect(component.find('#font-size-module-responsive').at(0)).toHaveStyleRule('font-size', '1rem');
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('margin-left', '1em');
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('margin-right', '1em');
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('padding-top', '1em');
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('padding-bottom', '1em');
      expect(component.find('.paragraph-responsive').at(0)).toHaveStyleRule('font-size', '1.2em');
      expect(component.find('.paragraph-responsive').at(0)).toHaveStyleRule('line-height', '1');
      expect(component.find('.paragraph-responsive').at(0)).toHaveStyleRule('letter-spacing', 'normal');
    });

    it('applys appropriate styling at min width 544px', () => {
      expect(component.find('#font-size-module-responsive').at(0)).toHaveStyleRule('font-size', '2rem', {
        media: 'screen and (min-width: 544px)'
      });
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('margin-left', '2em', {
        media: 'screen and (min-width: 544px)'
      });
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('margin-right', '2em', {
        media: 'screen and (min-width: 544px)'
      });
      expect(component.find('.div-responsive').at(0)).not.toHaveStyleRule('padding-top', null, {
        media: 'screen and (min-width: 544px)'
      });
      expect(component.find('.div-responsive').at(0)).not.toHaveStyleRule('padding-bottom', null, {
        media: 'screen and (min-width: 544px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).toHaveStyleRule('font-size', '1.6em', {
        media: 'screen and (min-width: 544px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).toHaveStyleRule('line-height', '1.25', {
        media: 'screen and (min-width: 544px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).not.toHaveStyleRule('letter-spacing', null, {
        media: 'screen and (min-width: 544px)'
      });
    });

    it('applys appropriate styling at min width 768px', () => {
      expect(component.find('#font-size-module-responsive').at(0)).toHaveStyleRule('font-size', '3rem', {
        media: 'screen and (min-width: 768px)'
      });
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('margin-left', '3em', {
        media: 'screen and (min-width: 768px)'
      });
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('margin-right', '3em', {
        media: 'screen and (min-width: 768px)'
      });
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('padding-top', '2em', {
        media: 'screen and (min-width: 768px)'
      });
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('padding-bottom', '2em', {
        media: 'screen and (min-width: 768px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).toHaveStyleRule('font-size', '2em', {
        media: 'screen and (min-width: 768px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).toHaveStyleRule('line-height', '1.5', {
        media: 'screen and (min-width: 768px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).not.toHaveStyleRule('letter-spacing', null, {
        media: 'screen and (min-width: 768px)'
      });
    });

    it('applys appropriate styling at min width 1012px', () => {
      expect(component.find('#font-size-module-responsive').at(0)).toHaveStyleRule('font-size', '4rem', {
        media: 'screen and (min-width: 1012px)'
      });
      expect(component.find('.div-responsive').at(0)).not.toHaveStyleRule('margin-left', null, {
        media: 'screen and (min-width: 1012px)'
      });
      expect(component.find('.div-responsive').at(0)).not.toHaveStyleRule('margin-right', null, {
        media: 'screen and (min-width: 1012px)'
      });
      expect(component.find('.div-responsive').at(0)).not.toHaveStyleRule('padding-top', null, {
        media: 'screen and (min-width: 1012px)'
      });
      expect(component.find('.div-responsive').at(0)).not.toHaveStyleRule('padding-bottom', null, {
        media: 'screen and (min-width: 1012px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).toHaveStyleRule('font-size', '2.4em', {
        media: 'screen and (min-width: 1012px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).not.toHaveStyleRule('line-height', null, {
        media: 'screen and (min-width: 1012px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).toHaveStyleRule('letter-spacing', '-0.05em', {
        media: 'screen and (min-width: 1012px)'
      });
    });

    it('applys appropriate styling at min width 1280px', () => {
      expect(component.find('#font-size-module-responsive').at(0)).toHaveStyleRule('font-size', '5rem', {
        media: 'screen and (min-width: 1280px)'
      });
      expect(component.find('.div-responsive').at(0)).not.toHaveStyleRule('margin-left', null, {
        media: 'screen and (min-width: 1280px)'
      });
      expect(component.find('.div-responsive').at(0)).not.toHaveStyleRule('margin-right', null, {
        media: 'screen and (min-width: 1280px)'
      });
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('padding-top', '3em', {
        media: 'screen and (min-width: 1280px)'
      });
      expect(component.find('.div-responsive').at(0)).toHaveStyleRule('padding-bottom', '3em', {
        media: 'screen and (min-width: 1280px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).not.toHaveStyleRule('font-size', null, {
        media: 'screen and (min-width: 1280px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).not.toHaveStyleRule('line-height', null, {
        media: 'screen and (min-width: 1280px)'
      });
      expect(component.find('.paragraph-responsive').at(0)).not.toHaveStyleRule('letter-spacing', null, {
        media: 'screen and (min-width: 1280px)'
      });
    });
  });

  // describe('custom theme', async () => {
  //   beforeEach( async () => {
  //     <ThemeProvider theme={theme}>
  //     </ThemeProvider>
  //   });
  // });

  // describte('named theme styles', async () => {
  //   beforeEach( async () => {

  //   });
  // })

  // describe('')

});