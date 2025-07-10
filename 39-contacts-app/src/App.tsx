import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { reduxStore, reduxPersistor } from "./redux/store";
import { ContactsWrapper } from "./components/organisms/contact";
// import { Counter } from "./components/molecules/counter/counter";

export default function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <PersistGate persistor={reduxPersistor}>
        <main className="bg-slate-100 min-h-screen">
          <ContactsWrapper />
        </main>
        {/* <Counter /> */}
      </PersistGate>
    </ReduxProvider>
  );
}
