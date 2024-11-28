export enum GraphType {
  DIRECTED = "DIRECTED",
  UNDIRECTED = "UNDIRECTED",
}

export function fromStringToGraphType(strValue: string) {
  return strValue as GraphType;
}
