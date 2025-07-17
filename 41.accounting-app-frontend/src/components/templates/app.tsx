import { Outlet } from "react-router";

import { AppBar } from "../molecules/layout/appbar";

export const AppTemplate: React.FC = () => {
  return (
    <main className="w-screen min-h-screen bg-slate-100 font-app">
      <AppBar />
      <Outlet />
    </main>
  );
};
