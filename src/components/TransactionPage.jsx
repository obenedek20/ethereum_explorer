import { useEffect, useState } from "react";
import { useMoralisCloudFunction, useMoralisWeb3Api, useMoralisWeb3ApiCall} from "react-moralis";
import SearchBar from "./SearchBar";
import TransactionTable from "./TransactionTable";

const TransactionPage = (props) => {
    const [watchAddress, setWatchAddress] = useState("0x3057471208FEe8D6a079ae7664B89211497A4883");
    const Web3Api = useMoralisWeb3Api();
    const { fetch, data, error, isLoading} = useMoralisWeb3ApiCall(Web3Api.account.getTransactions, {
        address: watchAddress,
        chain: '0x3',
    });
    
    


    useEffect(() => {
        fetch()
    }, [watchAddress, fetch])

    const postProcess = (raw) => {
        return (raw?.result || []);
    }

    return (
        <div>
            <SearchBar setAddress={setWatchAddress}/>
            <TransactionTable loading={ isLoading } transactions={postProcess(data || [])}/>
        </div>
    )  
};

export default TransactionPage;