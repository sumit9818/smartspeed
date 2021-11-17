export interface ProgramNewServiceResponse {
    success: boolean;
    message: string;
    data: ProgramResponse;
  }
  
  export interface ProgramResponse {
    isactive: boolean;
    created_at: string;
    athletes: any[];
    _id: string;
    title: string;
    __v: number;
  }