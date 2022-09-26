
import { useEffect, useState } from 'react';

import { CustomModal } from '..';
import { emitterController, walletController } from '../../../controllers/'
import { Button } from '../../Button';

import { CHAIN_CONFIG, INJECTION_REQUESTS } from '../../../constants';
import { convertHexToString } from '../../../utils';

const { ON_SWITCH_CHAIN, OFF_SWITCH_CHAIN } = INJECTION_REQUESTS


export const RequestSwitchChainModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState();


  useEffect(() => {
    emitterController.on(ON_SWITCH_CHAIN, ({ params }) => {
      console.log('PARAAMS ', params)

      const [data] = params;
      setData({
        chainId: convertHexToString(data.chainId)
      })
      setIsOpen(true)
    })
  }, [])

  const switchChain = () => {
    const wallet = walletController.getWallet(data.chainId)

    emitterController.emit(OFF_SWITCH_CHAIN, { address: [wallet.address], chainId: data.chainId })
    setIsOpen(false)
  }

  const reject = () => {

  }

  return <CustomModal isOpen={isOpen}>
    {data &&
      <div>
        <h3>Switch to: {CHAIN_CONFIG[data.chainId].chain}</h3>
        <div>
          <p>Chain ID: {data.chainId}</p>
        </div>
        <div>
          <Button label='Reject' onClick={reject} />
          <Button label='Switch' onClick={switchChain} />
        </div>
      </div>
    }
  </CustomModal>

}