import { useState } from "react";
import { Button } from "./components/button";
import { ContactUsForm } from "./containers/contact-us-form";
import { Toaster } from "react-hot-toast";

function App() {
  const [show, setShow] = useState<boolean>(true);

  return (
    <main className="w-screen h-screen bg-slate-300">
      <section className="container mx-auto flex justify-center items-center h-full w-full">
        {show && <ContactUsForm />}
      </section>
      <Button title="toggle" onClick={() => setShow(!show)} />
      <Toaster />
    </main>
  );
}

export default App;
