import { Component, OnInit, ViewChild } from "@angular/core";
import { IPost } from "@core/models/post";
import { PostService } from "@core/services";
import { Store } from "@ngrx/store";
import { selectCurrentLang } from "app/store/lang/selectors";
import { ILangState } from "app/store/lang/state";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public posts: Observable<IPost[]>;
  public lang: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild("mostLikedPosts", {
    static: true
  })
  public mostLikedPosts;
  constructor(
    private postService: PostService,
    private langStore: Store<{ lang: ILangState }>
  ) {}

  ngOnInit() {
    this.langStore
      .select(selectCurrentLang)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.lang = data;
        this.posts = this.postService.getMostLikedPosts(
          this.lang.toLowerCase()
        );
      });
  }

  public toPosts() {
    this.mostLikedPosts.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest"
    });
  }
}
