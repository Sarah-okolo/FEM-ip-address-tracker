import { React } from 'react'
import Ip_display from './Ip_display'
import Map from './Map'
import {MyContextProvider} from '../contexts'


function App() {

  return (
    <>
      <MyContextProvider>
        <Ip_display />
        <Map />
      </MyContextProvider>
    </>
  )
}

export default App
