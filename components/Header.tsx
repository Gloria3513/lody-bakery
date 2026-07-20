'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>LODY BAKERY</span>
          <span className={styles.logoSubtext}>구움과자 답례품 전문</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <Link href="#about" className={styles.navLink}>브랜드 스토리</Link>
          <Link href="#catalog" className={styles.navLink}>답례품 카탈로그</Link>
          <Link href="#inquiry" className={styles.navLink}>주문/견적 문의</Link>
        </nav>

        {/* Action Button */}
        <div className={styles.actions}>
          <a href="#inquiry" className={styles.ctaButton}>
            <ShoppingBag size={16} />
            <span>견적 문의하기</span>
          </a>
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className={styles.mobileNav}>
          <Link 
            href="#about" 
            className={styles.mobileNavLink}
            onClick={() => setIsOpen(false)}
          >
            브랜드 스토리
          </Link>
          <Link 
            href="#catalog" 
            className={styles.mobileNavLink}
            onClick={() => setIsOpen(false)}
          >
            답례품 카탈로그
          </Link>
          <Link 
            href="#inquiry" 
            className={styles.mobileNavLink}
            onClick={() => setIsOpen(false)}
          >
            주문/견적 문의
          </Link>
          <a 
            href="#inquiry" 
            className={styles.mobileCtaButton}
            onClick={() => setIsOpen(false)}
          >
            견적 문의하기
          </a>
        </div>
      )}
    </header>
  );
}
