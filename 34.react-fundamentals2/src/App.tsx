import { ContactUsForm } from "./containers/contact-us-form";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <main className="w-screen h-screen bg-slate-300">
      <section className="container mx-auto flex justify-center items-center h-full w-full">
        <ContactUsForm />
      </section>
      <Toaster />
    </main>
  );
}

export default App;
