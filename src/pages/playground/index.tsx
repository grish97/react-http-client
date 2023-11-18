import { FC } from "react";
import { Grid, Paper } from "@mui/material";
import Interceptors from "./interceptors.component";

interface IPropType {}

const Playground: FC<IPropType> = () => {
  return (
    <Grid container={true} justifyContent="center" mt="50px">
      <Grid item={true} md={10}>
        <Paper elevation={1} sx={{ minHeight: "600px", padding: "20px" }}>
          <Interceptors />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Playground;
