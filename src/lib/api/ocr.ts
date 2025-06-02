import axios from "axios";

export interface OcrRequestData {
  image: File; 
  name: string;
  doc_type: string;
}

export const recipientRegister = async (data: OcrRequestData) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("name", data.name);
  formData.append("doc_type", data.doc_type);

  try {
    const response = await axiosOcr.post("/ocr", formData);
    return response.data;
  } catch (error) {
    console.error("OCR 요청 실패:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data);
    }
    throw error;
  }
};

const axiosOcr = axios.create({
  baseURL: "http://211.188.50.163:8080",
  withCredentials: true,
});
