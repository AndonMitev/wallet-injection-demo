import { useEffect } from 'react'
import { walletController, moralisController, assetsController } from '../../controllers'

export const Assets = () => {
  useEffect(() => {
    (async () => {
      const evmAddress = walletController.getEVMAddress();

      const nativeBalances = await walletController.getNativeBalances()
      const erc20Balances = await moralisController.getWalletERC20Balances(evmAddress)
      const nftBalances = await moralisController.getWalletNFTBalances(evmAddress)

      assetsController.setNativeAssets(nativeBalances);
      assetsController.setERC20Assets(erc20Balances)
      assetsController.setNFTAssets(nftBalances)
    })()
  })

  return (
    <div>
      <h3>Portfolio</h3>
    </div>
  )
}