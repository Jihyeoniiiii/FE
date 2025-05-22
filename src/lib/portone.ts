interface PortoneRequestData {
  channelKey: string;
  pay_method: string;
  merchant_uid: string;
  amount: number;
  name: string;
  buyer_name: string;
  m_redirect_url: string;
}

interface PortoneResponse {
  success: boolean;
  imp_uid: string;
  merchant_uid: string;
  paid_amount?: number;
}

interface IMP {
  init: (code: string) => void;
  request_pay: (
    data: PortoneRequestData,
    callback: (response: PortoneResponse) => void
  ) => void;
}

declare global {
  interface Window {
    IMP?: IMP;
  }
}

export const initializePortone = (code: string): void => {
  if (typeof window !== "undefined" && window.IMP) {
    window.IMP.init(code);
  } else {
    console.error("아임포트 SDK가 로드되지 않았거나 window 객체를 사용할 수 없습니다.");
  }
};

export const requestPortonePayment = (
  data: PortoneRequestData
): Promise<PortoneResponse> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.IMP) {
      console.error("아임포트 SDK가 초기화되지 않았거나 window 객체를 사용할 수 없습니다.");
      return reject(new Error("아임포트 SDK를 사용할 수 없습니다."));
    }

    console.log("IMP.request_pay에 전달될 데이터:", data);

    window.IMP.request_pay(data, (response: PortoneResponse) => {
      if (response.success) {
        resolve(response);
      } else {
        console.error("아임포트 결제 실패:", response);
        reject(response);
      }
    });
  });
};