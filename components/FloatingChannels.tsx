'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Youtube, ChevronUp, X, MessageCircle } from 'lucide-react';
import styles from './FloatingChannels.module.css';

// -------------------------------------------------------------
// CONFIGURATION: Replace these URLs with your actual channel links
// -------------------------------------------------------------
const CHANNEL_LINKS = {
  naverTalk: 'https://talk.naver.com/W5XXXX', // Naver TalkTalk link
  kakaoTalk: 'https://pf.kakao.com/_XXXXX', // KakaoTalk Channel link
  youtube: 'https://youtube.com/@LodyBakery', // YouTube Channel link
};

export default function FloatingChannels() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle visibility of the scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Custom SVGs for Naver TalkTalk and KakaoTalk for a more authentic brand representation
  const NaverTalkIcon = () => (
    <svg viewBox="0 0 24 24" className={styles.svgIcon} fill="currentColor">
      <path d="M12 2C6.48 2 2 5.58 2 10c0 2.45 1.37 4.64 3.5 6.07v3.43c0 .3.2.5.5.5.12 0 .23-.04.32-.12l3.43-2.57C10.59 17.74 11.28 18 12 18c5.52 0 10-3.58 10-8s-4.47-8-10-8zm.13 10.42c-.22 0-.41-.12-.49-.32l-1.39-3.47-1.39 3.47c-.08.2-.27.32-.49.32-.28 0-.5-.22-.5-.5 0-.08.02-.17.06-.24l1.83-4.57c.08-.2.27-.32.49-.32s.41.12.49.32l1.83 4.57c.04.07.06.16.06.24 0 .28-.22.5-.5.5zm4.49.08h-2.18v-4.5h.5c.28 0 .5.22.5.5v1.5h1.18c.28 0 .5.22.5.5s-.22.5-.5.5h-1.18v1h1.18c.28 0 .5.22.5.5s-.22.5-.5.5z"/>
    </svg>
  );

  const KakaoTalkIcon = () => (
    <svg viewBox="0 0 24 24" className={styles.svgIcon} fill="currentColor">
      <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.007-.172.633-.62 2.285-.71 2.617-.11.411.14.406.3.3l1.88-1.24c.4.11.82.17 1.26.17 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
    </svg>
  );

  return (
    <div className={styles.container}>
      {/* Scroll to Top Button */}
      <button
        className={`${styles.scrollTopButton} ${showScrollTop ? styles.visible : ''}`}
        onClick={scrollToTop}
        aria-label="페이지 상단으로 이동"
      >
        <ChevronUp size={20} />
      </button>

      {/* Floating Channels Stack */}
      <div className={`${styles.menuWrapper} ${isOpen ? styles.active : ''}`}>
        
        {/* KakaoTalk Button */}
        <a
          href={CHANNEL_LINKS.kakaoTalk}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.channelButton} ${styles.kakao}`}
          aria-label="카카오톡 채널 상담"
        >
          <span className={styles.tooltip}>카카오톡 상담</span>
          <KakaoTalkIcon />
        </a>

        {/* Naver TalkTalk Button */}
        <a
          href={CHANNEL_LINKS.naverTalk}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.channelButton} ${styles.naver}`}
          aria-label="네이버 톡톡 문의"
        >
          <span className={styles.tooltip}>네이버 톡톡</span>
          <NaverTalkIcon />
        </a>

        {/* YouTube Button */}
        <a
          href={CHANNEL_LINKS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.channelButton} ${styles.youtube}`}
          aria-label="공식 유튜브 채널"
        >
          <span className={styles.tooltip}>유튜브 채널</span>
          <Youtube size={20} />
        </a>
      </div>

      {/* Main Trigger Toggle Button */}
      <button
        onClick={toggleMenu}
        className={`${styles.triggerButton} ${isOpen ? styles.open : ''}`}
        aria-label={isOpen ? "상담 채널 닫기" : "상담 채널 열기"}
      >
        <div className={styles.iconContainer}>
          <MessageSquare className={styles.messageIcon} size={24} />
          <X className={styles.closeIcon} size={24} />
        </div>
        <span className={styles.pulseRing}></span>
        <span className={styles.pulseRing2}></span>
      </button>
    </div>
  );
}
