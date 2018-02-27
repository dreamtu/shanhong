import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd";

declare var AMap;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public map: any;
    public weatherData: any; // 天气
    public weatherImg: any; // 天气img

    constructor(private message: NzMessageService, public http: HttpClient) { }

    ngOnInit() {
        this.rainMon();
        this.getWeather();
    }

    // 天气预报
    getWeather() {
        this.http.get('/test/getWeather', {}).subscribe((data: any) => {
            console.log(data);
            this.weatherData = data.HeWeather6[0];
            this.weatherImg = 'assets/img/cond_icon/' + data.HeWeather6[0].now.cond_code + '.png'; // 天气预报图标
        }, ( err: HttpErrorResponse) => {
            this.showMsg('加载失败');
        });
    }

    // 显示地图
    rainMon() {
        // 加载地图，调用浏览器定位服务
        this.map = new AMap.Map('container', {
            zoom: 14,
            center: [ 118.9971900000, 35.5101800000],
            resizeEnable: true
        });

        const markers = []; // 标记
        this.http.get('/test/touristList', {}).subscribe((data: any) => {
            console.log(data);
            for (let i = 0; i < data.length; i += 1) {
                let marker;
                marker = new AMap.Marker({
                    offset: new AMap.Pixel(-12, -12),
                    zIndex: 101,
                    title: data[i].title,
                    extData: data[i].id,
                    position: data[i].href.split(','),
                    map: this.map
                });
                /* marker.setLabel({
                   offset: new AMap.Pixel(20, -20),//修改label相对于maker的位置
                   content: "点击Marker打开高德地图"
                 });*/
                // this.map.setCenter(marker.getPosition());
                markers.push(marker);
                marker.on('click', function(e){
                    // document.getElementById("tourist").innerText= marker.getTitle(); //景点名称
                    marker.setLabel({
                        offset: new AMap.Pixel(20, -20), // 修改label相对于maker的位置
                        content: data[i].title
                    });

                });
            }
        }, ( err: HttpErrorResponse) => {
            this.showMsg('加载失败');
        });
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }
}
