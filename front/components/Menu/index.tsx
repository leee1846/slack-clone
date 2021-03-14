import React, { FC } from 'react';
import { CreateMenu } from './styles';

const Menu: FC = ({ children }) => {
  return <CreateMenu>{children}</CreateMenu>;
};

export default Menu;
