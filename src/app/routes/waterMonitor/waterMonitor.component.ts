import { Component } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-home',
    templateUrl: './waterMonitor.component.html'
})
export class WaterMonitorComponent {
    constructor(private message: NzMessageService, public  http: HttpClient) {}

    pi = 1;
    ps = 10;
    total = 1; // mock total
    list = [];
    loading = false;
    args: any = { };
    _indeterminate = false;
    _allChecked = false;

    load(pi?: number) {
        if (typeof pi !== 'undefined') {
            this.pi = pi || 1;
        }

        this.loading = true;
        this._allChecked = false;
        this._indeterminate = false;

        // 当月每天天气数据
        this.http.get('/test/dayPrec', {}).subscribe((data: any) => {
            this.loading = false;
            this.list = data;
            this.total = data.length;

            this.showMsg('加载完成');
        }, ( err: HttpErrorResponse) => {
            this.showMsg('加载失败');
        });
    }

    clear() {
        this.args = {};
        this.load(1);
    }

    _checkAll() {
        this.list.forEach(item => item.checked = this._allChecked);
        this.refChecked();
    }
    refChecked() {
        const checkedCount = this.list.filter(w => w.checked).length;
        this._allChecked = checkedCount === this.list.length;
        this._indeterminate = this._allChecked ? false : checkedCount > 0;
    }

    ngOnInit() {
        this.load();
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }
}
