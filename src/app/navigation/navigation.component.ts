import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { LoginComponent } from '../login/login.component';
import { RouterOutlet } from '@angular/router';
import { AtpService } from '../atp.service';
import { ProfileDialogComponent } from '../profile/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet
  ]
})
export class NavigationComponent {
  dialogRef: MatDialogRef<any, any> | undefined;

  constructor(
    public dialog: MatDialog,
    public atp : AtpService
  ) {}

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  openDialog() {
    if(this.atp.loggedIn) 
      this.profileDialog();
    else this.loginDialog();
  }

  profileDialog() {
    if(this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.dialogRef = this.dialog.open(ProfileDialogComponent, {data: {did: this.atp.agent.session?.did}, hasBackdrop: false});
      this.dialogRef.afterClosed().subscribe(r => delete this.dialogRef);
    }
  }

  loginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
  
    dialogRef.afterClosed().subscribe((result: {email: string|null, password: string|null}) => {
      this.atp.login(result.email, result.password);
    });
  }

  logout() {
    this.atp.logout();
  }
}
