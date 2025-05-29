"use client";

import ClientWelcome from "@/components/welcome/ClientWelcome";
import { useCat } from "@/hooks/useCat";
import { useWearingInventory } from "@/hooks/useInventory";
import axiosInstance from "@/lib/api/axios";
import { catStore } from "@/store/catStore";
import { userStore } from "@/store/userStore";
import { useEffect } from "react";

export default function WelcomePage() {
  const setUserData = userStore((state) => state.setUserData);
  const setCatData = catStore((state) => state.setCatData);
  const setInventory = catStore((state) => state.setInventory);

  const {
    data: catInfo,
    isPending: isCatPending,
    isError: catError,
  } = useCat();

  const {
    data: InventoryData, // itemId 배열 (예: [9])
    isPending: isInventoryPending,
    isError: inventoryError,
  } = useWearingInventory();

  const fetchMemberInfo = async () => {
    const response = await axiosInstance.get("/api/v1/member");
    return response.data;
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: userData } = await fetchMemberInfo();
        setUserData(userData);

        // catInfo와 InventoryData가 모두 로드되었고 에러가 없을 때만 스토어 업데이트
        if (
          !isCatPending &&
          catInfo &&
          !catError &&
          !isInventoryPending &&
          InventoryData &&
          !inventoryError
        ) {
          setCatData({
            ...catInfo,
          });

          setInventory(InventoryData);
          console.log("착용중인 Inventory", InventoryData);
        } else {
          console.log(
            "WelcomePage - Conditions not met for data initialization. Skipping update."
          );
        }
      } catch (err) {
        console.error("회원 정보 요청 실패:", err);
      }
    };

    getUser();
  }, [
    setUserData,
    setCatData,
    setInventory,
    catInfo,
    InventoryData, // InventoryData 변경 시 useEffect 재실행
    isCatPending,
    isInventoryPending,
    catError,
    inventoryError,
  ]);

  return <ClientWelcome />;
}
