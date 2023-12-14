import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AtpService } from '../atp.service';
import { CommonModule } from '@angular/common';
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.sass'
})
export class FeedComponent implements OnChanges {
  @Input() id: string|undefined;
  feed: FeedViewPost[] = [];
  constructor(
    private atp: AtpService
  ) {
    this.atp.loggedInChange.subscribe(loggedIn => {
      if(loggedIn) {
        this.loadFeed();
      } else {
        this.feed = [];
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadFeed();
  }

  loadFeed(): void {
    console.log("feed.id: ",this.id)
    if(this.id) {
      this.atp.agent.getAuthorFeed({actor: this.id}).then(fres => {
        if(fres.success) {
          this.feed = fres.data.feed;
        }
      });
    } else {
      this.atp.agent.getTimeline().then(tlres => {
        if(tlres.success) {
          this.feed = tlres.data.feed;
        }
      }); 
    }
  }
}
