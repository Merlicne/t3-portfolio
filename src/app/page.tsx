import NavBar from "@/components/nav/navBar";
import { handleSignOut, signInWithGithub } from "@/server/action/auth";
import { auth } from "@/server/auth";

export default async function HomePage() {

  const session = await auth();
  const userName = session?.user?.name;


  return (
    <>
    <NavBar />
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to Merl-App</h1>
      {
        userName ? (
          <>
            <p className="text-lg mt-2">Hello, {userName}</p>
            <form action={handleSignOut}>
              <button className="text-lg mt-2 underline">Sign out</button>
            </form>
          </>
        ) : (
          <form action={signInWithGithub}>
            <button className="text-lg mt-2 underline">Sign in with Github</button>
          </form>
        )
      }

    </main>
      </>
  );
}
