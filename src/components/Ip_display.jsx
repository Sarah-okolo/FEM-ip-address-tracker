import React from 'react'
import '../component-styles/ip-display.scss'

function Ip_display() {
  return (
    <>
      <div id="ip-display-container">
        <div id="content-wrapper">
          <h1>IP Address Tracker</h1>

          <div id="search-box">
            <input type="text" placeholder='Search for any IP address or domain' id='search-input'/>
            <div id="send-box"><img src="/images/icon-arrow.svg" alt="" /></div>
          </div>

          <div id="ip-details-container">
            <div id="address-wrapper">
              <p className="title">IP Address</p>
              <p id="address" className='bold'>190:899:098:89</p>
            </div>
            <div id="location-wrapper">
              <p className="title">Location</p>
              <p id="location" className='bold'>Brookyn, NY, 10001</p>
            </div>
            <div id="timezone-wrapper">
              <p className="title">Timezone</p>
              <p id="timezone" className='bold'>UTC <span id="time">-05:15</span></p>
            </div>
            <div id="isp-wrapper">
              <p className="title">ISP</p>
              <p id="isp" className='bold'>SpaceX Starlink</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ip_display