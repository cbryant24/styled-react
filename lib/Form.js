import styled from 'styled-components';
import Box from './Box';

export const Form = styled(Box).attrs({isA: 'form'})``;

export const FlexForm = styled(Form)`
  display: flex
`;

export const GridForm = styled(Form)`
  display: grid
`;
