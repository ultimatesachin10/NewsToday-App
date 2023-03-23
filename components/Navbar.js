import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
const Navbar = () => {
    const router = useRouter();
return (
        <div className={styles.main}>
            <div onClick={() => router.push('/1')}>News</div>
        </div>
    )
}
export default Navbar