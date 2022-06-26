import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, ErrorMessage, TextInput } from './styles';
import { colors } from '../../styles/colors';

interface Props extends TextInputProps {
  error?: boolean;
  errorText?: string;
}

const Input: React.FC<Props> = ({ error, errorText, ...rest }) => {
  return (
    <>
      <Container
        isErrored={!!error}
      >
        <TextInput
          {...rest}
          keyboardAppearance="dark"
          placeholderTextColor={colors.indigoA200}
        />
      </Container>
      {error && (
        <ErrorMessage style={{ paddingBottom: 0 }}>{errorText}</ErrorMessage>
      )}
    </>
  );
};

export default Input;