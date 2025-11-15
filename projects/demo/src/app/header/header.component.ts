import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
