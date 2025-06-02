"use client";

import ClientWelcome from "@/components/welcome/ClientWelcome";
import { useCat } from "@/hooks/useCat";
import { useWearingInventory } from "@/hooks/useInventory";
import { useMemberData } from "@/lib/userData";
import { catStore } from "@/store/catStore";
import { userStore } from "@/store/userStore";
import { useEffect } from "react";

export default function WelcomePage() {
  const setUserData = userStore((state) => state.setUserData);
  const setRecipientData = userStore((state) => state.setRecipientData);
  const setCatData = catStore((state) => state.setCatData);
  const setInventory = catStore((state) => state.setInventory);

  const {
    data: userInfo,
    isPending: isUserDataPending,
    isError: isUserDataError,
  } = useMemberData();

  const {
    data: catInfo,
    isPending: isCatPending,
    isError: isCatError,
  } = useCat();

  const {
    data: InventoryData, // itemId 배열 (예: [9])
    isPending: isInventoryPending,
    isError: inventoryError,
  } = useWearingInventory();

  useEffect(() => {
    if (!isUserDataPending && userInfo && !isUserDataError) {
      if ("donations" in userInfo) {
        setUserData(userInfo);
      } else if (userInfo.fundings) {
        setRecipientData(userInfo);
      }
    } else if (isUserDataError) {
      console.error("WelcomePage: Failed to load userInfo", isUserDataError);
    }

    if (
      !isUserDataPending &&
      !isCatPending &&
      catInfo &&
      !isCatError &&
      !isInventoryPending &&
      InventoryData &&
      !isUserDataError &&
      !inventoryError
    ) {
      setCatData({
        ...catInfo,
      });
      if (Array.isArray(InventoryData)) {
        setInventory(InventoryData);
      } else {
        console.warn(
          "WelcomePage: InventoryData is not an array or is null/undefined.",
          InventoryData
        );
        setInventory([]); // 기본값 또는 빈 배열로 설정
      }
    }
  }, [
    setUserData,
    setRecipientData,
    setCatData,
    setInventory,
    userInfo,
    catInfo,
    InventoryData, // InventoryData 변경 시 useEffect 재실행
    isUserDataPending,
    isCatPending,
    isInventoryPending,
    isUserDataError,
    isCatError,
    inventoryError,
  ]);

  return <ClientWelcome />;
}
