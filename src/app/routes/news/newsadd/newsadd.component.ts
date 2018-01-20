import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {_HttpClient} from "@delon/theme";
import {NzMessageService} from "ng-zorro-antd";
import {HttpErrorResponse} from "@angular/common/http";

const URL = 'https://test.com/';

@Component({
    selector: 'app-newsadd',
    templateUrl: './newsadd.component.html',
    styles: []
})
export class NewsaddComponent implements OnInit {
    article = {
        title: '',
        address: '',
        coverImageUrl: '',
        deleteFlag:'',
        content:''
    };

    uploader: FileUploader = new FileUploader({
        url: URL,
        isHTML5: true
    });

    selectValue;
    options = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'disabled', label: 'Disabled', disabled: true }
    ];

    files: any[] = [];

    constructor(private http: _HttpClient, private message: NzMessageService) {
        this.selectValue = this.options[0];
        this.uploader.onAfterAddingFile = (f) => {
            this.files = this.uploader.queue;
            return f;
        };
    }
    ngOnInit() {}

    doSubmit(contactForm){
        this.http.post('/test/insertNews/'+this.article, {data:this.article}).subscribe((data: any) => {

            console.log(contactForm);
            console.log("--------------分割线------------------");
            console.log(this.article);
            this.showMsg('新增成功');
        }, ( err: HttpErrorResponse) => {
            this.showMsg('新增失败');
        });
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }
}
