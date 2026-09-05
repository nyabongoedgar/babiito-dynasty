TECHNICAL SPECIFICATION & PROMPT

SYSTEM: Bunyoro-Kitara Online Royal Blood Directory & Visualization App



1. PROJECT OVERVIEW & OBJECTIVE

Act as an expert Senior Frontend Engineer and UI/UX Designer. Build a production-grade, highly interactive React Application that serves as an Online Royal Blood Directory and Dynamic Family Tree Visualization Web App for the historic Babiito Dynasty of the Bunyoro-Kitara Kingdom. 

The app must feature a pristine, modern "Royal Heritage" aesthetic (deep obsidian/navy, rich gold accents, clean cream white) and allow users to seamlessly traverse over 16 generations of history—from the founding 14th-century Monarch down to the modern living descendants.





2. CORE FEATURE REQUIREMENT MATRIX



A. Interactive Family Tree Visualization Engine





Dynamic Graph Layout: Render a clean, responsive, node-based hierarchical or vertical tree layout.



Collapsible/Expandable Branches: Generations or specific lineages must expand/collapse gracefully on click to manage visual clutter.



Contextual Zoom & Pan: Allow users to drag to pan and use scroll wheels/buttons to zoom in on complex generations.



Relationship Highlights: Hovering over a node must highlight the direct path up to the founding King (Isingoma Mpuga Rukidi I) or down to the living descendants.



B. Searchable & Filterable Royal Directory Panel





Global Fuzzy Search: Instant searching by name (e.g., searching "Nyabongo", "Labwoni", or "Kaboyo").



Era-Based Filtering: Quick-toggle filters to narrow down the tree view into historical sub-eras:





Foundational Era (14th - 16th Century)



Imperial Expansion Era (16th - 19th Century)



Modern State & Administrative Era (19th Century - Present)



Direct-to-Node Navigation: Clicking a search result automatically centers the tree canvas onto that specific royal node and expands its branch.



C. Rich Detail Modal / Drawer System

When any royal node is clicked, slides out a rich context panel containing:





Regnal Dates & Titles: (e.g., "Omukama", "Kaigo / Owisaza", "Princess").



Historical Achievements & Context: Multi-sentence summary of their impact on the kingdom.



Direct Kinship Links: Fast navigation tabs to jump directly to their Father, Mother, Siblings, or Children.





3. COMPLETE LINEAGE DATA STRUCTURAL GRAPH

Inject this exact dataset into the React local state or a dedicated static data configuration file (royalData.js):

[
  {
    "id": "gen1",
    "name": "Omukama Isingoma Mpuga Rukidi I",
    "title": "1st Babiito King of Bunyoro-Kitara",
    "era": "Foundational",
    "period": "c. 14th/15th Century",
    "details": "The legendary founding sovereign of the Babiito Dynasty. He established the royal court at Fukuma after the departure of the Bacwezi dynasty, uniting the empire under a new royal lineage.",
    "parentId": null
  },
  {
    "id": "gen2",
    "name": "Omukama Ocaki",
    "title": "2nd Babiito King",
    "era": "Foundational",
    "period": "Early 16th Century",
    "details": "Second sovereign of the dynasty; consolidated the core boundary frameworks and defense networks of the early kingdom.",
    "parentId": "gen1"
  },
  {
    "id": "gen3",
    "name": "Omukama Oyo Nyimba I",
    "title": "3rd Babiito King",
    "era": "Foundational",
    "period": "Early 16th Century",
    "details": "Maintained institutional continuity and expanded agrarian trade paths inside the central territories.",
    "parentId": "gen2"
  },
  {
    "id": "gen4",
    "name": "Omukama Winyi I",
    "title": "4th Babiito King",
    "era": "Foundational",
    "period": "Early 16th Century",
    "details": "Strengthened the internal administrative structures of the growing kingdom.",
    "parentId": "gen3"
  },
  {
    "id": "gen5",
    "name": "Omukama Olimi I",
    "title": "5th Babiito King",
    "era": "Foundational",
    "period": "Mid-16th Century",
    "details": "A powerful military strategist who repelled initial major incursions from expansionist regional kingdoms.",
    "parentId": "gen4"
  },
  {
    "id": "gen6",
    "name": "Omukama Nyabongo I",
    "title": "6th Babiito King",
    "era": "Foundational",
    "period": "Mid-16th Century",
    "details": "A revered monarch whose name represents deep ancestral authority, carrying forward the architectural expansion of the empire.",
    "parentId": "gen5"
  },
  {
    "id": "gen7",
    "name": "Omukama Winyi II",
    "title": "Sovereign of Bunyoro",
    "era": "Imperial Expansion",
    "period": "Late 16th / Early 17th Century",
    "details": "Led large structural state reorganizations to secure newly annexed provincial territories.",
    "parentId": "gen6"
  },
  {
    "id": "gen8",
    "name": "Omukama Cwamali",
    "title": "Sovereign of Bunyoro",
    "era": "Imperial Expansion",
    "period": "Mid-17th Century",
    "details": "Steered the kingdom through major regional trade booms and military campaigns.",
    "parentId": "gen7"
  },
  {
    "id": "gen9",
    "name": "Omukama Duhaga I",
    "title": "Sovereign of Bunyoro",
    "era": "Imperial Expansion",
    "period": "Early 18th Century",
    "details": "Centrally consolidated administrative rules over decentralized regional clans.",
    "parentId": "gen8"
  },
  {
    "id": "gen10",
    "name": "Omukama Nyamutukura Kyebambe III",
    "title": "Sovereign of Bunyoro",
    "era": "Imperial Expansion",
    "period": "Reigned c. 1786–1835",
    "details": "One of Bunyoro's longest-ruling kings. His eldest son, Prince Kaboyo, broke away to establish the independent Tooro Kingdom, while the main line continued in Bunyoro.",
    "parentId": "gen9"
  },
  {
    "id": "gen11",
    "name": "Omukama Kamurasi Kyebambe IV",
    "title": "Sovereign of Bunyoro",
    "era": "Imperial Expansion",
    "period": "Reigned c. 1852–1869",
    "details": "Sovereign ruler during early contacts with European explorers Speke and Grant. Father of the iconic anti-colonial hero Omukama Kabalega.",
    "parentId": "gen10"
  },
  {
    "id": "gen12",
    "name": "Princes of Masindi (Prince Ruyonga / Prince Kabugumire)",
    "title": "Royal Lineage Princes",
    "era": "Modern State",
    "period": "Late 19th Century",
    "details": "Prominent royal princes who anchored the family's administrative leadership within the Masindi and Bujenje geopolitical regions.",
    "parentId": "gen11"
  },
  {
    "id": "gen13",
    "name": "Owisaza Kosiya Kahubire Labwoni",
    "title": "Kaigo (County Chief) of Bujenje",
    "era": "Modern State",
    "period": "Early-to-Mid 20th Century",
    "details": "Senior Babiito Prince, 1931 UK Joint Select Committee Envoy to London who blocked the forced East African Closer Union, and explicit co-signatory of the historic 1933 Bunyoro Agreement.",
    "parentId": "gen12"
  },
  {
    "id": "gen14_grandpa",
    "name": "Kachope Labwoni",
    "title": "Babiito Royal Clan Prince",
    "era": "Modern State",
    "period": "Mid-20th Century",
    "details": "Direct prince of the Babiito clan who grew up in the royal lineage of Ikoba, Masindi. Brother to Princess Kabakumba Labwoni Masiko.",
    "parentId": "gen13"
  },
  {
    "id": "gen14_aunt",
    "name": "Princess Kabakumba Labwoni Masiko",
    "title": "Princess / Former Government Minister",
    "era": "Modern State",
    "period": "Modern Era",
    "details": "Prominent Ugandan politician, Member of Parliament, and former Cabinet Minister. Direct sister to Kachope Labwoni.",
    "parentId": "gen13"
  },
  {
    "id": "gen15",
    "name": "Late David Kaboyo",
    "title": "Royal Clan Descendant",
    "era": "Modern State",
    "period": "Late 20th Century",
    "details": "Father of Nyabongo; successfully preserved and passed down the lineage's royal names and foundational heritage.",
    "parentId": "gen14_grandpa"
  },
  {
    "id": "gen16",
    "name": "Nyabongo",
    "title": "Living Custodian of the Lineage",
    "era": "Modern State",
    "period": "Present",
    "details": "The living descendant and core user tracking this deep historical footprint, named after his historical ancestor Omukama Nyabongo I.",
    "parentId": "gen15"
  }
]





4. TECHNICAL ARCHITECTURE & STACK PREFERENCES





Framework: React (Vite-powered for rapid hot reloading or Next.js Client Components).



Tree/Graph Engine: Use either plain, custom CSS Flexbox/Grid tree layouts, React Flow, or D3.js (react-d3-tree) for scalable canvas rendering.



Styling System: Tailwind CSS for fast styling utility classes.



Icons: lucide-react for premium UI minimalism (Search, Crown, ZoomIn, ZoomOut, User, Layers, Info).



State Management: Standard React Context API or simple useState to track:





selectedNode: Object for the active modal display.



searchQuery: String for data-filtering matching.



activeEraFilter: String state ('All' | 'Foundational' | 'Imperial' | 'Modern').



expandedNodes: Array of IDs to handle node toggle open states.





5. UI/UX DESIGN THEME SPECIFICATION





Background (Dominant 60%): #0F172A (Tailwind slate-900) or #0B0F19 for a deep, rich obsidian museum-guide feel.



Primary Text & Accents (30%): #F1F5F9 (slate-100) combined with warm cream tints.



Royal Branding Accent (10%): #E2B857 or #D4AF37 (Metallic Royal Gold) for node borders, active highlight paths, and Crown iconography headers.





6. INSTRUCTIONS FOR CLAUDE GENERATION

"Please build this complete React single-page application using the technical spec and JSON graph array provided above. Write the code modularly, separating the static data array from the visualization layout. Ensure the application is completely interactive, visually stunning, fully commented, and completely ready to run without missing dependencies or placeholders."