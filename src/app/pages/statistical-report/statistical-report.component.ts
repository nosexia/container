import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { StatisticalService } from '../../providers/statistical/statistical.service';
import { StatisticalQueryComponent } from '../../components/statistical-query/statistical-query.component';
@Component({
  selector: 'app-statistical-report',
  templateUrl: './statistical-report.component.html',
  styleUrls: ['./statistical-report.component.less']
})
export class StatisticalReportComponent implements OnDestroy {
  @ViewChild(StatisticalQueryComponent)
  private statisticalQueryComponent: StatisticalQueryComponent;
  private newValue: any = {
    title: '',
    value: 1
  }
  constructor(
    public statisticalService: StatisticalService,
  ) {
  }

  ngOnInit(): void {
      this.newValue = {
        title: '',
        value: 2
      }
  }
  ngOnDestroy () {
    this.statisticalService.closeWSS();
    this.statisticalService.resetTableData();
  }
  queryInput (value: any): void {
    // this.statisticalService.commonList(value, this.statisticalQueryComponent.type);
    this.statisticalService.showStatisticsData(value, this.statisticalQueryComponent.type);
  }
  btnType (type: number) {
    if (!type) return;
    this.statisticalQueryComponent.type = type;
    this.statisticalQueryComponent.queryTable();
  }
}
