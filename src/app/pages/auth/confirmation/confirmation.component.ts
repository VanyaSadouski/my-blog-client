import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { pluck, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"]
})
export class ConfirmationComponent implements OnInit {
  public confirmationMessage: string;
  public time = 5;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  public ngOnInit() {
    this.route.data
      .pipe(pluck("confirmation"), takeUntil(this.destroy$))
      .subscribe(data => {
        if (data.length) {
          this.confirmationMessage =
            "The account has been verified. Please log in.";
        } else {
          this.confirmationMessage = "You are already verified. Please log in.";
        }

        this.timerRedirect();
      });
  }

  public timerRedirect() {
    setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.router.navigate(["auth/login"]);
      }
    }, 500);
  }
}
