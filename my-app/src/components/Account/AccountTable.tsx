'use client';
import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import { db, collection, addDoc } from "../../../firebase.js"; // 載入 firebase 配置

type DataEntry = [number, string];
type Data = Record<number, DataEntry>;

const selectOption = {
    "add": "+",
    "minus":"-"
}

export default function AccountTable(){
    const [addMathSymbol, setAddMathSymbol] = useState('add');
    const [addAmount, setAddAmount] = useState('');
    const [addDesc, setAddDesc] = useState('');
    const [data, setData] = useState<Data>({
        0: [+100, 'Positive revenue'],
        1: [-100, 'Refund for failed transaction'],
        2: [+100, 'className="overflow-x-auto p-4className="overflow-x-auto p-4className='],
        3: [-10, 'Short refund'],
        4: [+100, 'Revenue from Product X - Extended description that is long enough to overflow the column'] 
    });

    const addExpenseStyle = "flex gap-2 flex-wrap p-4  max-w-2xl"
    const addTotalStyle = "p-4 max-w-2xl text-center bg-indigo-100 w-full rounded-lg"

    // ------------- 新增資料 ------------
    async function handleAddExpense(){
        if (!addMathSymbol || !addAmount || !addDesc) return alert('請重新編輯');

        const symbol = addMathSymbol === 'minus' ? -1 : 1;
        const newAmount = symbol * Number(addAmount);
        // const newKey = Math.max(...Object.keys(data).map(Number)) + 1;

        try {
            // 新增資料到 Firestore
            await addDoc(collection(db, "expenses"), {
                amount: newAmount,
                description: addDesc,
                timestamp: new Date(),
            });
            console.log("add success", newAmount)
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        // 清空表單
        setAddAmount('');
        setAddDesc('');
        setAddMathSymbol('add');
    }

    // ------------- 刪除資料 ------------
    function handleDeleteExpense(deleteKey:number){
        const newData = {...data};
        delete newData[deleteKey];
        setData(newData);
        const userId =1;

        console.log("刪除資料", deleteKey, userId)
        console.log(data)
    }

    // ------------- 渲染圖表 ------------
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
                            width='full'
                            key={key}
                            onClick={() => handleDeleteExpense(Number(key))}>
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
                    //invalid={!submitted && !!showPasswordError}
                    //errorMessage={!submitted && showPasswordError ? showPasswordError : ''}
                    onChange={(e) => setAddMathSymbol(e.target.value)}
                />
                <Input
                    label = '金額'
                    type="number"
                    value={addAmount}
                    //invalid={!submitted && !!showPasswordError}
                    //errorMessage={!submitted && showPasswordError ? showPasswordError : ''}
                    onChange={(e) => setAddAmount(e.target.value)}
                />
                <Input
                    label = '支出明細'
                    type="text"
                    value={addDesc}
                    //invalid={!submitted && !!showPasswordError}
                    //errorMessage={!submitted && showPasswordError ? showPasswordError : ''}
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
            <div className="overflow-x-auto p-4 max-w-2xl">
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
            <div className={addTotalStyle}>
                {totalResult()}
            </div>
        </>
    )
}