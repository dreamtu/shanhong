import { Component } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

declare var Highcharts;

@Component({
    selector: 'app-home',
    templateUrl: './rainMonitor.component.html'
})
export class RainMonitorComponent {
    private rainList: any = '';
    public rainfall: any;  // 降雨量
    public daystr: any;  // 横坐标x 月份

    constructor(private message: NzMessageService, public  http: HttpClient) {}

    ngOnInit() {
        this.zhexiantuAlert();
    }

    // 折线图
    zhexiantuAlert() {
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

            // 折线图
            var monthChart = Highcharts.chart('monthChart', {
                title: {
                    text: data[0].year + '年1~12月' + data[0].city + '降水量' // 标题
                },
                subtitle: {
                    text: '数据来源：莒县' // 副标题
                },
                xAxis: {
                    categories: eval('(' + this.daystr + ')')
                },
                yAxis: {
                    title: {
                        text: '1~12月降水量'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                /*plotOptions: {
                  series: {
                    label: {
                      connectorAllowed: true
                    },
                    pointStart: 1
                  }
                },*/
                series: [{
                    name: '降水量(mm)',
                    data: eval('(' + this.rainfall + ')')
                }
                    /*, {
                      name: '工人',
                      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                    }, {
                      name: '销售',
                      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                    }, {
                      name: '项目开发',
                      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                    }, {
                      name: '其他',
                      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                    }*/
                ],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
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

            // 折线图
            var yearChart = Highcharts.chart('yearChart', {
                title: {
                    text: data[0].year + ' ~ '+ data[data.length-1].year + '年' + data[0].city + '降水量' // 标题
                },
                subtitle: {
                    text: '数据来源：莒县' // 副标题
                },
                xAxis: {
                    categories: eval('(' + this.daystr + ')')
                },
                yAxis: {
                    title: {
                        text: '2013-2017年降水量'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                /*plotOptions: {
                  series: {
                    label: {
                      connectorAllowed: true
                    },
                    pointStart: 1
                  }
                },*/
                series: [{
                    name: '降水量(mm)',
                    data: eval('(' + this.rainfall + ')')
                }
                    /*, {
                      name: '工人',
                      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                    }, {
                      name: '销售',
                      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                    }, {
                      name: '项目开发',
                      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                    }, {
                      name: '其他',
                      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                    }*/
                ],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });

        }, ( err: HttpErrorResponse) => {
            this.showMsg('加载失败');
        });
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }
}
