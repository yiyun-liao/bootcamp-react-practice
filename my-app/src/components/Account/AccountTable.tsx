'use client';
import Button from "../Button";

const data = {
    0: [+100, 'Positive revenue'],
    1: [-100, 'Refund for failed transaction'],
    2: [+100, 'className="overflow-x-auto p-4className="overflow-x-auto p-4className='],
    3: [-10, 'Short refund'],
    4: [+100, 'Revenue from Product X - Extended description that is long enough to overflow the column'] 
}


export default function AccountTable(){
    function tableResult(){
        const tdRevenueStyle = "px-4 py-2 w-fit max-w-[80px]";
        const tdDescriptionStyle = "px-4 py-2 min-w-[80px] max-w-[400px] break-words whitespace-normal";
        const tdActiveStyle = "px-4 py-2 min-w-[80px]";
        
        return Object.entries(data).map(([key, [amount, label]]) => {
            const amountClass = amount >= 0 ? "text-zinc-900" : "text-red-600";
            
            return(
                <tr key={key} className="hover:bg-indigo-100">
                    <td className={`${tdRevenueStyle} ${amountClass}`}>{amount}</td>
                    <td className={tdDescriptionStyle}>{label}</td>
                    <td className={`${tdActiveStyle}`}>                
                        <Button 
                            variant="text-button" 
                            width='full'>
                                Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    return(
        <div className="overflow-x-auto p-4">
            <table className="w-full text-left text-sm">
                <caption>Your expense statement</caption>
                <colgroup>
                    <col className="w-fit min-w-[80px]" />
                    <col className="w-fit min-w-[80px]" />
                    <col className="w-fit min-w-[80px]" />
                </colgroup>
                <thead className="bg-indigo-100 text-indigo-700">
                    <tr>
                        <th scope="col" className="px-4 py-2 font-semibold">Revenue</th>
                        <th scope="col" className="px-4 py-2 font-semibold">Description</th>
                        <th scope="col" className="px-4 py-2 font-semibold text-center">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {tableResult()}
                </tbody>
            </table>	
        </div>
    )
}