export interface InventoryResponse {
  id: number;
  itemId: number;
  isWearing: boolean;
  quantity: number;
  createdAt: string;
}

export interface ItemType {
  itemId: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

export interface CombinedInventoryItem extends InventoryResponse, ItemType {}
