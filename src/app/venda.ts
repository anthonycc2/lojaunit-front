import { Cliente } from './cliente';
import { FormaPagamento } from "./FormaPagamento";

export interface Venda {
    id: number,
    datahora: string,
    cliente: Cliente,
    formaPagamento: FormaPagamento,
    valor: number
}