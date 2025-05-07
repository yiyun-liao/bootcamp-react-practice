import { db, collection, addDoc, query, where, getDocs, doc,deleteDoc, onSnapshot, orderBy, serverTimestamp } from "../../../firebase.js"; // 載入 firebase 配置

// 新增資料
async function addExpenseData(userId:number, amount:number,desc:string){
    try {
        await addDoc(collection(db, "expenses"), {
            userId: userId,
            amount: amount,
            description: desc,
            createdAt: serverTimestamp(),
        });
        console.log("add success", amount)
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

type DataEntry = [number, string];
type Data = Record<string, DataEntry>;

//讀取資料 query search
function readExpenseData(userId:number, callback: (data: Data) => void): (() => void) | undefined {

    if (!userId) return;

    const readExpenseQuery = query(
        collection(db, "expenses"),
        where('userId', '==', userId),
        orderBy('createdAt', 'asc')
    );

    // 設置 onSnapshot 監聽器
    const unsubscribe = onSnapshot(readExpenseQuery, (snapshot) => {
        const result: Data = {};
        snapshot.forEach((doc) => {
            const { amount, description } = doc.data();
            result[doc.id] = [amount, description];
        });
        callback(result);
    }, (error) => {
        console.error("Error with snapshot listener:", error);
    });

    return unsubscribe; // ✅ 可用於 useEffect 的清除函式
}

// 新增資料
async function deleteExpenseData(key:string){
    try {
        await deleteDoc(doc(db, "expenses", key));
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export {addExpenseData, readExpenseData, deleteExpenseData};