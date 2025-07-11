import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { QueryProvider } from "./providers/query";
import { reduxStore, reduxPersistor } from "./redux/store";
import { CustomersWrapper } from "./components/organisms/customer";

export default function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <PersistGate persistor={reduxPersistor}>
        <QueryProvider>
          <main className="bg-slate-100 min-h-screen">
            <CustomersWrapper />
          </main>
        </QueryProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
