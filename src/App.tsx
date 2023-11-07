import { useEffect, useState } from "react";
import { login, getInitFlags } from "@store/authSlice";
import { useAppDispatch } from "@/hooks";

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
      email: "grisha@skipti.com",
      password: "Skipti123",
      deviceIdentifier: "c58ed65d-5621-4be9-9a28-a2f524e86618"
    }));

    setLoggedIn(true);

    localStorage.setItem("refreshToken", userData.data.refreshToken);
    localStorage.setItem("token", userData.data.token);
    localStorage.setItem("userEmail", userData.data.email);
  };

  return <div className="App">
    <div>React Api Client</div>

    {isLoggedIn ? (
      <>
        <p>You are logged in</p>
        <button onClick={() => {
          getInitFlags();
          getInitFlags();
          getInitFlags();
        }}>Get Flags</button>
      </>
    ) : (
      <button onClick={loginUser}>Login</button>
    )}
  </div>;
}

export default App;
