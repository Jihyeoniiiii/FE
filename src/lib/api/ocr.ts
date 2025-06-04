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
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwibWVtYmVySWQiOjYsInJvbGUiOiJET05PUiIsImlhdCI6MTc0OTAyNzE1NiwiZXhwIjoxNzQ5MDMwNzU2fQ.xaoXVTDwSUcOp8MD88f8G5jX-qL_YNmjDk_imXtPViJOAQmz96QxvPinlgSVKdixhE5bNIh_lC5eSUF0EB8Dlw",
  },
});
