import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.KeyboardAvoidingView.attrs({
  behavior: 'height',
})`
  width: 100%;
  padding: 0px 16px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${getStatusBarHeight() + 26}px 0px ${RFValue(14)}px 0px;
`;

export const MainTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
  margin: auto;
`;

export const GhostView = styled.View`
  width: 40px;
  height: 40px;
`;

export const Form = styled.View`
  width: 100%;
  margin-top: ${RFValue(16)}px;
  justify-content: center;
  align-items: center;
`;

export const ContainerImage = styled.View`
  position: relative;
  padding: ${RFValue(8)}px;
  border: 4px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 100px;
  margin-bottom: ${RFValue(20)}px;
`;

export const UserImage = styled.Image`
  width: ${RFValue(120)}px;
  height: ${RFValue(120)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 70px;
`;

export const ContainerEditImage = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  position: absolute;
  z-index: 2;
  bottom: 9px;
  right: 9px;
  width: ${RFValue(120)}px;
  height: ${RFValue(120)}px;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  border-radius: 70px;
`;

export const ContainerDateTelephone = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0px 0px ${RFValue(20)}px 0px;
`;

export const InputBoxDate = styled.View`
  width: 38%;
`;

export const InputBoxTelephone = styled.View`
  width: 58%;
`;

export const InputBox = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const ButtonBox = styled.View`
  width: 100%;
  margin-bottom: 24px;
`;

export const EditPasswordBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 100%;
  margin-bottom: 20px;
`;

export const ButtonEditPassword = styled.View`
  position: absolute;
  right: 0px;
  height: 100%;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
`;
