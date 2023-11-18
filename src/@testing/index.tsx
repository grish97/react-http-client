import { FC, ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MuiThemeProvider } from "@components/mui-theme";
import { StoreProvider } from "@store";
import HttpClientProvider from "@http/HttpClientProvider";

interface IPropType {
  children: ReactNode;
}
const WithProviders: FC<IPropType> = ({ children }) => {
  return (
    <MuiThemeProvider>
      <StoreProvider>
        <HttpClientProvider children={children} />
      </StoreProvider>
    </MuiThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: WithProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
