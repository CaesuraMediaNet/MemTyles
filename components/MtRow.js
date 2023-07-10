// Container for the CardTable, similar to Boostrap Row, but tweeked.
//
import { useState }  from 'react';
import { useEffect } from 'react';
import { useRef }    from 'react';
import styles        from '../styles/memtyles.module.css';

export default function MtRow ({children}) {
   return (
      <div className={styles.MtRowStyle}>
         {children}
      </div>
   );
}


