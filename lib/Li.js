import Box from './Box'
import styled from 'styled-components';

export const Li = styled(Box).attrs({isA: "li"})``;

export const FlexLi = styled(Li)`
  display: flex
`;

export const GridLi = styled(Li)`
  display: grid
`;