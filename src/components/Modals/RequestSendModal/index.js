
import { useEffect, useState } from 'react';
import { utils } from 'ethers'

import { CustomModal } from '..';
import { Button } from '../../Button';

import { walletController, emitterController } from '../../../controllers';
import { getGasPrice } from '../../../utils';
import { CHAIN_CONFIG, INJECTION_REQUESTS } from '../../../constants';

const { ON_SEND_TRANSACTION, OFF_SEND_TRANSACTION } = INJECTION_REQUESTS

export const RequestSendModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState();
  const [chainId, setChainId] = useState();


  useEffect(() => {
    emitterController.once(ON_SEND_TRANSACTION, async ({ params, chainId }) => {
      const [data] = params;
      const gasPrice = await getGasPrice(CHAIN_CONFIG[chainId].gasPrices)
      const fee = parseInt(data.gas, 16) * gasPrice

      setChainId(chainId)
      setData({ ...data, gasPrice, fee })
      setIsOpen(true)
    })
  }, [])

  const send = async () => {
    const { data: txData, value, to, gasPrice } = data;

    const hash = await walletController.sendTransaction(chainId, {
      to,
      value,
      data: txData,
      maxPriorityFeePerGas: gasPrice,
      maxFeePerGas: gasPrice
    })

    emitterController.emit(OFF_SEND_TRANSACTION, hash)

    setIsOpen(false)
  }

  const reject = () => { }

  return <CustomModal isOpen={isOpen}>
    {data &&
      <div>
        <div>
          <p>From: {data.from}</p>
          <p>To: {data.to}</p>
          <p>Value: {utils.formatEther(parseInt(data.value, 16).toString())}</p>
          <p>Fee: {data.fee}</p>
        </div>
        <div>

          <Button label='Reject' onClick={reject} />
          <Button label='Send' onClick={send} />
        </div>
      </div>
    }
  </CustomModal>

}