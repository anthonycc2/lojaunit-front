import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/clientes', pathMatch: 'full' },
  //{ path: 'dashboard', component: DashboardComponent },
  { path: 'detalhe/:id', component: ClienteDetalheComponent },
  { path: 'clientes', component: ClientesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }