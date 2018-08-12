import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
import { UserSessionStorageService } from '../../providers/user-session-storage/user-session-storage.service';
import { UserLocalStorageService } from '../../providers/user-local-storage/user-local-storage.service';
import { UserLoginBody } from '../../model/user-login-body/user-login-body';
import { UserLoginHttpService } from '../../providers/user-login-http/user-login-http.service';
import { Md5 } from "md5-typescript";
// import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  private userLoginBody: UserLoginBody
  private showError: boolean = false
  constructor(
    private userSessionStorageService: UserSessionStorageService, 
    private userLocalStorageService: UserLocalStorageService,
    // private router: Router,
    // private message: NzMessageService,
    private userLoginHttpService: UserLoginHttpService
  ) { }

  ngOnInit() {
  }

  onLoginFormValue (form: FormGroup): void {
    this.userLoginBody = {
      username: form.value.userName,
      password: Md5.init(form.value.passWord),
    }
    this.userLoginHttpService.userLogin(this.userLoginBody)
    .subscribe(res => {
      if (res.respCode === '00000') { 
        if (form.value.remember === true) {
          console.log(res.user)
          // 如果是保存，就是用local
          this.userLocalStorageService.saveUser(res.user)
        } else {
          this.userSessionStorageService.saveUser(res.user)
        }
        // this.router.navigateByUrl('/')
        window.location.reload()
      } else {
        // this.message.error('Login exception!')
        this.showError = true
        setTimeout(() => {
          this.showError = false
        }, 3000)
      }
    });
  }
}