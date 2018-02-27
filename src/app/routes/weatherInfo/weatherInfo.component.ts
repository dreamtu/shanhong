import { Component } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

declare var Highcharts;

@Component({
    selector: 'app-home',
    templateUrl: './weatherInfo.component.html'
})
export class WeatherInfoComponent {
    private rainList: any;
    public rainfall: any;  // 降雨量
    public daystr: any;  // 横坐标x 月份

    constructor(private message: NzMessageService, public  http: HttpClient) {}

    ngOnInit() {
        this.zhuzhuangAlert();
    }

    // 柱状图
    zhuzhuangAlert() {
        this.http.get('/test/monthPrec', {}).subscribe((data: any) => {
            this.rainList = data;
            this.rainfall = '['; // 降雨量
            this.daystr = '['; // daystr为横坐标的数据：[1,2,3,  ....31/30]

            for (let i = 0; i < data.length; i += 1) {
                if (i !== data.length - 1) {
                    this.rainfall += data[i].total_precitation + ',';
                    this.daystr += '"' + data[i].month + '",';
                    console.log(data[i].month);

                } else {
                    this.rainfall += data[i].total_precitation + ']';
                    this.daystr += '"' + data[i].month + '"]';
                }
            }

            let monthChart = Highcharts.chart('monthChart', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: data[0].year + '年1~12月' + data[0].city + '降水量'
                },
                subtitle: {
                    text: '数据来源: 莒县'
                },
                xAxis: {
                    categories: eval('(' + this.daystr + ')'),
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '降水量 (mm)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: data[0].city,
                    data: eval('(' + this.rainfall + ')')
                }
                /*, {name: '纽约',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
                }, {name: '伦敦',
                    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
                }, {name: '柏林',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
                }*/
                ]
            });
        }, ( err: HttpErrorResponse) => {
            this.showMsg('加载失败');
        });


        this.http.get('/test/yearPrec', {}).subscribe((data: any) => {
            this.rainList = data;
            this.rainfall = '['; // 降雨量
            this.daystr = '['; // daystr为横坐标的数据：[1,2,3,  ....31/30]

            for (let i = 0; i < data.length; i += 1) {
                if (i !== data.length - 1) {
                    this.rainfall += data[i].total_precitation + ',';
                    this.daystr += '"' + data[i].year + '",';
                } else {
                    this.rainfall += data[i].total_precitation + ']';
                    this.daystr += '"' + data[i].year + '"]';
                }
            }

            let yearChart = Highcharts.chart('yearChart', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: data[0].year + ' ~ ' + data[data.length - 1].year + '年' + data[0].city + '降水量'
                },
                subtitle: {
                    text: '数据来源: 莒县'
                },
                xAxis: {
                    categories: eval('(' + this.daystr + ')'),
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '降水量 (mm)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: data[0].city,
                    data: eval('(' + this.rainfall + ')')
                }
                    /*, {name: '纽约',
                        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
                    }, {name: '伦敦',
                        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
                    }, {name: '柏林',
                        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
                    }*/
                ]
            });
        }, ( err: HttpErrorResponse) => {
            this.showMsg('加载失败');
        });
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }
}
