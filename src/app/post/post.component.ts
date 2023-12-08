import { Component, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { AppBskyFeedPost } from '@atproto/api'

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.sass'
})
export class PostComponent implements OnInit {
  @Input() post: FeedViewPost|null = null;
  content: string = "Not parsed";
  ngOnInit(): void {
    const p = this.post?.post.record;
    if(AppBskyFeedPost.isRecord(p)){
      const res = AppBskyFeedPost.validateRecord(p);
      if(res.success) {
        this.content = p.text;
      } else console.error("Post did not validate successfully!")
    }
  }
}
