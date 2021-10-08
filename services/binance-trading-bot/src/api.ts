import {Spot} from '@binance/connector';

type IApiSource = {
  baseURL: string;
  api: string;
  ws: string;
  stream: string;
};

const SPOT_API_SOURCE: IApiSource = {
  baseURL: 'https://api.binance.com',
  api: 'https://api.binance.com/api',
  ws: 'wss://stream.binance.com:9443/ws',
  stream: 'wss://stream.binance.com:9443/stream',
};

const SPOT_TEST_API_SOURCE: IApiSource = {
  baseURL: 'https://testnet.binance.vision',
  api: 'https://testnet.binance.vision/api',
  ws: 'wss://testnet.binance.vision/ws',
  stream: 'wss://testnet.binance.vision/stream',
};

const createBinanceClient = (apiKey: string, secretKey: string, apiSource: IApiSource) =>
  new Spot(apiKey, secretKey, {
    baseUrl: apiSource.baseURL,
  });

export const spotTestClient = createBinanceClient(
  process.env.BINANCE_TESTNET_API_KEY,
  process.env.BINANCE_TESTNET_SECRET_KEY,
  SPOT_TEST_API_SOURCE,
);
