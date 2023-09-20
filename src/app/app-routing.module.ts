// Angular core imports
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Custom component imports
import {PostComponent} from "./core/pages/post/post.component";
import {PostIdComponent} from "./core/pages/post-id/post-id.component";
import {ContactComponent} from "./core/pages/contact/contact.component";

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
