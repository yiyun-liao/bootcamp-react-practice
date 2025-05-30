'use client'
import SignInForm from '@/components/Auth/SignInForm';
import SignUpForm from '@/components/Auth/SignUpForm';
import LogOutForm from '@/components/Auth/SignOutForm';
import { useUser } from '@/components/Auth/auth-utils';


const Page = () => {
    const { userData, isLoading } = useUser();
    // console.log(userData)

    const authForm = "max-w-sm w-full";
    const styleH1 = "text-2xl text-indigo-800 font-black pb-1 m-auto text-center";
    const styleH2 = "text-lg text-indigo-800 font-black pb-1";

    return (
        <main>
            <section className="banner">
                <h1 className={styleH1}>React 練習用專案</h1>
            </section>
            {isLoading ? (<p className="text-center text-2xl text-indigo-800 font-black ">Loading...</p> ): 
            (userData ?
            (
                <section className={authForm}>
                    <h2 className={styleH2}>Hello {userData.email || 'user'}!</h2>
                    <LogOutForm type="signout" />
                </section>
            ):(
                <>
                    <section className={authForm}>
                        <h2 className={styleH2}>Sign in</h2>
                        <SignInForm type="signin" />
                    </section>
                    <section className={authForm}>
                        <h2 className={styleH2}>Sign up</h2>
                        <SignUpForm type="signup" />
                    </section>
                </>
            ))}
        </main>
    );
};

export default Page;
