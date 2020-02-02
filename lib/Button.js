import styled from 'styled-components';
import Box from './Box';

export const Button = styled(Box).attrs({isA: 'button'})``;

export const FlexButton = styled(Button)`
  display: flex;
`;

export const GridButton = styled(Button)`
  display: grid;
`;
