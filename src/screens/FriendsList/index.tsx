import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { useTheme } from 'styled-components';

import {
  Container,
  ContainerNoSolicitations,
  GhostView,
  NoSolicitationsSubtitle,
  NoSolicitationsTitle,
  ScrollContainer,
  Section,
  SectionTitle,
} from './styles';

import { BottomModal } from '../../components/BottomModal';
import { FriendTag } from '../../components/FriendTag';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import {
  readFriends,
  readPendingFriendSolicitations,
  excludeFriend,
  acceptFriendship,
} from '../../services/friendship';

export function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [pendingSolicitations, setPendingSolicitations] = useState([]);
  const [excludeFriendId, setExcludeFriendId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const theme = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    async function pendingFriendSolicitations() {
      const pendingFriendSolicitations = await readPendingFriendSolicitations(user.id);
      setPendingSolicitations(pendingFriendSolicitations);
    }

    async function loadFriends() {
      const friends = await readFriends(user.id);
      setFriends(friends);
    }

    Promise.all([pendingFriendSolicitations(), loadFriends()]);
  }, []);

  function removeSolicitation() {
    excludeFriend(excludeFriendId);
    setModalVisible(false);
    setExcludeFriendId(null);
  }

  function excludeFriendConfirmation(id: number) {
    setExcludeFriendId(id);
    setModalVisible(true);
  }

  function acceptFriendshipConfirmation(id: number) {
    const acceptTime = new Date().toISOString().replace('T', ' ').replace('Z', '');
    acceptFriendship(id, acceptTime);
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigation = useNavigation();

  function handleGoToFriend(id: number) {
    navigation.navigate('FriendView', { id });
  }

  return (
    <Container>
      <ScrollContainer>
        <Header buttonBack title="Amigos" buttonRight={<GhostView />} />
        <Section>
          <SectionTitle>Solicitações</SectionTitle>
          {pendingSolicitations && pendingSolicitations.length > 0 ? (
            pendingSolicitations.map(solicitation => (
              <FriendTag
                key={solicitation.id}
                image={solicitation.guest?.image ? solicitation.guest.image : null}
                name={solicitation.guest?.name ? solicitation.guest.name : null}
                commonFriends={2}
                close
                removeFriend={() => excludeFriendConfirmation(solicitation.id)}
                addFriend={() => acceptFriendshipConfirmation(solicitation.id)}
                onPress={() => handleGoToFriend(solicitation.guest.id)}
              />
            ))
          ) : (
            <ContainerNoSolicitations>
              <NoSolicitationsTitle>Não há solicitações</NoSolicitationsTitle>
              <NoSolicitationsSubtitle>
                Sabemos que você é popular, mas não há nenhum pedido de amizade enviado recentemente
              </NoSolicitationsSubtitle>
            </ContainerNoSolicitations>
          )}
        </Section>
        <BottomModal
          icon={<XCircleIcon size={70} color={theme.colors.text_inactive} />}
          text="Voce tem certeza que deseja excluir esta solicitação de amizade?"
          leftButtonText="Cancelar"
          rightButtonText="Excluir"
          handleFunction={() => removeSolicitation()}
          setModalVisible={() => setModalVisible(false)}
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
        />
        <Section>
          <SectionTitle>Meus amigos</SectionTitle>
          {friends.map((friend, index) => (
            <FriendTag
              key={index}
              image={friend.image}
              name={friend.name}
              commonFriends={friend.commonFriends}
              close={friend.close}
              onPress={() => handleGoToFriend(friend.id)}
            />
          ))}
        </Section>
      </ScrollContainer>
    </Container>
  );
}
