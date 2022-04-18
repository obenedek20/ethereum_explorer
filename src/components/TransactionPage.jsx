import { useEffect, useState } from "react";
import { useMoralisCloudFunction, useMoralisQuery, useMoralis, useMoralisSubscription } from "react-moralis";
import SearchBar from "./SearchBar";
import TransactionTable from "./TransactionTable";

const TransactionPage = (props) => {
    const [watchAddress, setWatchAddress] = useState("0x3057471208FEe8D6a079ae7664B89211497A4883");
    
    const { fetch, data, error, isLoading, isFetching} = useMoralisCloudFunction("getEthTransactions", {address: watchAddress});
    
    const { data: isSyncing, isLoading: isSyncLoading } = useMoralisQuery("_AddressSyncStatus", query=>
    query
        .equalTo("address", watchAddress.toLowerCase()), [watchAddress], {
            live: true
        },
    )

    const syncingToSynced = (arg) => {
        if (arg?.at(0)?.attributes?.is_syncing === false){
            return false;
        }
        return true;
    }


    useEffect(() => {
        console.log("refetching from sync change");
        fetch()
    }, [isSyncing, fetch])

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