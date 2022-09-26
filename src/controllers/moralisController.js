import axios from 'axios'
import { CHAIN_CONFIG } from '../constants';

let moralisController;

class MoralisController {
  axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://deep-index.moralis.io/api/v2',
      headers: {
        'X-API-Key': '5w0DccADncjqRcSbc9D8XepM4KqvXBVOKUmnIALUMKI5DYf68VYaus4XsgeHK6Rf'
      }
    })
  }

  async getWalletERC20Balances(address) {
    const erc20BalancesPromises = [];

    Object.keys(CHAIN_CONFIG).forEach(chainId => {
      const request = this.axiosInstance.get(`/${address}/erc20?chain=${CHAIN_CONFIG[chainId].moralis}`)

      erc20BalancesPromises.push(request)
    })

    const response = await Promise.all(erc20BalancesPromises);

    return response.map((r, i) => ({
      erc20Token: r.data.map(data => ({
        ...data
      })),
      chainId: Object.keys(CHAIN_CONFIG)[i]
    }))
  }

  async getWalletNFTBalances(address) {
    const nftBalancesPromises = [];

    Object.keys(CHAIN_CONFIG).forEach(chainId => {
      const request = this.axiosInstance.get(`/${address}/nft?chain=${CHAIN_CONFIG[chainId].moralis}&format=decimal`)

      nftBalancesPromises.push(request)
    })

    const response = await Promise.all(nftBalancesPromises);

    return response.map((r, i) => ({
      nftAsset: r.data.result.map(token => ({
        amount: token.amount,
        metadata: JSON.parse(token.metadata),
        name: token.name,
        symbol: token.symbol,
        id: token.id,
        address: token.address
      })),
      chainId: Object.keys(CHAIN_CONFIG)[i]
    }))
  }
}

if (!moralisController) {
  moralisController = new MoralisController()
}

export { moralisController }



