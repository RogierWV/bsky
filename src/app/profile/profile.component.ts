import { Component, Input, OnInit } from '@angular/core';
import { ProfileShortComponent } from './profile-short/profile-short.component';
import { AtpService } from '../atp.service';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileShortComponent,
    FeedComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent implements OnInit {
  @Input() handle: string|undefined;
  did: string|undefined;

  constructor (
    private atp: AtpService
  ) {
      
  }

  ngOnInit() {
    console.log("did: ", this.did);
    console.log("handle: ", this.handle);
    this.atp.agent.resolveHandle({handle: this.handle || this.atp.agent.session?.handle || ""}).then(profile => {
      console.log("resolved: ", profile.success)
      if(profile.success) this.did = profile.data.did;
    });
  }
}
