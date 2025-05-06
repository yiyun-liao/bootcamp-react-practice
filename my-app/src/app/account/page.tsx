'use client';
import AccountTable from "@/components/Account/AccountTable";
import Button from "@/components/Button";
import { useRouter } from 'next/navigation';


const AccountPage: React.FC = () => {
    const router = useRouter();
    function redirectPage(){
        router.push('/');    
    }

    return (
        <main>
            <section className="banner">
                <h1 className="text-2xl font-bold mb-4">Welcome to your account</h1>
            </section>
            <AccountTable/>
            <div>
                <Button 
                    variant="solid" 
                    width='fit'
                    onClick={redirectPage}>
                        返回首頁
                </Button>
            </div>
        </main>
    );
};

export default AccountPage;
  