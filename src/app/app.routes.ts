import { Routes } from '@angular/router';
import { ButtonPageComponent } from './components/button-page/button-page.component';
import { TablePageComponent } from './components/table-page/table-page.component';

export const routes: Routes = [
    { path: '', component: ButtonPageComponent, pathMatch: 'full' },
    { path: 'table', component: TablePageComponent }
];
