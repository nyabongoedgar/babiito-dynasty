export type Era = "Foundational" | "Imperial Expansion" | "Modern State";

export interface RoyalMember {
  id: string;
  name: string;
  title: string;
  era: Era;
  period: string;
  details: string;
  parentId: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface TreeNode extends RoyalMember {
  children: TreeNode[];
  depth: number;
}
