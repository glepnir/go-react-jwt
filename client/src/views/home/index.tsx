import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/reducer';

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  return <div>Current User:{user.name}</div>;
};

export default Home;
