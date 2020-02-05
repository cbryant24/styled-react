import styled from 'styled-components';
import Box from './Box';

export const H3 = styled(Box).attrs({isA: 'h3'})``;

export const FlexH3 = styled(H3)`
  display: flex;
`;

export const GridH3 = styled(H3)`
  display: grid;
`;
