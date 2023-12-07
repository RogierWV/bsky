import { Component, OnInit } from '@angular/core';
import { AtpService } from '../atp.service';
import { CommonModule } from '@angular/common';
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.sass'
})
export class FeedComponent implements OnInit {
  feed: FeedViewPost[] = [];
  constructor(
    private atp: AtpService
  ) {}
  async ngOnInit() {
    let identifier = window.prompt("identifier", "") || "";
    let password = window.prompt("passwd", "") || "";
    await this.atp.agent.login({identifier, password})
    this.atp.agent.getTimeline().then(tlres => {
      if(tlres.success) {
        console.log(JSON.stringify(tlres.data.feed, null, 2));
        this.feed = tlres.data.feed;
      }
    });
  }
}
