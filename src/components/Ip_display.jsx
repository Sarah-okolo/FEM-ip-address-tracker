import React, { useContext, useEffect, useRef } from 'react'
import '../component-styles/ip-display.scss'
import {ipLocationContext} from '../contexts'

function Ip_display() {
  const searchInputRef = useRef(null);
  const ipAddressRef = useRef(null);
  const locationRef = useRef(null);
  const timeRef = useRef(null);
  const ispRef = useRef(null);
  const errorRef = useRef(null);
  const loadingIconRef = useRef(null);
  const {locationCoordinates, setLocationCoordinates} = useContext(ipLocationContext);

  const searchIP = () => {
    errorRef.current.style.display='none';
    loadingIconRef.current.style.display='block';
    const inputIp = searchInputRef.current.value;
    const fetchIP = async () => {
      try {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_u8RB18AfzEtrU2gU8TUtdlgmgc27j&ipAddress=${inputIp}`);
        // Handle invalid IP address error
        if (res.status === 422) {
          errorRef.current.innerHTML = 'Invalid IP address';
          errorRef.current.style.display = 'block';
          loadingIconRef.current.style.display = 'none';
          return;
        }
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        const { ip, location, isp } = data;
        ipAddressRef.current.innerHTML = ip ? ip : 'N/A';
        locationRef.current.innerHTML = location.region ? `${location.city}, ${location.region} ${location.postalCode}` : 'N/A';  
        timeRef.current.innerHTML = location.timezone ? `UTC ${location.timezone}` : 'N/A';
        ispRef.current.innerHTML = isp ? isp : 'N/A';
        setLocationCoordinates({...locationCoordinates, x:location.lat, y:location.lng})
        loadingIconRef.current.style.display='none';
      }
      catch (err) {
        loadingIconRef.current.style.display='none';
        errorRef.current.innerHTML = 'An error occured';
        if (err.message.includes('Failed to fetch')) {
          errorRef.current.innerHTML = 'Poor network connection';
        }
        errorRef.current.style.display='block';
        console.error(err);
      }
    }
    fetchIP();
  }

  useEffect(() => {
    searchIP();
  }, []);

  return (
    <>
      <div id="ip-display-container">
        <div id="content-wrapper">
          <h1>IP Address Tracker</h1>

          <div id="search-box">
            <input type="text" placeholder='Search for any IP address or domain' id='search-input' ref={searchInputRef}/>
            <span id="loading" ref={loadingIconRef}></span>
            <div id="send-box" onClick={() => searchInputRef.current.value !=='' ? searchIP() : searchInputRef.current.placeholder = 'An IP address is required'}><img src="/images/icon-arrow.svg" alt="right arrow" /></div>
          </div>
          <p id="error-message" ref={errorRef}></p>

          <div id="ip-details-container">
            <div id="address-wrapper">
              <p className="title">IP Address</p>
              <p className='bold' ref={ipAddressRef}></p>
            </div>
            <div id="location-wrapper">
              <p className="title">Location</p>
              <p className='bold' ref={locationRef}></p>
            </div>
            <div id="timezone-wrapper">
              <p className="title">Timezone</p>
              <p className='bold' ref={timeRef}></p>
            </div>
            <div id="isp-wrapper">
              <p className="title">ISP</p>
              <p className='bold' ref={ispRef}></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ip_display