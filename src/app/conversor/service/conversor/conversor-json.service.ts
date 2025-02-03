import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversorJsonService {

  private apiUrl = environment.apiConversorUrl;

  constructor(private http: HttpClient) {}

  converterJsonParaCsv(json: string): Observable<Blob> {
    return this.http.post(this.apiUrl, { json }, { responseType: 'blob' });
  }
}
