import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from 'react';

import { User } from '../../types/User';

type MainContext = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
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
  setUser: () => {}
};

const MainContext = createContext<MainContext>(initialContext);

export default function ContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>(initialStateUser);

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
