
//comment this out when saving changes
import Moralis from "moralis";

Moralis.Cloud.define("searchEthAddress", async (request) => {
    //logger for debugging
    const logger = Moralis.Cloud.getLogger();

    //converts address to lowercase in case that wasn't already done
    const address = request.params.address.toLowerCase();

    //if address doesn't exist, then return null
  if (!address) {
    return null;
  }
  // find out if address is already watched
  const query = new Moralis.Query("WatchedEthAddress");
  query.equalTo("address", address);
  const watchCount = await query.count();

  if (watchCount > 0) {
    // already watched don't sync again
    return null;
  }

  //watch given address and sync historical data. NOTE: the master key is required for the 'watchEthAddress' function
  return await Moralis.Cloud.run("watchEthAddress", {address: address, sync_historical: true}, {useMasterKey: true});
});

Moralis.Cloud.define("getEthTransactions", async(request) => {
  //logger for debugging
  const logger = Moralis.Cloud.getLogger();
  //converts address to lowercase in case that wasn't already done
  const address = request.params.address.toLowerCase();
  //creates a query to determine if the address is already synced
  const squery = new Moralis.Query("_AddressSyncStatus");
  squery.equalTo("address", address);
  const queryCount = await squery.count();

  //if the address is not synced, then begin watching that address and return an empty array for now
  if (Number(queryCount) <= 0){

    await Moralis.Cloud.run("watchEthAddress", {address: address, sync_historical: true}, {useMasterKey: true});
    return {synced: false, results: []};
  }

  //contains a query containing any transactions where the address is the sender
  const query1 = new Moralis.Query("EthTransactions");
  query1.equalTo("from_address", address);

  //contains a query containing any transactions where the address is the receiver
  const query2 = new Moralis.Query("EthTransactions");
  query2.equalTo("to_address", address);

  //combines query1 and query2 to get a single query with all transactions where the address is involved
  const query = Moralis.Query.or(query1, query2);
  
  //sort the transactions in descending order of block number
  query.descending("block_number");

  //include the count of matching objects in the response
  query.withCount();

  const results = await query.find();
  return {synced: true, results: results};
});