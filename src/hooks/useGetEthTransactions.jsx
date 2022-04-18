import { useEffect, useState } from "react";
import { useMoralisCloudFunction, useMoralis } from "react-moralis";

const useGetEthTransactions = (address) => {
    const [isLoading, setIsLoading] = useState(true);
    const { Moralis, isInitialized} = useMoralis();
    const {fetch, data, error} = useMoralisCloudFunction("getEthTransactions", {address: address});
    useEffect(() => {
        setIsLoading(true);
        if (!isInitialized)
            return;
        Moralis.Cloud.run(
            'watchEthAddressMaster',
            {
                address: address,
            },
            ).then(fetch());
        
        setIsLoading(false);
    }
        , [address, Moralis, isInitialized, fetch]);





    return {data, error, isLoading};
};


export default useGetEthTransactions;