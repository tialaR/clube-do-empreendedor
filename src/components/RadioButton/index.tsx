import React, {useState} from 'react';
import {SpacingY} from '../../styles/globalStyles';

import {
  Container,
  RedioContainerButton,
  RedioButton,
  RadioLabel,
} from './styles';

type Props = {
  firstSelectedValue?: {value: string};
  data: {value: string}[];
  onSelect: (value: string) => void;
};

const RadioButton: React.FC<Props> = ({data, firstSelectedValue, onSelect}) => {
  const [option, setOption] = useState<string | null>(
    firstSelectedValue?.value ?? null,
  );

  const selectHandler = (value: string) => {
    onSelect(value);
    setOption(value);
  };

  return (
    <Container>
      {data.map(item => {
        return (
          <>
            <RedioContainerButton>
              <RedioButton
                key={item?.value}
                isSelect={item.value === option}
                onPress={() => selectHandler(item.value)}
              />
              <RadioLabel> {item.value}</RadioLabel>
            </RedioContainerButton>
            <SpacingY small />
          </>
        );
      })}
    </Container>
  );
};

export default RadioButton;
