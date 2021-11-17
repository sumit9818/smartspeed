import { AthleteNewResponse } from "./athlete-new-response.model";

export interface Assessment {
  id: string;
  assessment: string;
  athletes: AthleteNewResponse[];
  created_at: string;
  isactive: boolean;
}
