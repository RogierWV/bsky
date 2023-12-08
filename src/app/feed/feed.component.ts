import { Component } from '@angular/core';
import { AtpService } from '../atp.service';
import { CommonModule } from '@angular/common';
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { AccountService } from '../account.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.sass'
})
export class FeedComponent {
  feed: FeedViewPost[] = [];
  constructor(
    private atp: AtpService,
    private act: AccountService
  ) {
    this.act.loggedInChange.subscribe(v => {
      if(v) {
        this.atp.agent.getTimeline().then(tlres => {
          if(tlres.success) {
            console.log(JSON.stringify(tlres.data.feed, null, 2));
            this.feed = tlres.data.feed;
          }
        });
      }
    })
  }
}
