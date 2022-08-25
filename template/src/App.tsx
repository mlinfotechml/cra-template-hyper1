import { ThemeProvider } from "@mui/material";
import React from "react";
import theme from "./main/theme/theme";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import Main from "./main/Main";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </ReduxProvider>
    </ThemeProvider>
  );
}

export default App;
