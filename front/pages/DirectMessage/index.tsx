import React, { useCallback } from 'react';
import gravatar from 'gravatar';
import { Header, Container } from './styles';
import useSwr from 'swr';
import fetcher from '../../utils/fetcher';
import { useParams } from 'react-router-dom';
import ChatBox from './../../components/ChatBox/index';
import ChatList from './../../components/ChatList/index';
import useInput from './../../hooks/useInput';
import axios from 'axios';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSwr(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSwr(`/api/users`, fetcher);
  const { data: chatData, mutate: mutateChat, revalidate } = useSwr(
    `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,
    fetcher,
  );

  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!chat.trim()) {
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            revalidate();
            setChat('');
          })
          .catch((error) => console.log(error));
      }
    },
    [chat],
  );

  if (!userData || !myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nuickname} />
      </Header>
      <ChatList />
      <ChatBox chat={chat} onSubmitChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DirectMessage;
