import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@core/material";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./header.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
