import app from '@config/firebase';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';

type State = {
  isLoading: boolean;
  user: User | null;
};

interface IContext {
  state: State;
  dispatch: React.Dispatch<React.SetStateAction<State>>;
}

const initialState: State = {
  isLoading: true,
  user: null,
};

const UserContext = createContext<IContext>({
  state: initialState,
  dispatch: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth(app);
  const [state, dispatch] = useState(initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ isLoading: false, user });
      } else {
        dispatch({ isLoading: false, user: null });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser(): IContext {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

export { UserContext, UserProvider, useUser };
