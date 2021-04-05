import React, { FC, useCallback, useRef, forwardRef, RefObject } from 'react';
import { IChat, IDM } from '../../typings/db';
import { ChatZone, Section, StickyHeader } from './styles';
import Chat from './../Chat/index';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  chatSections?: { [key: string]: (IDM | IChat)[] };
  setSize: (size: number | ((size: number) => number)) => Promise<any[] | undefined>;
  isReachingEnd: boolean | undefined;
  scrollRef: RefObject<Scrollbars>;
}

const ChatList: FC<Props> = ({ chatSections, setSize, isReachingEnd, scrollRef }) => {
  const onScroll = useCallback((values) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      setSize((prevSize) => prevSize + 1).then(() => {
        scrollRef?.current?.scrollTop(scrollRef.current?.getScrollHeight() - values.scrollHeight);
      });
    }
  }, []);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
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
