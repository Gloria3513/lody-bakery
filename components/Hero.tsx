'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.badge} variants={itemVariants}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>Premium Dessert Studio</span>
          </motion.div>
          
          <motion.h1 className={styles.title} variants={itemVariants}>
            마음을 전하는<br />
            가장 달콤한 방법,<br />
            <span className={styles.highlight}>로디 베이커리</span>
          </motion.h1>
          
          <motion.p className={styles.description} variants={itemVariants}>
            프랑스산 AOP 고메 버터와 엄선된 유기농 밀가루로 구워낸<br />
            프리미엄 구움과자 답례품입니다. 결혼식, 돌잔치, 기업 행사 등<br />
            특별한 날을 빛내줄 고품격 포장 서비스와 맞춤 메시지 카드를 제공합니다.
          </motion.p>
          
          <motion.div className={styles.buttonGroup} variants={itemVariants}>
            <a href="#inquiry" className={styles.primaryButton}>
              <span>맞춤 견적 상담받기</span>
              <ArrowRight size={18} />
            </a>
            <a href="#catalog" className={styles.secondaryButton}>
              <span>답례품 메뉴 보기</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
        >
          <div className={styles.imageBorder}>
            <Image 
              src="/images/cookie_hero.png" 
              alt="Premium Cookie and Baked Goods Gift Box" 
              width={600} 
              height={600} 
              priority
              className={styles.image}
            />
          </div>
          <div className={styles.decorativeBadge}>
            <span className={styles.decorText}>100% Handmade</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
