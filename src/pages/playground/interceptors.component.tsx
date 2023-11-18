import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {localStorageConst} from "@utils/constants/localStorage.ts";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {getInitFlags} from "@store/auth/thunk";
import {selectUser} from "@store/auth/selectors.ts";

interface IPropType {
}

const Interceptors: FC<IPropType> = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(selectUser);

  const [response, setResponse] = useState(null);
  const [token, setToken] = useState({
    access: "",
    refresh: "",
  });

  useEffect(() => {
    if (user?.id) {
      setToken({
        access: user.token,
        refresh: user.refreshToken
      });
    }
  }, [user]);

  /**
   * Handler for change tokens
   */
  const onChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const value = e.target.value;

    setToken({...token, [inputName]: value});
  }, [token]);

  const onSubmitRequest = useCallback(async () => {
    // update storage tokens
    localStorage.setItem(localStorageConst.ACCESS_TOKEN, token.access);
    localStorage.setItem(localStorageConst.REFRESH_TOKEN, token.refresh);

    // make request
    const response = await dispatch(getInitFlags());

    setResponse(response.payload);
  }, [token]);

  const handleClearStorage = useCallback(() => {
    localStorage.clear();
  }, []);

  return (
    <Grid
      container={true}
      spacing={2}
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid item={true} md={5}>
        <Typography mb="30px" color="#808080">
          This is mostly describe how is working request interceptors part of application.
          <br />
          You can modify Access and Refresh tokens and make private request
          which uses access token to make a request and refresh token to update
          broken access token. In case if you modify refresh token you will receive
          failed request, because it should be valid token to get new access token.
        </Typography>

        <Box style={{display: "flex", flexDirection: "column"}}>
          <TextField
            id="access"
            name="access"
            label="Access Token"
            variant="standard"
            value={token.access}
            onChange={onChangeForm}
          />
          <TextField
            id="refresh"
            name="refresh"
            label="Refresh Token"
            variant="standard"
            sx={{my: "30px"}}
            value={token.refresh}
            onChange={onChangeForm}
          />
        </Box>

        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Button
            color="primary"
            sx={{alignSelf: "flex-start"}}
            onClick={handleClearStorage}
          >
            Clear Storage
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{alignSelf: "flex-end"}}
            onClick={onSubmitRequest}
          >
            Submit Request
          </Button>
        </Box>
      </Grid>

      <Grid item={true} md={6}>
        <h3>Result</h3>

        <Paper elevation={2} style={{minHeight: "500px", padding: "20px"}}>
          <code
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {response ? JSON.stringify(response, null, 2) : response}
          </code>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Interceptors;
