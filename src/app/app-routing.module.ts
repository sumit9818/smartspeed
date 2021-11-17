import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeBlogsComponent } from './news/news.component';
import { ViewHomeBlogsComponent } from './news/view.component';
// import { HomeCoachListComponent } from './coach/coach.component';
// import { ViewHomeCoachComponent } from './coach/view.component';

import { AuthGuard } from './_helpers';
import { Roles } from './_models';

const AdminModule = () => import('./admin/admin.module').then(x => x.AdminModule);

const AthleteModule = () => import('./athlete/athlete.module').then(x => x.AthleteModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'news', component: HomeBlogsComponent },
    { path: 'news/:id', component: ViewHomeBlogsComponent },
    // { path: 'coach', component: HomeCoachListComponent },
    // { path: 'coach/:id', component: ViewHomeCoachComponent  },
    { path: 'admin', loadChildren: AdminModule, 
        canActivate: [AuthGuard],
        data: { roles: [Roles.Admin] }
    },
    { path: '', loadChildren: AthleteModule, 
        canActivate: [AuthGuard],
        data: { roles: [Roles.Athlete]  }
    },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }