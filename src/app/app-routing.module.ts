import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';
import { MarcasComponent } from './marcas/marcas.component';
import { MarcaDetalheComponent } from './marca-detalhe/marca-detalhe.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaDetalheComponent } from './categoria-detalhe/categoria-detalhe.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { FornecedorDetalheComponent } from './fornecedor-detalhe/fornecedor-detalhe.component';
import { FormaspagamentoComponent } from './formaspagamento/formaspagamento.component';
import { FormapagamentoDetalheComponent } from './formapagamento-detalhe/formapagamento-detalhe.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqDetalheComponent } from './faq-detalhe/faq-detalhe.component';
import { VendasComponent } from './vendas/vendas.component';
import { VendaDetalheComponent } from './venda-detalhe/venda-detalhe.component';
import { ItensVendaComponent } from './itens-venda/itens-venda.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/clientes', pathMatch: 'full' },
  //{ path: 'dashboard', component: DashboardComponent },
  { path: 'cliente/:id', component: ClienteDetalheComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'marca/:id', component: MarcaDetalheComponent },
  { path: 'marcas', component: MarcasComponent },
  { path: 'categoria/:id', component: CategoriaDetalheComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'fornecedor/:id', component: FornecedorDetalheComponent },
  { path: 'fornecedores', component: FornecedoresComponent },
  { path: 'formapagamento/:id', component: FormapagamentoDetalheComponent },
  { path: 'formaspagamento', component: FormaspagamentoComponent },
  { path: 'produto/:id', component: ProdutoDetalheComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'faq/:id', component: FaqDetalheComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'venda/:id', component: VendaDetalheComponent },
  { path: 'vendas', component: VendasComponent },
  { path: 'itens-venda', component: ItensVendaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }