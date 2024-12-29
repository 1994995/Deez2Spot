import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'deez2spot';
  message: string = '';
  deezerUID: string = '2457195644';
  dataArray: any;
  containerTitle: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    
  }

  getDeezerAlbums(): void {
    if (this.deezerUID == '')
      this.message = 'Enter your Deezer User ID!'
    else {
      this.apiService.getDeezerAlbums(this.deezerUID).subscribe(response => {
        this.containerTitle = 'Albums';
        this.dataArray = response.data;
        this.dataArray.sort((a: any, b: any) => a.artist.name.localeCompare(b.artist.name));
      });
    }
  }

  getDeezerPlaylists(): void {
    if (this.deezerUID == '')
      this.message = 'Enter your Deezer User ID!'
    else {
      this.apiService.getDeezerPlaylists(this.deezerUID).subscribe(response => {
        this.containerTitle = 'Playlists';
        this.dataArray = response.data;
      });
    }
  }

  getDeezerArtists(): void {
    if (this.deezerUID == '')
      this.message = 'Enter your Deezer User ID!'
    else {
      this.apiService.getDeezerArtists(this.deezerUID).subscribe(response => {
        this.containerTitle = 'Artists';
        this.dataArray = response.data;
      });
    }
  }

  fuckOff(): void {
    this.message = "Fuck off";
  }
}
