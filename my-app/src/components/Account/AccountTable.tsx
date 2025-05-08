'use client';
import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import { addExpenseData, readExpenseData, deleteExpenseData} from "@/components/Account/Account"
import { useUser } from '@/components/Auth/auth-utils';

type DataEntry = [number, string];
type Data = Record<string, DataEntry>;
// data = { key : [amount, desc]}

const selectOption = {
    "add": "+",
    "minus":"-"
}

export default function AccountTable(){
    const [addMathSymbol, setAddMathSymbol] = useState('add');
    const [addAmount, setAddAmount] = useState('');
    const [addDesc, setAddDesc] = useState('');
    const [data, setData] = useState<Data>({});
    
    const { userData, isLoading } = useUser();
    const userId =String(userData?.userId)
    
    const addExpenseStyle = "flex gap-2 flex-wrap p-4  max-w-2xl"
    const addTotalStyle = "p-4 max-w-2xl text-center bg-indigo-100 w-full rounded-lg"

    // ------------- 新增資料 ------------
    async function handleAddExpense(){
        if (!addMathSymbol || !addAmount || !addDesc) return alert('請重新編輯');

        const symbol = addMathSymbol === 'minus' ? -1 : 1;
        const newAmount = symbol * Number(addAmount);
        
        addExpenseData(userId, newAmount,addDesc);

        // 清空表單
        setAddAmount('');
        setAddDesc('');
        setAddMathSymbol('add');
    }

    // ------------- 刪除資料 ------------
    function handleDeleteExpense(deleteKey:string){
        deleteExpenseData(deleteKey);
        // console.log("刪除資料", deleteKey)
        // console.log(data)
    }

    // ------------- 渲染圖表 ------------
    useEffect(() => {
        const unsubscribe = readExpenseData(userId, (newData) => {
            setData(newData);
        });
    
        return () => unsubscribe && unsubscribe(); // 清除監聽
    }, [userId]);
    
    function tableResult(){

        const tdRevenueStyle = "px-4 py-2 w-fit max-w-[80px]";
        const tdDescriptionStyle = "px-4 py-2 w-full max-w-[400px] break-words whitespace-normal";
        const tdActiveStyle = "px-4 py-2 min-w-[80px]";
        
        return Object.entries(data).map(([key, [amount, desc]]) => {
            const amountClass = amount >= 0 ? "text-zinc-900" : "text-red-600";
            
            return(
                <tr key={key} className="hover:bg-indigo-100">
                    <td className={`${tdRevenueStyle} ${amountClass}`}>{amount}</td>
                    <td className={tdDescriptionStyle}>{desc}</td>
                    <td className={`${tdActiveStyle}`}>                
                        <Button 
                            variant="text-button" 
                            width='full'
                            key={key}
                            onClick={() => handleDeleteExpense(String(key))}>
                                Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    // ------------- 計算總額 ------------
    function totalResult(){
        let total = 0;
        Object.entries(data).forEach(([, [amount]]) => {
            total += amount;
        })
        let totalClass = "text-sm font-bold"
        if(total < 0) {
            totalClass += " text-red-600";
        }else{
            totalClass += " text-zinc-900";
        }
        return(
            <p className={totalClass}>小計: {total}</p>
        )
    }

    return(
        <>
            <div id="addExpense" className={addExpenseStyle}>
                <Select
                    id="amountSymbol"
                    label = '支出/收入'
                    value={addMathSymbol}
                    optionData={selectOption}
                    onChange={(e) => setAddMathSymbol(e.target.value)}
                />
                <Input
                    label = '金額'
                    type="number"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                />
                <Input
                    label = '支出明細'
                    type="text"
                    value={addDesc}
                    onChange={(e) => setAddDesc(e.target.value)}
                />
                <div className="pt-8">
                    <Button 
                        variant="solid" 
                        width='full' 
                        type="submit"
                        onClick={handleAddExpense} >
                            新增紀錄
                    </Button>
                </div>
            </div>
            <div className="overflow-x-auto p-4 max-w-2xl w-full">
                <table className="w-full text-left text-sm">
                    <caption>Your expense statement</caption>
                    <colgroup>
                        <col className="min-w-[80px]" />
                        <col className="min-w-[80px]" />
                        <col className="min-w-[80px]" />
                    </colgroup>
                    <thead className="bg-indigo-100 text-indigo-700 w-full">
                        <tr className="w-full">
                            <th scope="col" className="px-4 py-2 font-semibold">Revenue</th>
                            <th scope="col" className="px-4 py-2 font-semibold w-full">Description</th>
                            <th scope="col" className="px-4 py-2 font-semibold text-center">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableResult()}
                    </tbody>
                </table>	
            </div>
            {isLoading? (<p className="text-center text-2xl text-indigo-800 font-black ">Loading...</p> ): ''}
            <div className={addTotalStyle}>
                {totalResult()}
            </div>
        </>
    )
}