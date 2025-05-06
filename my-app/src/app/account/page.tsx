import AccountTable from "@/components/Account/AccountTable";

const AccountPage: React.FC = () => {
    return (
        <main>
            <section className="banner">
                <h1 className="text-2xl font-bold mb-4">Welcome to your account</h1>
            </section>
            <AccountTable/>
        </main>
    );
};

export default AccountPage;
  