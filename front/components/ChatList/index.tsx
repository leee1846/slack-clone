import React, { FC, useCallback, useRef } from 'react';
import { IChat, IDM } from '../../typings/db';
import { ChatZone, Section, StickyHeader } from './styles';
import Chat from './../Chat/index';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  chatSections?: { [key: string]: (IDM | IChat)[] };
}

const ChatList: FC<Props> = ({ chatSections }) => {
  const scrollbarRef = useRef(null);
  const onScroll = useCallback(() => {}, []);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {chatSections &&
          Object.entries(chatSections).map(([date, chats]) => {
            return (
              <Section className={`section-${date}`} key={date}>
                <StickyHeader>
                  <button>{date}</button>
                </StickyHeader>
                {chats.map((chat) => (
                  <Chat key={chat.id} data={chat} />
                ))}
              </Section>
            );
          })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
