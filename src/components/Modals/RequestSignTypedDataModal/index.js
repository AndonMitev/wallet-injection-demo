
import { useEffect, useState } from 'react';

import { CustomModal } from '..';
import { emitterController, walletController } from '../../../controllers/'
import { Button } from '../../Button';

import { INJECTION_REQUESTS } from '../../../constants';
import { convertHexToString } from '../../../utils';

const { ON_SIGNED_TYPED_DATA, OFF_SIGNED_TYPED_DATA } = INJECTION_REQUESTS


export const RequestSignTypedDataModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState();


  useEffect(() => {
    emitterController.on(ON_SIGNED_TYPED_DATA, ({ params, chainId }) => {
      const signature = walletController.signTypedDataMessage(chainId, params[1])

      const [data] = params;

      setData({
        chainId: convertHexToString(data.chainId),
        signature
      })
      setIsOpen(true)
    })
  }, [])

  const sign = () => {
    emitterController.emit(OFF_SIGNED_TYPED_DATA, data.signature)
    setIsOpen(false)
  }

  const reject = () => {

  }

  return <CustomModal isOpen={isOpen}>
    {data &&
      <div>
        <h3>Sign message: </h3>
        <Button label='Sign ' onClick={sign} />
        {/* <div>
          <p>Chain ID: {data.chainId}</p>
        </div>
        <div>
          <Button label='Reject' onClick={reject} />
          
        </div> */}
      </div>
    }
  </CustomModal>

}