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

export interface InteractionResponse {
  id: number;
  itemId: number;
  isWearing: boolean;
  quantity: number;
  createdAt: string;
}

export interface InteractionMenuProps {
  itemId: number;
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
}

export interface CombinedInteractiveItem extends InventoryResponse, InteractionMenuProps{}