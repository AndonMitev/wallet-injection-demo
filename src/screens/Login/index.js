import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { CHAIN_CONFIG } from '../../constants'
import { walletController } from '../../controllers/walletController'



export const Login = () => {
  const [seed, setSeed] = useState('')
  const navigate = useNavigate();


  const handleOnClick = () => {
    walletController.createWallets(seed)


    const wallets = walletController.getWallets();

    console.log(wallets)
    navigate('/injection');
  }

  return (<div className='login-wrapper'>
    <Header></Header>
    <div>
      <Input value={seed} onChange={({ target: { value } }) => setSeed(value)} />
      <Button label='Login' onClick={handleOnClick} />
    </div>
  </div>
  )
}