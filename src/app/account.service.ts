import { Injectable } from '@angular/core';
import { AtpService } from './atp.service';
import { Subject } from 'rxjs';
import { AtpSessionData } from '@atproto/api';

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
    const sessData = localStorage.getItem("bskySession") || "{}";
    const sessDataParsed = JSON.parse(sessData);
    if(this.isAtpSessionData(sessDataParsed)) {
      const res = this.atp.agent.resumeSession(sessDataParsed);
      res.then(r => {if(r.success) this.loggedInChange.next(true)});
    }
  }

  private isAtpSessionData(o: any): o is AtpSessionData {
    return "refreshJwt" in o && 
      "accessJwt" in o &&
      "handle" in o &&
      "did" in o
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

