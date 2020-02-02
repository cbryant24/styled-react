import styled from 'styled-components';
import Box from './Box';

export const Div = styled(Box).attrs({isA: 'div'})``;

export const FlexDiv = styled(Div)`
  display: flex;
`;

export const GridDiv = styled(Div)`
  display: grid;
`;
