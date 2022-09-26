
import { useEffect, useState } from 'react';

import { Button } from '../../Button';

import { CustomModal } from '..';
import { emitterController, walletController } from '../../../controllers/'
import { INJECTION_REQUESTS } from '../../../constants'

const { ON_SESSION_REQUEST, OFF_SESSION_REQUEST } = INJECTION_REQUESTS

export const RequestSessionModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState();


  useEffect(() => {
    emitterController.on(ON_SESSION_REQUEST, ({ params }) => {
      const [data] = params;
      setData(data)
      setIsOpen(true)
    })
  }, [])

  const connect = () => {
    const wallet = walletController.getWallet(data.chainId)

    emitterController.emit(OFF_SESSION_REQUEST, [wallet.address])
    setIsOpen(false)
  }

  const reject = () => {
    emitterController.emit(OFF_SESSION_REQUEST, null)
    setIsOpen(false)
  }

  return <CustomModal isOpen={isOpen}>
    {data &&
      <div>
        <div>
          <p>Chain ID: {data.chainId}</p>
          <p>Description: {data.peerMeta.description}</p>
          <img src={data.peerMeta.icons[0]} alt='data.peerMeta.description' />
          <p>Name: {data.peerMeta.name}</p>
          <p>URL: {data.peerMeta.url}</p>
        </div>
        <div>
          <Button label='Reject' onClick={reject} />
          <Button label='Connect' onClick={connect} />
        </div>
      </div>
    }
  </CustomModal>

}