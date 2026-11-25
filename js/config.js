/* ============================================================
   CONFIG: the ONLY file you edit to change contacts.
   Two separate channels. Never share numbers or emails.
   WhatsApp number: digits only, with country code, no + or spaces.
   ============================================================ */
window.SITE = {
  brand: "EMMECI",                    // short name: header, mobile navbar
  legal: "EMME.CI Costruzioni srl / GmbH",    // full legal name: footer, About
  defaultLang: "it",

  // Company details shown in the footer
  company: {
    address: "Via Julius Durst 44, 39042 Bressanone (BZ)",
    vat: "03284680216",         // P.IVA e Codice Fiscale
    eu: "IT03284680216",        // European VAT
    rea: "247237"
  },

  // Clients: site visits (sopralluogo), quotes and project requests ONLY
  clients: {
    whatsapp: "393512301748",
    email: "baoubassaconsult@gmail.com"
  },

  // Jobs: applicants ONLY (used on the Jobs page and its bottom bar)
  jobs: {
    whatsapp: "393792888394",
    email: "baoubassarecrut@gmail.com"
  },

  // Prefilled messages (WhatsApp text and email subject)
  msg: {
    it: {
      clients: { wa: "Buongiorno EMMECI, vorrei richiedere un sopralluogo per un intervento di ristrutturazione.", subject: "Richiesta di sopralluogo" },
      jobs:    { wa: "Buongiorno EMMECI, desidero candidarmi per lavorare con voi.", subject: "Candidatura" }
    },
    en: {
      clients: { wa: "Hello EMMECI, I would like to request a site visit for a renovation project.", subject: "Site visit request" },
      jobs:    { wa: "Hello EMMECI, I would like to apply to work with you.", subject: "Job application" }
    },
    de: {
      clients: { wa: "Guten Tag EMMECI, ich möchte einen Vor-Ort-Termin für ein Renovierungsprojekt anfragen.", subject: "Anfrage Vor-Ort-Termin" },
      jobs:    { wa: "Guten Tag EMMECI, ich möchte mich bei Ihnen bewerben.", subject: "Bewerbung" }
    }
  }
};
