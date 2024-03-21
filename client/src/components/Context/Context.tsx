import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useEffect,
} from 'react';

import { User } from '@/types/User';
import { ChannelType } from '@/types/Channel';
import { MixTape } from '@/types/Mixtape';
import { getUserById } from '@/services/UserClientService';
import { useNavigate } from 'react-router-dom';

type MainContext = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  setChannels: Dispatch<SetStateAction<ChannelType[]>>;
  setMixTapes: Dispatch<SetStateAction<MixTape[]>>;
};

export const initialStateUser = {
  _id: '',
  userName: '',
  email: '',
  password: '',
  profilePic: '',
  channels: [],
  mixTapes: [],
};

const initialContext = {
  user: initialStateUser,
  setUser: () => {},
  setChannels: () => {},
  setMixTapes: () => {},
};

const MainContext = createContext<MainContext>(initialContext);

export default function ContextProvider({ children }: PropsWithChildren) {


  const navigate = useNavigate();
  const [user, setUser] = useState<User>(initialStateUser);
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [mixTapes, setMixTapes] = useState<MixTape[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('loggedinUser');
        if (userId) {
          const foundUser = await getUserById(userId);
          if (foundUser) {
            setUser(foundUser);
            setChannels(foundUser.channels);
            setMixTapes(foundUser.mixTapes);
          }
        } else {
          navigate('/home');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <MainContext.Provider
      value={{
        user: { ...user, channels, mixTapes },
        setUser,
        setChannels,
        setMixTapes,
      }}>
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}
