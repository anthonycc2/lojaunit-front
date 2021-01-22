import { Venda } from './venda';
import { Produto } from './produto';

export interface ItemVendaId {
    venda: Venda,
    produto: Produto
}