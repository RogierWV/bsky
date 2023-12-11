import { Injectable } from '@angular/core';
import { AtpSessionData, AtpSessionEvent, BskyAgent } from '@atproto/api'

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
  constructor() { }
  // async login(email: string, pass: string) {
  //   await this.agent.login({identifier:email, password:pass});
  // }

  public getAgent() {
    return this.agent;
  }
}

