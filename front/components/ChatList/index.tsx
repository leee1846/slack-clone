import React, { FC } from 'react';
import { IDM } from '../../typings/db';
import { ChatZone, Section } from './styles';
import Chat from './../Chat/index';

interface Props {
  chatData?: IDM[];
}

const ChatList: FC<Props> = ({ chatData }) => {
  return (
    <ChatZone>
      {chatData?.map((chat) => (
        <Chat key={chat.id} data={chat} />
      ))}
    </ChatZone>
  );
};

export default ChatList;
