import { Button } from "./button";
import Link from 'next/link';

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({
  user,
  onSignin,
  onSignout
}: AppbarProps) => {

  const handleLogout = () => {
    onSignout();
  };

  return (
    <div className="flex justify-between border-b px-4">
      <Link href={user ? "/dashboard" : "/api/signin"} passHref>
        <Button onClick={()=>{}} className="flex flex-col justify-center text-2xl font-semibold mb-4 text-blue-500 m-4">
          Venmo
        </Button>
      </Link>
      <div className="flex flex-col justify-center pt-2">
        <Button 
          onClick={user ? handleLogout : onSignin} 
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
