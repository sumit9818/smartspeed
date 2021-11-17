import { AthleteHeader } from './athlete-header.class';
import { Coach } from './coach.model';
import { Role } from './role.model'
import { Sport } from './sport.model';

export class Athlete extends AthleteHeader {
    id: string;
    role: Role;
    sports: Sport;
    coach: Coach;
}
