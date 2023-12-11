import { Component, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { AppBskyEmbedExternal, AppBskyEmbedImages, AppBskyEmbedRecord, AppBskyEmbedRecordWithMedia, AppBskyFeedPost } from '@atproto/api'
import { RouterLink } from '@angular/router';
import { AtpService } from '../atp.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterLink, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.sass'
})
export class PostComponent implements OnInit {
  constructor(
    private atp: AtpService
  ) {}

  @Input() post: FeedViewPost|null = null;
  img: {src: string, alt: string}[]|null = null;
  content: string = "Not parsed";

  ngOnInit() {
    const p = this.post?.post.record;
    if(AppBskyFeedPost.isRecord(p)){
      const res = AppBskyFeedPost.validateRecord(p);
      if(res.success) {
        this.content = p.text;
        let imgs = p.embed;
        if(AppBskyEmbedImages.isMain(imgs)) {
          console.log("AppBskyEmbedImages.Main")
          this.img = imgs.images.map( i => { 
            return {
              src:
                "https://bsky.social/xrpc/com.atproto.sync.getBlob?did="+ this.post?.post.author.did +
                "&cid=" + i.image.ref,
              alt: i.alt 
            }
          });
        } else if (AppBskyEmbedExternal.isMain(imgs)) {
          // this.img = [imgs.external.uri];
          console.log("AppBskyEmbedExternal.Main")
        } else if (AppBskyEmbedRecord.isMain(imgs)) {
          console.log("AppBskyEmbedRecord.Main")
          // this.img = [imgs.record.uri];
        } else if (AppBskyEmbedRecordWithMedia.isMain(imgs)) {
          console.log("AppBskyEmbedRecordWithMedia.Main")
          
        }
      } else console.error("Post did not validate successfully!")
    }
  }
}
