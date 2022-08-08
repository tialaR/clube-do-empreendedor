import React from 'react';

import {Container, CheckBoxButton, Label} from './styles';

type Props = {
  onChange: (check: boolean) => void;
  isChecked: boolean;
  label: string;
};

const CheckBox: React.FC<Props> = ({onChange, isChecked, label}) => {
  return (
    <Container>
      <CheckBoxButton onPress={onChange} isChecked={isChecked} />

      <Label>{label}</Label>
    </Container>
  );
};

export default CheckBox;
