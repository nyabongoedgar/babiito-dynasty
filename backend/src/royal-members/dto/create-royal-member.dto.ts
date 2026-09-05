export class CreateRoyalMemberDto {
  id?: string;
  name: string;
  title: string;
  era: "Foundational" | "Imperial Expansion" | "Modern State";
  period: string;
  details: string;
  parentId: string | null;
}
