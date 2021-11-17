export interface CoachNewServiceResponse {
  success: boolean;
  message: string;
  data: CoachNewResponse;
}

export interface CoachNewResponse {
  contact: string;
  active: boolean;
  created_at: string;
  age: number;
  role: string;
  sports: string;
  _id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  profile_pic: string;
  boigraphy: string;
  skills: string;
  __v: number;
}
