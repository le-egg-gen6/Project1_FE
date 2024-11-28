export interface Node {
  id: string;
  data: {
    label: string;
  };
  props: {
    radius: number;
    color: string;
  };
}
