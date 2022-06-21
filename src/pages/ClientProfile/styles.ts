import styled, { css } from 'styled-components/native';
import { colors } from '../../styles/colors';

export const Container = styled.View`
  background-color: ${colors.indigo50};
  padding: 40px 24px 0;

  flex: 1;
`;

export const BodyContainer = styled.ScrollView`
  flex: 1;

  padding-right: 24px;
`; 

type RoundButtonContainerProps = {
  fullWidth?: boolean;
}
export const RoundButtonContainer = styled.View<RoundButtonContainerProps>`
  ${(props) => !props.fullWidth && css`align-self: flex-start;`};
`; 

export const RoundButtonContainerButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7
}))`
    height: 50px;
    width: 100%;
    padding: 0 40px 0 24px;
    border-radius: 50px;

    background-color: ${colors.indigoA200};

    justify-content: center;
`;

export const RoundButtonText = styled.Text`
  color: ${colors.white};

  font-size: 16px;
  font-weight: 600;
`;
