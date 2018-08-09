import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef } from 'ng-zorro-antd';
import { UserSessionStorageService } from '../../providers/user-session-storage/user-session-storage.service';
import { UserLocalStorageService } from '../../providers/user-local-storage/user-local-storage.service';
import { StorageService } from '../../providers/storage-type/storage.service';
import { AllMapService } from '../../providers/all-map/all-map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  confirmModal: NzModalRef;
  constructor(
    public translateService: TranslateService,
    private userSessionStorageService: UserSessionStorageService,
    private userLocalStorageService: UserLocalStorageService,
    private router: Router,
    public storageService: StorageService,
    private allMapService: AllMapService
  ) {
  }

  ngOnInit() {
  }
  showPage () {
    // this.allMapService.actionTerminalList();
    // this.allMapService.setShow(true)
    this.allMapService.allShows = false
    this.allMapService.DallShows = true
  }
  useLanguage (languageValue: string ) : void {
    this.translateService.use(languageValue); 
  }
  exitLogin (): void {
    console.log(this.userSessionStorageService.hasUser(), this.userLocalStorageService.hasUser())
    if (!this.userSessionStorageService.hasUser()) {
      this.userSessionStorageService.clearItem();
    } else {
      this.userLocalStorageService.clearItem();
    }
    this.router.navigateByUrl('/login');
  }
  showConfirm(): void {
    this.exitLogin()
    // this.translateService.get('CONFIRM').subscribe(value => { 
    //   this.confirmModal = this.modal.confirm({
    //     nzTitle: value.LOGOUTTITLE,
    //     nzContent: value.LOGOUTCONTENT,
    //     nzCancelText: value.CANCEL,
    //     nzOkText: value.OK,
    //     nzOnOk: () => new Promise((resolve, reject) => {
    //       setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
    //     })
    //     .then(() => this.exitLogin())
    //     .catch(() => this.exitLogin())
    //   });
    // });
  }
}
