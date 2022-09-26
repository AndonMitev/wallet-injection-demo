import { Wallet, providers } from 'ethers'
// import { toBuffer } from 'ethereumjs-util';
// import { signTypedData } from '@metamask/eth-sig-util';
import { signTypedData_v4 } from 'eth-sig-util'

import { CHAIN_CONFIG } from '../constants';
import { toBuffer } from '../utils/ethereumjs-util';


let walletController;

class WalletController {
  providersCache = {};
  walletsCache = {};
  isInitialized = false;

  isInitialized() {
    return this.walletsCache
  }

  async createWallets(seed) {
    Object.keys(CHAIN_CONFIG).forEach(chainId => {
      const { rpcUrl } = CHAIN_CONFIG[chainId];

      if (!this.walletsCache[chainId]) {
        const provider = new providers.StaticJsonRpcProvider(rpcUrl);

        this.providersCache[chainId] = provider
        this.walletsCache[chainId] = Wallet.fromMnemonic(seed).connect(provider)
      }
    })

    this.isInitialized = true;
  }

  getWallets() {
    return this.walletsCache
  }

  getWallet(chainId) {
    return this.walletsCache[chainId]
  }

  getEVMAddress() {
    return this.walletsCache[1].address
  }

  getProvider(chainId) {
    return this.providersCache[chainId]
  }

  async getNativeBalance(chainId) {
    const provider = this.getProvider(chainId)

    const balance = await provider.getBalance(this.getEVMAddress())

    return {
      chainId,
      balance
    }
  }

  async getNativeBalances() {
    const balancesPromises = []

    Object.keys(CHAIN_CONFIG).forEach(chainId => {
      balancesPromises.push(this.getNativeBalance(chainId))
    })

    return await Promise.all(balancesPromises)
  }

  async sendTransaction(chainId, params) {
    const wallet = this.getWallet(chainId)

    const tx = await wallet.sendTransaction(params)

    return tx.hash
  }

  signTypedDataMessage(chainId, message) {
    const wallet = this.getWallet(chainId)

    return signTypedData_v4(toBuffer(wallet.privateKey), { data: JSON.parse(message) })
  }
}

if (!walletController) {
  walletController = new WalletController()
}

export { walletController }

