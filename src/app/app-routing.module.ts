import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./home/welcome.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { SelectiveStrategy } from "./selective-strategy.service";
import { AuthGuard } from "./user/auth.guard";

@NgModule({
    imports: [    
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            { 
                path: 'products',
                canActivate: [AuthGuard],
                // canLoad: [AuthGuard],
                data: { preload: false },
                loadChildren: () => 
                    import('./products/product.module').then(m => m.ProductModule)
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ],
            // { preloadingStrategy: PreloadAllModules }
            { preloadingStrategy: SelectiveStrategy }
        // , { enableTracing: true }
        ),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}