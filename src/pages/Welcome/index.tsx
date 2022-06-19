import React from 'react';
import BigHeader from '../../components/BigHeader';

import { Container, WellcomeContainer, WellcomeText, WellcomeDescription, ButtonsContainer, BodyContainerContents, BodyContainer, TermsButtonText, TermsButtonContainer } from './styles';
import Button from '../../components/Button';
import { Spacing } from '../../styles/globalStyles';

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

const Welcome: React.FC = () => {
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

                <Spacing large />

                <ButtonsContainer>
                    <Button filled>Cliente</Button>
                    <Spacing small />
                    <Button>Empresa</Button>
                </ButtonsContainer>

                <Spacing large />

                <TermsButton />
            </BodyContainerContents>

        </BodyContainer>
      </Container>
  );
}

export default Welcome;