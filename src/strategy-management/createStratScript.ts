import { ethers } from 'ethers';
import { ContractsApi } from '../contracts-api';
import { Decimals } from '../utils/decimals';
import { createBuySellStrategy } from '../strategy-management/createStrategy';
import { Logger } from '../common/logger';

// Initialize logger
const logger = new Logger('createStrategyScript.ts');

// Replace these with actual values
const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
const api = new ContractsApi(provider); // Pass provider instead of wallet
const decimals = new Decimals(async (address: string) => {
  // Fetch decimals for the token address
  const contract = new ethers.Contract(address, ['function decimals() view returns (uint8)'], provider);
  return await contract.decimals();
});

// Replace these with actual strategy parameters
const baseToken = 'BASE_TOKEN_ADDRESS';
const quoteToken = 'QUOTE_TOKEN_ADDRESS';
const buyPriceLow = 'BUY_PRICE_LOW';
const buyPriceMarginal = 'BUY_PRICE_MARGINAL';
const buyPriceHigh = 'BUY_PRICE_HIGH';
const buyBudget = 'BUY_BUDGET';
const sellPriceLow = 'SELL_PRICE_LOW';
const sellPriceMarginal = 'SELL_PRICE_MARGINAL';
const sellPriceHigh = 'SELL_PRICE_HIGH';
const sellBudget = 'SELL_BUDGET';
const overrides = {}; // Optional transaction overrides

async function main() {
  try {
    const transaction = await createBuySellStrategy(
      api,
      decimals,
      baseToken,
      quoteToken,
      buyPriceLow,
      buyPriceMarginal,
      buyPriceHigh,
      buyBudget,
      sellPriceLow,
      sellPriceMarginal,
      sellPriceHigh,
      sellBudget,
      overrides
    );

    logger.log('Transaction created:', transaction);
  } catch (error) {
    logger.error('Error creating strategy:', error);
  }
}

main();