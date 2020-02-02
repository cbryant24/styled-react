import Box from './Box'
import styled from 'styled-components';

export const Ul = styled(Box).attrs({isA: "ul"})``;

export const FlexUl = styled(Ul)`
  display: flex
`;

export const GridUl = styled(Ul)`
  display: grid
`