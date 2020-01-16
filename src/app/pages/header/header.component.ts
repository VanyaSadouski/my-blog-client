import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "@core/services";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Lang, SetLang } from "app/store/lang";
import { selectCurrentLang } from "app/store/lang/selectors";
import { ILangState } from "app/store/lang/state";
import { merge } from "rxjs";
import { distinctUntilChanged, pluck, take } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public userInfo: any;
  public headerForm: FormGroup;

  public langOptions = [
    {
      value: Lang.RU,
      label: "RU"
    },
    {
      value: Lang.EN,
      label: "EN"
    }
  ];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private langStore: Store<{ lang: ILangState }>,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.userInfo = this.loginService.user;
    this.headerForm = this.formBuilder.group({
      langOptionsControl: Lang.EN
    });
    merge(
      this.headerForm.valueChanges.pipe(pluck("langOptionsControl")),
      this.langStore.select(selectCurrentLang)
    )
      .pipe(distinctUntilChanged())
      .subscribe(lang => {
        this.langStore.dispatch(new SetLang({ lang }));
        this.headerForm.patchValue({ langOptionsControl: lang });
        this.translate.use(lang.toLowerCase());
      });
  }

  public onLogout() {
    this.loginService
      .logout()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(["/auth/login"]);
      });
  }
}
