import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import styles from './LandingPage.module.css';
import LandingPageSection from '../LandingPageSection';
import LandingPageNavbar from '../LandingPageNavbar';
import ConnectWalletSection from '../ConnectWalletSection';

const LandingPage = () => {
  const alignCenter = { display: 'flex', flexDirection: 'column', alignItems: 'center' }

  return (
    <div className={styles.landingPage}>
      <Parallax pages={4} style={{ top: '0', left: '0' }}>
        <ParallaxLayer sticky={{ start: 0, end: 0.2 }} offset={0} speed={.2} style={{ ...alignCenter, justifyContent: 'center' }}>
          <LandingPageSection text='BUILD EXCLUSIVE COMMUNITIES'/>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 0.8, end: 1.2 }} offset={1} speed={.2} style={{ ...alignCenter, justifyContent: 'center' }}>
          <LandingPageSection text='BRING VALUE TO YOUR MEMBERS'/>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 1.8, end: 2.2 }} offset={2} speed={.2} style={{ ...alignCenter, justifyContent: 'center' }}>
          <LandingPageSection text='COLLECT ROYALTIES'/>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 0, end: 2 }} style={{ ...alignCenter, justifyContent: 'end' }}>
          <div style={{marginBottom: '50px'}}>
            <svg width="39" height="22" viewBox="0 0 39 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M38.2244 4.49026L21.3724 21.2296C20.3383 22.2568 18.6617 22.2568 17.6276 21.2296L0.775593 4.49026C-0.25853 3.46305 -0.25853 1.79762 0.775593 0.770407C1.80971 -0.256802 3.48635 -0.256802 4.52047 0.770407L19.5 15.6498L34.4795 0.770407C35.5136 -0.256802 37.1903 -0.256802 38.2244 0.770407C39.2585 1.79762 39.2585 3.46305 38.2244 4.49026Z" fill="#7168E9"/>
            </svg>
          </div>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 0, end: 2 }} style={{ ...alignCenter, justifyContent: 'start' }}>
          <LandingPageNavbar />
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 2.8, end: 3.2 }} offset={3} speed={.2} style={{ ...alignCenter, justifyContent: 'center' }}>
          <ConnectWalletSection />
        </ParallaxLayer>

      </Parallax>
    </div>
  );
}

export default LandingPage;
