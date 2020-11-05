import styled from 'styled-components';
import Box from './Box';

export const H5 = styled(Box).attrs({isA: 'h5'})``;

export const FlexH5 = styled(H5)`
  display: flex;
`;

export const GridH5 = styled(H5)`
  display: grid;
`;
