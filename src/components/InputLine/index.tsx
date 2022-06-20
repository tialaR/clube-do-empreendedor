import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, ErrorMessage, TextInput, Title, TextInputContainer } from './styles';
import { colors } from '../../styles/colors';

interface Props extends TextInputProps {
  title: string;
  error?: boolean;
  errorText?: string;
}

const InputLine: React.FC<Props> = ({ title, error, errorText, ...rest }) => {
  return (
    <>
      <Container
        isErrored={!!error}
      >
        <Title>{title}</Title>
        <TextInputContainer >
            <TextInput
                {...rest}
                keyboardAppearance="dark"
                placeholderTextColor={colors.white}
            />
        </TextInputContainer>
      </Container>
      {error && (
        <ErrorMessage style={{ paddingBottom: 10 }}>{errorText}</ErrorMessage>
      )}
    </>
  );
};

export default InputLine;