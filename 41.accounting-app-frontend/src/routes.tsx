import { Route, Routes } from "react-router";

import { Home } from "./components/pages/home";
import { AboutPage } from "./components/pages/about";
import { ContactPage } from "./components/pages/contact";
import { AppTemplate } from "./components/templates/app";
import { NotFoundPage } from "./components/pages/not-found";
import { CustomersPage } from "./components/pages/customers";
import { CustomerInfoPage } from "./components/pages/customer-info";
import { NewCustomer } from "./components/pages/new-customer";
import { EditCustomer } from "./components/pages/edit-customer";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppTemplate />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/customers">
          <Route path="" element={<CustomersPage />} />
          <Route path=":id" element={<CustomerInfoPage />} />
          <Route path="new" element={<NewCustomer />} />
          <Route path="edit/:id" element={<EditCustomer />} />
        </Route>
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
