export type TwinRelationshipType =
  | 'USES'
  | 'DEPENDS_ON'
  | 'IMPLEMENTS'
  | 'DOCUMENTED_BY'
  | 'TESTED_BY'
  | 'CREATED_BY'
  | 'AFFECTS'
  | 'RELATED_TO'

export interface TwinRelationship {
  source: string
  target: string
  type: TwinRelationshipType
  label: string
  weight: number
}
