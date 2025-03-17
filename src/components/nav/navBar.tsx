import { auth } from "@/server/auth";
import Link from "next/link";
import { Menu, Button, Portal } from "@chakra-ui/react";
import { handleSignOut, signInWithGithub } from "@/server/action/auth";



export default async function NavBar() {
    const session = await auth();
    const userName = session?.user?.name;

    return (
        <nav className="flex items-center justify-between w-full px-5 py-4 border-b border-gray-100">
            <div>
                <Link href="/" className="text-lg font-medium tracking-wide text-gray-800 hover:text-gray-600 transition-colors">
                    Merl-App
                </Link>
            </div>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link href="#" className="hover:text-gray-800 transition-colors">Home</Link>
                    <Link href="#" className="hover:text-gray-800 transition-colors">Contact</Link>
                    <Link href="#" className="hover:text-gray-800 transition-colors">About</Link>
                </div>

                <div className="pl-8 border-l border-gray-100">
                    {userName ? <Profile name={userName} /> : <GoToLogin />}
                </div>
            </div>
        </nav>
    );
}

interface ProfileProps {
    name: string;
}


const Profile: React.FC<ProfileProps> = ({ name }) => {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant="outline" size="sm">
                    {name}
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item value="dashboard">
                            <a href="/dashboard">
                                Dashboard
                            </a>
                        </Menu.Item>
                        <Menu.Item value="logout">
                            <form action={handleSignOut}>
                                <button type="submit">
                                    Logout
                                </button>
                            </form>
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};

function GoToLogin() {
    return (
        // <Link
        //     href="/login"
        //     className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
        // >
        //     Login
        // </Link>
        <form action={signInWithGithub}>
            <button type="submit">
                Login
            </button>
        </form>
    );
}