import { Injectable } from '@angular/core';
import { AtpService } from './atp.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loggedIn : boolean = false;

  constructor(
    private atp: AtpService
  ) { }

  async login(email: string, pass: string) {
    await this.atp.agent.login({
      identifier: email,
      password: pass
    });
    this.loggedIn = true;
  }
}
