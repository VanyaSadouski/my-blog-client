import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

const apiUrl = `${environment.apiPrefix}/auth/`;

@Injectable({
  providedIn: "root"
})
export class ConfirmationService {
  constructor(handler: HttpBackend, private http: HttpClient) {}

  confirm(token: string): Observable<any> {
    return this.http
      .post<any>(
        apiUrl + "confirmation",
        { token },
        {
          headers: { skip: "true" }
        }
      )
      .pipe(catchError(this.handleError("confirmation", [])));
  }

  private handleError<T>(operation = "operation", result?: any) {
    return (error: any): Observable<any> => {
      this.log(`${operation} failed: ${error.message}`);

      return of(result);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
