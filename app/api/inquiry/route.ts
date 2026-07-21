import { NextResponse } from 'next/server';

interface InquiryData {
  name: string;
  phone: string;
  eventType: string;
  packageType: string;
  quantity: number;
  deliveryDate: string;
  deliveryMethod: string;
  ribbonColor: string;
  messageCard: boolean;
  cardText?: string;
  memo?: string;
}

// Map technical keys to user-friendly Korean terms
const EVENT_MAP: Record<string, string> = {
  wedding: '결혼식',
  baby: '돌 / 백일',
  corporate: '기업 행사',
  etc: '기타'
};

const PACKAGE_MAP: Record<string, string> = {
  'classic-3': '클래식 구움과자 3구 세트 (7,500원)',
  'premium-signature': '프리미엄 로디 시그니처 세트 (14,000원)',
  'special-wedding': '스페셜 웨딩 기프트 세트 (18,500원)'
};

const DELIVERY_MAP: Record<string, string> = {
  courier: '우체국 택배 (전국 배송)',
  quick: '서울/경기 당일 퀵 서비스',
  pickup: '매장 방문 픽업'
};

const RIBBON_MAP: Record<string, string> = {
  white: '클래식 화이트',
  beige: '내추럴 베이지',
  sage: '세이지 그린',
  pink: '더스티 핑크'
};

// Calculate estimate on server side for confirmation and security
function calculateEstimatedPrice(packageType: string, quantity: number) {
  let unitPrice = 14000;
  if (packageType === 'classic-3') unitPrice = 7500;
  if (packageType === 'special-wedding') unitPrice = 18500;

  let total = unitPrice * quantity;

  if (quantity >= 200) {
    total = total * 0.9;
  } else if (quantity >= 100) {
    total = total * 0.95;
  }

  return total.toLocaleString();
}

export async function POST(request: Request) {
  try {
    const data: InquiryData = await request.json();

    // Basic Validation
    if (!data.name || !data.phone || !data.quantity || !data.deliveryDate) {
      return NextResponse.json(
        { error: '필수 입력 항목(성함, 연락처, 수량, 희망 납기일)이 누락되었습니다.' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    // Check if the API key is set or still the placeholder
    if (!resendApiKey || resendApiKey === 'YOUR_RESEND_API_KEY_HERE') {
      console.warn('Resend API key is not configured. Request received: ', data);
      return NextResponse.json(
        {
          success: true,
          warning: 'API_KEY_NOT_CONFIGURED',
          message: '서버는 요청을 정상적으로 수신했으나, Resend API Key가 구성되지 않아 이메일 발송은 생략되었습니다. (개발용 테스트 모드)'
        },
        { status: 200 }
      );
    }

    const eventName = EVENT_MAP[data.eventType] || data.eventType;
    const packageName = PACKAGE_MAP[data.packageType] || data.packageType;
    const deliveryName = DELIVERY_MAP[data.deliveryMethod] || data.deliveryMethod;
    const ribbonName = RIBBON_MAP[data.ribbonColor] || data.ribbonColor;
    const priceText = calculateEstimatedPrice(data.packageType, Number(data.quantity));

    // Constructing the Email HTML Body
    const emailHtml = `
      <div style="font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e8e2de; border-radius: 12px; background-color: #fcfbfa; color: #32231b;">
        <h2 style="color: #94593b; border-bottom: 2px solid #94593b; padding-bottom: 12px; margin-top: 0; font-size: 22px;">[로디 베이커리] 새로운 견적 문의 접수</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #5a4b41;">로디 베이커리 홈페이지를 통해 새로운 견적 상담 신청이 도착했습니다. 세부 정보는 아래와 같습니다.</p>
        
        <div style="background-color: #f3eee9; border-radius: 8px; padding: 18px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 130px; color: #7a6659;">신청자명</td>
              <td style="padding: 8px 0; color: #181412;">${data.name} 님</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #7a6659;">연락처</td>
              <td style="padding: 8px 0; color: #181412;"><a href="tel:${data.phone}" style="color: #94593b; text-decoration: none;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #7a6659;">행사 구분</td>
              <td style="padding: 8px 0; color: #181412;">${eventName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #7a6659;">선택 패키지</td>
              <td style="padding: 8px 0; color: #181412; font-weight: bold;">${packageName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #7a6659;">주문 수량</td>
              <td style="padding: 8px 0; color: #181412;">${data.quantity} 세트</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #7a6659;">희망 납기일</td>
              <td style="padding: 8px 0; color: #181412;">${data.deliveryDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #7a6659;">배송 방식</td>
              <td style="padding: 8px 0; color: #181412;">${deliveryName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #7a6659;">리본 색상</td>
              <td style="padding: 8px 0; color: #181412;">${ribbonName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #7a6659;">메시지 카드</td>
              <td style="padding: 8px 0; color: #181412;">
                ${data.messageCard ? `<span style="color: #2b7a3e; font-weight: bold;">제작 추가</span>` : '추가 안 함'}
              </td>
            </tr>
            ${data.messageCard && data.cardText ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #7a6659; vertical-align: top;">메시지 카드 문구</td>
              <td style="padding: 8px 0; color: #181412; background-color: #ffffff; padding: 8px; border-radius: 4px; border: 1px solid #e1d8d2;">${data.cardText.replace(/\n/g, '<br/>')}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #7a6659; vertical-align: top;">추가 요청 사항</td>
              <td style="padding: 8px 0; color: #181412;">${data.memo ? data.memo.replace(/\n/g, '<br/>') : '없음'}</td>
            </tr>
          </table>
        </div>

        <div style="border-top: 1px dashed #dcd1c9; padding-top: 15px; margin-top: 15px; text-align: right;">
          <span style="font-size: 14px; color: #7a6659;">자동 할인 적용 예상 견적: </span>
          <strong style="font-size: 18px; color: #94593b;">${priceText} 원</strong>
        </div>
        
        <div style="font-size: 11px; color: #a49185; text-align: center; margin-top: 30px; border-top: 1px solid #ede8e5; padding-top: 10px;">
          본 메일은 로디 베이커리 웹사이트 견적 문의 폼에서 발송된 자동 메일입니다.
        </div>
      </div>
    `;

    // Resend Send Email API Request
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Lody Bakery <onboarding@resend.dev>',
        to: ['pallas3526@gmail.com'],
        subject: `[로디 베이커리] 새로운 견적 문의 - ${data.name}님`,
        html: emailHtml
      })
    });

    const result = await res.json();

    if (!res.ok) {
      console.error('Resend API Error details:', result);
      return NextResponse.json(
        { error: result.message || 'Resend 이메일 발송에 실패했습니다.' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Server Internal Error:', error);
    return NextResponse.json(
      { error: '서버 내부 오류로 견적 제출에 실패했습니다.' },
      { status: 500 }
    );
  }
}
