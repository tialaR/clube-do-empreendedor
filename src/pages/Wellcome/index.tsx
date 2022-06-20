import React from 'react';
import { useNavigation } from '@react-navigation/native';

import BigHeader from '../../components/BigHeader';
import Button from '../../components/Button';

import { Container, WellcomeContainer, WellcomeText, WellcomeDescription, ButtonsContainer, BodyContainerContents, BodyContainer, TermsButtonText, TermsButtonContainer } from './styles';
import { SpacingY } from '../../styles/globalStyles';

const TermsButton: React.FC = () => {
    return (
        <TermsButtonContainer>
            <TermsButtonText>
                {`Leia os `}
                <TermsButtonText link>
                    {`termos de uso e política de Privacidade de uso`}
                </TermsButtonText>
                <TermsButtonText>
                    {`\ndo `}
                </TermsButtonText>
                <TermsButtonText bold>
                    {` Clube do Empreendedor`}
                </TermsButtonText>
            </TermsButtonText>
        </TermsButtonContainer>
    )
}

const Wellcome: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
      <Container>
        <BigHeader />

        <BodyContainer>
            <BodyContainerContents>
                <WellcomeContainer>
                    <WellcomeText>
                        Bem-vindo ao Clube!
                    </WellcomeText>
                    <WellcomeDescription>
                        {`Nosso clube trás inúmeras oportunidades \npara você ou sua empresa. Vamos lá?`}
                    </WellcomeDescription>
                </WellcomeContainer>

                <SpacingY large />

                <ButtonsContainer>
                    <Button filled onPress={() => navigation.navigate('SignIn', { isClient: true })}>Cliente</Button>
                    <SpacingY small />
                    <Button outlined onPress={() => navigation.navigate('SignIn')}>Empresa</Button>
                </ButtonsContainer>

                <SpacingY large />

                <TermsButton />
            </BodyContainerContents>

        </BodyContainer>
      </Container>
  );
}

export default Wellcome;