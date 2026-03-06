import type { Language } from "./types"

export interface LegalSection {
  title: string
  paragraphs: string[]
}

export interface LegalDocument {
  title: string
  lastUpdatedLabel: string
  lastUpdatedDate: string
  translationNotice?: string
  sections: LegalSection[]
  backToHomeLabel: string
}

export const privacyDocuments: Record<Language, LegalDocument> = {
  en: {
    title: "Privacy Policy",
    lastUpdatedLabel: "Last updated",
    lastUpdatedDate: "March 6, 2026",
    sections: [
      {
        title: "1. Scope",
        paragraphs: [
          "This Privacy Policy applies to BadgerSignal (the GuruBoxAI product website, API, and related analysis services). It explains how we collect, use, store, and share data when you use AI Product Insight.",
        ],
      },
      {
        title: "2. Data We Collect",
        paragraphs: [
          "Account data: when you sign in with Google, we receive profile information such as your name, email address, avatar, and account identifier through Supabase authentication.",
          "Product and report data: we store your input direction, task status, generated summary, opportunity records, and export history so you can view and manage analysis results.",
          "Integration data: if you connect Google Docs export, we store Google OAuth tokens (access token, optional refresh token, expiry time, and scope) to create documents in your own Google Drive.",
          "Operational data: we process logs, technical diagnostics, cookies/session identifiers, security events, and product analytics needed to run and protect the service.",
        ],
      },
      {
        title: "3. How We Use Data",
        paragraphs: [
          "We use data to authenticate users, queue and run analysis tasks, generate opportunity reports, show account history, export PDF/Google Docs files, detect abuse, and improve reliability.",
          "We do not sell personal information to third parties.",
        ],
      },
      {
        title: "4. AI Processing and Providers",
        paragraphs: [
          "To produce analysis results, your input and intermediate prompts may be processed by configured AI providers, including OpenAI, Anthropic, and/or Alibaba DashScope (Qwen), depending on runtime model settings.",
          "AI outputs can be inaccurate, incomplete, or outdated. You should independently evaluate important decisions.",
        ],
      },
      {
        title: "5. Infrastructure and Third Parties",
        paragraphs: [
          "Our current technical stack includes Next.js services, Supabase (authentication and database), Redis/BullMQ (task queue), Google APIs (optional Docs export), Sentry (error monitoring), and Vercel Analytics (product analytics).",
          "These providers may process data under their own terms and privacy notices.",
        ],
      },
      {
        title: "6. Retention and Deletion",
        paragraphs: [
          "Account and report records are retained while your account is active, unless deletion is requested or required by law.",
          "When you delete a report in the product, it is soft-deleted from normal views. Related data may remain for a limited period in operational logs, caches, or backups before final removal.",
        ],
      },
      {
        title: "7. Security",
        paragraphs: [
          "We apply reasonable technical and organizational measures, including access controls, row-level security policies in Supabase, transport encryption, secret management, and security monitoring.",
          "No method of storage or transmission is fully secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        title: "8. Your Rights and Choices",
        paragraphs: [
          "You can manage language preferences and report deletion in product features, and you may request access, correction, export, or deletion of your personal data by contacting us.",
          "If you enabled Google Docs export, you can revoke app access in your Google account settings at any time.",
        ],
      },
      {
        title: "9. International Transfers, Updates, and Contact",
        paragraphs: [
          "Because our providers may operate in multiple countries, your data may be processed outside your location.",
          "We may update this policy from time to time. Material changes will be reflected by updating the date above.",
          "Privacy questions: privacy@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Back to Home",
  },
  zh: {
    title: "隐私政策",
    lastUpdatedLabel: "最后更新",
    lastUpdatedDate: "2026年3月6日",
    sections: [
      {
        title: "1. 适用范围",
        paragraphs: [
          "本隐私政策适用于 BadgerSignal（GuruBoxAI 产品网站、API 及相关分析服务），说明我们在你使用 AI Product Insight 时如何收集、使用、存储与共享数据。",
        ],
      },
      {
        title: "2. 我们收集的数据",
        paragraphs: [
          "账户数据：你通过 Google 登录时，我们会通过 Supabase 认证接收姓名、邮箱、头像和账户标识等信息。",
          "产品与报告数据：我们会保存你提交的产品方向、任务状态、生成摘要、机会条目和导出记录，以便你查看和管理分析结果。",
          "集成数据：当你启用 Google Docs 导出时，我们会保存 Google OAuth 令牌（访问令牌、可选刷新令牌、过期时间和授权范围），用于在你的 Google Drive 中创建文档。",
          "运行数据：我们会处理日志、技术诊断信息、Cookie/会话标识、安全事件和产品分析数据，以保障服务运行与安全。",
        ],
      },
      {
        title: "3. 数据使用目的",
        paragraphs: [
          "我们使用这些数据进行用户鉴权、任务排队与执行、机会报告生成、账户历史展示、PDF/Google Docs 导出、滥用防控与稳定性改进。",
          "我们不会向第三方出售你的个人信息。",
        ],
      },
      {
        title: "4. AI 处理与模型提供商",
        paragraphs: [
          "为生成分析结果，你输入的内容及中间提示词可能会由已配置的 AI 提供商处理，包括 OpenAI、Anthropic 和/或阿里云 DashScope（Qwen），具体取决于运行时模型配置。",
          "AI 输出可能存在不准确、不完整或过时情况，涉及重要决策时请独立评估。",
        ],
      },
      {
        title: "5. 基础设施与第三方服务",
        paragraphs: [
          "当前技术栈包括 Next.js 服务、Supabase（认证与数据库）、Redis/BullMQ（任务队列）、Google API（可选文档导出）、Sentry（错误监控）和 Vercel Analytics（产品分析）。",
          "上述服务商会依据其自身条款与隐私政策处理数据。",
        ],
      },
      {
        title: "6. 保存期限与删除",
        paragraphs: [
          "在账户有效期间，我们会保留账户与报告记录，除非你提出删除请求或法律另有要求。",
          "你在产品中删除报告后，报告会从常规界面中隐藏（软删除）；相关数据可能在运行日志、缓存或备份中保留有限时间后再最终移除。",
        ],
      },
      {
        title: "7. 安全措施",
        paragraphs: [
          "我们采取合理的技术与组织措施，包括访问控制、Supabase 行级安全策略、传输加密、密钥管理和安全监控。",
          "但任何存储或传输方式都无法保证绝对安全。",
        ],
      },
      {
        title: "8. 你的权利与选择",
        paragraphs: [
          "你可在产品中管理语言偏好并删除报告，也可通过联系我们申请访问、更正、导出或删除个人数据。",
          "若你启用了 Google Docs 导出，可随时在 Google 账户设置中撤销本应用授权。",
        ],
      },
      {
        title: "9. 跨境处理、政策更新与联系方式",
        paragraphs: [
          "由于相关服务商可能在多个国家提供服务，你的数据可能在你所在地区之外被处理。",
          "我们可能不时更新本政策，重大变更会通过更新上方日期体现。",
          "隐私相关咨询：privacy@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "返回首页",
  },
  de: {
    title: "Datenschutzrichtlinie",
    lastUpdatedLabel: "Zuletzt aktualisiert",
    lastUpdatedDate: "6. Marz 2026",
    translationNotice: "Bei Widerspruchen zwischen Sprachversionen gilt die englische Fassung.",
    sections: [
      {
        title: "1. Geltungsbereich",
        paragraphs: [
          "Diese Richtlinie gilt fur BadgerSignal (GuruBoxAI Website, API und Analysedienste) und beschreibt die Verarbeitung personenbezogener Daten bei AI Product Insight.",
        ],
      },
      {
        title: "2. Welche Daten wir erfassen",
        paragraphs: [
          "Kontodaten aus Google-Login uber Supabase, einschliesslich Name, E-Mail, Avatar und Konto-ID.",
          "Produkt- und Reportdaten wie Eingabetext, Aufgabenstatus, generierte Zusammenfassung, Chancen-Datensatze und Exportverlauf.",
          "Bei Google-Docs-Export speichern wir OAuth-Token (Access Token, optional Refresh Token, Ablaufzeit und Scope).",
          "Zusatzlich verarbeiten wir technische Logs, Cookies/Sitzungsdaten, Sicherheitsereignisse und Produktanalysen.",
        ],
      },
      {
        title: "3. Zwecke der Verarbeitung",
        paragraphs: [
          "Wir nutzen Daten fur Authentifizierung, Aufgabenwarteschlange (Redis/BullMQ), Berichtserstellung, PDF/Google-Docs-Export, Missbrauchspravention und Stabilitatsverbesserung.",
          "Wir verkaufen keine personenbezogenen Daten.",
        ],
      },
      {
        title: "4. KI-Verarbeitung",
        paragraphs: [
          "Eingaben und Zwischenprompts konnen je nach Modellkonfiguration durch OpenAI, Anthropic und/oder Alibaba DashScope verarbeitet werden.",
          "KI-Ergebnisse konnen fehlerhaft oder unvollstandig sein.",
        ],
      },
      {
        title: "5. Drittanbieter",
        paragraphs: [
          "Unser Stack umfasst u. a. Next.js, Supabase, Redis/BullMQ, Google APIs, Sentry und Vercel Analytics.",
          "Drittanbieter verarbeiten Daten nach eigenen Bedingungen.",
        ],
      },
      {
        title: "6. Speicherfristen und Loschung",
        paragraphs: [
          "Daten werden grundsatzlich wahrend der Kontonutzung gespeichert, sofern keine gesetzliche Pflicht entgegensteht.",
          "Geloschte Reports werden zunachst soft-geloscht und konnen fur begrenzte Zeit in Backups oder Logs verbleiben.",
        ],
      },
      {
        title: "7. Sicherheit",
        paragraphs: [
          "Wir nutzen angemessene Schutzmassnahmen wie Zugriffskontrollen, RLS-Richtlinien, Verschlusselung bei Ubertragung und Monitoring.",
        ],
      },
      {
        title: "8. Ihre Rechte",
        paragraphs: [
          "Sie konnen Auskunft, Berichtigung, Export oder Loschung beantragen und Google-Zugriffe in Ihrem Google-Konto widerrufen.",
        ],
      },
      {
        title: "9. Internationale Ubermittlung und Kontakt",
        paragraphs: [
          "Daten konnen in mehreren Landern verarbeitet werden. Wir aktualisieren diese Richtlinie bei Bedarf.",
          "Kontakt: privacy@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Zuruck zur Startseite",
  },
  fr: {
    title: "Politique de confidentialite",
    lastUpdatedLabel: "Derniere mise a jour",
    lastUpdatedDate: "6 mars 2026",
    translationNotice: "En cas de divergence entre versions linguistiques, la version anglaise prevaut.",
    sections: [
      {
        title: "1. Portee",
        paragraphs: [
          "Cette politique s'applique a BadgerSignal (site GuruBoxAI, API et services d'analyse) et explique le traitement des donnees lors de l'utilisation de AI Product Insight.",
        ],
      },
      {
        title: "2. Donnees collectees",
        paragraphs: [
          "Donnees de compte via connexion Google/Supabase: nom, e-mail, avatar et identifiant.",
          "Donnees produit et rapport: saisie utilisateur, etat des taches, resume genere, opportunites et historique d'export.",
          "En cas d'export Google Docs: jetons OAuth (access token, refresh token optionnel, expiration, scope).",
          "Donnees operationnelles: journaux techniques, cookies/session, securite et analyses produit.",
        ],
      },
      {
        title: "3. Finalites",
        paragraphs: [
          "Les donnees sont utilisees pour l'authentification, la file d'attente et l'execution des analyses, la generation de rapports, l'export et la prevention des abus.",
          "Nous ne vendons pas vos donnees personnelles.",
        ],
      },
      {
        title: "4. Traitement IA",
        paragraphs: [
          "Selon la configuration des modeles, les entrees et prompts intermediaires peuvent etre traites par OpenAI, Anthropic et/ou Alibaba DashScope.",
          "Les sorties IA peuvent etre inexactes ou incompletes.",
        ],
      },
      {
        title: "5. Services tiers",
        paragraphs: [
          "Notre architecture inclut notamment Next.js, Supabase, Redis/BullMQ, Google APIs, Sentry et Vercel Analytics.",
          "Chaque fournisseur applique ses propres conditions de traitement.",
        ],
      },
      {
        title: "6. Conservation et suppression",
        paragraphs: [
          "Les donnees sont conservees pendant la vie du compte, sauf obligation legale contraire.",
          "La suppression de rapport est d'abord logique (soft delete) et certaines donnees peuvent rester temporairement en logs ou sauvegardes.",
        ],
      },
      {
        title: "7. Securite",
        paragraphs: [
          "Nous appliquons des mesures raisonnables: controles d'acces, politiques RLS, chiffrement en transit et surveillance securite.",
        ],
      },
      {
        title: "8. Vos droits",
        paragraphs: [
          "Vous pouvez demander acces, rectification, export ou suppression de vos donnees et revoquer l'acces Google depuis votre compte Google.",
        ],
      },
      {
        title: "9. Transferts internationaux et contact",
        paragraphs: [
          "Les donnees peuvent etre traitees dans plusieurs pays. Cette politique peut etre mise a jour periodiquement.",
          "Contact: privacy@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Retour a l'accueil",
  },
  it: {
    title: "Informativa sulla privacy",
    lastUpdatedLabel: "Ultimo aggiornamento",
    lastUpdatedDate: "6 marzo 2026",
    translationNotice: "In caso di conflitto tra versioni linguistiche, prevale la versione inglese.",
    sections: [
      {
        title: "1. Ambito",
        paragraphs: [
          "Questa informativa si applica a BadgerSignal (sito GuruBoxAI, API e servizi di analisi) e descrive il trattamento dei dati in AI Product Insight.",
        ],
      },
      {
        title: "2. Dati raccolti",
        paragraphs: [
          "Dati account da login Google tramite Supabase: nome, email, avatar e identificativo account.",
          "Dati prodotto/report: input utente, stato task, riepilogo generato, opportunita e storico export.",
          "Per export Google Docs memorizziamo token OAuth (access token, refresh token opzionale, scadenza, scope).",
          "Dati operativi: log tecnici, cookie/sessione, eventi di sicurezza e analytics di prodotto.",
        ],
      },
      {
        title: "3. Finalita",
        paragraphs: [
          "Usiamo i dati per autenticazione, coda task ed esecuzione analisi, generazione report, export e prevenzione abusi.",
          "Non vendiamo dati personali.",
        ],
      },
      {
        title: "4. Elaborazione IA",
        paragraphs: [
          "Input e prompt intermedi possono essere elaborati da OpenAI, Anthropic e/o Alibaba DashScope in base alla configurazione del modello.",
          "I risultati IA possono essere imprecisi o incompleti.",
        ],
      },
      {
        title: "5. Servizi terzi",
        paragraphs: [
          "Lo stack tecnico include Next.js, Supabase, Redis/BullMQ, Google APIs, Sentry e Vercel Analytics.",
          "I fornitori terzi trattano i dati secondo le proprie condizioni.",
        ],
      },
      {
        title: "6. Conservazione e cancellazione",
        paragraphs: [
          "I dati sono conservati per la durata dell'account salvo obblighi legali diversi.",
          "La cancellazione dei report avviene inizialmente come soft delete; parte dei dati puo restare temporaneamente in log o backup.",
        ],
      },
      {
        title: "7. Sicurezza",
        paragraphs: [
          "Adottiamo misure ragionevoli: controlli accesso, policy RLS, cifratura in transito e monitoraggio sicurezza.",
        ],
      },
      {
        title: "8. Diritti dell'utente",
        paragraphs: [
          "Puoi richiedere accesso, rettifica, export o cancellazione dei dati e revocare l'accesso Google dal tuo account Google.",
        ],
      },
      {
        title: "9. Trasferimenti internazionali e contatto",
        paragraphs: [
          "I dati possono essere trattati in piu paesi. Questa informativa puo essere aggiornata periodicamente.",
          "Contatto: privacy@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Torna alla home",
  },
  es: {
    title: "Politica de privacidad",
    lastUpdatedLabel: "Ultima actualizacion",
    lastUpdatedDate: "6 de marzo de 2026",
    translationNotice: "Si existe conflicto entre versiones de idioma, prevalece la version en ingles.",
    sections: [
      {
        title: "1. Alcance",
        paragraphs: [
          "Esta politica aplica a BadgerSignal (sitio GuruBoxAI, API y servicios de analisis) y describe como tratamos datos en AI Product Insight.",
        ],
      },
      {
        title: "2. Datos que recopilamos",
        paragraphs: [
          "Datos de cuenta mediante inicio de sesion con Google en Supabase: nombre, correo, avatar e identificador.",
          "Datos de producto e informe: entrada del usuario, estado de tareas, resumen generado, oportunidades e historial de exportacion.",
          "Si habilitas exportacion a Google Docs, guardamos tokens OAuth (access token, refresh token opcional, expiracion y scope).",
          "Datos operativos: logs tecnicos, cookies/sesion, eventos de seguridad y analitica del producto.",
        ],
      },
      {
        title: "3. Como usamos los datos",
        paragraphs: [
          "Usamos los datos para autenticar usuarios, ejecutar la cola de analisis, generar informes, exportar archivos y prevenir abuso.",
          "No vendemos informacion personal.",
        ],
      },
      {
        title: "4. Procesamiento con IA",
        paragraphs: [
          "Segun la configuracion del modelo, las entradas y prompts intermedios pueden procesarse con OpenAI, Anthropic y/o Alibaba DashScope.",
          "Las salidas de IA pueden contener errores o estar incompletas.",
        ],
      },
      {
        title: "5. Terceros e infraestructura",
        paragraphs: [
          "Nuestro stack incluye Next.js, Supabase, Redis/BullMQ, Google APIs, Sentry y Vercel Analytics.",
          "Cada proveedor procesa datos bajo sus propias condiciones.",
        ],
      },
      {
        title: "6. Retencion y eliminacion",
        paragraphs: [
          "Conservamos datos mientras la cuenta este activa, salvo requisitos legales diferentes.",
          "Cuando eliminas un informe se aplica soft delete; parte de la informacion puede permanecer temporalmente en logs o respaldos.",
        ],
      },
      {
        title: "7. Seguridad",
        paragraphs: [
          "Aplicamos medidas razonables, incluyendo control de acceso, politicas RLS, cifrado en transito y monitoreo de seguridad.",
        ],
      },
      {
        title: "8. Tus derechos",
        paragraphs: [
          "Puedes solicitar acceso, correccion, exportacion o eliminacion de datos, y revocar permisos de Google desde tu cuenta Google.",
        ],
      },
      {
        title: "9. Transferencias internacionales y contacto",
        paragraphs: [
          "Los datos pueden procesarse en varios paises. Esta politica puede actualizarse periodicamente.",
          "Contacto: privacy@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Volver al inicio",
  },
  pt: {
    title: "Politica de Privacidade",
    lastUpdatedLabel: "Ultima atualizacao",
    lastUpdatedDate: "6 de marco de 2026",
    translationNotice: "Se houver conflito entre versoes de idioma, prevalece a versao em ingles.",
    sections: [
      {
        title: "1. Escopo",
        paragraphs: [
          "Esta politica aplica-se ao BadgerSignal (site GuruBoxAI, API e servicos de analise) e explica o tratamento de dados no AI Product Insight.",
        ],
      },
      {
        title: "2. Dados coletados",
        paragraphs: [
          "Dados de conta via login Google/Supabase: nome, email, avatar e identificador da conta.",
          "Dados de produto e relatorio: texto de entrada, status de tarefas, resumo gerado, oportunidades e historico de exportacao.",
          "Ao ativar exportacao para Google Docs, armazenamos tokens OAuth (access token, refresh token opcional, expiracao e escopo).",
          "Dados operacionais: logs tecnicos, cookies/sessao, eventos de seguranca e analytics do produto.",
        ],
      },
      {
        title: "3. Finalidades",
        paragraphs: [
          "Usamos os dados para autenticacao, fila e execucao de analises, geracao de relatorios, exportacao e prevencao de abuso.",
          "Nao vendemos dados pessoais.",
        ],
      },
      {
        title: "4. Processamento por IA",
        paragraphs: [
          "Dependendo da configuracao de modelos, entradas e prompts intermediarios podem ser processados por OpenAI, Anthropic e/ou Alibaba DashScope.",
          "Resultados de IA podem conter imprecisoes ou incompletudes.",
        ],
      },
      {
        title: "5. Infraestrutura e terceiros",
        paragraphs: [
          "Nosso stack inclui Next.js, Supabase, Redis/BullMQ, Google APIs, Sentry e Vercel Analytics.",
          "Fornecedores terceirizados tratam dados segundo suas proprias politicas.",
        ],
      },
      {
        title: "6. Retencao e exclusao",
        paragraphs: [
          "Os dados sao retidos enquanto a conta estiver ativa, salvo obrigacoes legais diferentes.",
          "Ao excluir relatorios, aplicamos soft delete; alguns dados podem permanecer temporariamente em logs ou backups.",
        ],
      },
      {
        title: "7. Seguranca",
        paragraphs: [
          "Aplicamos medidas razoaveis, incluindo controles de acesso, politicas RLS, criptografia em transito e monitoramento de seguranca.",
        ],
      },
      {
        title: "8. Seus direitos",
        paragraphs: [
          "Voce pode solicitar acesso, correcao, exportacao ou exclusao de dados, e revogar o acesso Google na sua conta Google.",
        ],
      },
      {
        title: "9. Transferencias internacionais e contato",
        paragraphs: [
          "Os dados podem ser processados em diferentes paises. Esta politica pode ser atualizada periodicamente.",
          "Contato: privacy@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Voltar para o inicio",
  },
}

export const termsDocuments: Record<Language, LegalDocument> = {
  en: {
    title: "Terms of Service",
    lastUpdatedLabel: "Last updated",
    lastUpdatedDate: "March 6, 2026",
    sections: [
      {
        title: "1. Acceptance",
        paragraphs: [
          "By accessing or using BadgerSignal, you agree to these Terms of Service and our Privacy Policy. If you do not agree, do not use the service.",
        ],
      },
      {
        title: "2. Service Description",
        paragraphs: [
          "BadgerSignal provides AI-assisted product opportunity analysis, including staged task processing, generated report content, opportunity scoring, and optional exports (PDF and Google Docs).",
          "The service aims to produce up to 300 opportunities per analysis, but output count and quality may vary by input and system conditions.",
          "We may update, add, or remove features at any time.",
        ],
      },
      {
        title: "3. Accounts and Access",
        paragraphs: [
          "A valid Google sign-in is required for core features. You are responsible for account security and activity under your account.",
          "To protect system stability, we may enforce technical limits such as one running analysis task per user at a time.",
        ],
      },
      {
        title: "4. User Content and Permissions",
        paragraphs: [
          "You retain ownership of your input content. You grant us a limited license to process, store, and transform that content only as needed to provide and secure the service.",
          "You represent that you have rights to submit the content and that it does not violate law or third-party rights.",
        ],
      },
      {
        title: "5. AI Output Disclaimer",
        paragraphs: [
          "Analysis results are generated by AI and may contain errors, omissions, bias, or outdated information.",
          "Outputs are for informational and product research purposes only and are not legal, financial, medical, or investment advice.",
        ],
      },
      {
        title: "6. Acceptable Use",
        paragraphs: [
          "You must not use the service for illegal activity, abusive automation, security attacks, unauthorized data collection, or infringement of intellectual property rights.",
          "We may suspend or terminate access if we reasonably believe your use creates legal, security, or operational risk.",
        ],
      },
      {
        title: "7. Third-Party Integrations",
        paragraphs: [
          "Certain functions rely on third-party services (such as Supabase, OpenAI, Anthropic, DashScope, Google APIs, Redis/BullMQ, Sentry, and Vercel Analytics).",
          "Your use of those integrations is also subject to each third party's terms and policies.",
        ],
      },
      {
        title: "8. Intellectual Property",
        paragraphs: [
          "The platform, code, workflows, design, and trademarks of BadgerSignal remain our property or our licensors' property.",
          "Subject to these Terms, you may use your generated reports for internal or commercial evaluation, at your own risk and subject to applicable law.",
        ],
      },
      {
        title: "9. Warranties and Liability",
        paragraphs: [
          "The service is provided on an \"as is\" and \"as available\" basis without warranties of any kind.",
          "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, data, goodwill, or business opportunities.",
          "Our aggregate liability for any claim relating to the service will not exceed the amount you paid us for the service in the 12 months before the event giving rise to liability.",
        ],
      },
      {
        title: "10. Termination, Governing Terms, and Contact",
        paragraphs: [
          "You may stop using the service at any time. We may suspend or terminate access for breach, misuse, or legal compliance reasons.",
          "If any provision is found unenforceable, the remaining provisions remain in effect. These Terms are governed by applicable law in the jurisdiction of the service operator, subject to mandatory consumer protections.",
          "Legal questions: legal@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Back to Home",
  },
  zh: {
    title: "服务条款",
    lastUpdatedLabel: "最后更新",
    lastUpdatedDate: "2026年3月6日",
    sections: [
      {
        title: "1. 接受条款",
        paragraphs: [
          "访问或使用 BadgerSignal 即表示你同意本服务条款及隐私政策；若不同意，请停止使用。",
        ],
      },
      {
        title: "2. 服务说明",
        paragraphs: [
          "BadgerSignal 提供 AI 辅助的产品机会分析，包括分阶段任务处理、报告生成、机会评分，以及可选的 PDF/Google Docs 导出。",
          "单次分析目标为最多 300 条机会，但实际数量与质量会受输入内容与系统状态影响。",
          "我们可在任何时间调整、新增或下线功能。",
        ],
      },
      {
        title: "3. 账户与访问",
        paragraphs: [
          "核心功能需要有效 Google 账号登录。你需对账户安全及账户下活动负责。",
          "为保障系统稳定，我们可能实施技术限制，例如同一用户同一时间仅允许一个运行中的分析任务。",
        ],
      },
      {
        title: "4. 用户内容与授权",
        paragraphs: [
          "你保留输入内容的所有权；你授予我们有限许可，仅用于提供、维护和保障服务所必需的数据处理、存储与转换。",
          "你承诺有权提交相关内容，且内容不违反法律或第三方权利。",
        ],
      },
      {
        title: "5. AI 输出免责声明",
        paragraphs: [
          "分析结果由 AI 生成，可能存在错误、遗漏、偏差或信息过时。",
          "输出仅用于信息参考与产品研究，不构成法律、财务、医疗或投资建议。",
        ],
      },
      {
        title: "6. 合理使用",
        paragraphs: [
          "你不得将服务用于违法活动、滥用自动化、攻击系统、未授权数据抓取或侵犯知识产权。",
          "若我们合理判断你的使用带来法律、安全或运营风险，我们可暂停或终止访问权限。",
        ],
      },
      {
        title: "7. 第三方集成",
        paragraphs: [
          "部分功能依赖第三方服务（如 Supabase、OpenAI、Anthropic、DashScope、Google API、Redis/BullMQ、Sentry、Vercel Analytics）。",
          "你使用这些集成功能时，也需遵守相应第三方条款与政策。",
        ],
      },
      {
        title: "8. 知识产权",
        paragraphs: [
          "平台代码、工作流、设计与商标等权利归 BadgerSignal 或其许可方所有。",
          "在遵守本条款前提下，你可自行承担风险并在符合法律的范围内使用生成报告进行内部或商业评估。",
        ],
      },
      {
        title: "9. 免责声明与责任限制",
        paragraphs: [
          "服务按现状和可用性提供，不作任何明示或默示担保。",
          "在法律允许范围内，我们不对间接、附带、特殊、后果性或惩罚性损害承担责任，也不对利润、数据、商誉或商业机会损失承担责任。",
          "就任何与服务相关的索赔，我们的累计责任上限为责任事件发生前 12 个月内你向我们支付的服务费用。",
        ],
      },
      {
        title: "10. 终止、适用规则与联系",
        paragraphs: [
          "你可随时停止使用服务；我们可因违约、滥用或合规需要暂停或终止访问。",
          "若部分条款被认定不可执行，其余条款仍然有效。本条款受服务运营主体所在司法辖区适用法律约束，但不影响强制性消费者保护规定。",
          "法律相关咨询：legal@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "返回首页",
  },
  de: {
    title: "Nutzungsbedingungen",
    lastUpdatedLabel: "Zuletzt aktualisiert",
    lastUpdatedDate: "6. Marz 2026",
    translationNotice: "Bei Widerspruchen zwischen Sprachversionen gilt die englische Fassung.",
    sections: [
      {
        title: "1. Zustimmung",
        paragraphs: [
          "Durch die Nutzung von BadgerSignal akzeptieren Sie diese Bedingungen sowie die Datenschutzrichtlinie.",
        ],
      },
      {
        title: "2. Leistungsumfang",
        paragraphs: [
          "BadgerSignal bietet KI-gestutzte Produktchancen-Analysen mit Berichten, Scoring sowie optionalem PDF/Google-Docs-Export.",
          "Pro Analyse sind bis zu 300 Chancen vorgesehen; Umfang und Qualitat konnen variieren.",
        ],
      },
      {
        title: "3. Konto und Zugriff",
        paragraphs: [
          "Fur Kernfunktionen ist Google-Login erforderlich. Sie sind fur Ihr Konto verantwortlich.",
          "Zur Systemstabilitat konnen technische Limits gelten, z. B. ein laufender Analyseauftrag pro Nutzer.",
        ],
      },
      {
        title: "4. Nutzerinhalte",
        paragraphs: [
          "Sie behalten Rechte an Ihren Eingaben und gewahren uns eine begrenzte Lizenz zur Verarbeitung fur den Betrieb des Dienstes.",
          "Sie sichern zu, dass Inhalte rechtmassig sind und keine Rechte Dritter verletzen.",
        ],
      },
      {
        title: "5. KI-Haftungsausschluss",
        paragraphs: [
          "KI-Ergebnisse konnen Fehler, Auslassungen oder veraltete Informationen enthalten und stellen keine professionelle Beratung dar.",
        ],
      },
      {
        title: "6. Zulassige Nutzung",
        paragraphs: [
          "Unzulassig sind u. a. rechtswidrige Nutzung, Angriffe, missbrauchliche Automatisierung und IP-Verletzungen.",
          "Bei Risiko fur Recht, Sicherheit oder Betrieb konnen wir den Zugang einschranken oder beenden.",
        ],
      },
      {
        title: "7. Drittanbieter",
        paragraphs: [
          "Funktionen basieren teils auf Drittanbietern wie Supabase, OpenAI, Anthropic, DashScope, Google APIs, Redis/BullMQ, Sentry und Vercel Analytics.",
        ],
      },
      {
        title: "8. Geistiges Eigentum",
        paragraphs: [
          "Plattform, Code, Workflows und Marken bleiben unser bzw. das Eigentum unserer Lizenzgeber.",
        ],
      },
      {
        title: "9. Gewahrleistung und Haftung",
        paragraphs: [
          "Der Dienst wird ohne Gewahr bereitgestellt. Soweit gesetzlich zulassig, ist unsere Haftung fur indirekte oder Folgeschaden ausgeschlossen.",
          "Die Gesamthaftung ist auf den in den letzten 12 Monaten gezahlten Betrag begrenzt.",
        ],
      },
      {
        title: "10. Beendigung und Kontakt",
        paragraphs: [
          "Nutzung kann jederzeit beendet werden; wir konnen bei Verstoss, Missbrauch oder Rechtsgrunden sperren.",
          "Kontakt: legal@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Zuruck zur Startseite",
  },
  fr: {
    title: "Conditions d'utilisation",
    lastUpdatedLabel: "Derniere mise a jour",
    lastUpdatedDate: "6 mars 2026",
    translationNotice: "En cas de divergence entre versions linguistiques, la version anglaise prevaut.",
    sections: [
      {
        title: "1. Acceptation",
        paragraphs: [
          "En utilisant BadgerSignal, vous acceptez ces Conditions et la Politique de confidentialite.",
        ],
      },
      {
        title: "2. Description du service",
        paragraphs: [
          "BadgerSignal fournit une analyse d'opportunites produit assistee par IA, avec rapports, notation et export PDF/Google Docs en option.",
          "Jusqu'a 300 opportunites peuvent etre visees par analyse, sans garantie de volume exact.",
        ],
      },
      {
        title: "3. Compte et acces",
        paragraphs: [
          "La connexion Google est requise pour les fonctions principales. Vous etes responsable de votre compte.",
          "Des limites techniques peuvent s'appliquer, notamment une analyse active par utilisateur.",
        ],
      },
      {
        title: "4. Contenu utilisateur",
        paragraphs: [
          "Vous conservez la propriete de vos entrees et nous accordez une licence limitee pour fournir et securiser le service.",
          "Vous garantissez disposer des droits necessaires sur les contenus soumis.",
        ],
      },
      {
        title: "5. Avertissement IA",
        paragraphs: [
          "Les sorties IA peuvent etre inexactes, incompletes ou obsoletes et ne constituent pas un conseil professionnel.",
        ],
      },
      {
        title: "6. Usage autorise",
        paragraphs: [
          "Les usages illegaux, attaques, automatisations abusives et violations de propriete intellectuelle sont interdits.",
          "Nous pouvons suspendre l'acces en cas de risque juridique, securitaire ou operationnel.",
        ],
      },
      {
        title: "7. Integrations tierces",
        paragraphs: [
          "Certaines fonctions reposent sur Supabase, OpenAI, Anthropic, DashScope, Google APIs, Redis/BullMQ, Sentry et Vercel Analytics.",
        ],
      },
      {
        title: "8. Propriete intellectuelle",
        paragraphs: [
          "La plateforme, le code, les workflows et les marques restent notre propriete ou celle de nos concédants.",
        ],
      },
      {
        title: "9. Garanties et responsabilite",
        paragraphs: [
          "Le service est fourni tel quel, sans garantie. Dans la limite legale, notre responsabilite pour dommages indirects est exclue.",
          "La responsabilite totale est limitee aux montants payes au cours des 12 derniers mois.",
        ],
      },
      {
        title: "10. Resiliation et contact",
        paragraphs: [
          "Vous pouvez cesser d'utiliser le service a tout moment; nous pouvons suspendre l'acces en cas de manquement ou d'obligation legale.",
          "Contact: legal@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Retour a l'accueil",
  },
  it: {
    title: "Termini di servizio",
    lastUpdatedLabel: "Ultimo aggiornamento",
    lastUpdatedDate: "6 marzo 2026",
    translationNotice: "In caso di conflitto tra versioni linguistiche, prevale la versione inglese.",
    sections: [
      {
        title: "1. Accettazione",
        paragraphs: [
          "Usando BadgerSignal accetti questi Termini e l'Informativa sulla privacy.",
        ],
      },
      {
        title: "2. Descrizione del servizio",
        paragraphs: [
          "BadgerSignal offre analisi di opportunita prodotto assistita da IA, con report, scoring ed export PDF/Google Docs opzionale.",
          "Ogni analisi puo mirare fino a 300 opportunita, ma il risultato effettivo puo variare.",
        ],
      },
      {
        title: "3. Account e accesso",
        paragraphs: [
          "Per le funzioni principali e richiesto login Google. Sei responsabile della sicurezza del tuo account.",
          "Possiamo applicare limiti tecnici, incluso un solo task di analisi attivo per utente.",
        ],
      },
      {
        title: "4. Contenuti utente",
        paragraphs: [
          "Mantieni la proprieta dei contenuti inviati e ci concedi una licenza limitata per elaborarli al fine di fornire il servizio.",
          "Dichiari di avere i diritti necessari sui contenuti inviati.",
        ],
      },
      {
        title: "5. Avvertenza IA",
        paragraphs: [
          "I risultati IA possono essere inesatti, incompleti o non aggiornati e non costituiscono consulenza professionale.",
        ],
      },
      {
        title: "6. Uso consentito",
        paragraphs: [
          "Sono vietati uso illecito, attacchi, automazione abusiva e violazioni di proprieta intellettuale.",
          "Possiamo sospendere l'accesso in caso di rischi legali, di sicurezza o operativi.",
        ],
      },
      {
        title: "7. Integrazioni di terze parti",
        paragraphs: [
          "Alcune funzioni dipendono da Supabase, OpenAI, Anthropic, DashScope, Google APIs, Redis/BullMQ, Sentry e Vercel Analytics.",
        ],
      },
      {
        title: "8. Proprieta intellettuale",
        paragraphs: [
          "Piattaforma, codice, workflow e marchi restano nostri o dei nostri licenzianti.",
        ],
      },
      {
        title: "9. Garanzie e responsabilita",
        paragraphs: [
          "Il servizio e fornito cosi com'e, senza garanzie. Nei limiti di legge, escludiamo responsabilita per danni indiretti.",
          "La responsabilita totale e limitata agli importi pagati nei 12 mesi precedenti.",
        ],
      },
      {
        title: "10. Cessazione e contatto",
        paragraphs: [
          "Puoi interrompere l'uso in qualsiasi momento; possiamo sospendere per violazioni, abuso o obblighi di legge.",
          "Contatto: legal@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Torna alla home",
  },
  es: {
    title: "Terminos de servicio",
    lastUpdatedLabel: "Ultima actualizacion",
    lastUpdatedDate: "6 de marzo de 2026",
    translationNotice: "Si existe conflicto entre versiones de idioma, prevalece la version en ingles.",
    sections: [
      {
        title: "1. Aceptacion",
        paragraphs: [
          "Al usar BadgerSignal aceptas estos Terminos y la Politica de privacidad.",
        ],
      },
      {
        title: "2. Descripcion del servicio",
        paragraphs: [
          "BadgerSignal ofrece analisis de oportunidades de producto asistido por IA, con reportes, puntuacion y exportacion opcional a PDF/Google Docs.",
          "Cada analisis puede apuntar a hasta 300 oportunidades, pero el resultado real puede variar.",
        ],
      },
      {
        title: "3. Cuenta y acceso",
        paragraphs: [
          "Se requiere inicio de sesion con Google para funciones principales. Eres responsable de la seguridad de tu cuenta.",
          "Podemos aplicar limites tecnicos, incluido un analisis activo por usuario.",
        ],
      },
      {
        title: "4. Contenido del usuario",
        paragraphs: [
          "Conservas la titularidad de tus contenidos y nos otorgas una licencia limitada para procesarlos y operar el servicio.",
          "Declaras tener derechos sobre el contenido enviado.",
        ],
      },
      {
        title: "5. Aviso sobre IA",
        paragraphs: [
          "Las salidas de IA pueden ser inexactas, incompletas o desactualizadas y no constituyen asesoria profesional.",
        ],
      },
      {
        title: "6. Uso permitido",
        paragraphs: [
          "Se prohibe uso ilegal, ataques, automatizacion abusiva e infracciones de propiedad intelectual.",
          "Podemos suspender el acceso por riesgos legales, de seguridad u operativos.",
        ],
      },
      {
        title: "7. Integraciones de terceros",
        paragraphs: [
          "Algunas funciones dependen de Supabase, OpenAI, Anthropic, DashScope, Google APIs, Redis/BullMQ, Sentry y Vercel Analytics.",
        ],
      },
      {
        title: "8. Propiedad intelectual",
        paragraphs: [
          "La plataforma, codigo, flujos y marcas siguen siendo nuestros o de nuestros licenciantes.",
        ],
      },
      {
        title: "9. Garantias y responsabilidad",
        paragraphs: [
          "El servicio se ofrece tal cual, sin garantias. En la medida permitida por ley, excluimos responsabilidad por danos indirectos.",
          "La responsabilidad total se limita a los importes pagados en los 12 meses previos.",
        ],
      },
      {
        title: "10. Terminacion y contacto",
        paragraphs: [
          "Puedes dejar de usar el servicio en cualquier momento; podemos suspender por incumplimiento, abuso o exigencia legal.",
          "Contacto: legal@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Volver al inicio",
  },
  pt: {
    title: "Termos de Servico",
    lastUpdatedLabel: "Ultima atualizacao",
    lastUpdatedDate: "6 de marco de 2026",
    translationNotice: "Se houver conflito entre versoes de idioma, prevalece a versao em ingles.",
    sections: [
      {
        title: "1. Aceitacao",
        paragraphs: [
          "Ao usar o BadgerSignal, voce aceita estes Termos e a Politica de Privacidade.",
        ],
      },
      {
        title: "2. Descricao do servico",
        paragraphs: [
          "O BadgerSignal oferece analise de oportunidades de produto com IA, incluindo relatorios, pontuacao e exportacao opcional para PDF/Google Docs.",
          "Cada analise pode mirar ate 300 oportunidades, mas o resultado efetivo pode variar.",
        ],
      },
      {
        title: "3. Conta e acesso",
        paragraphs: [
          "Login Google e necessario para recursos principais. Voce e responsavel pela seguranca da sua conta.",
          "Podemos aplicar limites tecnicos, incluindo apenas uma analise em execucao por usuario.",
        ],
      },
      {
        title: "4. Conteudo do usuario",
        paragraphs: [
          "Voce mantem a titularidade do conteudo enviado e nos concede licenca limitada para processa-lo e operar o servico.",
          "Voce declara ter os direitos necessarios sobre o conteudo enviado.",
        ],
      },
      {
        title: "5. Aviso sobre IA",
        paragraphs: [
          "Resultados de IA podem conter imprecisoes, omissoes ou desatualizacao e nao constituem consultoria profissional.",
        ],
      },
      {
        title: "6. Uso aceitavel",
        paragraphs: [
          "E proibido uso ilegal, ataques, automacao abusiva e violacao de propriedade intelectual.",
          "Podemos suspender acesso em caso de risco legal, de seguranca ou operacional.",
        ],
      },
      {
        title: "7. Integracoes de terceiros",
        paragraphs: [
          "Alguns recursos dependem de Supabase, OpenAI, Anthropic, DashScope, Google APIs, Redis/BullMQ, Sentry e Vercel Analytics.",
        ],
      },
      {
        title: "8. Propriedade intelectual",
        paragraphs: [
          "Plataforma, codigo, fluxos e marcas permanecem nossos ou de nossos licenciadores.",
        ],
      },
      {
        title: "9. Garantias e responsabilidade",
        paragraphs: [
          "O servico e fornecido como esta, sem garantias. No limite da lei, excluimos responsabilidade por danos indiretos.",
          "A responsabilidade total fica limitada aos valores pagos nos 12 meses anteriores.",
        ],
      },
      {
        title: "10. Encerramento e contato",
        paragraphs: [
          "Voce pode encerrar o uso a qualquer momento; podemos suspender por violacao, abuso ou exigencia legal.",
          "Contato: legal@badgersignal.com",
        ],
      },
    ],
    backToHomeLabel: "Voltar para o inicio",
  },
}
