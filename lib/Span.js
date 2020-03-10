import styled from 'styled-components';
import Box from './Box';

export const Span = styled(Box).attrs({ isA: 'span' })``;

export const FlexSpan = styled(Span)`
  display: flex;
`;

export const GridSpan = styled(Span)`
  display: grid;
`;
