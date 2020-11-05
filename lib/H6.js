import styled from 'styled-components';
import Box from './Box';

export const H6 = styled(Box).attrs({isA: 'h6'})``;

export const FlexH6 = styled(H6)`
  display: flex;
`;

export const GridH6 = styled(H6)`
  display: grid;
`;
