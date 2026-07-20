'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, Truck } from 'lucide-react';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const features = [
    {
      icon: <ShieldCheck className={styles.featureIcon} size={24} />,
      title: '엄선된 최고급 원재료',
      desc: '프랑스산 AOP 고메 발효 버터, 유기농 밀가루, 100% 천연 바닐라 빈 등 신선하고 정직한 재료만을 고집합니다.'
    },
    {
      icon: <Heart className={styles.featureIcon} size={24} />,
      title: '당일 생산 원칙',
      desc: '미리 만들어 둔 냉동 과자가 아닙니다. 예약하신 행사 당일 새벽에 정성껏 구워 최상의 풍미와 촉촉함을 전합니다.'
    },
    {
      icon: <Sparkles className={styles.featureIcon} size={24} />,
      title: '맞춤형 패키징 디자인',
      desc: '결혼식, 돌잔치, 기업 로고 택 등 분위기에 맞추어 리본 컬러 및 메시지 카드를 1:1로 맞춤 커스텀 제작해 드립니다.'
    },
    {
      icon: <Truck className={styles.featureIcon} size={24} />,
      title: '안전하고 정밀한 배송',
      desc: '파손 걱정 없는 꼼꼼한 개별 완충 포장과 더불어 우체국 안심 택배 및 서울/경기 당일 차량 퀵 서비스를 연계합니다.'
    }
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        
        {/* Intro Grid */}
        <div className={styles.introGrid}>
          
          <motion.div 
            className={styles.imageCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.imageWrapper}>
              <Image 
                src="/images/cookie_about.png" 
                alt="Baking fresh cookies in bakery"
                width={500}
                height={600}
                className={styles.aboutImage}
              />
              <div className={styles.experienceTag}>
                <span className={styles.tagNumber}>Handmade</span>
                <span className={styles.tagLabel}>Desert Studio</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.textCol}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.subTitle}>Our Story</span>
            <h2 className={styles.title}>맛과 품격, 어느 하나 타협하지 않습니다.</h2>
            <p className={styles.desc}>
              답례품은 보내는 이의 소중한 평판이자 고마움의 척도입니다.<br />
              로디 베이커리는 기계로 대량 생산하는 공장형 과자가 아닌,<br />
              파티시에의 손길을 거치는 전통 수제 방식을 이어가고 있습니다.
            </p>
            <p className={styles.descEmphasis}>
              &ldquo;첫 입의 바삭함부터 마지막 한 모금의 여운까지,<br />
              하객분들께 감동의 순간을 선물해 드립니다.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className={styles.featuresSection}>
          <h3 className={styles.featuresHeading}>로디만의 네 가지 특별함</h3>
          <div className={styles.featuresGrid}>
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                className={styles.featureCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.iconCircle}>
                  {feature.icon}
                </div>
                <h4 className={styles.featureTitle}>{feature.title}</h4>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
