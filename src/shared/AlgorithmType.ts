export enum AlgorithmType {
  DIJKSTAR = "DIJKSTRA",
  HAMILTON_CYCLE = "HAMILTON_CYCLE",
}

export function fromStringToAlgorithmType(strValue: string) {
  return strValue as AlgorithmType;
}
