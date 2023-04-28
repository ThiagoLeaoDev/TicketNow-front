import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import {RegisterTemporaryContext} from '../../contexts/registerTemporary';

import { ButtonBox, ButtonSocialRegisterBox, Container, ContainerAlreadyAccount, ContainerAnotherSignUpWays, ContainerSocialRegister, ContainerTerms, ContainerTextTerms, Form, Header, InputBox, LogoHorizontal, TextAlreadyAccount, TextAlreadyAccountBold, TextAnotherSignUpWays, TextTerms, TextTermsBold, TouchableAlreadyAccount } from './styles';

import { Button } from '../../components/Form/Button';
import { Checkbox } from '../../components/Form/Checkbox';
import { DatePicker } from '../../components/Form/DatePicker';
import { InputForm } from '../../components/Form/InputForm';
import { TitleDesc } from '../../components/Form/TitleDesc';

import { IRegister } from '../../interfaces/register';

const schema = Yup.object().shape({
  date: Yup
    .date(),
  email: Yup
    .string()
    .required('E-mail obrigatório')
    .email('E-mail inválido')
    .min(6, 'Mínimo 6 caracteres')
    .max(255, 'Máximo 100 caracteres'),
  password: Yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'Mínimo 6 caracteres')
    .max(50, 'Máximo 50 caracteres')
})

export function Register() {
  const [isChecked, setChecked] = useState(false);
  const [date, setDate] = useState<Date>(null);
  const [datePickerShow, setDatePickerShow] = useState(false);
  const navigation = useNavigation();
  const { updateRegisterTemporary } = useContext(RegisterTemporaryContext);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function handleRegister(form: IRegister) {
    if(!date || !form.email || !form.password)
      return alert('Preencha todos os campos');

    const registerInfos: IRegister = {
      date: date,
      email: form.email,
      password: form.password,
    }

    updateRegisterTemporary(registerInfos);
    navigation.navigate('RegisterSecondStep');
  }

  function goToLogin() {
    navigation.navigate('Login');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <LogoHorizontal source={require('../../../assets/logo-horizontal.png')} />
        </Header>
        <Form>
          <TitleDesc title='Crie sua conta' desc='Inscreva-se agora para descobrir os eventos mais incríveis!' />
          <InputBox>
            {/* <Input placeholder='Data de nascimento' editable={false} onPressIn={() => { setDatePickerShow(true) }} value={date?.toLocaleString('pt-BR').split(' ')[0]} /> */}
            <InputForm
              name='date'
              control={control}
              placeholder='Data de nascimento'
              editable={false}
              onPressIn={() => { setDatePickerShow(true) }}
              error={errors.date && errors.date.message.toString()}
              onChange={(event: any) => { setDate(event.nativeEvent.text) }}
              value={date?.toLocaleString('pt-BR').split(' ')[0]}
            />
          </InputBox>
          <InputBox>
            <InputForm
              name='email'
              control={control}
              placeholder='E-mail'
              autoCorrect={false}
              keyboardType='email-address'
              autoCapitalize='none'
              error={errors.email && errors.email.message.toString()}
            />
          </InputBox>
          <InputBox>
            <InputForm
              name='password'
              control={control}
              placeholder='Senha'
              secureTextEntry
              error={errors.password && errors.password.message.toString()}
            />
          </InputBox>
          <ContainerTerms onTouchEnd={() => { setChecked(!isChecked) }}>
            <Checkbox color={useTheme().colors.text_inactive} value={isChecked} onValueChange={() => { setChecked(!isChecked) }} />
            <ContainerTextTerms>
              <TextTerms>Eu concordo com os </TextTerms>
              <TextTermsBold>Termos & Condições</TextTermsBold>
              <TextTerms> e com as </TextTerms>
              <TextTermsBold>Políticas de Privacidade</TextTermsBold>
            </ContainerTextTerms>
          </ContainerTerms>
          <ButtonBox>
            <Button title='Continuar' onPress={handleSubmit(handleRegister)} />
          </ButtonBox>
          <ContainerAlreadyAccount>
            <TextAlreadyAccount>Já possui uma conta? </TextAlreadyAccount>
            <TouchableAlreadyAccount onPress={() => { goToLogin() }}>
              <TextAlreadyAccountBold>Entre aqui!</TextAlreadyAccountBold>
            </TouchableAlreadyAccount>
          </ContainerAlreadyAccount>
          <ContainerAnotherSignUpWays>
            <TextAnotherSignUpWays>ou cadastre-se com</TextAnotherSignUpWays>
            <ContainerSocialRegister>
              <ButtonSocialRegisterBox>
                <Button icon={<AntDesign name='google' size={24} color={useTheme().colors.text} />} />
              </ButtonSocialRegisterBox>
              <ButtonSocialRegisterBox>
                <Button icon={<AntDesign name='apple1' size={24} color={useTheme().colors.text} />} />
              </ButtonSocialRegisterBox>
              <ButtonSocialRegisterBox>
                <Button icon={<MaterialIcons name='facebook' size={24} color={useTheme().colors.text} />} />
              </ButtonSocialRegisterBox>
            </ContainerSocialRegister>
          </ContainerAnotherSignUpWays>
        </Form>
        {datePickerShow && (
          <DatePicker handleConfirm={(date) => { setDate(date), setDatePickerShow(false) }} />
        )}
      </Container>
    </TouchableWithoutFeedback >
  );
}
