export interface SportNewServiceResponse {
  success: boolean;
  message: string;
  data: SportNew;
}

export interface SportNew {
  created_at: string;
  active: boolean;
  _id: string;
  name: string;
  __v: number;
}
