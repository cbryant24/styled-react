import styled from 'styled-components';
import Box from './Box';

export const H4 = styled(Box).attrs({isA: 'h4'})``;

export const FlexH4 = styled(H4)`
  display: flex;
`;

export const GridH4 = styled(H4)`
  display: grid;
`;
