import React from 'react'
import renderer from 'react-test-renderer'
import * as Elements from '@cbryant24/styled-react';
import 'jest-styled-components';

const render = el => renderer.create(el).toJSON()

describe('elements', () => {
  it('displays a div', () => {
    const json = render(<Elements.Div/>);
    expect(json.type).toBe('div');
  });
  it('displays a button', () => {
    const json = render(<Elements.Button/>);
    expect(json.type).toBe('button');
  });
  it('displays a form', () => {
    const json = render(<Elements.Form/>);
    expect(json.type).toBe('form');
  });
  it('displays a h1', () => {
    const json = render(<Elements.H1/>);
    expect(json.type).toBe('h1');
  });
  it('displays a h2', () => {
    const json = render(<Elements.H2/>);
    expect(json.type).toBe('h2');
  });
  it('displays a h3', () => {
    const json = render(<Elements.H3/>);
    expect(json.type).toBe('h3');
  });
  it('displays a h4', () => {
    const json = render(<Elements.H4/>);
    expect(json.type).toBe('h4');
  });
  it('displays a h5', () => {
    const json = render(<Elements.H5/>);
    expect(json.type).toBe('h5');
  });
  it('displays an li', () => {
    const json = render(<Elements.Li/>);
    expect(json.type).toBe('li');
  });
  it('displays a ul', () => {
    const json = render(<Elements.Ul/>);
    expect(json.type).toBe('ul');
  });
  it('displays a p', () => {
    const json = render(<Elements.P/>);
    expect(json.type).toBe('p');
  });
  it('displays a span', () => {
    const json = render(<Elements.Span/>);
    expect(json.type).toBe('span');
  });
});
