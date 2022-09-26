import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import WalletConnectController from '../../controllers/walletConnectController'

export const Injection = () => {
  const [uri, setUri] = useState('')

  useEffect(() => {
    if (!uri) {
      return
    }

    window.localStorage.removeItem('walletconnect');

    new WalletConnectController(uri)

  }, [uri])

  const handleUriOnChange = ({ target: { value } }) => {
    setUri(value)
  }

  return (
    <div>
      <Header>Injection</Header>
      <div>
        <Input onChange={handleUriOnChange} value={uri} name='uri' />
      </div>
    </div>
  )
}