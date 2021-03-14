import React, { useCallback, FC } from 'react';
import useSwr, { mutate } from 'swr';
import fetcher from '../../utils/fetcher';
import axios from 'axios';
import { Redirect } from 'react-router';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './styles';
import gravatar from 'gravatar';

const Workspace = ({ children }: any) => {
  const { data, error, revalidate } = useSwr('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        mutate('http://localhost:3095/api/users', false, false);
      })
      .catch((error) => {});
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.nickname}></ProfileImg>
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>scroll</MenuScroll>
        </Channels>
        <Chats>chat</Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
