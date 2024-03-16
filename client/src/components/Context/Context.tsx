import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from 'react';

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilepic: string;
  channels: string[];
  mixtapes: string[];
};

type MainContext = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

const initialUser = {
  _id: '',
  username: '',
  email: '',
  password: '',
  profilepic: '',
  channels: [],
  mixtapes: [],
};

const initialContext = {
  user: initialUser,
  setUser: () => {},
};

const MainContext = createContext<MainContext>(initialContext);

export default function ContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>(initialUser);

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
export function useMainContext() {
  return useContext(MainContext);
}
