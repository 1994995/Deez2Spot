// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';  // URL to your backend API

  constructor(private http: HttpClient) { }

  getMessage(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getDeezerAlbums(deezerUID: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/deezer/albums/' + deezerUID);
  }

  getDeezerPlaylists(deezerUID: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/deezer/playlists/' + deezerUID);
  }

  getDeezerArtists(deezerUID: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/deezer/artists/' + deezerUID);
  }

  login():void {
    window.location.href = `${this.apiUrl}/login`;
  }

  transferToSpotify(type: string | undefined, title: string | null, artist: string | null): Observable<any> {
    const access_token = localStorage.getItem('access_token');
    // TODO: Add headers for this request (token and information)
    return this.http.get<any>(this.apiUrl + '/spotify');
  } 
}
