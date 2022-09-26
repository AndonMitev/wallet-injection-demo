import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { Assets } from '../../screens/Assets';
import { Login } from '../../screens/Login';
import { Injection } from '../../screens/Injection';

import { RequestSessionModal } from '../Modals/RequestSessionModal';
import { RequestSendModal } from '../Modals/RequestSendModal';
import { RequestSwitchChainModal } from '../Modals/RequestSwitchChainModal';
import { RequestSignTypedDataModal } from '../Modals/RequestSignTypedDataModal';

import { walletController } from '../../controllers/walletController';



export const Router = () => {
  const navigate = useNavigate()
  const { isInitialized } = walletController;

  return (
    <div>
      <nav>
        {!isInitialized &&
          <>
            <Link to="/">Home</Link> |{" "}
          </>
        }
        {isInitialized &&
          <>
            <Link to="injection">Injection</Link>
            <Link to="assets">Assets</Link>
          </>
        }
      </nav>
      <RequestSessionModal />
      <RequestSendModal />
      <RequestSwitchChainModal />
      <RequestSignTypedDataModal />
      <Routes>
        {!isInitialized && <>
          <Route path="/" element={<Login />} />
        </>}
        {isInitialized && <>
          <Route path="injection" element={<Injection />} />
          <Route path="assets" element={<Assets />} />
        </>}
      </Routes>
    </div >
  )
}