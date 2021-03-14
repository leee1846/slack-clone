import React, { useCallback, FC } from 'react';
import useSwr, { mutate } from 'swr';
import fetcher from '../../utils/fetcher';
import axios from 'axios';
import { Redirect, Switch, Route } from 'react-router';
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
import loadable from '@loadable/component';
import Menu from '../../components/Menu';

const DirectMessage = loadable(() => import('./../../pages/DirectMessage/index'));
const Channel = loadable(() => import('./../../pages/Channel/index'));

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

  const onClickUserProfile = () => {};

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.nickname} />
            <Menu>프로필메뉴</Menu>
          </span>
        </RightMenu>
      </Header>
      <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>scroll</MenuScroll>
        </Channels>
        <Chats>{children}</Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
