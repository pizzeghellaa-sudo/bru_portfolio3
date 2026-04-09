import { address } from "motion/react-client";

export type Language = 'EN' | 'IT';

export const TRANSLATIONS = {
  EN: {
    nav: {
      INDEX: 'INDEX',
      TIMELINE: 'EXPERIENCE',
      CAPABILITIES: 'CAPABILITIES',
      WORK: 'SELECTED WORKS',
      CONTACTS: 'CONTACTS',
    },
    index: {
      title: 'BRAND\n&\nVisual Designer',
      description: 'I design brand identities and visual systems for hospitality, cultural and commercial brands, translating strategy into cohesive visual experiences across print and digital.',
      cta: 'Selected Works',
      scroll: 'SCROLL TO EXPLORE',
    },
    timeline: {
      title: 'EXPERIENCE',
      subtitle: 'PROFESSIONAL EXPERIENCE',
      scroll: 'SCROLL FOR CAPABILITIES',
    },
    capabilities: {
      title: 'CAPABILITIES',
      subtitle: 'METHODOLOGIES & STACK',
      categories: {
        discipline: '01 — DISCIPLINE',
        tooling: '02 — TOOLING',
      },
      disciplines: ['Brand Identity', 'Visual Systems', 'Editorial Design', 'Packaging', 'Web & Digital Design', 'Print Production'],
      tooling: [
        'Adobe InDesign',
        'Adobe Photoshop',
        'Adobe Illustrator',
        'Adobe Lightroom, XD',
        'Canva',
        'AI tools for creativity, productivity and automation'        
      ],
      quote: 'Precision, structured workflows and team coordination',
    },
    work: {
      title: 'SELECTED WORKS',
      subtitle: 'PORTFOLIO',
      filters: {
        ALL: 'ALL',
        IDENTITY: 'IDENTITY',
        DIGITAL: 'DIGITAL',
        POP: 'POP',
        PRINT: 'PRINT',
      },
      back: 'BACK TO MY WORK',
      detail: {
        year: 'YEAR',
        context: 'CONTEXT',
        role: 'ROLE',
        stack: 'STACK',
      },
    },
    signal: {
      address: '37067 Valeggio sul Mincio (VR)',
      phone: '+39 347 3587524',
      email: 'bulgarellibru@gmail.com',      
      availability: 'AVAILABLE FOR NEW OPPORTUNITIES',
      responseTime: 'RESPONSE TIME: < 24HRS',
      legalNote: 'All works are presented for portfolio purposes. Rights belong to the respective clients where applicable. No confidential information is disclosed.',
      footer: '© 2026 Bruna Bulgarelli.\nALL RIGHTS RESERVED.',
      builtWith: 'BUILT WITH AI',
      categories: {
        NETWORK: 'NETWORK',
        VISUALS: 'VISUALS',
        CURRICULUM: 'CURRICULUM',
      }
    },
    common: {
      close: 'CLOSE [ESC]',
    }
  },
  IT: {
    nav: {
      INDEX: 'INDICE',
      TIMELINE: 'ESPERIENZA',
      CAPABILITIES: 'COMPETENZE',
      WORK: 'LAVORI SELEZIONATI',
      CONTACTS: 'CONTATTI',
    },
    index: {
      title: 'BRAND\n&\nVisual Designer',
      description: 'Progetto identità di marca e sistemi visivi per brand nel settore dell’ospitalità, culturale e commerciale, traducendo la strategia in esperienze visive coerenti su stampa e digitale.',
      cta: 'Lavori selezionati',
      scroll: 'SCORRI PER ESPLORARE',
    },
    timeline: {
      title: 'ESPERIENZA',
      subtitle: 'ESPERIENZE PROFESSIONALI',
      scroll: 'SCORRI PER LE COMPETENZE',
    },
    capabilities: {
      title: 'COMPETENZE',
      subtitle: 'METODOLOGIE E STACK',
      categories: {
        discipline: '01 — DISCIPLINA',
        tooling: '02 — STRUMENTI',
      },
      disciplines: ['Brand Identity', 'Sistemi Visivi', 'Design Editoriale', 'Packaging', 'Web e Digitale', 'Processi di stampa'],
      tooling: [
        'Adobe InDesign',
        'Adobe Photoshop',
        'Adobe Illustrator',
        'Adobe Lightroom',
        'Canva',
        'AI-assisted tools for creative workflows and automation'  
      ],
      quote: 'Precisione, flussi di lavoro strutturati e coordinamento del team',
    },
    work: {
      title: 'LAVORI SELEZIONATI',
        subtitle: 'PORTFOLIO',
        filters: {
        ALL: 'TUTTI',
        IDENTITY: 'IDENTITÀ',
        POP: 'POP',
        DIGITAL: 'DIGITALE',
        PRINT: 'STAMPA',
      },
      back: 'TORNA ALL\'ARCHIVIO',
      detail: {
        year: 'ANNO',
        context: 'CONTESTO',
        role: 'RUOLO',
        stack: 'STACK',
      },
    },
    signal: {
      address: '37067 Valeggio sul Mincio (VR)',
      phone: '+39 347 3587524',
      email: 'bulgarellibru@gmail.com',
      availability: 'DISPONIBILE PER NUOVE OPPORTUNITÀ',
      responseTime: 'TEMPO DI RISPOSTA: < 24ORE',
      legalNote: 'Tutti i lavori sono presentati a scopo di portfolio. I diritti appartengono ai rispettivi clienti, ove applicabile. Nessuna informazione riservata viene divulgata.',
      footer: '© 2026 Bruna Bulgarelli.\nTUTTI I DIRITTI RISERVATI.',
      builtWith: 'CREATO CON AI',
      categories: {
        NETWORK: 'RETE',
        VISUALS: 'VISUALS',
        CURRICULUM: 'CURRICULUM',
      }
    },
    common: {
      close: 'CHIUDI [ESC]',
    }
  }
};
