import { CoachHeader } from './coach-header.class';
import { Role } from './role.model';
import { Sport } from './sport.model';

export class Coaches extends CoachHeader {
  id: string;
  role: Role;
  sports: Sport;
}
