import ReactDOM from "react-dom/client";
import {StoreProvider} from "@store";
import {HttpClientProvider} from "@http";
import { MuiThemeProvider } from "@components/mui-theme";
import App from "./App";
import {enableMocking} from "@mock/browser/enable.mock";
import "./index.css";

function bootstrap() {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <MuiThemeProvider>
      <StoreProvider>
        <HttpClientProvider>
          <App/>
        </HttpClientProvider>
      </StoreProvider>
    </MuiThemeProvider>
  );
}

// Mock should be enabled before rendering application
enableMocking().then(bootstrap);
