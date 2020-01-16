import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@core/material";
import { TranslateModule } from "@ngx-translate/core";
import { CategoryAddComponent } from "./category-add";
import { CategoryListComponent } from "./category-list";
import { CategoryRoutingModule } from "./category-routing.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [CategoryAddComponent, CategoryListComponent]
})
export class CategoryModule {}
