import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/reducer';

const Home: React.FC = () => {
  const currentuser = useSelector((state: RootState) => state.user);
  return <div>Current User:{currentuser.name}</div>;
};

export default Home;
