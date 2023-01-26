import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./styles/global";
import { setupStore } from "./store";
import { Provider } from "react-redux";
import { ProSidebarProvider } from "react-pro-sidebar";

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <GlobalStyles />
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </Provider>
);
