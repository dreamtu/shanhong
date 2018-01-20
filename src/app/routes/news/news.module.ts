import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { UEditorModule } from 'ngx-ueditor';

import {NewsaddComponent} from "./newsadd/newsadd.component";
import { NewsRoutingModule} from "./news-routing.module";
import {NewseditorComponent} from "./newseditor/newseditor.component";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NewsRoutingModule,
        FileUploadModule,
        UEditorModule.forRoot({
            // **注：** 建议使用本地路径；以下为了减少 ng-alain 脚手架的包体大小引用了CDN，可能会有部分功能受影响
            // 指定ueditor.js路径目录
            path: '//apps.bdimg.com/libs/ueditor/1.4.3.1/',
            // 默认全局配置项
            options: {
                themePath: '//apps.bdimg.com/libs/ueditor/1.4.3.1/themes/'
            }
        })
    ],
    declarations: [NewsaddComponent,NewseditorComponent]
})
export class NewsModule {}
