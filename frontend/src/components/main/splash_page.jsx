import React from 'react';
import Styles from './splash_page.module.css';
import DemoCard from '../card/demo_card';


const SplashPage = props => (
  <div className={Styles.mainCtn}>
    <section className={Styles.section}>
      <h1 className={Styles.welcomeHdr}>Welcome</h1>
      <h1 className={Styles.welcomeHdr}>To The Flash Card App</h1>
      <h2 className={`${Styles.welcomeHdr} ${Styles.prompt}`}> 
        Join today to create flash cards for your studies.
      </h2>
    </section>
    <section className={Styles.section}>
      <DemoCard />
    </section>
  </div>
)



export default SplashPage;