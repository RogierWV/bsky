import { Component } from '@angular/core';
import { AtpService } from '../atp.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  constructor(
    private atp: AtpService,
    private accService: AccountService
    ) {}

    login() {
      this.accService.login("", "")
    }
}
