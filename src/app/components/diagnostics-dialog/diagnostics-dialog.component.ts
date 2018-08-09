import { Component, OnInit } from '@angular/core';
import { DeviceListService } from '../../providers/device-list/device-list.service'
@Component({
  selector: 'app-diagnostics-dialog',
  templateUrl: './diagnostics-dialog.component.html',
  styleUrls: ['./diagnostics-dialog.component.less']
})
export class DiagnosticsDialogComponent implements OnInit {
  isVisible: Boolean = false;
  isConfirmLoading: Boolean = false;
  diagnosisInfo: String = '';
  isSpinning: Boolean = true;
  item: any;
  constructor(
    private deviceListService: DeviceListService
  ) { }

  ngOnInit() {
  }
  public showModals (item: any, diagnosisInfo: any) {
    if (diagnosisInfo) {
      this.diagnosisInfo = diagnosisInfo
    } else {
      this.diagnosisInfo = '';
    }
    this.item = item;
    this.isVisible = true;
    this.isSpinning = true;
    setTimeout(() => {
      this.isSpinning = false;
    }, 3000)
  }
  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  Reci () {
    this.isSpinning = true;
    this.deviceListService.searchDignostics(this.item.deviceId).subscribe(res => {
      setTimeout(() => {
        this.isSpinning = false;
      }, 3000)
      if (res.device.diagnosisInfo) {
        this.diagnosisInfo = res.device.diagnosisInfo;
      }
    })
  }
}
