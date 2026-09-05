import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { CreateRoyalMemberDto } from "./dto/create-royal-member.dto";
import { UpdateRoyalMemberDto } from "./dto/update-royal-member.dto";

export interface RoyalMember {
  id: string;
  name: string;
  title: string;
  era: string;
  period: string;
  details: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

const SEED_DATA: RoyalMember[] = [
  { id: "gen1", name: "Omukama Isingoma Mpuga Rukidi I", title: "1st Babiito King of Bunyoro-Kitara", era: "Foundational", period: "c. 14th/15th Century", details: "The legendary founding sovereign of the Babiito Dynasty. He established the royal court at Fukuma after the departure of the Bacwezi dynasty, uniting the empire under a new royal lineage.", parentId: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen2", name: "Omukama Ocaki", title: "2nd Babiito King", era: "Foundational", period: "Early 16th Century", details: "Second sovereign of the dynasty; consolidated the core boundary frameworks and defense networks of the early kingdom.", parentId: "gen1", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen3", name: "Omukama Oyo Nyimba I", title: "3rd Babiito King", era: "Foundational", period: "Early 16th Century", details: "Maintained institutional continuity and expanded agrarian trade paths inside the central territories.", parentId: "gen2", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen4", name: "Omukama Winyi I", title: "4th Babiito King", era: "Foundational", period: "Early 16th Century", details: "Strengthened the internal administrative structures of the growing kingdom.", parentId: "gen3", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen5", name: "Omukama Olimi I", title: "5th Babiito King", era: "Foundational", period: "Mid-16th Century", details: "A powerful military strategist who repelled initial major incursions from expansionist regional kingdoms.", parentId: "gen4", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen6", name: "Omukama Nyabongo I", title: "6th Babiito King", era: "Foundational", period: "Mid-16th Century", details: "A revered monarch whose name represents deep ancestral authority, carrying forward the architectural expansion of the empire.", parentId: "gen5", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen7", name: "Omukama Winyi II", title: "Sovereign of Bunyoro", era: "Imperial Expansion", period: "Late 16th / Early 17th Century", details: "Led large structural state reorganizations to secure newly annexed provincial territories.", parentId: "gen6", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen8", name: "Omukama Cwamali", title: "Sovereign of Bunyoro", era: "Imperial Expansion", period: "Mid-17th Century", details: "Steered the kingdom through major regional trade booms and military campaigns.", parentId: "gen7", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen9", name: "Omukama Duhaga I", title: "Sovereign of Bunyoro", era: "Imperial Expansion", period: "Early 18th Century", details: "Centrally consolidated administrative rules over decentralized regional clans.", parentId: "gen8", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen10", name: "Omukama Nyamutukura Kyebambe III", title: "Sovereign of Bunyoro", era: "Imperial Expansion", period: "Reigned c. 1786–1835", details: "One of Bunyoro's longest-ruling kings. His eldest son, Prince Kaboyo, broke away to establish the independent Tooro Kingdom, while the main line continued in Bunyoro.", parentId: "gen9", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen11", name: "Omukama Kamurasi Kyebambe IV", title: "Sovereign of Bunyoro", era: "Imperial Expansion", period: "Reigned c. 1852–1869", details: "Sovereign ruler during early contacts with European explorers Speke and Grant. Father of the iconic anti-colonial hero Omukama Kabalega.", parentId: "gen10", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen12", name: "Princes of Masindi (Prince Ruyonga / Prince Kabugumire)", title: "Royal Lineage Princes", era: "Modern State", period: "Late 19th Century", details: "Prominent royal princes who anchored the family's administrative leadership within the Masindi and Bujenje geopolitical regions.", parentId: "gen11", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen13", name: "Owisaza Kosiya Kahubire Labwoni", title: "Kaigo (County Chief) of Bujenje", era: "Modern State", period: "Early-to-Mid 20th Century", details: "Senior Babiito Prince, 1931 UK Joint Select Committee Envoy to London who blocked the forced East African Closer Union, and explicit co-signatory of the historic 1933 Bunyoro Agreement.", parentId: "gen12", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen14_grandpa", name: "Kachope Labwoni", title: "Babiito Royal Clan Prince", era: "Modern State", period: "Mid-20th Century", details: "Direct prince of the Babiito clan who grew up in the royal lineage of Ikoba, Masindi. Brother to Princess Kabakumba Labwoni Masiko.", parentId: "gen13", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen14_aunt", name: "Princess Kabakumba Labwoni Masiko", title: "Princess / Former Government Minister", era: "Modern State", period: "Modern Era", details: "Prominent Ugandan politician, Member of Parliament, and former Cabinet Minister. Direct sister to Kachope Labwoni.", parentId: "gen13", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen15", name: "Late David Kaboyo", title: "Royal Clan Descendant", era: "Modern State", period: "Late 20th Century", details: "Father of Nyabongo; successfully preserved and passed down the lineage's royal names and foundational heritage.", parentId: "gen14_grandpa", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "gen16", name: "Nyabongo", title: "Living Custodian of the Lineage", era: "Modern State", period: "Present", details: "The living descendant and core user tracking this deep historical footprint, named after his historical ancestor Omukama Nyabongo I.", parentId: "gen15", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

@Injectable()
export class RoyalMembersService {
  private members: RoyalMember[] = [...SEED_DATA];

  findAll(): RoyalMember[] {
    return this.members;
  }

  findOne(id: string): RoyalMember {
    const member = this.members.find((m) => m.id === id);
    if (!member) throw new NotFoundException(`Royal member '${id}' not found`);
    return member;
  }

  create(dto: CreateRoyalMemberDto): RoyalMember {
    const member: RoyalMember = {
      id: dto.id || uuidv4(),
      name: dto.name,
      title: dto.title,
      era: dto.era,
      period: dto.period,
      details: dto.details,
      parentId: dto.parentId ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.members.push(member);
    return member;
  }

  update(id: string, dto: UpdateRoyalMemberDto): RoyalMember {
    const idx = this.members.findIndex((m) => m.id === id);
    if (idx === -1) throw new NotFoundException(`Royal member '${id}' not found`);
    this.members[idx] = {
      ...this.members[idx],
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    return this.members[idx];
  }

  remove(id: string): void {
    const idx = this.members.findIndex((m) => m.id === id);
    if (idx === -1) throw new NotFoundException(`Royal member '${id}' not found`);
    this.members.splice(idx, 1);
  }
}
