import { Component } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-profile',
  imports: [],
  template: `
    <div class="user-profile">
      <img 
        class="user-avatar" 
        [src]="user.avatar" 
        [alt]="user.name + ' avatar'"
        
      />
      <h2 class="user-name">{{ user.name }}</h2>
      <p class="user-email">{{ user.email }}</p>
      
      <div class="contact-links">
        @if (user.phone) {
          <a [href]="'tel:' + user.phone" class="contact-link">
            <span class="contact-icon">📞</span>
            <span>{{ user.phone }}</span>
          </a>
        }
        
        @if (user.website) {
          <a [href]="user.website" target="_blank" rel="noopener" class="contact-link">
            <span class="contact-icon">🌐</span>
            <span>Website</span>
          </a>
        }
        
        @if (user.linkedin) {
          <a [href]="user.linkedin" target="_blank" rel="noopener" class="contact-link">
            <span class="contact-icon">💼</span>
            <span>LinkedIn</span>
          </a>
        }
        
        @if (user.github) {
          <a [href]="user.github" target="_blank" rel="noopener" class="contact-link">
            <span class="contact-icon">💻</span>
            <span>GitHub</span>
          </a>
        }
      </div>
    </div>
  `,
  styleUrls: ['./user-profile.css'],
})
export class UserProfile {
  user: User = {
    id: 1,
    name: 'Alex Johnson',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9IiM2M2IzZWQiLz4KPGNpcmNsZSBjeD0iNjAiIGN5PSI0NSIgcj0iMjAiIGZpbGw9IndoaXRlIi8+CjxlbGxpcHNlIGN4PSI2MCIgY3k9IjEwMCIgcng9IjMwIiByeT0iMjAiIGZpbGw9IndoaXRlIi8+Cjx0ZXh0IHg9IjYwIiB5PSI0NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjNiM2VkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFKPC90ZXh0Pgo8L3N2Zz4K',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://alexjohnson.dev',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson'
  };
}
