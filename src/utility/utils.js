import { DateTime } from 'luxon';



export const processTransaction = (transaction) => {
    //format transaction data nicely to display in the transactions table
    const processed = {
        ...transaction,
        hash: shortenString(transaction.hash),
        block_number: transaction.block_number,
        age: agoTime(transaction.block_timestamp.valueOf()),
        from_address: shortenString(transaction.from_address),
        to_address: shortenString(transaction.to_address),
        value: toEth(parseInt(transaction.value)),
        gas: toEth(parseInt(transaction.gas)),
    }
    return processed;
};


//convert block timestamp to relative time "e.g. 4 hours ago"
export const agoTime = (unixTimeStampMili) => {
    return DateTime.fromMillis(unixTimeStampMili).toRelative();
}

//shortens long strings such as addresses to 12 characters with an ellipses in the middle
export const shortenString = (address) => {
    if (!address.length || address.length <= 12)
        return address;
    return address.substring(0, 6) + "..." + address.substring(address.length - 6, address.length);
};

//converts quantities given in gwei (1e-18 Eth) to Eth
export const toEth = (gweiAmount) => {
    return (gweiAmount / Math.pow(10, 18) + " ETH");
};
