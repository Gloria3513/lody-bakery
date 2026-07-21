'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Calendar, Phone, User, Package, CheckSquare, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import styles from './InquiryForm.module.css';

interface FormInput {
  name: string;
  phone: string;
  eventType: string;
  packageType: string;
  quantity: number;
  deliveryDate: string;
  deliveryMethod: string;
  ribbonColor: string;
  messageCard: boolean;
  cardText: string;
  memo: string;
}

export default function InquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      eventType: 'wedding',
      packageType: 'premium-signature',
      quantity: 50,
      deliveryMethod: 'courier',
      ribbonColor: 'beige',
      messageCard: false,
    }
  });

  const watchMessageCard = watch('messageCard');
  const watchPackageType = watch('packageType');
  const watchQuantity = watch('quantity');

  // 예상 견적 계산
  const getEstimatedPrice = () => {
    let unitPrice = 14000;
    if (watchPackageType === 'classic-3') unitPrice = 7500;
    if (watchPackageType === 'special-wedding') unitPrice = 18500;

    const qty = Number(watchQuantity) || 0;
    let total = unitPrice * qty;

    // 대량 주문 할인 (100세트 이상 5%, 200세트 이상 10%)
    if (qty >= 200) {
      total = total * 0.9;
    } else if (qty >= 100) {
      total = total * 0.95;
    }

    return total.toLocaleString();
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '견적 신청 중 오류가 발생했습니다.');
      }

      setIsSubmitted(true);
      console.log('Submitted Inquiry Data Successfully:', result);
    } catch (error: any) {
      alert(error.message || '견적 신청에 실패했습니다. 카카오톡 문의나 고객센터로 연락해 주세요.');
      console.error('Inquiry Submission Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inquiry" className={styles.inquirySection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Left: Info Card */}
          <div className={styles.infoCard}>
            <span className={styles.badge}>Order Consultation</span>
            <h2 className={styles.title}>내 행사에 맞는<br />견적 알아보기</h2>
            <p className={styles.desc}>
              답례품의 세부 구성이나 포장 디자인 변경 등<br />
              궁금하신 점이 있다면 언제든 편하게 신청해 주세요.<br />
              꼼꼼히 확인하고 친절히 상담해 드리겠습니다.
            </p>
            
            <div className={styles.consultingSteps}>
              <div className={styles.step}>
                <div className={styles.stepNum}>1</div>
                <div>
                  <h4 className={styles.stepTitle}>견적 신청서 작성</h4>
                  <p className={styles.stepDesc}>원하시는 구성 및 정보를 남겨주세요.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>2</div>
                <div>
                  <h4 className={styles.stepTitle}>담당 플래너 배정 & 유선 상담</h4>
                  <p className={styles.stepDesc}>배송 가능 여부 및 상세 견적을 조율합니다.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>3</div>
                <div>
                  <h4 className={styles.stepTitle}>예약 확정 및 제작</h4>
                  <p className={styles.stepDesc}>행사 당일 아침 구워 신선하게 발송합니다.</p>
                </div>
              </div>
            </div>

            <div className={styles.directKakao}>
              <p>빠른 실시간 상담을 원하신다면?</p>
              <a href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer" className={styles.kakaoBtn}>
                <MessageCircle size={18} />
                <span>카카오톡 채널로 바로 문의</span>
              </a>
            </div>
          </div>

          {/* Right: Form Form */}
          <div className={styles.formCard}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                
                {/* 행사 성격 */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>행사 목적</label>
                  <div className={styles.radioGrid}>
                    <label className={styles.radioLabel}>
                      <input type="radio" value="wedding" {...register('eventType')} className={styles.radioInput} />
                      <span className={styles.radioBox}>결혼식</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" value="baby" {...register('eventType')} className={styles.radioInput} />
                      <span className={styles.radioBox}>돌 / 백일</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" value="corporate" {...register('eventType')} className={styles.radioInput} />
                      <span className={styles.radioBox}>기업 행사</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" value="etc" {...register('eventType')} className={styles.radioInput} />
                      <span className={styles.radioBox}>기타</span>
                    </label>
                  </div>
                </div>

                {/* 답례품 구성 선택 */}
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="packageType">
                    <Package size={16} className={styles.inputIcon} />
                    <span>원하시는 답례품 세트</span>
                  </label>
                  <select id="packageType" {...register('packageType')} className={styles.select}>
                    <option value="classic-3">클래식 구움과자 3구 세트 (7,500원~)</option>
                    <option value="premium-signature">프리미엄 로디 시그니처 세트 (14,000원~)</option>
                    <option value="special-wedding">스페셜 웨딩 기프트 세트 (18,500원~)</option>
                  </select>
                </div>

                {/* 수량 */}
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="quantity">수량 (최소 30세트 이상)</label>
                  <input
                    type="number"
                    id="quantity"
                    {...register('quantity', {
                      required: '수량을 입력해주세요.',
                      min: { value: 30, message: '답례품 주문은 최소 30세트부터 가능합니다.' }
                    })}
                    className={`${styles.input} ${errors.quantity ? styles.inputError : ''}`}
                    placeholder="50"
                  />
                  {errors.quantity && <p className={styles.errorText}>{errors.quantity.message}</p>}
                </div>

                {/* 기본 정보 */}
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">
                      <User size={16} className={styles.inputIcon} />
                      <span>성함</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: '성함을 입력해주세요.' })}
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      placeholder="홍길동"
                    />
                    {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="phone">
                      <Phone size={16} className={styles.inputIcon} />
                      <span>연락처</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone', {
                        required: '연락처를 입력해주세요.',
                        pattern: { value: /^[0-9-]{10,14}$/, message: '올바른 형식의 전화번호를 입력해주세요.' }
                      })}
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      placeholder="010-1234-5678"
                    />
                    {errors.phone && <p className={styles.errorText}>{errors.phone.message}</p>}
                  </div>
                </div>

                {/* 희망 배송일 & 배송 방식 */}
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="deliveryDate">
                      <Calendar size={16} className={styles.inputIcon} />
                      <span>희망 납기일 (행사일 전날 추천)</span>
                    </label>
                    <input
                      type="date"
                      id="deliveryDate"
                      {...register('deliveryDate', { required: '배송 희망일을 선택해주세요.' })}
                      className={`${styles.input} ${errors.deliveryDate ? styles.inputError : ''}`}
                    />
                    {errors.deliveryDate && <p className={styles.errorText}>{errors.deliveryDate.message}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="deliveryMethod">배송 방식</label>
                    <select id="deliveryMethod" {...register('deliveryMethod')} className={styles.select}>
                      <option value="courier">우체국 택배 (전국 배송)</option>
                      <option value="quick">서울/경기 당일 퀵 서비스</option>
                      <option value="pickup">매장 방문 픽업</option>
                    </select>
                  </div>
                </div>

                {/* 커스텀 포장 옵션 */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>리본 포장 컬러</label>
                  <div className={styles.colorOptions}>
                    <label className={styles.colorLabel}>
                      <input type="radio" value="white" {...register('ribbonColor')} className={styles.colorInput} />
                      <span className={`${styles.colorSwatch} ${styles.colorWhite}`} title="클래식 화이트"></span>
                    </label>
                    <label className={styles.colorLabel}>
                      <input type="radio" value="beige" {...register('ribbonColor')} className={styles.colorInput} />
                      <span className={`${styles.colorSwatch} ${styles.colorBeige}`} title="내추럴 베이지"></span>
                    </label>
                    <label className={styles.colorLabel}>
                      <input type="radio" value="sage" {...register('ribbonColor')} className={styles.colorInput} />
                      <span className={`${styles.colorSwatch} ${styles.colorSage}`} title="세이지 그린"></span>
                    </label>
                    <label className={styles.colorLabel}>
                      <input type="radio" value="pink" {...register('ribbonColor')} className={styles.colorInput} />
                      <span className={`${styles.colorSwatch} ${styles.colorPink}`} title="더스티 핑크"></span>
                    </label>
                  </div>
                </div>

                {/* 메시지 카드 여부 */}
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" {...register('messageCard')} className={styles.checkboxInput} />
                    <CheckSquare size={18} className={styles.checkboxIcon} />
                    <span>커스텀 메시지 카드 제작 추가 (무료 혜택)</span>
                  </label>
                </div>

                {watchMessageCard && (
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="cardText">메시지 카드 문구 입력</label>
                    <textarea
                      id="cardText"
                      {...register('cardText', { required: '메시지 카드 문구를 작성해 주세요.' })}
                      className={`${styles.textarea} ${errors.cardText ? styles.inputError : ''}`}
                      placeholder="예) 저희의 첫 출발을 축하해주셔서 감사합니다. 예쁘게 잘 살겠습니다. - 신랑 길동 & 신부 영희 드림 -"
                      rows={3}
                    />
                    {errors.cardText && <p className={styles.errorText}>{errors.cardText.message}</p>}
                  </div>
                )}

                {/* 추가 요구 사항 */}
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="memo">추가 요청 사항</label>
                  <textarea
                    id="memo"
                    {...register('memo')}
                    className={styles.textarea}
                    placeholder="알레르기 정보, 개별 리본 라벨 텍 추가 문구 등 기타 요청 사항을 입력해주세요."
                    rows={3}
                  />
                </div>

                {/* 예상 견적 및 제출 */}
                <div className={styles.estimateBlock}>
                  <div className={styles.estimateRow}>
                    <span>예상 총 견적액</span>
                    <span className={styles.estimatedPrice}>{getEstimatedPrice()} 원</span>
                  </div>
                  <p className={styles.estimateNotice}>
                    * 배송비 미포함 금액이며, 대량 주문 및 얼리버드 할인이 자동 계산된 금액입니다.
                  </p>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? (
                    <div className={styles.spinner}></div>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>견적 문의 제출하기</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className={styles.successState}>
                <CheckCircle2 className={styles.successIcon} />
                <h3 className={styles.successTitle}>상담 문의가 정상 접수되었습니다!</h3>
                <p className={styles.successDesc}>
                  기입해주신 정보를 바탕으로 배송 캘린더 스케줄링 확인 후,<br />
                  <strong>24시간 이내에 전화를 통해</strong> 최종 단가 조율 및 상세 안내를 드리겠습니다.
                </p>
                <div className={styles.divider}></div>
                <div className={styles.successSummary}>
                  <p><strong>주문자명:</strong> {watch('name')} 님</p>
                  <p><strong>수량:</strong> {watch('quantity')} 세트</p>
                  <p><strong>납기 희망일:</strong> {watch('deliveryDate')}</p>
                </div>
                <button onClick={() => setIsSubmitted(false)} className={styles.resetBtn}>
                  새 문의 작성하기
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
