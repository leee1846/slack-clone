import React, { useCallback, useRef } from 'react';
import gravatar from 'gravatar';
import { Header, Container } from './styles';
import useSwr, { useSWRInfinite } from 'swr';
import fetcher from '../../utils/fetcher';
import { useParams } from 'react-router-dom';
import ChatBox from './../../components/ChatBox/index';
import ChatList from './../../components/ChatList/index';
import useInput from './../../hooks/useInput';
import axios from 'axios';
import makeSection from './../../utils/makeSection';
import { IDM } from '../../typings/db';

const DirectMessage = () => {
  const scrollbarRef = useRef(null);
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSwr(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSwr(`/api/users`, fetcher);
  const { data: chatData, mutate: mutateChat, revalidate, setSize } = useSWRInfinite<IDM[]>(
    (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;

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

  const chatSections = makeSection(chatData ? [...chatData].flat().reverse() : []);

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nuickname} />
      </Header>
      <ChatList
        chatSections={chatSections}
        scrollbarRef={scrollbarRef}
        setSize={setSize}
        isReachingEnd={isReachingEnd}
      />
      <ChatBox chat={chat} onSubmitChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DirectMessage;
