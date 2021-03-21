export interface Node {
  id: string;
  title: string;
  owner?: string;
  requires: string[];
  closed: boolean;
}
