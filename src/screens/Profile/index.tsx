import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Square2StackIcon } from "react-native-heroicons/outline";
import { Cog6ToothIcon, CreditCardIcon, FireIcon, PencilIcon, TicketIcon, UsersIcon } from "react-native-heroicons/solid";
import { useTheme } from "styled-components";
import { ButtonPromoter, Container, ContainerConfigButtons, ContainerImage, ContainerMetricsInfos, ContainerPromoterMetrics, ContainerSell, ContainerTopInfos, CopyButtonPromoter, Header, MetricsDivisor, TextButton, TextCopyButton, TextSell, TicketMiniSvg, TitleMetrics, UserImage, UserName } from './styles';

import { ConfigButtons } from '../../components/ConfigButtons';
import { HeaderButton } from '../../components/HeaderButton';

const data = {
  tickets: 55,
  money: 87.76,
}


export function Profile() {
  const promoter = "#F23T08CE" //only for example
  const navigation = useNavigation();

  function goToFriendsList() {
    navigation.navigate('FriendsList')
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(promoter);
    console.log('Copied to Clipboard!');
  }

  return (
    <Container>
      <Header>
        <HeaderButton onPress={goToFriendsList}>
          <UsersIcon size={20} color={useTheme().colors.text} />
        </HeaderButton>
        <HeaderButton>
          <Cog6ToothIcon size={20} color={useTheme().colors.text} />
        </HeaderButton>
      </Header>
      <ContainerTopInfos>
        <ContainerImage>
          <UserImage source={{ uri: 'https://avatars.githubusercontent.com/u/45953201?v=4' }} />
        </ContainerImage>
        <UserName>Lucas Silva</UserName>
        {
          promoter ?
            <>
              <CopyButtonPromoter onPress={copyToClipboard}>
                <TextCopyButton promoter={promoter}>
                  {promoter}
                </TextCopyButton>
                <Square2StackIcon size={20} color={useTheme().colors.text_inactive} />
              </CopyButtonPromoter>
              <ContainerPromoterMetrics>
                <TicketMiniSvg />
                <ContainerMetricsInfos>
                  <TitleMetrics>Ingressos vendidos</TitleMetrics>
                  <ContainerSell>
                    <TextSell>{data.tickets}</TextSell>
                    <MetricsDivisor />
                    <TextSell>R$ {data.money.toFixed(2).replace('.', ',')}</TextSell>
                  </ContainerSell>
                </ContainerMetricsInfos>
              </ContainerPromoterMetrics>
            </>
            :
            <ButtonPromoter promoter={promoter}>
              <FireIcon size={20} color={useTheme().colors.text} />
              <TextButton promoter={promoter}>
                Tornar-se promoter
              </TextButton>
            </ButtonPromoter>
        }
      </ContainerTopInfos>
      <ContainerConfigButtons>
        <ConfigButtons roundedBorder='all' icon={<PencilIcon size={24} color={useTheme().colors.text} />} title="Editar" description="Editar informações pessoais" />
        <ConfigButtons roundedBorder='all' icon={<TicketIcon size={24} color={useTheme().colors.text} />} title="Ingressos" description="Visualizar todos seus ingressos" />
        <ConfigButtons roundedBorder='all' icon={<CreditCardIcon size={24} color={useTheme().colors.text} />} title="Pagamentos" description="Visualizar configurações pegamentos" />
      </ContainerConfigButtons>
    </Container>
  );
}
