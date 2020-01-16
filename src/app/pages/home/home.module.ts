import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@core/material";
import { TranslateModule } from "@ngx-translate/core";
import { PostsModule } from "@pages/posts/posts.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HomeRoutingModule,
    PostsModule,
    TranslateModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
