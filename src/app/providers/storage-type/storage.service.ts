import { Injectable } from '@angular/core';
import { UserLocalStorageService } from '../user-local-storage/user-local-storage.service';
import { UserSessionStorageService } from '../user-session-storage/user-session-storage.service';
import { User } from '../../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private userLocalStorageService: UserLocalStorageService,
    private userSessionStorageService: UserSessionStorageService
  ) { }
  get getStorage (): User {
    return !this.userLocalStorageService.hasUser() ? this.userLocalStorageService.getUser() : this.userSessionStorageService.getUser()
  }
}
