import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { CLIENT_ID, CLIENT_SECRET } from 'src/details';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private code!: any;
  private encoded: string = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  private tokenRequested: boolean = false
  private token_info$?: string;


  private body = new HttpParams()
  .set('grant_type', 'authorization_code')
  .set('code', this.getCode()  ?? this.getCode()) // This should only be used per 1 request
  .set('redirect_uri', 'http://localhost:4200/')

  private headers  = new HttpHeaders({
    'Authorization': 'Basic ' + this.encoded,
    'Content-Type' : 'application/x-www-form-urlencoded'
  })

  constructor( private http:HttpClient, private route:ActivatedRoute ) { }

  public async getAccessToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.route.queryParamMap.subscribe(async paramMap => {
        this.code = paramMap.get('code');
        try {
          await this.requestAccessToken(); // Waits for requestAccessToken() to finish before returning back to
          resolve(); // Function indicating that async operation is complete
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  

  private async requestAccessToken(): Promise<string> {
    if (this.code && !this.tokenRequested) {
      this.tokenRequested = true;
      const body = new HttpParams()
        .set('grant_type', 'authorization_code')
        .set('code', this.code)
        .set('redirect_uri', 'http://localhost:4200/');

      try{
        const response = await this.http.post("https://accounts.spotify.com/api/token", body.toString(), { headers: this.headers }).toPromise();
        this.token_info$ = JSON.stringify(response);
        return this.token_info$
      } 
      catch (error) {
        console.error()
          console.error('Error obtaining access token', error);
          throw error;
      }
      }
      
      return ''
  }
  
  public accessToken(){
    console.log(this.token_info$)
  }

  getCode(): string{ //TODO: Add correct type annotation
    this.route.queryParamMap.subscribe(paramMap => {
      this.code = paramMap.get('code');
    })
    return this.code
  }

}
