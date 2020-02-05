import styled from 'styled-components';
import Box from './Box';

export const H2 = styled(Box).attrs({isA: 'h2'})``;

export const FlexH2 = styled(H2)`
  display: flex;
`;

export const GridH2 = styled(H2)`
  display: grid;
`;
