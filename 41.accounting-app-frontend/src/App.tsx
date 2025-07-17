import { BrowserRouter } from "react-router";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { AppRoutes } from "./routes";
import { QueryProvider } from "./providers/query";
import { reduxStore, reduxPersistor } from "./redux/store";

export default function App() {
  return (
    <BrowserRouter>
      <ReduxProvider store={reduxStore}>
        <PersistGate persistor={reduxPersistor}>
          <QueryProvider>
            {/* <RouterProvider
            router={createBrowserRouter([
              { path: "/", element: <p>ok</p> },
              { path: "/customers", element: <p>customers</p> },
            ])}
          /> */}
            <AppRoutes />
          </QueryProvider>
        </PersistGate>
      </ReduxProvider>
    </BrowserRouter>
  );
}
