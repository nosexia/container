import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from '../../model/user/user';
const STORAGE_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class UserSessionStorageService {

  constructor(
    private storage: SessionStorageService
  ) {
    storage.observe(STORAGE_KEY)
            .subscribe((value) => console.log('new value', value));
  }

  saveUser (value: User): void {
    // 存储一个键值对
    this.storage.store(STORAGE_KEY, value);
  }
  getUser (): User {
    // 获取存储的value值
    return this.storage.retrieve(STORAGE_KEY);
  }
  clearItem (): void {
    this.storage.clear(STORAGE_KEY);
  }
  clearAll () :void {
    this.storage.clear();
  }
  hasUser (): boolean {
    return !this.storage.retrieve(STORAGE_KEY)
  }

}
