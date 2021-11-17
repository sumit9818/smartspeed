import { AthleteNewResponse } from "./athlete-new-response.model";

export interface Video {
  data:any;
  id: string;
  athletes: AthleteNewResponse[];
  created_at: string;
  isactive: boolean;

  blog_title: string;
  thumbnail_image: string;
  video_url: string;
  description: string;
}
