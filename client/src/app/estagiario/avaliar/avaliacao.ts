export interface Avaliacao {
  id: number,
  comp_id: number,
  nome: string,
  descricao: string,
  indicadores: Array<{
    id: number,
    comp_id: number,
    nome: string
  }>
}
