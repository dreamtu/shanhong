import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { LayoutDefaultComponent } from './default/default.component';
import { LayoutFullScreenComponent } from './fullscreen/fullscreen.component';
import { HeaderComponent } from './default/header/header.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';
import { HeaderThemeComponent } from './default/header/components/theme.component';
import { HeaderFullScreenComponent } from './default/header/components/fullscreen.component';

const COMPONENTS = [
    LayoutDefaultComponent,
    LayoutFullScreenComponent,
    HeaderComponent,
    SidebarComponent
];

const HEADERCOMPONENTS = [
    HeaderFullScreenComponent,
    HeaderThemeComponent
];

// passport
import { LayoutPassportComponent } from './passport/passport.component';
const PASSPORT = [
    LayoutPassportComponent
];

@NgModule({
    imports: [SharedModule],
    providers: [],
    declarations: [
        ...COMPONENTS,
        ...HEADERCOMPONENTS,
        ...PASSPORT
    ],
    exports: [
        ...COMPONENTS,
        ...PASSPORT
    ]
})
export class LayoutModule { }
