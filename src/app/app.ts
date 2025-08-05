import {Component} from '@angular/core';
import {Home} from './home/home';
import {UserProfile} from './user-profile/user-profile';

@Component({
  selector: 'app-root',
  imports: [Home, UserProfile],
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
      </header>
      <section class="content">
        <app-user-profile></app-user-profile>
        <app-home></app-home>
      </section>
    </main>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'homes';
}
