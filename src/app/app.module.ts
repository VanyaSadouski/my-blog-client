import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpInterceptorProviders } from "@core/interceptors";
import { NgSelectConfig } from "@ng-select/ng-select";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BaseLayoutModule } from "@pages/base-layout/base-layout.module";
import { HeaderModule } from "@pages/header/header.module";
import { environment } from "environments/environment";
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TokenInterceptor } from "./core/interceptors/token.interceptor";
import { SharedModule } from "./shared/shared.module";
import { APP_STATE_REDUCER, metaReducers } from "./store";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    BaseLayoutModule,
    RouterModule,
    HeaderModule,
    SharedModule,
    NgxSpinnerModule,
    StoreModule.forRoot(APP_STATE_REDUCER, { initialState: {}, metaReducers }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 25 })
      : [],
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: NgSelectConfig,
      useValue: {
        notFoundText: "Не найдено"
      }
    },
    ...HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
