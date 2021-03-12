import React, { useCallback, FC } from 'react';
import useSwr from 'swr';
import fetcher from './../utils/fetcher';
import axios from 'axios';
import { Redirect } from 'react-router';

const Workspace: FC = ({ children }: any) => {
  const { data, error, revalidate } = useSwr('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then((response) => {
        revalidate();
        console.log(response);
      })
      .catch((error) => {});
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
