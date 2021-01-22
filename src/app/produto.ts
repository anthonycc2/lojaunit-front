import { Categoria } from './categoria';
import { Fornecedor } from './fornecedor';
import { Marca } from './marca';

export interface Produto {
    id: number,
    nome: string,
    descricao: string,
    preco: number,
    unidade: string,
    categoria: Categoria,
    fornecedor: Fornecedor,
    marca: Marca
}