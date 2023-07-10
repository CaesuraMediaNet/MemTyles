import styles from '../styles/memtyles.module.css';

export default function PrivacyPolicy ({setShowPrivacyLink}) {
   return (
      <p>
         <div class="card">             {/* Bootstrap */}
            <div class="card-body">    {/* Bootstrap, to give it width */}
               <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="nofollow"
               >
                  Here
               </a>
                  &nbsp; is our privacy policy from Vercel, who hosts this site.  As a customer
                  of Vercel (us) we do not collect any personal info from you at all,
                  just what Vercel say&nbsp;:&nbsp;
                  <a
                     href="https://vercel.com/legal/privacy-policy"
                     target="_blank"
                     rel="nofollow"
                  >
                     https://vercel.com/legal/privacy-policy
                  </a>

               <p className={[styles.gotItLink, styles.pLink].join (' ')}
                  onClick={() => setShowPrivacyLink (false)}
               >
                  Got it
               </p>
            </div>
         </div>
      </p>
      );
}
