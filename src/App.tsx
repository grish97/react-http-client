import {useCallback, useEffect, useState} from "react";
import { login, getInitFlags } from "@store/auth/thunk";
import { useAppDispatch } from "@/hooks";
import Playground from "@pages/playground";

function App() {
  const dispatch = useAppDispatch();
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
    } else {
      loginUser();
    }
  }, []);

  const loginUser = async () => {
    const { payload: userData } = await dispatch(login({
      email: "example@user.com",
      password: "user0000",
    }));

    setLoggedIn(true);
  };

  const getUserFlags = useCallback(() => {
    dispatch(getInitFlags());
  }, []);

  return (
    <main>
      <Playground />
    </main>
  );
}

export default App;
