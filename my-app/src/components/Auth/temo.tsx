'use client';
import Button from "../Button"
import { useRouter } from 'next/navigation';


interface LogOutFormProps {
    type?: string;
}

export default function LogOutForm({type}:LogOutFormProps){
    const router = useRouter();

    function redirectPage(){
        router.push('/account');    
    }
    return(
        <div>
            <div className="flex justify-end gap-2">
                <Button 
                    variant="text-button" 
                    width='full' >
                        {type}
                </Button>
                <Button 
                    variant="solid" 
                    width='full' 
                    onClick={redirectPage}>
                        Account Page
                </Button>
            </div>
        </div>
    )
}