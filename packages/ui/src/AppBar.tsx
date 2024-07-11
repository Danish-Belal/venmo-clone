import { Button } from "./button";

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
        window.location.href = '/api/signin';
    };

    const handleSignin = () => {
        window.location.href = '/api/signin';
    };

    return (
        <div className="flex justify-between border-b px-4">
            <div className="flex flex-col justify-center text-2xl font-semibold mb-4 text-blue-500 m-4">
                Venmo
            </div>
            <div className="flex flex-col justify-center pt-2">
                <Button onClick={user ? handleLogout : handleSignin}>
                    {user ? "Logout" : "Login"}
                </Button>
            </div>
        </div>
    );
};
