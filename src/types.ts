import { projectThumb, projectGallery, projectVideo } from "./lib/projectAssets";

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: {
    EN: string;
    IT: string;
  };
}

export interface StorySection {
  number: string;
  title: { EN: string; IT: string };
  description: { EN: string; IT: string };
  layout: 'text-image' | 'image-text' | 'full-grid' | 'half' | 'annotated-wireframe' | 'diagram';
  galleryIndices: number[];
  annotations?: { EN: string; IT: string }[];
  comparison?: {
    heading: { EN: string; IT: string };
    beforeIndex: number;
    afterIndex: number;
    beforeLabel: { EN: string; IT: string };
    afterLabel: { EN: string; IT: string };
  };
}

export interface ProjectMeta {
  subtitle: { EN: string; IT: string };
  year: string;
  context: { EN: string; IT: string };
  roles: string[];
  stack: { label: string; value: string }[];
  sections: StorySection[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  image: string; // Low-res thumbnail for the archive grid
  video?: string; // Auto-playing video thumbnail (overrides image when set)
  description: {
    EN: string;
    IT: string;
  };
  gallery: {
    thumb: string; // Low-res for the gallery list
    full: string;  // High-res for the zoom modal
  }[];
  meta?: ProjectMeta;
}


export const EXPERIENCE: Experience[] = [
  {
    period: "2025 — PRES",
    role: "Freelance",
    company: "Self employed",
    description: {
      EN: "Brand identity and visual communication projects for hospitality, cultural and commercial clients. Ongoing professional development through advanced training and certifications.",
      IT: "Progetti di identità di brand e comunicazione visiva per clienti nei settori hospitality, culturale e commerciale. Aggiornamento professionale continuo attraverso formazione avanzata e certificazioni."
    }
  },
  {
    period: "2017 — 2024",
    role: "Lead Designer",
    company: "Europlan S.p.A",
    description: {
      EN: "Design and production of brand and communication materials for the Group’s hotels and residences, including brochures, campaigns, packaging, signage and trade show displays.\n\nManagement of the full production process, from concept to print, alongside the creation of digital assets and collaboration with the IT team on internal platforms.",
      IT: "Progettazione e produzione di materiali di brand e comunicazione per hotel e residenze del Gruppo, inclusi brochure, campagne, packaging, segnaletica e allestimenti fieristici.\n\nGestione dell’intero processo produttivo, dal concept alla stampa, insieme alla creazione di asset digitali e alla collaborazione con il team IT sulle piattaforme interne."
    }
  },
  {
    period: "2014 — 2016",
    role: "Graphic team leader",
    company: "Wishdays S.r.l.",
    description: {
      EN: "Coordination of the in-house design team and management of seasonal workloads. Design of POP materials, packaging and retail displays, with external agency coordination for brand and packaging restyling projects. Development of brand guidelines for multiple brands and implementation of automated layout workflows (XML), including management of design and photo archives.",
      IT: "Coordinamento del team di design interno e gestione dei carichi di lavoro stagionali. Progettazione di materiali POP, packaging ed espositori retail, con coordinamento di agenzie esterne per progetti di restyling del brand e del packaging. Sviluppo di linee guida di brand per diversi marchi e implementazione di flussi di impaginazione automatizzati (XML), inclusa la gestione degli archivi di design e fotografici."
    }
  },
  {
    period: "2012 — 2013",
    role: "Graphic Designer",
    company: "Total Quality Food S.r.l.",
    description: {
      EN: "Graphic and regulatory support for food labeling in compliance with EU Regulation 1169, including the design of compliant layouts for packaging and informational materials. Development of commercial materials and graphic support for trade shows, conferences, and events.",
      IT: "Supporto grafico e normativo per l’etichettatura alimentare in conformità al Regolamento UE 1169, con progettazione di layout per packaging e materiali informativi. Realizzazione di materiali commerciali e supporto grafico per fiere, convegni ed eventi."
    }
  },
  {
    period: "2005 — 2010",
    role: "Account Gruppo Pam & Graphic Designer",
    company: "Verba DDB S.r.l",
    description: {
      EN: "Management of large retail clients including PAM Group and Panorama, overseeing the design and layout of promotional materials, flyers, POP displays and in-store signage. Coordination between clients, agencies and suppliers, alongside the development of advertising and retail communication materials for Bata Footwear.",
      IT: "Gestione di grandi clienti della GDO, tra cui Gruppo PAM e Panorama, supervisionando la progettazione e l’impaginazione di materiali promozionali, volantini, espositori POP e segnaletica in-store. Coordinamento tra clienti, agenzie e fornitori, insieme allo sviluppo di materiali pubblicitari e di comunicazione retail per Bata Footwear."
    }
  },
  {
    period: "2003 — 2005",
    role: "Professional and Freelance Collaboration",
    company: "Self employed",
    description: {
      EN: "Editorial design, multilingual layout, technical manuals, promotional materials, and static website design. Collaborations with publishing houses, communication agencies, software companies, and professional training institutes.",
      IT: "Grafica editoriale, impaginazioni multilingua, manualistica tecnica, materiali promozionali e realizzazione di siti web statici. Collaborazioni con case editrici, agenzie di comunicazione, software house e istituti professionali."
    }
  },
  {
    period: "1995 — 2002",
    role: "Founder and Co-owner",
    company: "Pressart S.r.l.",
    description: {
      EN: "Co-founded a creative agency specialized in branding and printed communication. Developed visual identities, editorial design and packaging for a range of businesses, combining strategic thinking with high-quality print production.",
      IT: "Co-fondatrice di un’agenzia creativa specializzata in branding e comunicazione stampata. Sviluppo di identità visive, progetti editoriali e packaging per diverse aziende, combinando pensiero strategico e produzione di stampa di alta qualità."
    }
  }
];

export const PROJECTS: Project[] = [
  {
    id: "emozione3",
    slug: "emozione3",
    title: "Emozione3",
    category: "BRANDING",
    tags: ["BRANDING"],
    image: projectThumb("emozione3"),
    gallery: [...projectGallery("emozione3"), ...projectGallery("emozione3-pop")],
    description: {
      EN: "Designed a scalable brand system for Emozione3, aligning identity, communication and retail environments into a coherent visual framework across physical and digital touchpoints.",
      IT: "Progettato un sistema di brand scalabile per Emozione3, allineando identità, comunicazione e ambienti retail in un framework visivo coerente su touchpoint fisici e digitali."
    },
    meta: {
      subtitle: {
        EN: "BRAND & RETAIL SYSTEM",
        IT: "SISTEMA DI BRAND E RETAIL"
      },
      year: "2016",
      context: {
        EN: "Emozione3 required a structured brand system to support growth and ensure consistency across retail and communication channels. The challenge was to define a clear visual language and translate it into adaptable applications across multiple environments and formats.",
        IT: "Emozione3 richiedeva un sistema di brand strutturato per supportare la crescita e garantire coerenza su tutti i canali retail e di comunicazione. La sfida era definire un linguaggio visivo chiaro e tradurlo in applicazioni adattabili su più ambienti e formati."
      },
      roles: ["BRAND DESIGN", "VISUAL SYSTEMS", "RETAIL DESIGN"],
      stack: [
        { label: "IDENTITY", value: "SYSTEM" },
        { label: "BRAND", value: "GUIDELINES" },
        { label: "RETAIL", value: "APPLICATIONS" },
        { label: "COMMS", value: "ASSETS" }
      ],
      sections: [
        {
          number: "01",
          title: { EN: "STRATEGY", IT: "STRATEGIA" },
          description: {
            EN: "Defined brand positioning, tone of voice and visual direction. Established a coherent framework to ensure alignment across retail environments and communication touchpoints.",
            IT: "Definita la brand positioning, il tono di voce e la direzione visiva. Stabilito un framework coerente per garantire allineamento tra ambienti retail e touchpoint di comunicazione."
          },
          layout: "text-image",
          galleryIndices: [0]
        },
        {
          number: "",
          title: { EN: "SYSTEM OVERVIEW", IT: "PANORAMICA DEL SISTEMA" },
          description: {
            EN: "A modular system connecting identity, guidelines and applications across retail environments.",
            IT: "Un sistema modulare che connette identità, linee guida e applicazioni negli ambienti retail."
          },
          layout: "diagram",
          galleryIndices: [6]
        },
        {
          number: "02 & 03",
          title: { EN: "BRAND SYSTEM & GUIDELINES", IT: "SISTEMA DI BRAND E LINEE GUIDA" },
          description: {
            EN: "Developed a modular identity system supported by structured guidelines to ensure consistency across formats, teams and applications. The system defines clear rules for typography, color, composition and logo usage, enabling controlled and scalable implementation.",
            IT: "Sviluppato un sistema di identità modulare supportato da linee guida strutturate per garantire coerenza tra formati, team e applicazioni. Il sistema definisce regole chiare per tipografia, colore, composizione e utilizzo del logo, abilitando un’implementazione controllata e scalabile."
          },
          layout: "full-grid",
          galleryIndices: [1, 2, 3]
        },
        {
          number: "",
          title: { EN: "FROM IDENTITY TO APPLICATION", IT: "DALL’IDENTITÀ ALL’APPLICAZIONE" },
          description: {
            EN: "The project evolved from a visual identity into a complete system connecting brand expression with real-world applications. Guidelines act as a bridge between design intent and execution, ensuring continuity across communication and retail environments.",
            IT: "Il progetto è evoluto da un’identità visiva a un sistema completo che connette l’espressione del brand con le applicazioni nel mondo reale. Le linee guida fungono da ponte tra l’intento di design e l’esecuzione, garantendo continuità tra ambienti di comunicazione e retail."
          },
          layout: "image-text",
          galleryIndices: [4]
        },
        {
          number: "04",
          title: { EN: "APPLICATION SYSTEM", IT: "SISTEMA APPLICATIVO" },
          description: {
            EN: "Translated the identity into a flexible system of communication and retail assets, designed to adapt across formats and contexts. Applications follow a modular logic, allowing consistent deployment across campaigns, materials and physical touchpoints.",
            IT: "Tradotta l’identità in un sistema flessibile di asset di comunicazione e retail, progettato per adattarsi a formati e contesti diversi. Le applicazioni seguono una logica modulare, permettendo un’implementazione coerente su campagne, materiali e touchpoint fisici."
          },
          layout: "full-grid",
          galleryIndices: [5, 7, 8]
        },
        {
          number: "05",
          title: { EN: "RETAIL EXECUTION", IT: "ESECUZIONE RETAIL" },
          description: {
            EN: "Designed retail display systems tailored to different store environments, balancing brand consistency with spatial and commercial constraints. The system ensures clear visual hierarchy and strong brand presence across in-store installations.",
            IT: "Progettati sistemi espositivi retail adattati a diversi ambienti store, bilanciando la coerenza del brand con i vincoli spaziali e commerciali. Il sistema garantisce una chiara gerarchia visiva e una forte presenza del brand nelle installazioni in-store."
          },
          layout: "text-image",
          galleryIndices: [9]
        },
        {
          number: "06",
          title: { EN: "SCALING & CONSISTENCY", IT: "SCALABILITÀ E COERENZA" },
          description: {
            EN: "Enabled consistent rollout across multiple locations through a structured and modular design system. The framework supports both permanent installations and seasonal updates while maintaining visual coherence.",
            IT: "Abilitato il rollout coerente su più sedi attraverso un sistema di design strutturato e modulare. Il framework supporta sia le installazioni permanenti che gli aggiornamenti stagionali mantenendo la coerenza visiva."
          },
          layout: "text-image",
          galleryIndices: [10]
        },
        {
          number: "",
          title: { EN: "VISUAL SYSTEM PRINCIPLES", IT: "PRINCIPI DEL SISTEMA VISIVO" },
          description: {
            EN: "Consistency over decoration. Modular and scalable components. High legibility in retail contexts. Adaptability across formats. Clear visual hierarchy.",
            IT: "Coerenza sulla decorazione. Componenti modulari e scalabili. Alta leggibilità nel contesto retail. Adattabilità tra formati. Gerarchia visiva chiara."
          },
          layout: "half",
          galleryIndices: [11]
        },
        {
          number: "",
          title: { EN: "OUTCOME", IT: "RISULTATO" },
          description: {
            EN: "A unified brand system connecting identity, communication and retail environments. The project improves consistency, simplifies implementation and supports scalable brand deployment across multiple contexts.",
            IT: "Un sistema di brand unificato che connette identità, comunicazione e ambienti retail. Il progetto migliora la coerenza, semplifica l’implementazione e supporta il deployment scalabile del brand su più contesti."
          },
          layout: "half",
          galleryIndices: []
        }
      ]
    }
  },
  {
    id: "pam panorama",
    slug: "pam-panorama",
    title: "PAM-Panorama",
    category: "PRINT/POP",
    tags: ["PRINT/POP"],
    image: projectThumb("pam-panorama"),
    gallery: projectGallery("pam-panorama"),
    description: {
      EN: "Designed and coordinated retail communication across campaigns, in-store materials and promotional systems, ensuring consistency between brand, product and customer experience.",
      IT: "Progettato e coordinato la comunicazione retail su campagne, materiali in-store e sistemi promozionali, garantendo coerenza tra brand, prodotto ed esperienza del cliente."
    },
    meta: {
      subtitle: {
        EN: "RETAIL COMMUNICATION SYSTEM",
        IT: "SISTEMA DI COMUNICAZIONE RETAIL"
      },
      year: "2010",
      context: {
        EN: "Retail communication work developed at Verba DDB for clients Pam and Panorama. The project focused on connecting campaigns, visual assets and in-store materials across multiple touchpoints.",
        IT: "Lavoro di comunicazione retail sviluppato in Verba DDB per i clienti Pam e Panorama. Il progetto si è concentrato sul collegamento di campagne, asset visivi e materiali in-store su più touchpoint."
      },
      roles: ["VISUAL DESIGN", "RETAIL COMMUNICATION", "ART DIRECTION"],
      stack: [
        { label: "CAMPAIGNS", value: "MATERIALS" },
        { label: "IN-STORE", value: "SYSTEMS" },
        { label: "PHOTO", value: "PRODUCTION" },
        { label: "PROMO", value: "ASSETS" }
      ],
      sections: [
        {
          number: "01",
          title: { EN: "STRATEGY & COORDINATION", IT: "STRATEGIA E COORDINAMENTO" },
          description: {
            EN: "Managed communication between client, agency and production teams, aligning campaign objectives with visual direction and retail constraints. Established the operational framework for consistent execution across touchpoints.",
            IT: "Gestita la comunicazione tra cliente, agenzia e team di produzione, allineando gli obiettivi di campagna con la direzione visiva e i vincoli retail. Stabilito il framework operativo per un’esecuzione coerente su tutti i touchpoint."
          },
          layout: "text-image",
          galleryIndices: [0]
        },
        {
          number: "",
          title: { EN: "SYSTEM OVERVIEW", IT: "PANORAMICA DEL SISTEMA" },
          description: {
            EN: "A modular communication system connecting campaign logic, visual assets and retail execution.",
            IT: "Un sistema di comunicazione modulare che connette logica di campagna, asset visivi ed esecuzione retail."
          },
          layout: "diagram",
          galleryIndices: [5]
        },
        {
          number: "02 & 03",
          title: { EN: "CONTENT & SYSTEM", IT: "CONTENUTO E SISTEMA" },
          description: {
            EN: "Developed visual assets and translated campaign concepts into adaptable communication systems across multiple formats, ensuring consistency between print, promotional and in-store materials.",
            IT: "Sviluppati asset visivi e tradotti i concetti di campagna in sistemi di comunicazione adattabili su più formati, garantendo coerenza tra materiali stampati, promozionali e in-store."
          },
          layout: "full-grid",
          galleryIndices: [1, 2]
        },
        {
          number: "",
          title: { EN: "FROM CAMPAIGN TO STORE", IT: "DALLA CAMPAGNA AL PUNTO VENDITA" },
          description: {
            EN: "A continuous system connecting campaign design, content production and in-store execution, ensuring coherence across all customer touchpoints.",
            IT: "Un sistema continuo che connette il design di campagna, la produzione di contenuti e l’esecuzione in-store, garantendo coerenza su tutti i touchpoint del cliente."
          },
          layout: "image-text",
          galleryIndices: [3]
        },
        {
          number: "04",
          title: { EN: "RETAIL APPLICATIONS", IT: "APPLICAZIONI RETAIL" },
          description: {
            EN: "Applied the communication system to retail environments through displays, signage and promotional materials adapted to different store layouts and customer interactions.",
            IT: "Applicato il sistema di comunicazione agli ambienti retail attraverso espositori, segnaletica e materiali promozionali adattati ai diversi layout dei punti vendita e alle interazioni con il cliente."
          },
          layout: "text-image",
          galleryIndices: [4]
        },
        {
          number: "05",
          title: { EN: "IMPLEMENTATION", IT: "IMPLEMENTAZIONE" },
          description: {
            EN: "Delivered campaign materials across multiple locations, adapting designs to production requirements and ensuring consistency across formats and environments.",
            IT: "Consegnati i materiali di campagna su più sedi, adattando i design ai requisiti di produzione e garantendo coerenza tra formati e ambienti."
          },
          layout: "half",
          galleryIndices: []
        },
        {
          number: "06",
          title: { EN: "SCALING & CONSISTENCY", IT: "SCALABILITÀ E COERENZA" },
          description: {
            EN: "Supported ongoing campaign rollout and in-store updates, maintaining visual coherence across seasonal changes and different retail contexts.",
            IT: "Supportato il rollout continuativo delle campagne e gli aggiornamenti in-store, mantenendo la coerenza visiva attraverso i cambiamenti stagionali e i diversi contesti retail."
          },
          layout: "half",
          galleryIndices: []
        },
        {
          number: "",
          title: { EN: "VISUAL SYSTEM PRINCIPLES", IT: "PRINCIPI DEL SISTEMA VISIVO" },
          description: {
            EN: "Consistency across touchpoints. Adaptability to retail environments. Clarity in promotional communication. Integration between campaign and store.",
            IT: "Coerenza su tutti i touchpoint. Adattabilità agli ambienti retail. Chiarezza nella comunicazione promozionale. Integrazione tra campagna e punto vendita."
          },
          layout: "half",
          galleryIndices: []
        },
        {
          number: "",
          title: { EN: "OUTCOME", IT: "RISULTATO" },
          description: {
            EN: "A cohesive retail communication system connecting campaign design, visual assets and in-store execution. The work ensured consistency across formats and improved coordination between teams and production.",
            IT: "Un sistema di comunicazione retail coeso che connette il design di campagna, gli asset visivi e l’esecuzione in-store. Il lavoro ha garantito coerenza tra formati e migliorato il coordinamento tra team e produzione."
          },
          layout: "half",
          galleryIndices: []
        }
      ]
    }
  },
  /*
  {
    id: "emozione3 pop",
    title: "Emozione3 Pop",
    category: "PRINT/POP",
    tags: ["PRINT/POP"],
    image: projectThumb("emozione3-pop"),
    gallery: projectGallery("emozione3-pop"),
    description: {
      EN: "Gift Boxes.\nDesign and development of POP materials for retail, with a focus on seasonal displays, co-marketing initiatives, and new product and bundle launches.\n\nProjects were delivered across various retail environments (shopping malls, bookstores, large-scale retail, travel agencies), adapting solutions and visual language to specific spaces and needs.\n\nFrom floor displays to coordinated communication materials (posters, leaflets, shelves, stoppers, counter displays, and backlit walls), a consistent and recognizable visual system was created.\n\nA valuable experience that allowed me to grow in diverse, fast-paced environments, with direct visibility of results at the point of sale.",
      IT: "Cofanetti regalo.\nProgettazione e sviluppo di materiali POP per il punto vendita, con focus su allestimenti stagionali, co-marketing e lanci di nuovi prodotti e bundle.\n\nI progetti sono stati realizzati in diversi contesti retail (centri commerciali, librerie, GDO, agenzie viaggio), adattando soluzioni e linguaggi agli spazi e alle esigenze specifiche.\n\nDagli espositori da terra ai materiali coordinati (locandine, leaflet, mensole, stopper, espositori da banco e wall retroilluminati), è stato costruito un sistema visivo coerente e riconoscibile.\n\nUn’esperienza formativa che mi ha permesso di crescere in contesti diversi e ad alto ritmo, con un riscontro diretto sul punto vendita."
    }
  },
  */ 
  {
    id: "europlan",
    slug: "europlan",
    title: "Europlan",
    category: "BRANDING / PRINT",
    tags: ["PRINT"],
    image: projectThumb("europlan"),
	  gallery: projectGallery("europlan"),
    description: {
      EN: "For over ten years I worked in the design department of Europlan, a leading hospitality group on Lake Garda serving an international market. I developed graphic and editorial communication materials for multiple properties, including promotional campaigns, trade-fair assets, and printed collateral.\n\nMy role covered graphic design, editorial layout, photo post-production, and retouching, as well as the design of visual communication systems and wayfinding across hospitality, wellness, events, and business contexts.",
      IT: "Per oltre dieci anni ho lavorato nel reparto grafico di Europlan, realtà turistica di riferimento sul Lago di Garda con un pubblico internazionale. Ho sviluppato materiali di comunicazione grafica ed editoriale per diverse strutture del gruppo, tra cui campagne promozionali, materiali per fiere e supporti stampati.\n\nIl mio ruolo comprendeva graphic design, impaginazione editoriale, post-produzione fotografica e fotoritocco, oltre alla progettazione di sistemi di comunicazione visiva e wayfinding applicati ai contesti di ospitalità, wellness, eventi e business."
    }
  },  
  {
    id: "caesius",
    slug: "hotel-caesius",
    title: "Hotel Caesius",
    category: "BRANDING",
    tags: ["BRANDING"],
    image: projectThumb("caesius"),
	  gallery: projectGallery("caesius"),
    description: {
      EN: "Hotel Caesius is a luxury hospitality brand located on Lake Garda. The project involved the creation of a visual identity system and brand guidelines for print and digital applications.\n\nThe identity was implemented across all hotel touchpoints including printed materials, digital platforms and internal brand documentation.",
      IT: "L’Hotel Caesius è un brand di ospitalità di lusso situato sul Lago di Garda. Il progetto ha previsto la creazione di un sistema di identità visiva e delle linee guida del brand per applicazioni su stampa e digitale.\n\nL’identità è stata implementata in tutti i touchpoint dell’hotel, inclusi materiali stampati, piattaforme digitali e documentazione interna del brand."
    },
    meta: {
      subtitle: {
        EN: "BRAND SYSTEM / GUIDELINES",
        IT: "SISTEMA DI BRAND / LINEE GUIDA"
      },
      year: "2022",
      context: {
        EN: "Brand identity and guidelines developed for a luxury hotel on Lake Garda, focused on creating a cohesive visual language across guest experience, communication and internal documentation.",
        IT: "Identità di brand e linee guida sviluppate per un hotel di lusso sul Lago di Garda, focalizzate sulla creazione di un linguaggio visivo coerente tra esperienza ospite, comunicazione e documentazione interna."
      },
      roles: ["VISUAL DESIGN", "BRAND SYSTEM"],
      stack: [
        { label: "IDENTITY", value: "SYSTEM" },
        { label: "BRAND", value: "GUIDELINES" },
        { label: "PRINT", value: "APPLICATIONS" },
        { label: "DOCS", value: "GOVERNANCE" }
      ],
      sections: [
        {
          number: "01",
          title: { EN: "IDENTITY SYSTEM", IT: "SISTEMA DI IDENTITÀ" },
          description: {
            EN: "Defined a refined visual identity aligned with the positioning of a luxury hospitality brand, establishing typography, color palette and compositional principles to communicate clarity, elegance and consistency.",
            IT: "Definita un’identità visiva raffinata allineata al posizionamento di un brand di ospitalità di lusso, stabilendo tipografia, palette cromatica e principi compositivi per comunicare chiarezza, eleganza e coerenza."
          },
          layout: "full-grid",
          galleryIndices: [1, 10]
        },
        {
          number: "02",
          title: { EN: "BRAND GUIDELINES", IT: "LINEE GUIDA DEL BRAND" },
          description: {
            EN: "Structured the identity into a comprehensive brand book, defining clear rules for usage, hierarchy and consistency across all brand touchpoints.",
            IT: "Strutturata l’identità in un brand book completo, definendo regole chiare per utilizzo, gerarchia e coerenza su tutti i touchpoint del brand."
          },
          layout: "full-grid",
          galleryIndices: [3, 4, 2]
        },
        {
          number: "03",
          title: { EN: "SYSTEM APPLICATION", IT: "APPLICAZIONE DEL SISTEMA" },
          description: {
            EN: "Applied the identity system across key communication materials, ensuring coherence between printed assets, guest-facing materials and branded outputs.",
            IT: "Applicato il sistema di identità sui principali materiali di comunicazione, garantendo coerenza tra asset stampati, materiali per gli ospiti e output brandizzati."
          },
          layout: "full-grid",
          galleryIndices: [7, 11]
        },
        {
          number: "04",
          title: { EN: "BRAND DOCUMENTATION", IT: "DOCUMENTAZIONE DEL BRAND" },
          description: {
            EN: "Developed detailed documentation to support internal teams, enabling consistent implementation and long-term scalability of the brand across departments and platforms.",
            IT: "Sviluppata documentazione dettagliata a supporto dei team interni, abilitando un’implementazione coerente e la scalabilità a lungo termine del brand tra reparti e piattaforme."
          },
          layout: "full-grid",
          galleryIndices: [8]
        },
        {
          number: "",
          title: { EN: "OUTCOME", IT: "RISULTATO" },
          description: {
            EN: "A structured and scalable brand system, supported by comprehensive guidelines, ensuring consistency across all touchpoints and enabling long-term brand management.",
            IT: "Un sistema di brand strutturato e scalabile, supportato da linee guida complete, che garantisce coerenza su tutti i touchpoint e abilita la gestione del brand a lungo termine."
          },
          layout: "half",
          galleryIndices: []
        }
      ]
    }
  },
  {
    id: "kalika",
    slug: "kalika-skincare",
    title: "Kalika",
    category: "BRANDING / PRINT",
    tags: ["PRINT"],
    image: projectThumb("kalika"),
    video: projectVideo("kalika", "kalika_logo_animate.mp4"),
	  gallery: projectGallery("kalika"),
    description: {
      EN: "Kalika Branding Project\n\nThe branding project reflects the identity of the two young entrepreneurs: dynamic, feminine and approachable, with a careful and professional approach.\n\nAt the center of the visual system there is a versatile and easily recognizable logo, developed in a young and bright color palette, designed to communicate freshness, energy and positivity across all touchpoints.\n\nThe window graphic also helps to strengthen the brand presence and recognition over time in the urban space.",
      IT: "Progetto di Branding Kalika\n\nIl progetto di branding riflette l’identità delle due giovani imprenditrici: dinamica, femminile e accessibile, unita a un approccio sempre curato e professionale.\n\nAl centro del sistema visivo si trova un logo versatile e immediatamente riconoscibile, declinato in una palette cromatica giovane e vivace, pensata per trasmettere freschezza, energia e positività su ogni touchpoint.\n\nAnche la vetrofania contribuisce a rafforzare nel tempo la presenza e la riconoscibilità del brand nello spazio urbano."
    },
    meta: {
      subtitle: {
        EN: "BRANDING / VISUAL IDENTITY",
        IT: "BRANDING / IDENTITÀ VISIVA"
      },
      year: "2025",
      context: {
        EN: "Branding project for two entrepreneurs, focused on creating a clear and recognizable identity aligned with a dynamic and approachable positioning.",
        IT: "Progetto di branding per due imprenditrici, focalizzato sulla creazione di un’identità chiara e riconoscibile, allineata a un posizionamento dinamico e accessibile."
      },
      roles: ["VISUAL DESIGN", "BRAND IDENTITY"],
      stack: [
        { label: "IDENTITY", value: "SYSTEM" },
        { label: "PRINT", value: "MATERIALS" },
        { label: "SIGNAGE", value: "GRAPHICS" }
      ],
      sections: [
        {
          number: "01",
          title: { EN: "IDENTITY SYSTEM", IT: "SISTEMA DI IDENTITÀ" },
          description: {
            EN: "Developed a versatile logo and visual language designed for clarity, flexibility and recognition, supported by a fresh color palette and balanced composition.",
            IT: "Sviluppato un logo versatile e un linguaggio visivo progettato per chiarezza, flessibilità e riconoscibilità, supportato da una palette cromatica fresca e una composizione equilibrata."
          },
          layout: "text-image",
          galleryIndices: [0]
        },
        {
          number: "02",
          title: { EN: "APPLICATIONS", IT: "APPLICAZIONI" },
          description: {
            EN: "Applied the identity across printed materials and brand assets, ensuring consistency in tone, typography and composition across formats.",
            IT: "Applicata l’identità su materiali stampati e asset di brand, garantendo coerenza nel tono, nella tipografia e nella composizione su tutti i formati."
          },
          layout: "full-grid",
          galleryIndices: [1, 2]
        },
        {
          number: "03",
          title: { EN: "PHYSICAL PRESENCE", IT: "PRESENZA FISICA" },
          description: {
            EN: "Extended the identity into the physical space through window graphics and signage, reinforcing visibility and recognition in the urban environment.",
            IT: "Estesa l’identità nello spazio fisico attraverso vetrofanie e segnaletica, rafforzando la visibilità e la riconoscibilità nell’ambiente urbano."
          },
          layout: "full-grid",
          galleryIndices: [3]
        },
        {
          number: "",
          title: { EN: "OUTCOME", IT: "RISULTATO" },
          description: {
            EN: "A clear and adaptable identity system supporting both communication and physical presence, enabling consistent brand recognition over time.",
            IT: "Un sistema di identità chiaro e adattabile che supporta sia la comunicazione che la presenza fisica, abilitando una riconoscibilità del brand coerente nel tempo."
          },
          layout: "half",
          galleryIndices: []
        }
      ]
    }
  },
  {
    id: "ilmarmo",
    slug: "il-marmo",
    title: "Il Marmo",
    category: "EDITORIAL",
    tags: ["PRINT"],
    image: projectThumb("ilmarmo"),
    gallery: projectGallery("ilmarmo"),
    description: {
      EN: "Editorial Project — Marble Company\n\nDesign of a corporate brochure for a marble company, aimed at conveying a more contemporary and authoritative image while highlighting technical expertise and production complexity.\n\nThe project develops a clean, process-driven visual narrative, from raw material selection to advanced manufacturing and installation, supported by a curated gallery of high-end architectural applications.\n\nA refined color palette and premium print production (CMYK with Pantone inks) enhance the design, with an embossed metallic cover where stone names become a distinctive typographic element.\n\nThe result is an elegant, timeless editorial piece that translates technical know-how into a clear and sophisticated visual story.",
      IT: "Progetto editoriale — Azienda settore marmo\n\nDesign di una brochure istituzionale per un’azienda del settore marmo, pensata per esprimere un’immagine contemporanea e autorevole, valorizzando know-how e complessità produttiva.\n\nIl progetto sviluppa una narrazione visiva essenziale, centrata sul processo, dalla selezione della materia prima alle lavorazioni e installazione, affiancata da una gallery di applicazioni architettoniche di alto profilo.\n\nPalette raffinata e stampa di pregio (quadricromia con Pantoni) definiscono il linguaggio visivo, mentre la copertina introduce un segno distintivo: i nomi delle pietre impressi a rilievo su fondo metallizzato.\n\nIl risultato è un oggetto editoriale elegante e senza tempo, capace di tradurre la competenza tecnica in un racconto visivo chiaro e sofisticato."
    }
  },  
  {
    id: "nettuno",
    slug: "hotel-nettuno",
    title: "Hotel Nettuno",
    category: "PAINTINSG / PRINT",
    tags: ["PRINT"],
    image: projectThumb("nettuno"),
    gallery: projectGallery("nettuno"),
    description: {
      EN: "The work consists of a series of cardboard artworks inspired by the landscape of Lake Garda, reinterpreted through a stylized and minimal vector graphic language.\n\nThe system includes three formats, square, horizontal and vertical, designed to integrate with the hotel spaces and create visual continuity with the surrounding territory.\n\nProduced on cardboard with a transparent raised varnish, the pieces combine lightness, sustainability and attention to detail.",
      IT: "Il lavoro consiste in una serie di opere su cartone ispirate al paesaggio del Lago di Garda, reinterpretato attraverso un linguaggio grafico vettoriale stilizzato e minimale.\n\nIl sistema include tre formati, quadrato, orizzontale e verticale, progettati per integrarsi con gli spazi dell’hotel e creare una continuità visiva con il territorio circostante.\n\nProdotte su cartone con vernice trasparente a rilievo, le opere combinano leggerezza, sostenibilità e attenzione al dettaglio."
    }
  },
 {
    id: "website",
    slug: "personal-website",
    title: "Personal Website",
    category: "UI / UX / PRODUCT",
    tags: ["WEB"],
    image: projectThumb("portfolio"),
    gallery: projectGallery("portfolio"),
    description: {
      EN: "Personal portfolio website\n\n1.Ideation — defined project goals, audience and positioning.\n\n2. Information Architecture — structured pages, navigation and content hierarchy.\n\n3. Wireframing — explored layout structures and user flows.\n\n4. Visual Design — developed typography, visual system and UI components using Stitch AI through iterative prompt-based design sessions.\n\n5. Development & Launch — built the website with AI-assisted coding using Gemini 3 Flash (Vite, React), iterating features before version control on GitHub and automated deployment via Vercel.",
      IT: "Sito web portfolio personale\n\n1. Ideazione — definizione degli obiettivi del progetto, del pubblico di riferimento e del posizionamento.\n\n2. Architettura dell’informazione — strutturazione delle pagine, della navigazione e della gerarchia dei contenuti.\n\n3. Wireframing — esplorazione delle strutture di layout e dei flussi utente.\n\n4. Visual Design — sviluppo della tipografia, del sistema visivo e dei componenti UI utilizzando Stitch AI attraverso sessioni iterative di progettazione basate su prompt.\n\n5. Sviluppo e lancio — realizzazione del sito con coding assistito dall’IA tramite Gemini 3 Flash (Vite, React), iterazione delle funzionalità prima del versionamento su GitHub e deploy automatico tramite Vercel."
    },
    meta: {
      subtitle: {
        EN: "AI-ASSISTED DESIGN AND DEVELOPMENT",
        IT: "DESIGN E SVILUPPO ASSISTITO DALL’IA"
      },
      year: "2026",
      context: {
        EN: "Personal portfolio built to showcase brand and visual design work. Designed using Stitch AI for visual exploration and developed with AI-assisted coding via Gemini, deployed on Vercel.",
        IT: "Portfolio personale creato per presentare lavori di brand e visual design. Progettato con Stitch AI per l’esplorazione visiva e sviluppato con coding assistito dall’IA tramite Gemini, distribuito su Vercel."
      },
      roles: ["CONCEPT", "UX STRUCTURE", "VISUAL DESIGN", "AI-ASSISTED DEVELOPMENT", "DEPLOYMENT"],
      stack: [
        { label: "DESIGN", value: "STITCH AI" },
        { label: "ENGINE", value: "GEMINI FLASH" },
        { label: "FRAMEWORK", value: "REACT / VITE" },
        { label: "HOSTING", value: "VERCEL" }
      ],
      sections: [
        {
          number: "01",
          title: { EN: "IDEATION", IT: "IDEAZIONE" },
          description: {
            EN: "Defined project goals, target audience and positioning. Established the visual direction and tone of voice for the portfolio as a brand artifact.",
            IT: "Definizione degli obiettivi del progetto, del pubblico di riferimento e del posizionamento. Stabilita la direzione visiva e il tono di voce del portfolio come artefatto di brand."
          },
          layout: "text-image",
          galleryIndices: [0]
        },
        {
          number: "02 & 03",
          title: { EN: "STRUCTURE & WIREFRAMES", IT: "STRUTTURA E WIREFRAME" },
          description: {
            EN: "Structured pages, navigation and content hierarchy. Modular layout and user flow exploration following a strict 12-column grid.",
            IT: "Pagine strutturate, navigazione e gerarchia dei contenuti. Layout modulare ed esplorazione dei flussi utente seguendo una rigorosa griglia a 12 colonne."
          },
          layout: "annotated-wireframe",
          galleryIndices: [1],
          annotations: [
            { EN: "12-column grid",    IT: "Griglia a 12 colonne" },
            { EN: "Modular layout",    IT: "Layout modulare" },
            { EN: "Content hierarchy", IT: "Gerarchia dei contenuti" },
          ],
          comparison: {
            heading:     { EN: "From structure to interface", IT: "Dalla struttura all'interfaccia" },
            beforeIndex: 2,
            afterIndex:  3,
            beforeLabel: { EN: "Wireframe",  IT: "Wireframe" },
            afterLabel:  { EN: "Interface",  IT: "Interfaccia" },
          },
        },
        {
          number: "04",
          title: { EN: "VISUAL DESIGN", IT: "VISUAL DESIGN" },
          description: {
            EN: "Developed typography, visual system and UI components using Stitch AI through iterative prompt-based design sessions. Built a Swiss-grid aesthetic with a monochromatic palette and a bold primary red.",
            IT: "Sviluppo della tipografia, del sistema visivo e dei componenti UI tramite Stitch AI attraverso sessioni iterative di progettazione basate su prompt. Sistema a griglia svizzera con palette monocromatica e rosso primario."
          },
          layout: "full-grid",
          galleryIndices: [4, 5, 6]
        },
        {
          number: "05",
          title: { EN: "DEVELOPMENT", IT: "SVILUPPO" },
          description: {
            EN: "Built with AI-assisted coding using Gemini Flash (Vite, React, Tailwind v4, Framer Motion). Iterating features and refining interactions before version control on GitHub.",
            IT: "Realizzato con coding assistito dall’IA tramite Gemini Flash (Vite, React, Tailwind v4, Framer Motion). Iterazione delle funzionalità e rifinitura delle interazioni prima del versionamento su GitHub."
          },
          layout: "half",
          galleryIndices: [7]
        },
        {
          number: "06",
          title: { EN: "DEPLOYMENT", IT: "DISTRIBUZIONE" },
          description: {
            EN: "Automated deployment via Vercel from the main branch. Analytics integrated with @vercel/analytics. Custom domain and environment configuration.",
            IT: "Deploy automatico tramite Vercel dal branch principale. Analytics integrato con @vercel/analytics. Dominio personalizzato e configurazione dell’ambiente."
          },
          layout: "half",
          galleryIndices: [8]
        }
      ]
    }
  }

];

