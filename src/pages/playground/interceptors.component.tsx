import { ChangeEvent, FC, useCallback, useState } from "react";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { localStorageConst } from "@utils/constants/localStorage.ts";
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getInitFlags, getUser } from '@store/auth/thunk';
import { selectUser } from '@store/auth/selectors.ts';

interface IPropType {}

const Interceptors: FC<IPropType> = () => {
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector(selectUser);

  const [response, setResponse] = useState(null);
  const [token, setToken] = useState({
    access: user?.accessToken || "",
    refresh: user?.refreshToken || "",
  });

  /**
   * Handler for change tokens
   */
  const onChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const value = e.target.value;

    setToken({ ...token, [inputName]: value });
  }, []);

  const onSubmitRequest = useCallback(async () => {
    // update storage tokens
    localStorage.setItem(localStorageConst.ACCESS_TOKEN, token.access);
    localStorage.setItem(localStorageConst.REFRESH_TOKEN, token.refresh);

    // make request
    // const response = await dispatch(getInitFlags());
    const response = await dispatch(getUser());

    console.log(response);

    setResponse(response.payload);
  }, [token]);

  return (
    <Grid
      container={true}
      spacing={2}
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid item={true} md={5}>
        <Box style={{ display: "flex", flexDirection: "column" }}>
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
            sx={{ my: "30px" }}
            value={token.refresh}
            onChange={onChangeForm}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ alignSelf: "flex-end" }}
            onClick={onSubmitRequest}
          >
            Submit Request
          </Button>
        </Box>
      </Grid>

      <Grid item={true} md={6}>
        <h3>Result</h3>

        <Paper elevation={2} style={{ minHeight: "500px", padding: "20px" }}>
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
