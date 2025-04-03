import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "info" | "warn" | "success" | "error";

interface ToastProps {
  showToast: (type: ToastType, message: string, options?: ToastOptions) => void;
}

const useToast = (): ToastProps => {
  /**
   *
   * @param {ToastType} type 토스트 타입을 정의해줍니다. info, warn, success, error중 선택합니다.
   * @param {string} message 사용자에게 보여줄 메세지를 입력합니다.
   * @param {ToastOptions} options 토스트의 옵션을 선택합니다.
   */
  const showToast = (
    type: ToastType,
    message: string,
    options: ToastOptions = {
      position: "top-center",
      closeButton: false,
      autoClose: 3000, // 3초 후 자동 닫힘
      hideProgressBar: true,
    }
  ) => {
    toast[type](message, options);
  };
  return {
    showToast,
  };
};

export default useToast;
