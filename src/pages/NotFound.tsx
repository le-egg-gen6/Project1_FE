import { useNavigate } from "react-router-dom";
import NotFoundImage from "@/assets/404.svg";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col justify-center items-center p-5 text-center">
      <img
        src={NotFoundImage}
        alt="Page Not Found"
        className="max-w-[60%] max-h-[40%] object-contain mb-5"
      />
      <h1 className="text-2xl text-gray-800 mb-2">Oops! Page Not Found</h1>
      <p className="text-base text-gray-600 mb-5">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        onClick={() => navigate("/")}
        className="px-10 py-6 text-xl rounded-lg shadow-md"
      >
        Go to Home
      </Button>
    </div>
  );
}
