import BN from 'bignumber.js'
import startsWith from 'lodash/startsWith';
import axios from 'axios';

export const getGasPrice = async (source) => {
  const { data: { result: { rapidgaspricegwei } } } = await axios.get(source)

  // Ultra rapid care for Ethereum might be ultra drainy
  return rapidgaspricegwei * 10 ** 9 * 2
}

export const getFee = (gas, gasPrice) => {
  return gas * gasPrice
}

export const convertHexToString = (hex) => new BN(hex).toFixed();

export const addHexPrefix = (value) =>
  startsWith(value, '0x') ? value : `0x${value}`;

