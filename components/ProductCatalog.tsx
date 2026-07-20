'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, Check } from 'lucide-react';
import styles from './ProductCatalog.module.css';

interface Product {
  id: string;
  name: string;
  category: 'wedding' | 'baby' | 'corporate' | 'all';
  summary: string;
  price: string;
  composition: string[];
  image: string;
  description: string;
  features: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 'classic-3',
    name: '클래식 구움과자 3구 세트',
    category: 'wedding',
    summary: '휘낭시에, 마들렌, 갈레트 브루통의 클래식한 조합',
    price: '7,500원 ~',
    composition: ['플레인 휘낭시에 1입', '레몬 글레이즈 마들렌 1입', '갈레트 브루통 1입'],
    image: '/images/cookie_about.png',
    description: '엄선된 재료로 본연의 깊고 풍부한 맛을 담은 미니멀 세트입니다. 결혼식 답례품이나 부담 없는 가벼운 감사 선물로 가장 사랑받는 구성입니다.',
    features: ['친환경 크라프트 미니 상자', '캘리그라피 감사 띠지 무료 제공', '기본 화이트 리본 마감'],
  },
  {
    id: 'premium-signature',
    name: '프리미엄 로디 시그니처 세트',
    category: 'all',
    summary: '로디 베이커리의 베스트셀러를 알차게 채운 시그니처 박스',
    price: '14,000원 ~',
    composition: ['헤이즐넛 피낭시에 1입', '초코칩 피낭시에 1입', '얼그레이 마들렌 1입', '초코 피칸 쿠키 1입', '황치즈 사블레 2입'],
    image: '/images/cookie_hero.png',
    description: '풍성한 구성을 자랑하는 로디의 시그니처 답례품 박스입니다. 격식 있는 자리나 중요한 하객분들께 깊은 감사를 전하고 싶을 때 추천해 드립니다.',
    features: ['자체 제작 고급 하드 케이스', '커스텀 메시지 카드 삽입', '더블 새틴 리본 포장'],
  },
  {
    id: 'special-wedding',
    name: '스페셜 웨딩 기프트 세트',
    category: 'wedding',
    summary: '세이지 그린 리본과 고급 플라워 텍으로 품격을 높인 세트',
    price: '18,500원 ~',
    composition: ['무화과 크림치즈 피낭시에 1입', '레몬마들렌 1입', '말차 마카다미아 쿠키 1입', '바닐라 빈 사블레 3입', '프리미엄 홍차 티백 2입'],
    image: '/images/cookie_package.png',
    description: '결혼식을 찾아주신 특별한 귀빈들을 위해 디자인된 최고급 답례품 세트입니다. 구움과자뿐만 아니라 함께 곁들일 수 있는 고급 홍차 티백이 동봉되어 품격 있는 다과 시간을 선물합니다.',
    features: ['최고급 린넨 텍스쳐 화이트 박스', '생화 느낌의 프리미엄 드라이 플라워 텍', '세이지 그린 고급 새틴 리본'],
  },
];

export default function ProductCatalog() {
  const [filter, setFilter] = useState<'all' | 'wedding' | 'baby' | 'corporate'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = PRODUCTS.filter(
    (p) => filter === 'all' || p.category === filter || p.category === 'all'
  );

  return (
    <section id="catalog" className={styles.catalogSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subTitle}>Gift Collection</span>
          <h2 className={styles.title}>정성을 굽는 로디의 답례품 라인업</h2>
          <p className={styles.desc}>전하는 분의 마음이 품격 있게 머무를 수 있도록, 포장 디자인부터 메뉴 구성까지 1:1 맞춤으로 제작됩니다.</p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${filter === 'all' ? styles.activeTab : ''}`}
            onClick={() => setFilter('all')}
          >
            전체 보기
          </button>
          <button 
            className={`${styles.tab} ${filter === 'wedding' ? styles.activeTab : ''}`}
            onClick={() => setFilter('wedding')}
          >
            결혼식 답례
          </button>
          <button 
            className={`${styles.tab} ${filter === 'baby' ? styles.activeTab : ''}`}
            onClick={() => setFilter('baby')}
          >
            돌/백일 답례
          </button>
          <button 
            className={`${styles.tab} ${filter === 'corporate' ? styles.activeTab : ''}`}
            onClick={() => setFilter('corporate')}
          >
            기업 행사/기타
          </button>
        </div>

        {/* Product Grid */}
        <motion.div layout className={styles.grid}>
          {filteredProducts.map((product) => (
            <motion.div 
              layout
              key={product.id} 
              className={styles.card}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className={styles.imageContainer}>
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.productImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productSummary}>{product.summary}</p>
                <div className={styles.priceContainer}>
                  <span className={styles.priceLabel}>예상 견적</span>
                  <span className={styles.priceValue}>{product.price}</span>
                </div>
                <div className={styles.cardActions}>
                  <button 
                    className={styles.infoButton}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Info size={16} />
                    <span>상세 구성 보기</span>
                  </button>
                  <a href="#inquiry" className={styles.orderButton}>
                    문의하기
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedProduct(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className={styles.modalBody}>
                <div className={styles.modalImageWrapper}>
                  <Image 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    fill 
                    className={styles.modalImage}
                  />
                </div>
                
                <div className={styles.modalInfo}>
                  <h3 className={styles.modalTitle}>{selectedProduct.name}</h3>
                  <p className={styles.modalPrice}>{selectedProduct.price} <span className={styles.priceSub}>(100세트 이상 기준가)</span></p>
                  <p className={styles.modalDescription}>{selectedProduct.description}</p>
                  
                  <div className={styles.sectionDivider}></div>
                  
                  {/* Composition List */}
                  <div className={styles.infoSection}>
                    <h4 className={styles.sectionTitle}>디저트 세부 구성</h4>
                    <ul className={styles.compositionList}>
                      {selectedProduct.composition.map((item, idx) => (
                        <li key={idx} className={styles.compositionItem}>
                          <span className={styles.dot}></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Packaging Features */}
                  <div className={styles.infoSection}>
                    <h4 className={styles.sectionTitle}>기본 패키지 혜택</h4>
                    <ul className={styles.featureList}>
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className={styles.featureItem}>
                          <Check size={16} className={styles.checkIcon} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a 
                    href="#inquiry" 
                    className={styles.modalCta}
                    onClick={() => setSelectedProduct(null)}
                  >
                    이 구성으로 견적 문의하기
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
