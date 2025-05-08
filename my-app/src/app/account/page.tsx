'use client';
import AccountTable from "@/components/Account/AccountTable";
import Button from "@/components/Button";
import { useRouter } from 'next/navigation';
import { useUser } from '@/components/Auth/auth-utils';
import { useEffect } from "react";


const AccountPage = () => {
    const router = useRouter();
    const { userData, isLoading } = useUser();

    useEffect(() => {
        if (!isLoading && userData === null) {
            alert("尚未登入，請先登入");
            router.push('/');
        }
    }, [userData, isLoading, router]);

    function redirectPage(){
        router.push('/');    
    }

    return (
        <main>
            <section className="banner">
                <h1 className="text-2xl font-bold mb-4">Welcome {userData?.email || 'user'}!</h1>
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
  