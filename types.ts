export interface NotebookType {
  id: number,
  user_id: string,
  created_at: string,
  title: string,
  color: string,
  orderIndex: number,
}

export interface Section {
  id: number,
  notebook_id: number,
  created_at: string,
  title: string,
  orderIndex: number,
}

export interface Subscription {}

export interface UserDetails {}

export type ColorItem = {
  name: string,
  hex: string,
}
