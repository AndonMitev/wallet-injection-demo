let assetsController;

class AssetsController {
  nativeAssets = {};
  erc20Assets = {};
  nftAssets = {};

  setNativeAssets(nativeAssets) {
    nativeAssets.forEach(({ balance, chainId }) => {
      this.nativeAssets[chainId] = balance;
    })
  }

  setERC20Assets(erc20Assets) {
    erc20Assets.forEach(({ erc20Token, chainId }) => {
      this.erc20Assets[chainId] = {
        ...erc20Token
      }
    })
  }

  setNFTAssets(nftAssets) {
    nftAssets.forEach(({ nftAsset, chainId }) => {
      this.nftAssets[chainId] = {
        ...nftAsset
      }
    })
  }
}

if (!assetsController) {
  assetsController = new AssetsController();
}

export { assetsController }