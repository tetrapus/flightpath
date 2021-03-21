import { Node } from "./Node";

export interface AnnotatedNode extends Node {
  requiredBy: string[];
  depth?: number;
  children?: number;
  active?: boolean;
}
