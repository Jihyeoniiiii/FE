import axiosInstance from "./axios";

// lib/profile.ts
export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("multipartFile", file);
  const { data } = await axiosInstance.post("/api/v1/file/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data?.data?.[0]?.fileUrl;
};

export const patchUserProfile = async ({
  name,
  profileImage,
}: {
  name: string;
  profileImage: string | null | undefined;
}) => {
  const { data } = await axiosInstance.patch(
    "/api/v1/member",
    { name, profileImage },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
