import {FC, ReactNode} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";

interface IPropType {
  children: ReactNode,
}

const muiDefaultTheme = createTheme({
  palette: {
    mode: "dark"
  },
});

export const MuiThemeProvider: FC<IPropType> = ({ children }) => {
  return <ThemeProvider theme={muiDefaultTheme} children={children} />
}
