import React from 'react'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <img className={styles.logo} src="/images/logo.png" alt="logo" />
        <a className={styles.title} href="/">
          Don Juan
        </a>
      </nav>
    </div>
  )
}

export default Navbar