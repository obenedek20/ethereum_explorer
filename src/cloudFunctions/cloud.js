
//comment this out when saving changes
import Moralis from "moralis";

Moralis.Cloud.define("searchEthAddress", async (request) => {
    const logger = Moralis.Cloud.getLogger();

    const address = request.params.address.toLowerCase();
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
  return await Moralis.Cloud.run("watchEthAddress", {address: address, sync_historical: true}, {useMasterKey: true});
});

Moralis.Cloud.define("getTransactions", async(request) => {
  const logger = Moralis.Cloud.getLogger();
  const address = request.params.address.toLowerCase();
  const squery = new Moralis.Query("_AddressSyncStatus");
  logger.info('logging begin');
  squery.equalTo("address", address);
  const queryCount = await squery.count();

  if (Number(queryCount) <= 0){
    logger.info("begin watch");
    await Moralis.Cloud.run("watchEthAddress", {address: address, sync_historical: true}, {useMasterKey: true});
    logger.info("end watch");
  }
  logger.info(await squery.count());

  const query1 = new Moralis.Query("EthTransactions");
  query1.equalTo("from_address", address);
  const query2 = new Moralis.Query("EthTransactions");
  query2.equalTo("to_address", address);
  const query = Moralis.Query.or(query1, query2);
  query.descending("block_number");
  query.withCount();
  const results = await query.find();
  return {synced: true, results: results};
});