import AuthForm from '../components/AuthForm';

const Page: React.FC = () => {
    let banner = "w-full px-4 py-6  bg-indigo-200"
    let authForm = "max-w-sm"
    let styleH1 = "text-2xl text-indigo-800 font-black pb-1 m-auto text-center";
    let styleH2 = "text-lg text-indigo-800 font-black pb-1";

    return (
        <main>
            <section className={banner}>
                <h1 className={styleH1}>React 練習用專案</h1>
            </section>
            <section className={authForm}>
                <h2 className={styleH2}>註冊帳號</h2>
                <AuthForm type="signup" />
            </section>
            <section className={authForm}>
                <h2 className={styleH2}>登入系統</h2>
                <AuthForm type="signin" />
            </section>
        </main>
    );
};

export default Page;
