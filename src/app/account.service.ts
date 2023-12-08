import { Injectable } from '@angular/core';
import { AtpService } from './atp.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loggedIn : boolean = false;
  loggedInChange : Subject<boolean> = new Subject<boolean>();

  constructor(
    private atp: AtpService
  ) {
    this.loggedInChange.subscribe((v) => this.loggedIn = v);
  }

  async login(email: string|null, pass: string|null) {
      if(email !== null && pass !== null) {
      await this.atp.agent.login({
        identifier: email,
        password: pass
      });
      this.loggedInChange.next(true);
    }
  }
}