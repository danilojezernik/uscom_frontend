import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PostComponent} from "./pages/post/post.component";
import {PostIdComponent} from "./pages/post-id/post-id.component";
import {ContactComponent} from "./pages/contact/contact.component";

const routes: Routes = [
    {
        path: '', redirectTo: '/post', pathMatch: 'full'
    },
    {
        path: 'post', component: PostComponent
    },
    {
        path: 'post/:id', component: PostIdComponent
    },
    {
        path: 'contact', component: ContactComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
