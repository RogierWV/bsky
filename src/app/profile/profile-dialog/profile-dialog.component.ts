import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileShortComponent } from '../profile-short/profile-short.component';
import { AtpService } from '../../atp.service';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ProfileShortComponent
  ],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.sass'
})
export class ProfileDialogComponent implements OnInit {
  
  displayName: string | undefined;
  constructor(
    private atp: AtpService,
    @Inject(MAT_DIALOG_DATA) public data: {did: string}
  ) {}
  ngOnInit(): void {
    // if(!this.did) this.did = this.atp.agent.session?.did || "";
    this.atp.agent.getProfile({actor:this.data.did}).then(r => {
      if(r.success) {
        if(r.data.displayName) this.displayName = r.data.displayName;
      }
    })
  }
}
