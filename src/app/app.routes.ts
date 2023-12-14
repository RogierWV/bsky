import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        component: FeedComponent
    },
    {
        path: 'profile/:handle',
        component: ProfileComponent
    }
];
