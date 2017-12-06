export interface Gestor {
  id?: number,
  nome: string,
  email: string,
  localidade_id: number,
  setor_id: number,
  avaliacoes?: Array<object>
}
