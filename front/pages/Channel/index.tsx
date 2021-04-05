import React, { useCallback } from 'react';
import Workspace from '../../layouts/Workspace';
import { Container, Header, DragOver } from './style';
import ChatList from './../../components/ChatList/index';
import ChatBox from '../../components/ChatBox';
import useInput from './../../hooks/useInput';

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    setChat('');
  }, []);

  return (
    <Container>
      <Header>채널!</Header>
      {/* <ChatList /> */}
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
