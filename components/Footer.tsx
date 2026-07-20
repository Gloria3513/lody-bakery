import Link from 'next/link';
import { Instagram, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Brand Info */}
          <div className={styles.brandInfo}>
            <span className={styles.brandName}>LODY BAKERY</span>
            <p className={styles.brandDesc}>
              소중한 날, 감사의 마음을 담아 선물하는<br />
              프리미엄 수제 구움과자 답례품 전문 베이커리입니다.
            </p>
            <div className={styles.snsLinks}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.snsIcon} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer" className={styles.snsIcon} aria-label="KakaoTalk">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Site Links */}
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>바로가기</h4>
            <ul className={styles.links}>
              <li><Link href="#about">브랜드 스토리</Link></li>
              <li><Link href="#catalog">답례품 카탈로그</Link></li>
              <li><Link href="#inquiry">주문/견적 문의</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <h4 className={styles.linkTitle}>고객 센터</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Phone size={16} className={styles.contactIcon} />
                <span>0507-1234-5678</span>
              </li>
              <li className={styles.contactItem}>
                <Mail size={16} className={styles.contactIcon} />
                <span>contact@lodybakery.com</span>
              </li>
              <li className={styles.contactItem}>
                <MapPin size={16} className={styles.contactIcon} />
                <span>서울시 강남구 테헤란로 123, 1층 로디 베이커리</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.businessInfo}>
            <span>상호명: 로디 베이커리</span>
            <span>대표자: 김로디</span>
            <span>사업자등록번호: 123-45-67890</span>
            <span>통신판매업신고: 제 2026-서울강남-0000호</span>
          </div>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Lody Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
