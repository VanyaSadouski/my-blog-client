import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "@core/services";
import { FormErrorStateMatcher } from "@core/utils";
import { take } from "rxjs/operators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public formErrorStateMatcher = new FormErrorStateMatcher();
  public isHidden = true;
  public isRegistered = true;
  public errorText: string;
  public successText = "Check your email :)";
  public attempt = false;

  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.createForm();
  }

  public createForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  public toLogin() {
    this.router.navigate(["/auth/login"]);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .register(this.form.value)
      .pipe(take(1))
      .subscribe(
        res => {
          this.attempt = true;

          if (!res.success) {
            this.isRegistered = false;
            this.errorText = res.msg;
            return;
          } else {
            this.isRegistered = true;
            this.successText = res.msg;
          }
        },
        err => {
          this.isRegistered = false;
        }
      );
  }
}
