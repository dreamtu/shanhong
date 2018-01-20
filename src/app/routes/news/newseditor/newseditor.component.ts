import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-newseditor',
    templateUrl: './newseditor.component.html'
})
export class NewseditorComponent implements OnInit {
    pi = 1;
    ps = 10;
    total = 0; // mock total
    list = [];
    loading = false;
    args: any = { };

    load(pi?: number) {
        if (typeof pi !== 'undefined') {
            this.pi = pi || 1;
        }
        this.loading = true;
        this.http.get('/test/touristList', {}).subscribe((data: any) => {
            this.loading = false;
            this.list = data;
            this.total = data.length;
        }, ( err: HttpErrorResponse) => {
            this.showMsg('加载失败');
        });
    }

    clear() {
        this.args = {};
        this.load(1);
    }

    constructor(private http: _HttpClient, private message: NzMessageService) {}

    ngOnInit() {
        this.load();
    }

    delNews(id){
        this.http.post('/test/delNews/'+id, {}).subscribe((data: any) => {
            this.showMsg('删除成功');
            this.load();
        }, ( err: HttpErrorResponse) => {
            this.showMsg('删除失败');
        });
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }
}
