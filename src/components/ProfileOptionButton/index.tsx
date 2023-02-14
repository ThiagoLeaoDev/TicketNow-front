import React from 'react';
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { useTheme } from "styled-components";

import { ContainerOption, ContainerTexts, DescProfileOption, GroupIconTexts, TitleProfileOption } from './styles';

// import { Container } from './styles';

interface ProfileOptionButtonProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

export function ProfileOptionButton({ icon, title, description }: ProfileOptionButtonProps) {
  return (
    <ContainerOption>
      <GroupIconTexts>
        {icon}
        <ContainerTexts>
          <TitleProfileOption>{title}</TitleProfileOption>
          <DescProfileOption>{description}</DescProfileOption>
        </ContainerTexts>
      </GroupIconTexts>
      <ChevronRightIcon size={24} color={useTheme().colors.base_secondary} />
    </ContainerOption>
  );
}
