import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
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
import { FaqsComponent } from './faqs/faqs.component';
import { FaqDetalheComponent } from './faq-detalhe/faq-detalhe.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { VendasComponent } from './vendas/vendas.component';
import { VendaDetalheComponent } from './venda-detalhe/venda-detalhe.component';
import { ItensVendaComponent } from './itens-venda/itens-venda.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ClienteDetalheComponent,
    MarcasComponent,
    MarcaDetalheComponent,
    CategoriasComponent,
    CategoriaDetalheComponent,
    FornecedoresComponent,
    FornecedorDetalheComponent,
    FormaspagamentoComponent,
    FormapagamentoDetalheComponent,
    FaqsComponent,
    FaqDetalheComponent,
    ProdutoDetalheComponent,
    ProdutosComponent,
    VendasComponent,
    VendaDetalheComponent,
    ItensVendaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    // no need to place any providers due to the `providedIn` flag...
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }