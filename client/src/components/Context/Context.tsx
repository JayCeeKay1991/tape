import {
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
import { Howl } from 'howler';

type MainContext = {
  user: User;
  streamIndex: number;
  playing: boolean;
  currentPlaybackTime: number;
  activeHowls: Howl[];
  mixTapeDuration: number;


  setUser: Dispatch<SetStateAction<User>>;
  setChannels: Dispatch<SetStateAction<ChannelType[]>>;
  setMixTapes: Dispatch<SetStateAction<MixTape[]>>;

  setStreamIndex: Dispatch<SetStateAction<number>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setCurrentPlaybackTime: Dispatch<SetStateAction<number>>;
  setActiveHowls: Dispatch<SetStateAction<Howl[]>>;
  setMixTapeDuration: Dispatch<SetStateAction<number>>;
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
  playing: false,
  streamIndex: 0,
  currentPlaybackTime: 0,
  activeHowls: [],
  mixTapeDuration: 0,


  setUser: () => {},
  setChannels: () => {},
  setMixTapes: () => {},
  setPlaying: () => false,
  setStreamIndex: () => 0,
  setCurrentPlaybackTime: () => 0,
  setActiveHowls: () => {},
  setMixTapeDuration: () => 0,
};

const MainContext = createContext<MainContext>(initialContext);

export default function ContextProvider({ children }: PropsWithChildren) {

  const navigate = useNavigate();
  const [user, setUser] = useState<User>(initialStateUser);
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [mixTapes, setMixTapes] = useState<MixTape[]>([]);

  // player contexts
  const [streamIndex, setStreamIndex] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
  const [activeHowls, setActiveHowls] = useState<Howl[]>([]);
  const [mixTapeDuration, setMixTapeDuration] = useState<number>(0);


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
        user,
        setUser,
        setChannels,
        setMixTapes,
        streamIndex,
        setStreamIndex,
        playing,
        setPlaying,
        currentPlaybackTime,
        setCurrentPlaybackTime,
        activeHowls,
        setActiveHowls,
        mixTapeDuration,
        setMixTapeDuration
      }}>
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}
