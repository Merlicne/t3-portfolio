"use server";

import { signOut, signIn } from "../auth";


const handleSignOut = async () => {
    await signOut({
        redirectTo: "/",
    });
};

const signInWithGithub = async () => {
    "use server"
    await signIn("github", {
        redirectTo: "/"
    })
}



export { handleSignOut, signInWithGithub };