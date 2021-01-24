import { ItemVendaId } from './item-venda-id';

export interface ItemVenda {
    id: ItemVendaId,
    quantidade: number,
    valorUnitario: number
}