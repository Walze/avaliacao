export interface Competencias {
  id: number,
  comp_id: number,
  nome: string,
  descricao: string,
  ind_count: number,
  peso: number,
  indicadores: Array<{
    id: number,
    comp_id: number,
    nome: string
  }>
}
