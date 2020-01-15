import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ConfirmationService } from "@core/services/confirmation";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ConfirmationResolver implements Resolve<any> {
  constructor(private confirmationService: ConfirmationService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const token = route.paramMap.get("token");

    return this.confirmationService.confirm(token);
  }
}
