import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SpinnerInterceptor implements HttpInterceptor {
  private count = 0;

  constructor(private spinner: NgxSpinnerService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    this.count++;
    console.log("hui");
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;

        if (this.count === 0) {
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        }
      })
    );
  }
}
