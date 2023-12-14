import { Injectable } from '@angular/core';
import { AtpSessionData, AtpSessionEvent, BskyAgent } from '@atproto/api'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtpService {
  public agent = new BskyAgent({
    service: 'https://bsky.social/',
    persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
      localStorage.setItem("bskySession", JSON.stringify(sess));
    }
  });

  loggedIn : boolean = false;
  loggedInChange : Subject<boolean> = new Subject<boolean>();

  constructor(
  ) {
    this.loggedInChange.subscribe((v) => this.loggedIn = v);
    try { 
      const sessData = localStorage.getItem("bskySession") || "{}";
      const sessDataParsed = JSON.parse(sessData);
      if(this.isAtpSessionData(sessDataParsed)) {
        const res = this.agent.resumeSession(sessDataParsed);
        res.then(r => {if(r.success) this.loggedInChange.next(true)});
      }
    } catch(e) {
      console.error(e);
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
      await this.agent.login({
        identifier: email,
        password: pass
      });
      this.loggedInChange.next(true);
    }
  }

  logout() {
    localStorage.removeItem("bskySession");
    this.agent.session = undefined;
    this.loggedInChange.next(false);
  }
  // async login(email: string, pass: string) {
  //   await this.agent.login({identifier:email, password:pass});
  // }

  public getAgent() {
    return this.agent;
  }
}

