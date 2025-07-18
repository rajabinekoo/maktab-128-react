import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us",
};

const ContactLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      <p>Greeting</p>
      {children}
    </>
  );
};

export default ContactLayout;
