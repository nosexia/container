import { Routes } from '@angular/router';
// 路由拦截器
import { LoginGuard } from '../guard/login/login.guard'
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { ContainerListDeviceComponent } from '../pages/container-list-device/container-list-device.component';
import { ContainerComponent } from '../pages/container/container.component';
import { DeviceComponent } from '../pages/device/device.component';
// import { RuleComponent } from '../pages/rule/rule.component';
import { UserListComponent } from '../pages/user-list/user-list.component';
import { EnterpriseListComponent } from '../pages/enterprise-list/enterprise-list.component';
import { JourneyComponent } from '../pages/journey/journey.component';
import { StatisticalReportComponent } from '../pages/statistical-report/statistical-report.component';
import { RuleSetComponent } from '../pages/rule-set/rule-set.component';
import { SimListComponent } from '../pages/sim-list/sim-list.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';

export const routes: Routes = [
    { 
        path: '', redirectTo: 'home/listdevice', pathMatch: 'full', data: { keep: false }
    },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard], data: { keep: false } },
    { path: 'home', component: HomeComponent,
        data: { keep: false },
        children: [
            { 
                path: 'listdevice',
                component: ContainerListDeviceComponent,
                pathMatch: 'full',
                data: { keep: false }
            },
            { 
                path: 'userlist',
                component: UserListComponent,
                data: { keep: false }
            },
            { 
                path: 'container',
                component: ContainerComponent,
                data: { keep: false }
            },
            {
                path: 'device',
                component: DeviceComponent,
                data: { keep: false }
            },
            // { 
            //     path: 'rule',
            //     component: RuleComponent,
            //     data: { keep: true }
            // },
            { 
                path: 'ruleset',
                component: RuleSetComponent,
                data: { keep: false }
            },
            { 
                path: 'enterpriseList',
                component: EnterpriseListComponent,
                data: { keep: false }
            },
            { 
                path: 'journey',
                component: JourneyComponent,
                data: { keep: false }
            },
            { 
                path: 'statisticalreport',
                component: StatisticalReportComponent,
                data: { keep: false }
            },
            { 
                path: 'sim',
                component: SimListComponent,
                data: { keep: false }
            }
        ],
        canActivate: [LoginGuard]
    },
    { path: '**',  component: NotfoundComponent }
];