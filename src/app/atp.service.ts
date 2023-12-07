import { Injectable } from '@angular/core';
import { BskyAgent } from '@atproto/api'

@Injectable({
  providedIn: 'root'
})
export class AtpService {
  public agent = new BskyAgent({service: 'https://bsky.social/'});
  constructor() { }
  // async login(email: string, pass: string) {
  //   await this.agent.login({identifier:email, password:pass});
  // }

  public getAgent() {
    return this.agent;
  }
}
