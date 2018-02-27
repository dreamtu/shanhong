import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import {HomeComponent} from "./dashboard/home.component";
import {RainMonitorComponent} from "./rainMonitor/rainMonitor.component";
import {WaterMonitorComponent} from "./waterMonitor/waterMonitor.component";
import {WeatherInfoComponent} from "./weatherInfo/weatherInfo.component";

@NgModule({
    imports: [ SharedModule, RouteRoutingModule ],
    declarations: [
        HomeComponent,
        RainMonitorComponent,
        WaterMonitorComponent,
        WeatherInfoComponent,

        // passport pages
        UserLoginComponent,
        UserRegisterComponent,
        UserRegisterResultComponent,
        // single pages
        CallbackComponent,
        Exception403Component,
        Exception404Component,
        Exception500Component
    ]
})

export class RoutesModule {}
