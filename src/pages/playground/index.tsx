import {FC} from "react";
import {Grid, Paper} from "@mui/material";

interface IPropType {}

const Playground: FC<IPropType> = () => {
  return (
    <Grid container={true} justifyContent="center" mt="50px">
      <h2 style={{ textAlign: "center" }}>React HTTP Client Playground</h2>

      <Grid item={true} md={10}>
        <Paper elevation={1} sx={{minHeight: "600px", padding: "20px"}}>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Playground;
