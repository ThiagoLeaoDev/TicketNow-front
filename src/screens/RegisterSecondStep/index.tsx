import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import { useTheme } from 'styled-components';
import {
  ButtonBox,
  Container,
  ContainerFooterMessage,
  ContainerLater,
  FooterMessage,
  Form,
  InputBox,
  TextLater,
} from './styles';

import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { TitleDesc } from '../../components/Form/TitleDesc';
import { Header } from '../../components/Header';

export function RegisterSecondStep({ navigation }: any) {
  const theme = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header logo />
        <Form>
          <TitleDesc
            title="Informações adicionais"
            desc="Para garantir a segurança das transações, precisamos de algumas informações adicionais."
          />
          <InputBox>
            <Input placeholder="Nome completo" />
          </InputBox>
          <InputBox>
            <Input placeholder="CPF" />
          </InputBox>
          <InputBox>
            <Input placeholder="Número de telefone" />
          </InputBox>
          <ButtonBox>
            <Button
              title="Finalizar"
              onPress={() => {
                navigation.navigate('Login');
              }}
            />
          </ButtonBox>
          <ContainerLater>
            <TextLater>Lembre-me mais tarde</TextLater>
            <ChevronRightIcon size={18} color={theme.colors.text_inactive} />
          </ContainerLater>
        </Form>
        <ContainerFooterMessage>
          <FooterMessage>
            *Seus dados pessoais serão usados para processar seus pedidos, melhorar sua experiência
            no aplicativo e outros fins descritos em nossa política de privacidade.
          </FooterMessage>
        </ContainerFooterMessage>
      </Container>
    </TouchableWithoutFeedback>
  );
}
