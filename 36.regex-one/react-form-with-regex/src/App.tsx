// function Pert() {
//     return <div>Pert</div>
// }
//
// const Chert: React.FC<{ children: React.ReactNode }> = ({children}) => {
//     return <div>Chert {children}</div>
// }

// function App() {
// return <Chert>salam</Chert>;
// }

import {Toaster} from "react-hot-toast";
import {RegistrationForm} from "./containers/registration-form.tsx";

function App() {
    return (
        <main className="w-screen h-screen bg-slate-300">
            <section className="container mx-auto flex justify-center items-center h-full w-full">
                <RegistrationForm/>
            </section>
            <Toaster/>
        </main>
    );
}

export default App
