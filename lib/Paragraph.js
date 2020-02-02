import styled from 'styled-components';
import Box from './Box'

export const P = styled(Box).attrs({isA: 'p'})``;

export const FlexP = styled(Box)`
  display: flex;
`;

export const GridP = styled(Box)`
  display: grid;
`;
