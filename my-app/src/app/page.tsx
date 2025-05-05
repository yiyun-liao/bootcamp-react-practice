import AuthForm from '../components/AuthForm';

const Page: React.FC = () => {
    let styleH2 = "text-lg text-indigo-800 font-black pb-1";

    return (
        <main>
            <div>
                <h2 className={styleH2}>註冊帳號</h2>
                <AuthForm type="signup" />
            </div>
            <div>
                <h2 className={styleH2}>登入系統</h2>
                <AuthForm type="signin" />
            </div>
        </main>
    );
};

export default Page;
