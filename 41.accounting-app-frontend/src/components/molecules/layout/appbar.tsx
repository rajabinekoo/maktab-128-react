import { Link } from "react-router";
import { Button } from "../../atom/button";

export const AppBar: React.FC = () => {
  return (
    <section className="w-screen px-5 py-2 flex flex-nowrap items-center h-[60px] shadow-md bg-slate-200 gap-7">
      <p className="font-semibold italic text-lg">Accounting App</p>
      <div className="flex flex-nowrap gap-3">
        <Link to="/">
          <Button varient="ghost" className="!text-black">
            Home
          </Button>
        </Link>
        <Link to="/contact">
          <Button varient="ghost" className="!text-black">
            Contact
          </Button>
        </Link>
        <Link to="/about">
          <Button varient="ghost" className="!text-black">
            About
          </Button>
        </Link>
        <Link to="/customers">
          <Button varient="ghost" className="!text-black">
            Customers
          </Button>
        </Link>
      </div>
    </section>
  );
};
