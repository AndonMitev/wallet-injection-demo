import ETHEREUM_ICON from 'cryptocurrency-icons/32/icon/eth.png'
import POLYGON_ICON from 'cryptocurrency-icons/32/icon/matic.png'

export const CHAIN_CONFIG = {
  1: {
    chain: 'ETHEREUM',
    rpcUrl: 'https://mainnet.infura.io/v3/9b1b4e645a9541faa755cfc71d96cad8',
    gasPrices: 'https://etherscan.io/autoUpdateGasTracker.ashx?sid=1b575f2807624a71ff84f10c8d1e251a',
    nativeAsset: 'Ether',
    icon: ETHEREUM_ICON,
    moralis: 'eth'
  },
  137: {
    chain: 'POLYGON',
    rpcUrl: 'https://polygon-mainnet.infura.io/v3/9b1b4e645a9541faa755cfc71d96cad8',
    gasPrices: 'https://gpoly.blockscan.com/gasapi.ashx?apikey=key&method=pendingpooltxgweidata',
    nativeAsset: 'Matic',
    icon: POLYGON_ICON,
    moralis: 'polygon'
  }
}

export const INJECTION_REQUESTS = {
  ON_SESSION_REQUEST: 'on_session_request',
  OFF_SESSION_REQUEST: 'off_session_request',
  ON_SEND_TRANSACTION: 'on_eth_sendTransaction_request',
  OFF_SEND_TRANSACTION: 'off_eth_sendTransaction_request',
  ON_SWITCH_CHAIN: 'on_wallet_switchEthereumChain_request',
  OFF_SWITCH_CHAIN: 'off_wallet_switchEthereumChain_request',
  ON_SIGNED_TYPED_DATA: 'on_eth_signTypedData_request',
  OFF_SIGNED_TYPED_DATA: 'off_eth_signTypedData_request'
}