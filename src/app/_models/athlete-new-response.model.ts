export interface AthleteNewServiceResponse {
  success: boolean;
  message: string;
  data: AthleteNewResponse;
}

export interface AthleteNewResponse {
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
  level:string;
  aimlevel:string;
  best_suits:string;
  __v: number;
}
