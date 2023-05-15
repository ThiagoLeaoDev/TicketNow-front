import React from "react";

import { Container, ContainerText, Content, Date, Description, Gradient, Image, Title } from './styles';

import { CardSkeleton } from './skeleton'

interface CardProps {
  event: {
    image: string;
    date: string;
    title: string;
    location: string;
  }
}

export function Card({ event }: CardProps) {
  return (
    <>
    {
      event ?
      (
        <CardSkeleton />
      )
      :
      (
        <Container activeOpacity = { 0.6 }>
          <Content>
            <Image source = {{ uri: event.image }} />
            <Gradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
              locations={[0, 1]}
            />
            <ContainerText>
              <Date>{event.date}</Date>
              <Title>{event.title}</Title>
              <Description>{event.location}</Description>
            </ContainerText>
          </Content >
        </Container >
      )
    }
    </>
  );
}
