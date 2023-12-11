import { Component, Input, OnInit } from '@angular/core';
import { AtpService } from '../../atp.service';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-profile-short',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './profile-short.component.html',
  styleUrl: './profile-short.component.sass'
})
export class ProfileShortComponent implements OnInit {
  @Input() did: string | undefined;

  avatar: string | undefined;
  banner: string | undefined;
  displayName: string | undefined;
  handle: string | undefined;
  bio: string | undefined;
  followers: number = 0;
  follows: number = 0;

  constructor(
    private atp: AtpService
  ) {}

  ngOnInit() {
    if(this.did)
      this.atp.agent.getProfile({actor:this.did}).then(res => {
        if(res.success) {
          if(res.data.avatar) this.avatar = res.data.avatar;
          if(res.data.banner) this.banner = res.data.banner;
          if(res.data.displayName) this.displayName = res.data.displayName;
          if(res.data.handle) this.handle = res.data.handle;
          if(res.data.description) this.bio = res.data.description;
          if(res.data.followersCount) this.followers = res.data.followersCount;
          if(res.data.followsCount) this.follows = res.data.followsCount;
        }
      });
  }
}
