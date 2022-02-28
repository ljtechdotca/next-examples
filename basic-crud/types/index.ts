export interface TargetState extends ItemState {
  index: number;
}

export interface ItemState {
  id: string;
  name: string;
}

export interface Action {
  type: string;
  value?: any;
}
