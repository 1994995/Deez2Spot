import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const access_token = params['access_token'];
      const refresh_token = params['refresh_token'];
      const expires_in = params['expires_in'];

      if (access_token && refresh_token && expires_in) {
        // Save tokens in localStorage (or sessionStorage depending on your needs)
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('expires_in', expires_in);

        // Optionally, navigate to another page (e.g., dashboard or home)
        this.router.navigate(['/']);
      } else {
        // Handle error if tokens are missing
        console.error('Token exchange failed: Tokens are missing.');
        // Optionally, show an error message or navigate to an error page
      }
    });
  }
}
