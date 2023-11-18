import { useEffect } from "react";
import {login} from "@store/auth/thunk";
import { useAppDispatch } from "@/hooks";
import Playground from "@pages/playground";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    loginUser();
  }, []);

  const loginUser = async () => {
    await dispatch(
      login({
        email: "example@user.com",
        password: "user0000",
      }),
    );
  };

  return (
    <main>
      <Playground />
    </main>
  );
}

export default App;
