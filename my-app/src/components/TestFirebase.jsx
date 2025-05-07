//------ practice ------
'use client';
import { setDoc, collection, getDocs, getDoc, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, where, limit } from "firebase/firestore";
import { db } from "../../firebase.js"; // 載入 firebase 配置

export default function TestFirebase(){
    
    // ------ practice ------ 
    // 加入件
    const specialOfTheDay = doc(db, 'dailySpecial/2021-09-14'); //集合、文檔、集合、文檔
    // 藉由子路徑加入文件 = dailySpecial/2021-09-14/orderHistory/totalSales
    const childDoc = doc(specialOfTheDay, 'orderHistory/totalSales'); 
    
    // 寫入內容 setDoc(doc(db, "users", "user_123"), {})
    async function writeDailySpecial(){
        const docData = {
            description: 'bbbba',
            price: 3.99,
            milk: 'whole',
            vegan: false
        };
        try {
            await setDoc(specialOfTheDay, docData); //建立
            // await updateDoc(specialOfTheDay, docData); //覆蓋原有內容，如果文件不存在會報錯
            // await setDoc(specialOfTheDay, docData, {merge:true}); //如果文件不存在，建立。如果存在，取代
            console.log("add success", docData)
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
    // writeDailySpecial();

    // 新增內容 addDoc(collection(db, "users"),{})
    async function addNewDocument(){
        const orderCollection = collection(db, 'dailySpecial')
        try {
            await addDoc(orderCollection, {
                description: 'addNewDocument',
                price: 3.99,
                milk: 'whole',
                vegan: false
            });
            console.log("add success")
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
    // addNewDocument();


    // readDocument
    async function readSingleDocument(){
        const docRef = doc(db, 'dailySpecial', '2021-09-14');
        try {
            const mySnapshot = await getDoc(docRef);
            onSnapshot(docRef)
            if (mySnapshot.exists()){
                const docData = mySnapshot.data();
                const data = JSON.stringify(docData);
                console.log("read success", data)
            }
        } catch (error) {
            console.error("Error show document: ", error);
        }
    }
    // readSingleDocument();

    // readCollection
    async function readCollection(){
        try {
            const mySnapshot = await getDocs(collection(db, 'dailySpecial'));
            if (!mySnapshot.empty){
                mySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                  });
            }
        } catch (error) {
            console.error("Error show document: ", error);
        }
    }
    // readCollection();

    // onSnapshot() -> single document
    let dailySpecialUnsubscribe;
    async function listenToADocument(){
        const docRef = doc(db, 'dailySpecial', '2021-09-14');
        try {
            dailySpecialUnsubscribe = onSnapshot(docRef, (docSnap) => {
                if(docSnap.exists()){
                    const docData = docSnap.data();
                    console.log(`In realtime, docSnap is ${JSON.stringify(docData)}`)
                }
            })
        } catch (error) {
            console.error("Error show document: ", error);
        }
    }
    listenToADocument();

    function cancelMyListenerAtTheAppropriateTime(){
        dailySpecialUnsubscribe();
    }

    //query search
    async function queryForDocuments(){
        const customerOrdersQuery = query(
            collection(db, 'dailySpecial'),
            where('milk', '==', 'whole'),
            limit(10)
        )
        try {
            const querySnapshot = await getDocs(customerOrdersQuery);
            querySnapshot.forEach((snap) => {
                console.log(`Document ${snap.id} contains ${JSON.stringify(snap.data())}`)
            })
            // onSnapshot
            onSnapshot(customerOrdersQuery, (querySnapshot) => {
                querySnapshot.forEach((snap) => {
                    console.log(`[onSnapshot] Document ${snap.id} contains ${JSON.stringify(snap.data())}`)
                })
            })
        } catch (error) {
            console.error("Error show document: ", error);
        }
    }
    queryForDocuments();

    return(
        <p>TestFirebase</p>
    )
}