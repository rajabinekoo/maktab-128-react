import { useEffect } from "react";
import { useNavigate } from "react-router";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);
  return (
    <main className="w-screen h-[calc(100vh-60px)] flex justify-center items-center flex-col">
      <img
        src="https://images.all-free-download.com/images/graphiclarge/error_404_page_not_found_6845510.jpg"
        alt="404"
        className="max-w-[600px]"
      />
      <p className="mt-5 font-semibold text-2xl">404 Not Found</p>
    </main>
  );
};
