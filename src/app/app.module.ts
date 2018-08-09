import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
/** -----------------rxjs配置----------------- **/
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/** -----------------配置存储----------------- **/
import { Ng2Webstorage } from 'ngx-webstorage';
/** -----------------地图模块----------------- **/
import { AgmCoreModule } from '@agm/core';
import { googleMapConfig } from './datas/google-map-config.data'
// 自定义窗口模块
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
/** -----------------拖拽模块----------------- **/
import { AngularSplitModule } from 'angular-split';
/** -----------------引入charts模块----------------- **/
import { ViserModule } from 'viser-ng';
import { ChartsModule } from 'ng4-charts/ng4-charts';
// import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
/** 路由模块配置 **/
import { AppRoutingModule } from './router/app-routing/app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingCacheService } from './providers/app-routing-cache/app-routing-cache.service';
/** 翻译模块模块配置 **/
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// socket
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
/** -----------------组件----------------- **/
import { LoginFormComponent } from './components/login-form/login-form.component';
// device tab 列表组件
import { DeviceTabListComponent } from './components/device-tab-list/device-tab-list.component';
// 设备组件
import { DeviceComponent } from './pages/device/device.component';
// GPU仪表盘组件
import { GpuDashBoardComponent } from './components/gpu-dash-board/gpu-dash-board.component';
// 温度曲线图组件
import { TemperatureGraphComponent } from './components/temperature-graph/temperature-graph.component';
// 设备状态组件
import { DeviceStatusComponent } from './components/device-status/device-status.component';
// 设备dialog表单组件
import { DeviceFormDialogComponent } from './components/device-form-dialog/device-form-dialog.component';
// 用户dialog表单组件
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
/** -----------------页面----------------- **/
// 登录页面
import { LoginComponent } from './pages/login/login.component';
// 首页
import { HomeComponent } from './pages/home/home.component';
// list device map charts
import { ContainerListDeviceComponent } from './pages/container-list-device/container-list-device.component';
// 集装箱管理container
import { ContainerComponent } from './pages/container/container.component';
// 设备管理 device
import { DeviceGoogleMapComponent } from './components/device-google-map/device-google-map.component';
// 地图上面设备点击图标显示信息窗口 infowindow
import { DeviceInfoWindowComponent } from './components/device-info-window/device-info-window.component';
// 设备charts数据图页面;
import { DeviceChartsComponent } from './pages/device-charts/device-charts.component';
// 规则管理
import { RuleComponent } from './pages/rule/rule.component';
// 企业管理
import { EnterpriseListComponent } from './pages/enterprise-list/enterprise-list.component';
import { EnterpriseFormDialogComponent } from './components/enterprise-form-dialog/enterprise-form-dialog.component';
import { ContainerFormDialogComponent } from './components/container-form-dialog/container-form-dialog.component';
import { RuleFormDialogComponent } from './components/rule-form-dialog/rule-form-dialog.component';
import { EnterpriseQueryComponent } from './components/enterprise-query/enterprise-query.component';
import { JourneyComponent } from './pages/journey/journey.component';
import { JourneyFormDialogComponent } from './components/journey-form-dialog/journey-form-dialog.component';
import { EnterpriseNamePipe } from './pipe/enterprise-name/enterprise-name.pipe';
import { JourneyStatusPipe } from './pipe/journey-status/journey-status.pipe';
import { ContainerListLeftComponent } from './pages/container-list-left/container-list-left.component';
import { DeviceListLeftComponent } from './pages/device-list-left/device-list-left.component';
import { DeviceRightComponent } from './pages/device-right/device-right.component';
import { DeviceBatteryComponent } from './components/device-battery/device-battery.component';
import { CellSignalComponent } from './components/cell-signal/cell-signal.component';
import { CdTabRightComponent } from './pages/cd-tab-right/cd-tab-right.component';
import { ContainerRightComponent } from './pages/container-right/container-right.component';
import { DoorComponent } from './components/door/door.component';
import { ContainerStatePipe } from './pipe/container-state/container-state.pipe';
import { DeviceStatePipe } from './pipe/device-state/device-state.pipe';
import { ContainerStateColorPipe } from './pipe/container-state-color/container-state-color.pipe';
import { DeviceStateColorPipe } from './pipe/device-state-color/device-state-color.pipe';
import { DeviceTypePipe } from './pipe/device-type/device-type.pipe';;
import { MapAddPolylinesComponent } from './components/map-add-polylines/map-add-polylines.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { JourneyListMapComponent } from './components/journey-list-map/journey-list-map.component';
import { ContainerListMapComponent } from './components/container-list-map/container-list-map.component';
import { TostringPipe } from './pipe/tostring/tostring.pipe';
import { ContainerInfoWindowComponent } from './components/container-info-window/container-info-window.component';
import { PaginatePipe } from './pipe/paginate/paginate.pipe';
import { StatisticalReportComponent } from './pages/statistical-report/statistical-report.component';
import { StatisticalQueryComponent } from './components/statistical-query/statistical-query.component';
import { StatisticalsComponent } from './components/statisticals/statisticals.component';
import { ContainerBindPipe } from './pipe/container-bind/container-bind.pipe';
import { DeviceListMapComponent } from './components/device-list-map/device-list-map.component';;
import { DeviceInfoItemWindowComponent } from './components/device-info-item-window/device-info-item-window.component';
import { ContainerListOnlyLeftComponent } from './pages/container-list-only-left/container-list-only-left.component';
import { DeviceListOnlyLeftComponent } from './pages/device-list-only-left/device-list-only-left.component';
import { AllMapComponent } from './components/all-map/all-map.component';
import { AllBindContainerPipe } from './pipe/all-bind-container/all-bind-container.pipe';
import { RolePipe } from './pipe/role/role.pipe';
import { AddLineDialogComponent } from './components/add-line-dialog/add-line-dialog.component';
import { RuleSetComponent } from './pages/rule-set/rule-set.component';
import { RulesetRelsPipe } from './pipe/ruleset-rels/ruleset-rels.pipe';
import { RulesetFormDialogComponent } from './components/ruleset-form-dialog/ruleset-form-dialog.component';
import { DeviceOnlyRightComponent } from './pages/device-only-right/device-only-right.component';
import { SimListComponent } from './pages/sim-list/sim-list.component'
import { SimFormDialogComponent } from './components/sim-form-dialog/sim-form-dialog.component';
import { DiagnosticsDialogComponent } from './components/diagnostics-dialog/diagnostics-dialog.component';
import { ContainerSensorComponent } from './components/container-sensor/container-sensor.component';
// user列表
import { UserListComponent } from './pages/user-list/user-list.component';
/** -----------------自定义管道----------------- **/
import { DeviceStatusPipe } from './pipe/device-status/device-status.pipe';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    ContainerListDeviceComponent,
    ContainerComponent,
    HomeComponent,
    DeviceChartsComponent,
    GpuDashBoardComponent,
    TemperatureGraphComponent,
    DeviceFormDialogComponent,
    UserFormDialogComponent,
    EnterpriseListComponent,
    EnterpriseFormDialogComponent,
    UserListComponent,
    ContainerFormDialogComponent,
    RuleFormDialogComponent,
    JourneyComponent,
    JourneyFormDialogComponent,
    EnterpriseNamePipe,
    JourneyStatusPipe,
    ContainerListLeftComponent,
    DeviceListLeftComponent,
    DeviceRightComponent,
    DeviceBatteryComponent,
    CellSignalComponent,
    CdTabRightComponent,
    ContainerRightComponent,
    DoorComponent,
    ContainerStatePipe,
    ContainerStateColorPipe,
    DeviceStateColorPipe,
    DeviceStatePipe,
    DeviceTypePipe,
    MapAddPolylinesComponent,
    NotfoundComponent,
    JourneyListMapComponent,
    ContainerListMapComponent,
    TostringPipe,
    ContainerInfoWindowComponent,
    PaginatePipe,
    StatisticalReportComponent,
    StatisticalQueryComponent,
    StatisticalsComponent,
    ContainerBindPipe,
    RuleSetComponent,
    DeviceListMapComponent,
    DeviceInfoItemWindowComponent,
    ContainerListOnlyLeftComponent,
    DeviceListOnlyLeftComponent,
    AllMapComponent,
    AllBindContainerPipe,
    AddLineDialogComponent,
    RolePipe,
    EnterpriseQueryComponent,
    DeviceStatusComponent,
    DeviceOnlyRightComponent,
    SimFormDialogComponent,
    SimListComponent,
    DiagnosticsDialogComponent,
    ContainerSensorComponent,  
    DeviceTabListComponent,
    DeviceInfoWindowComponent,
    DeviceGoogleMapComponent,
    LoginComponent,
    LoginFormComponent,
    DeviceComponent,
    RuleComponent,
    DeviceStatusPipe,
    RulesetRelsPipe,
    RulesetFormDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2Webstorage,
    // SocketIoModule.forRoot(config),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    NgZorroAntdModule.forRoot(),
    AgmCoreModule.forRoot(googleMapConfig),
    AgmSnazzyInfoWindowModule,
    ViserModule,
    AngularSplitModule,
    ChartsModule,
    HighchartsChartModule
    // ChartModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: AppRoutingCacheService }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
