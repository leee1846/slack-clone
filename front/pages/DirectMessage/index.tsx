import React, { useCallback, useRef, useEffect } from 'react';
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
  const scrollbarRef = useRef<any>(null);
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSwr(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSwr(`/api/users`, fetcher);
  const { data: chatData, mutate: mutateChat, revalidate, setSize } = useSWRInfinite<IDM[]>(
    (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );
  const isEmpty = chatData?.[chatData.length - 1]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;

  const [chat, onChangeChat, setChat] = useInput('');

  console.log(chatData);
  const onSubmitForm = useCallback(
    (e: HTMLFormElement) => {
      e.preventDefault();
      if (chat?.trim() && chatData) {
        const savedChat = chat;
        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            SenderId: myData.id,
            Sender: myData,
            ReceiverId: userData.id,
            Receiver: userData,
            createdAt: new Date(),
          });
          return prevChatData;
        }, false).then(() => {
          setChat('');
          scrollbarRef.current?.scrollToBottom();
        });
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            revalidate();
          })
          .catch(console.error);
      }
    },
    [chat, chatData, myData, userData, workspace, id],
  );

  //로딩시 스크롤바 제일 아래로
  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  if (!userData || !myData) {
    return null;
  }
  //배열 위에서 아래로 변경하기
  const chatSections = makeSection(chatData ? [...chatData].flat().reverse() : []);

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nuickname} />
      </Header>
      <ChatList chatSections={chatSections} ref={scrollbarRef} setSize={setSize} isReachingEnd={isReachingEnd} />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DirectMessage;
