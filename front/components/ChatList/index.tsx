import React, { FC, useCallback, useRef, forwardRef } from 'react';
import { IChat, IDM } from '../../typings/db';
import { ChatZone, Section, StickyHeader } from './styles';
import Chat from './../Chat/index';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  chatSections?: { [key: string]: (IDM | IChat)[] };
  setSize: (size: number | ((size: number) => number)) => Promise<any[] | undefined>;
  isReachingEnd: boolean | undefined;
}

const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, setSize, isReachingEnd }, ref) => {
  const onScroll = useCallback((values) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      console.log(isReachingEnd);
      setSize((prevSize) => prevSize + 1).then(() => {
        console.log('성공');
      });
    }
  }, []);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={ref} onScrollFrame={onScroll}>
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
});

export default ChatList;
