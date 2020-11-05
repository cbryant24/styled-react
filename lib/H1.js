import styled from 'styled-components';
import Box from './Box';

export const H1 = styled(Box).attrs({isA: 'h1'})``;

export const FlexH1 = styled(H1)`
  display: flex;
`;

export const GridH1 = styled(H1)`
  display: grid;
`;
