import styled, { css } from 'styled-components/native';
import { colors } from '../../styles/colors';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  border-radius: 10px;

  height: 50px;
  width: 100%;
  padding: 0 16px;
  
  border-width: 2px;
  border-color: ${colors.indigoA200};

  flex-direction: row;
  align-items: center;

  margin-bottom: ${props => (props.isErrored ? 0 : 8)}px;
  ${props =>
    props.isErrored &&
    css`
      border-color: ${colors.red};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 13px;
`;

export const ErrorMessage = styled.Text`
  color: ${colors.red};
  font-size: 12px;
  
  padding: 4px 0 8px 8px;
`;