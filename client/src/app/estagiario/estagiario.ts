export interface Estagiario {
  id: number,
  nome: string,
  admissao: string,
  nivel_id: number,
  cargo_id: number,
  localidade_id: number,
  setor_id: number,

  cargo?: string,
  local?: string,
  ultima_aval?: string,
  setor?: string,
  diff?: number,
  text?: string
}
