import { useEffect, useState } from "react";
import { useMoralisCloudFunction, useMoralisQuery, useMoralis, useMoralisSubscription } from "react-moralis";
import SearchBar from "./SearchBar";
import TransactionTable from "./TransactionTable";

const TransactionPage = (props) => {
    //stores the address we currently want to display transactions for
    const [watchAddress, setWatchAddress] = useState("0x3057471208FEe8D6a079ae7664B89211497A4883");
    
    //calls the 'getEthTransactions' cloud function to get the array of transactions for watchAddress
    const { fetch, data, error, isLoading, isFetching} = useMoralisCloudFunction("getEthTransactions", {address: watchAddress});
    

    //subscription to keep track of whether the current address is synced or not
    const { data: isSyncing, isLoading: isSyncLoading } = useMoralisQuery("_AddressSyncStatus", query=>
    query
        .equalTo("address", watchAddress.toLowerCase()), [watchAddress], {
            live: true
        },
    )

    //helper function to extract the boolean indicating whether watchAddress is still syncing or not from isSyncing
    const syncingToSynced = (arg) => {
        if (arg?.at(0)?.attributes?.is_syncing === false){
            return false;
        }
        return true;
    }

    //refetch data when our subscription tells us the the address is synced
    useEffect(() => {
        console.log("refetching from sync change");
        fetch()
    }, [isSyncing, fetch])


    //helper function to extract the array of transactions from the JSON object returned by 'getEthTransactions'
    const postProcess = (raw) => {
        const transArray = raw?.results?.results;
        if (!transArray)
            return [];
        return (transArray.map((res) => {
            return res.attributes
        }));
    }

    return (
        <div>
            <SearchBar setAddress={setWatchAddress}/>
            <TransactionTable loading={syncingToSynced(isSyncing) || isLoading || isFetching} transactions={postProcess(data)}/>
        </div>
    )  
};

export default TransactionPage;