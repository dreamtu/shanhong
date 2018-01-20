import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsaddComponent} from "./newsadd/newsadd.component";
import {NewseditorComponent} from "./newseditor/newseditor.component";

const routes: Routes = [
    { path: 'newsadd', component: NewsaddComponent },
    { path: 'newseditor', component: NewseditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
