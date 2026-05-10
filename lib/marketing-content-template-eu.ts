import type {
  CoreLandingTemplateProps,
  HomepageTemplateProps,
  PublicExampleTemplateProps,
} from '@/components/marketing/marketing-page-templates'
import type { SeoLocale } from '@/lib/seo/locales'

type SharedTemplateFields = Pick<
  HomepageTemplateProps,
  'sectionLabel' | 'title' | 'description' | 'primaryAction' | 'secondaryAction' | 'signals'
>

type HomepageContentFields = Omit<HomepageTemplateProps, keyof SharedTemplateFields | 'locale'>
type CoreContentFields = Omit<CoreLandingTemplateProps, keyof SharedTemplateFields | 'locale'>
type ExampleContentFields = Omit<PublicExampleTemplateProps, keyof SharedTemplateFields | 'locale'>

export const EURO_TEMPLATE_FIELDS: Partial<
  Record<
    SeoLocale,
    {
      home: HomepageContentFields
      core: CoreContentFields
      example: ExampleContentFields
    }
  >
> = {
  de: {
    home: {
      heroVisualEyebrow: 'Das bekommst du',
      heroVisualTitle: 'Aus einer Richtung wird eine priorisierte Chancenkarte',
      heroVisualLayers: [
        'Produktrichtung als Input',
        'Bewertungslogik und priorisierte Chancen',
        'Öffentliche Beispielberichte vor dem Login',
      ],
      supportEyebrow: 'Wähle den Einstieg',
      supportTitle: 'Beginne mit der Seite, die am besten zu deiner nächsten Frage passt.',
      supportDescription:
        'Die Homepage ist kein lose zusammengewürfelter Überblick. Sie ist ein Entscheidungs-Hub: Gehe direkt in einen Kern-Workflow, wenn du dein Problem kennst, oder prüfe zuerst einen öffentlichen Beispielbericht, wenn du die Ergebnisqualität sehen willst.',
      supportColumns: [
        {
          title: 'KI-Startup-Ideengenerator',
          description:
            'Entfalte von einem Produktthema aus mehrere Startup-Richtungen und vergleiche, welche Keile zuerst validiert werden sollten.',
          href: '/de/ai-startup-idea-generator',
          actionLabel: 'Generator ansehen',
        },
        {
          title: 'SaaS-Ideenvalidierung',
          description:
            'Nutze strukturierte Bewertung, um zu sehen, ob eine SaaS-Richtung mehr Einsatz verdient oder früh aussortiert werden sollte.',
          href: '/de/saas-idea-validation',
          actionLabel: 'Validierung öffnen',
        },
        {
          title: 'KI-Geschäftschancenanalyse',
          description:
            'Verdichte einen breiten Markt in eine klarere Prioritätenliste und erkenne, welcher Keil den nächsten Schritt verdient.',
          href: '/de/ai-business-opportunity-analysis',
          actionLabel: 'Analyse ansehen',
        },
        {
          title: 'Beispielbericht: Freelancer',
          description:
            'Sieh dir einen öffentlichen Bericht für Freelancer-Workflows an und verstehe Ranking, Struktur und Szenario-Fit.',
          href: '/de/examples/ai-tools-for-freelancers',
          actionLabel: 'Freelancer-Beispiel ansehen',
        },
        {
          title: 'Beispielbericht: Kleinunternehmen',
          description:
            'Prüfe einen öffentlichen Bericht für kleine Unternehmen, bevor du deine eigene Richtung analysierst.',
          href: '/de/examples/ai-tools-for-small-business',
          actionLabel: 'KMU-Beispiel ansehen',
        },
      ],
      detailEyebrow: 'So funktioniert es',
      detailTitle: 'Erst den Workflow verstehen, dann entscheiden, ob du ins Produkt gehst.',
      detailDescription:
        'Die Homepage erklärt den Weg von einer Richtung zu priorisierten Chancen, damit Suchbesucher den Nutzen verstehen, ohne sofort in die App gedrängt zu werden.',
      workflowSteps: [
        {
          label: 'Schritt 01',
          title: 'Mit einer Richtung starten',
          description: 'Bring ein Markt-Thema, einen Nutzertyp oder einen Produktkeil mit, den du prüfen willst.',
        },
        {
          label: 'Schritt 02',
          title: 'Priorisierte Chancen prüfen',
          description: 'Vergleiche eine bewertete Chancenliste statt verstreuter Ideen ohne Struktur.',
        },
        {
          label: 'Schritt 03',
          title: 'Bewertungslogik verstehen',
          description: 'Sieh, warum bestimmte Richtungen anhand von Markt-Signal und Scoring stärker wirken.',
        },
        {
          label: 'Schritt 04',
          title: 'Mit dem stärksten Keil weitermachen',
          description: 'Nutze die klarste Priorität als nächsten Schritt statt zwischen vagen Optionen zu pendeln.',
        },
      ],
      closing: {
        eyebrow: 'Bereit zum Start',
        title: 'Analysiere deine eigene Richtung oder starte mit einem öffentlichen Beispiel.',
        description:
          'BadgerSignal zeigt zuerst Struktur und erst danach Reibung. Starte mit deiner Richtung oder prüfe einen Beispielbericht, um den Workflow in Ruhe zu sehen.',
        primaryAction: {
          label: 'Analyse starten',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Beispielbericht ansehen',
          href: '/de/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    core: {
      heroVisualEyebrow: 'Landing-Fokus',
      heroVisualTitle: 'Ein Keyword, ein Versprechen, ein nächster Schritt',
      heroVisualRows: [
        { label: 'Intent-Fit', value: 'Hoch' },
        { label: 'Bewertungs-Tiefe', value: 'Bereit' },
        { label: 'Öffentlicher Beweis', value: 'Sichtbar' },
      ],
      supportEyebrow: 'Aufgabe des Templates',
      supportTitle: 'Dieses Kern-Template ordnet jede Seite um einen Intent, eine Proof-Spur und einen klaren CTA.',
      supportDescription:
        'Das Layout ist für hochintentionale SEO-Seiten gebaut: Generator, Validierung und Chancenanalyse.',
      diagnosticColumns: [
        {
          title: 'Klare Suchintention',
          description:
            'Der Hero ist auf eine einzelne Suchabsicht abgestimmt, damit die Seite ohne verwässertes Versprechen ranken und konvertieren kann.',
        },
        {
          title: 'Beweisstruktur',
          description:
            'Der zweite Bereich lässt Raum für Produktlogik, Bewertungsmethode und sichtbare Vertrauenssignale.',
        },
        {
          title: 'Input-zu-Output-Brücke',
          description:
            'Der Detailbereich trennt bereits sauber, was Nutzer eingeben und was sie als Ergebnis zurückbekommen.',
        },
      ],
      intentEyebrow: 'Den richtigen Workflow wählen',
      intentTitle: 'Nutze die Seite, die zu deiner nächsten Entscheidung passt.',
      intentDescription:
        'Kernseiten funktionieren am besten, wenn Besucher schnell erkennen, ob dieser Workflow jetzt passt oder ob zuerst eine andere Seite sinnvoller ist.',
      intentColumns: [
        {
          title: 'Geeignet für',
          description:
            'Besucher, die bereits einen Markt, Workflow oder eine Kandidatenidee im Blick haben und gezielter weiterarbeiten wollen.',
        },
        {
          title: 'Nicht geeignet für',
          description:
            'Menschen, die nur ein generisches Brainstorming suchen oder ohne ausreichenden Kontext eine endgültige Antwort erwarten.',
        },
        {
          title: 'Nutze es, wenn',
          description:
            'Du vor dem Login eine klarere nächste Entscheidung als bloßes Weiterstöbern brauchst.',
        },
      ],
      detailEyebrow: 'Input-und-Output-Rahmen',
      detailTitle: 'Das Template trennt Eingabe und Ergebnis, damit die Produktlogik sofort verständlich wird.',
      detailDescription:
        'So können wir echte Beispiel-Prompts, Ergebniszusammenfassungen und Scoring später sauber einbauen.',
      inputLabel: 'Input-Seite',
      inputExample: [
        'Eine fokussierte Produktrichtung oder ein Markt-Thema.',
        'Eine Startup-Frage, die priorisiert werden muss.',
        'Ein enger Keil, der noch strukturierte Validierung braucht.',
      ],
      outputLabel: 'Output-Seite',
      outputExample: [
        '20+ bewertete Chancen mit klarer Rangfolge.',
        'Ein besseres Gefühl dafür, welche Richtung zuerst Aufmerksamkeit verdient.',
        'Öffentliche Proof-Blöcke, die lokalisiert und ausgebaut werden können.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Häufige Fragen zu diesem Workflow',
      faqDescription:
        'Diese FAQ werden durch route-spezifische Antworten ersetzt, sobald jede Kernseite vollständig ausformuliert ist.',
      faqItems: [
        {
          question: 'Wobei hilft mir diese Seite?',
          answer:
            'Sie erklärt einen fokussierten Workflow, zeigt die Struktur des Outputs und leitet dich zum sinnvollsten nächsten Produktschritt weiter.',
        },
        {
          question: 'Gibt es ein sichtbares Input-und-Output-Beispiel?',
          answer:
            'Ja. Jede Kernseite zeigt ein klares Input-Output-Muster, damit Besucher den Workflow verstehen, bevor sie sich einloggen.',
        },
      ],
      relatedEyebrow: 'Weiter prüfen',
      relatedTitle: 'Gehe auf die nächste Seite, die deine Entscheidung weiter schärft.',
      relatedDescription:
        'Jeder Kern-Workflow sollte mit der Homepage, einer benachbarten Workflow-Seite und mindestens einem öffentlichen Beispiel verbunden sein.',
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Zurück zum öffentlichen Hub, um alle Einstiegspunkte nebeneinander zu vergleichen.',
          href: '/de',
          actionLabel: 'Zur Homepage',
        },
        {
          title: 'SaaS-Ideenvalidierung',
          description: 'Prüfe einen ausgewählten Keil strenger, sobald du das Feld eingegrenzt hast.',
          href: '/de/saas-idea-validation',
          actionLabel: 'Validierung öffnen',
        },
        {
          title: 'Freelancer-Beispielbericht',
          description: 'Sieh dir an, wie priorisierte Chancen in einem öffentlichen Bericht aussehen.',
          href: '/de/examples/ai-tools-for-freelancers',
          actionLabel: 'Öffentliches Beispiel ansehen',
        },
      ],
      closing: {
        eyebrow: 'Nächster Schritt',
        title: 'Dieses Template ist bereit für keyword-spezifische Inhalte.',
        description:
          'Im nächsten Pass wird diese Struktur mit route-spezifischer Botschaft, Proof und FAQ gefüllt.',
        primaryAction: {
          label: 'Analyse starten',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Beispielbericht ansehen',
          href: '/de/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    example: {
      heroVisualEyebrow: 'Beispielstruktur',
      heroVisualTitle: 'Ein öffentlicher Bericht vor jeder Login-Reibung',
      heroVisualSteps: ['Szenario-Briefing', 'Priorisierte Chancen', 'Warum dieses Set gewinnt'],
      supportEyebrow: 'Aufgabe des Templates',
      supportTitle: 'Das öffentliche Beispiel-Template zeigt echte Ergebnisqualität, bevor ein Login nötig wird.',
      supportDescription:
        'Diese Struktur nutzen wir für öffentliche Berichte, die Suchbesuchern vorab beweisen, wie gut das Produkt arbeitet.',
      supportSnapshots: [
        {
          label: 'Markt-Segment',
          value: 'Klarer Use Case',
          description: 'Ein gutes öffentliches Beispiel braucht eine konkrete Zielgruppe und einen klaren Einsatzkontext.',
        },
        {
          label: 'Hauptschmerz',
          value: 'Operative Reibung',
          description: 'Das Beispiel sollte zeigen, welcher wiederkehrende Schmerz den Workflow zahlenswert macht.',
        },
        {
          label: 'Bester nächster Schritt',
          value: 'Top-Keil validieren',
          description: 'Die Seite sollte den Besucher mit einer klareren nächsten Handlung entlassen, nicht nur mit Neugier.',
        },
      ],
      opportunityEyebrow: 'Priorisierte Chancen',
      opportunityTitle: 'Dieser Bereich ist für die stärksten Produktkeile reserviert.',
      opportunityDescription:
        'Jeder Opportunity-Block zeigt Score, Zielgruppen-Fit, Timing-Logik und eine konkrete nächste Validierungsbewegung.',
      opportunityLabels: {
        score: 'Score',
        audience: 'Zielgruppe',
        whyNow: 'Warum jetzt',
        nextMove: 'Nächster Schritt',
      },
      opportunityItems: [
        {
          title: 'Top-Chancen-Slot',
          score: 'Bereit für Score',
          description:
            'Der erste Block ist für priorisierte Opportunity-Zusammenfassungen mit sichtbaren Confidence-Signalen ausgelegt.',
        },
        {
          title: 'Szenario-Fit-Slot',
          score: 'Bereit für Intent',
          description:
            'Der zweite Block erklärt, warum das Szenario attraktiv ist, ohne dass Besucher vorher einloggen müssen.',
        },
        {
          title: 'Entscheidungs-Slot',
          score: 'Bereit für CTA',
          description:
            'Der dritte Block ist für Begründung und CTA reserviert, damit Interesse in Produkttest umschlägt.',
        },
      ],
      detailEyebrow: 'Anatomie des Beispiels',
      detailTitle: 'Das Template lässt Raum für Methodik, Bewertungslogik und Szenario-Kontext.',
      detailDescription:
        'So können wir Beispielseiten veröffentlichen, die substanziell wirken und nicht wie Teaser mit ein paar Screenshots.',
      diagnosticColumns: [
        {
          title: 'Szenario-Briefing',
          description: 'Ein klarer Einstieg erklärt das Marktsegment und warum dieser Bericht veröffentlicht wird.',
        },
        {
          title: 'Priorisiertes Ergebnis',
          description: 'Das mittlere Band ist für sichtbares Chancen-Ranking gebaut, nicht für vage Erzählsprache.',
        },
        {
          title: 'Warum es gewinnt',
          description: 'Der letzte Bereich erklärt Bewertung, Begründung und den CTA für den nächsten Schritt.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Häufige Fragen zum Lesen eines öffentlichen Beispielberichts',
      faqDescription:
        'Diese Antworten helfen Besuchern zu verstehen, was ein öffentlicher Bericht beweist, wie man ihn liest und wann die eigene Analyse sinnvoll ist.',
      faqItems: [
        {
          question: 'Wofür sollte ich diesen öffentlichen Bericht nutzen?',
          answer:
            'Nutze ihn, um zu beurteilen, ob das Ergebnis konkret, priorisiert und brauchbar genug wirkt, bevor du deine eigene Richtung einreichst.',
        },
        {
          question: 'Basiert dieses Beispiel auf einem realen Workflow-Szenario?',
          answer:
            'Ja. Öffentliche Beispiele sind immer um eine konkrete Zielgruppe und einen realen Workflow organisiert, damit die Ausgabe glaubwürdig wirkt.',
        },
        {
          question: 'Was sollte ich nach dem Lesen des Beispiels tun?',
          answer:
            'Wenn Ranking-Logik und Ergebnisqualität relevant wirken, starte deine eigene Analyse oder vergleiche zuerst einen weiteren öffentlichen Workflow.',
        },
      ],
      relatedEyebrow: 'Weiter erkunden',
      relatedTitle: 'Nutze das Beispiel als Brücke in den Rest der öffentlichen Seite.',
      relatedDescription:
        'Ein öffentlicher Bericht soll zurück zur Homepage und in die relevantesten Workflow-Seiten führen, statt als Sackgasse zu enden.',
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Zurück zum Haupt-Hub und die restlichen öffentlichen Einstiege vergleichen.',
          href: '/de',
          actionLabel: 'Zur Homepage',
        },
        {
          title: 'KI-Startup-Ideengenerator',
          description: 'Sieh, wie das Produkt eine Richtung in priorisierte Startup-Keile erweitert.',
          href: '/de/ai-startup-idea-generator',
          actionLabel: 'Generator ansehen',
        },
        {
          title: 'SaaS-Ideenvalidierung',
          description: 'Öffne den Workflow, der eine Kandidatenidee direkter unter Druck setzt.',
          href: '/de/saas-idea-validation',
          actionLabel: 'Validierung öffnen',
        },
      ],
      closing: {
        eyebrow: 'Nächster Schritt',
        title: 'Dieses Beispiel-Template ist bereit für öffentliche Berichtsinhalte.',
        description:
          'Im nächsten Pass werden szenariospezifische Briefings, Top-Chancen und Proof-Blöcke eingesteckt.',
        primaryAction: {
          label: 'Analyse starten',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Zur Homepage',
          href: '/de',
          variant: 'outline',
        },
      },
    },
  },
  fr: {
    home: {
      heroVisualEyebrow: 'Ce que vous obtenez',
      heroVisualTitle: 'Transformez une direction en carte d opportunités priorisées',
      heroVisualLayers: [
        'Direction produit en entrée',
        'Logique de scoring et opportunités classées',
        'Rapports publics avant la connexion',
      ],
      supportEyebrow: 'Choisir une entrée',
      supportTitle: 'Commencez par la page qui correspond à votre prochaine question.',
      supportDescription:
        'La page d accueil sert de hub de décision. Allez vers un workflow central si vous savez déjà ce que vous devez trancher, ou consultez d abord un rapport public si vous voulez voir la qualité du rendu.',
      supportColumns: [
        {
          title: "Générateur d idées startup IA",
          description:
            'Partez d un thème produit pour ouvrir plusieurs angles startup et comparer les meilleurs wedges à valider.',
          href: '/fr/ai-startup-idea-generator',
          actionLabel: 'Voir le générateur',
        },
        {
          title: 'Validation d idée SaaS',
          description:
            'Utilisez une lecture structurée pour voir si une direction SaaS mérite plus d effort ou doit être arrêtée plus tôt.',
          href: '/fr/saas-idea-validation',
          actionLabel: 'Ouvrir la validation',
        },
        {
          title: 'Analyse des opportunités IA',
          description:
            'Réduisez un espace de marché plus large à une liste de priorités plus claire et choisissez le meilleur angle suivant.',
          href: '/fr/ai-business-opportunity-analysis',
          actionLabel: 'Voir l analyse',
        },
        {
          title: 'Rapport exemple : freelances',
          description:
            'Consultez un rapport public sur les workflows freelances pour comprendre structure, classement et adéquation du scénario.',
          href: '/fr/examples/ai-tools-for-freelancers',
          actionLabel: 'Voir l exemple freelance',
        },
        {
          title: 'Rapport exemple : petites entreprises',
          description:
            'Consultez un rapport public pour petites entreprises avant d analyser votre propre direction.',
          href: '/fr/examples/ai-tools-for-small-business',
          actionLabel: 'Voir l exemple PME',
        },
      ],
      detailEyebrow: 'Comment cela fonctionne',
      detailTitle: 'Montrer le workflow d abord, puis laisser le visiteur décider.',
      detailDescription:
        'La page d accueil explique le passage d une direction à une liste d opportunités classées, afin que le visiteur comprenne le produit sans être poussé immédiatement dans l app.',
      workflowSteps: [
        {
          label: 'Étape 01',
          title: 'Arriver avec une direction',
          description: 'Partez d un thème marché, d un type d utilisateur ou d un wedge produit à explorer.',
        },
        {
          label: 'Étape 02',
          title: 'Examiner les opportunités classées',
          description: 'Comparez un ensemble évalué et structuré au lieu d accumuler des idées dispersées.',
        },
        {
          label: 'Étape 03',
          title: 'Comprendre le scoring',
          description: 'Voyez pourquoi certaines directions ressortent grâce à la logique de score et au signal marché.',
        },
        {
          label: 'Étape 04',
          title: 'Continuer avec le wedge le plus fort',
          description: 'Passez à l option la plus solide au lieu d hésiter entre plusieurs pistes vagues.',
        },
      ],
      closing: {
        eyebrow: 'Prêt à commencer',
        title: 'Analysez votre direction ou commencez par un exemple public.',
        description:
          'BadgerSignal montre d abord la structure puis la friction. Lancez votre propre analyse ou consultez un rapport public pour voir le workflow en pratique.',
        primaryAction: {
          label: "Lancer l'analyse",
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: "Voir le rapport d'exemple",
          href: '/fr/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    core: {
      heroVisualEyebrow: 'Focalisation landing',
      heroVisualTitle: 'Un mot-clé, une promesse, une prochaine action',
      heroVisualRows: [
        { label: 'Intent fit', value: 'Élevé' },
        { label: 'Profondeur du score', value: 'Prête' },
        { label: 'Preuve publique', value: 'Visible' },
      ],
      supportEyebrow: 'Rôle du template',
      supportTitle: 'Le template central organise chaque page autour d un seul intent, d une seule piste de preuve et d un seul CTA.',
      supportDescription:
        'Cette structure est pensée pour les pages SEO à forte intention : générateur, validation et analyse.',
      diagnosticColumns: [
        {
          title: 'Intent clair',
          description:
            'Le hero est aligné sur une seule intention de recherche pour permettre à la page de classer et convertir sans promesse diffuse.',
        },
        {
          title: 'Structure de preuve',
          description:
            'La deuxième zone laisse de la place pour la logique produit, la méthode de scoring et les signaux de confiance visibles.',
        },
        {
          title: 'Pont entre entrée et sortie',
          description:
            'La zone de détail sépare déjà ce que l utilisateur apporte et ce qu il récupère ensuite.',
        },
      ],
      intentEyebrow: 'Choisir le bon workflow',
      intentTitle: 'Utilisez la page qui correspond à la décision que vous devez prendre maintenant.',
      intentDescription:
        'Les pages centrales fonctionnent mieux quand le visiteur comprend vite si ce workflow est le bon ou si une autre page convient d abord.',
      intentColumns: [
        {
          title: 'Idéal pour',
          description:
            'Les visiteurs qui connaissent déjà le marché, le workflow ou l idée candidate qu ils veulent examiner plus sérieusement.',
        },
        {
          title: 'Pas idéal pour',
          description:
            'Les personnes qui cherchent seulement un brainstorming générique ou une réponse finale sans assez de contexte.',
        },
        {
          title: 'À utiliser quand',
          description:
            'Vous avez besoin d une prochaine décision plus nette que “continuer à explorer” et voulez une structure visible avant la connexion.',
        },
      ],
      detailEyebrow: 'Cadre entrée-sortie',
      detailTitle: 'Le template distingue déjà l entrée et la sortie pour rendre la logique produit lisible.',
      detailDescription:
        'Cela nous donne un emplacement propre pour des prompts d exemple, des résumés de résultats et du scoring structuré.',
      inputLabel: 'Voie d entrée',
      inputExample: [
        'Une direction produit ciblée ou un thème de marché.',
        'Une question startup qui a besoin d une vraie priorisation.',
        'Un wedge étroit qui demande encore une validation structurée.',
      ],
      outputLabel: 'Voie de sortie',
      outputExample: [
        '20+ opportunités évaluées avec une hiérarchie claire.',
        'Une lecture plus nette de la direction qui mérite l attention.',
        'Des blocs de preuve publics pouvant être localisés et enrichis.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions fréquentes sur ce workflow',
      faqDescription:
        'Ces réponses seront remplacées par des FAQ propres à chaque route lorsque chaque page sera finalisée.',
      faqItems: [
        {
          question: 'À quoi sert cette page ?',
          answer:
            'Elle explique un workflow précis, montre la structure du résultat et oriente vers la prochaine action produit la plus logique.',
        },
        {
          question: 'Y a-t-il un exemple visible d entrée et de sortie ?',
          answer:
            'Oui. Chaque page centrale montre clairement le schéma entrée-sortie pour que le visiteur comprenne le workflow avant de se connecter.',
        },
      ],
      relatedEyebrow: 'Continuer à explorer',
      relatedTitle: 'Passez à la page suivante qui rend votre décision plus nette.',
      relatedDescription:
        'Chaque workflow central doit rester relié à la homepage, à un workflow voisin et à au moins un exemple public.',
      relatedColumns: [
        {
          title: 'Accueil',
          description: 'Revenir au hub public principal pour comparer tous les points d entrée.',
          href: '/fr',
          actionLabel: "Retour à l'accueil",
        },
        {
          title: "Validation d'idée SaaS",
          description: 'Mettez un wedge prometteur sous plus de pression une fois le champ resserré.',
          href: '/fr/saas-idea-validation',
          actionLabel: 'Ouvrir la validation',
        },
        {
          title: 'Rapport freelance',
          description: 'Voyez comment les opportunités classées sont présentées dans un rapport public.',
          href: '/fr/examples/ai-tools-for-freelancers',
          actionLabel: 'Voir l exemple public',
        },
      ],
      closing: {
        eyebrow: 'Étape suivante',
        title: 'Ce template central est prêt pour du contenu guidé par mot-clé.',
        description:
          'Le prochain passage remplacera le texte générique par un message propre à chaque route, des preuves et des FAQ ciblées.',
        primaryAction: {
          label: "Lancer l'analyse",
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: "Voir le rapport d'exemple",
          href: '/fr/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    example: {
      heroVisualEyebrow: 'Charpente de l exemple',
      heroVisualTitle: 'Un rapport public avant toute friction de connexion',
      heroVisualSteps: ['Brief scénario', 'Opportunités classées', 'Pourquoi ce set gagne'],
      supportEyebrow: 'Rôle du template',
      supportTitle: 'Le template d exemple public est conçu pour montrer un vrai niveau de sortie avant toute connexion.',
      supportDescription:
        'C est la structure utilisée pour les rapports publics qui prouvent la qualité du produit aux visiteurs venant du search.',
      supportSnapshots: [
        {
          label: 'Segment marché',
          value: 'Cas d usage défini',
          description: 'Un bon exemple public a besoin d une audience concrète et d un contexte opérationnel clair.',
        },
        {
          label: 'Douleur principale',
          value: 'Friction opérationnelle',
          description: 'L exemple doit montrer quel problème récurrent rend le workflow suffisamment précieux pour être payé.',
        },
        {
          label: 'Meilleure suite',
          value: 'Valider le top wedge',
          description: 'La page doit laisser une prochaine action plus claire, pas seulement de la curiosité.',
        },
      ],
      opportunityEyebrow: 'Opportunités classées',
      opportunityTitle: 'Cette zone est réservée aux wedges produit les plus solides.',
      opportunityDescription:
        'Chaque bloc d opportunité expose le score, l adéquation audience, la logique de timing et la prochaine validation concrète.',
      opportunityLabels: {
        score: 'Score',
        audience: 'Audience',
        whyNow: 'Pourquoi maintenant',
        nextMove: 'Étape suivante',
      },
      opportunityItems: [
        {
          title: 'Bloc top opportunité',
          score: 'Prêt pour le score',
          description:
            'Le premier bloc est déjà prêt pour des résumés d opportunités classées avec des signaux de confiance visibles.',
        },
        {
          title: 'Bloc adéquation scénario',
          score: 'Prêt pour l intent',
          description:
            'Le second bloc explique pourquoi le scénario est attractif sans obliger le visiteur à se connecter.',
        },
        {
          title: 'Bloc décision',
          score: 'Prêt pour le CTA',
          description:
            'Le troisième bloc est réservé au raisonnement qui transforme l intérêt en essai produit.',
        },
      ],
      detailEyebrow: 'Anatomie de l exemple',
      detailTitle: 'Le template laisse déjà la place à la méthode, au scoring et au contexte du scénario.',
      detailDescription:
        'Nous pouvons ainsi publier des pages d exemple qui paraissent substantielles, pas de simples teasers avec des captures.',
      diagnosticColumns: [
        {
          title: 'Brief scénario',
          description: 'Un premier paragraphe clair explique le segment de marché et la raison de l exemple.',
        },
        {
          title: 'Sortie classée',
          description: 'La bande centrale est faite pour du classement visible, pas pour un discours trop abstrait.',
        },
        {
          title: 'Pourquoi ça gagne',
          description: 'La dernière zone sert à la logique, au score et au CTA qui fait avancer le visiteur.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions fréquentes sur la lecture d un rapport public',
      faqDescription:
        'Ces réponses aident le visiteur à comprendre ce que prouve un rapport public, comment le lire et quand lancer sa propre analyse.',
      faqItems: [
        {
          question: 'À quoi sert ce rapport public ?',
          answer:
            'Il sert à juger si le résultat paraît assez concret, classé et exploitable avant de soumettre votre propre direction.',
        },
        {
          question: 'Cet exemple repose-t-il sur un workflow réel ?',
          answer:
            'Oui. Les exemples publics sont construits autour d une audience et d un workflow concrets pour montrer une sortie crédible plutôt qu une démo générique.',
        },
        {
          question: 'Que faire après avoir lu cet exemple ?',
          answer:
            'Si la logique de classement et la qualité du résultat vous semblent pertinentes, lancez votre propre analyse ou comparez un autre workflow public.',
        },
      ],
      relatedEyebrow: 'Continuer à explorer',
      relatedTitle: 'Utilisez l exemple comme passerelle vers le reste du site public.',
      relatedDescription:
        'Un exemple public doit ramener vers la homepage et les workflows les plus pertinents, au lieu de devenir une page cul-de-sac.',
      relatedColumns: [
        {
          title: 'Accueil',
          description: 'Revenir au hub principal pour comparer les autres portes d entrée publiques.',
          href: '/fr',
          actionLabel: "Retour à l'accueil",
        },
        {
          title: "Générateur d'idées startup IA",
          description: 'Voir comment le produit étend une direction en wedges startup classés.',
          href: '/fr/ai-startup-idea-generator',
          actionLabel: 'Voir le générateur',
        },
        {
          title: "Validation d'idée SaaS",
          description: 'Ouvrir le workflow qui met une idée candidate sous plus de pression.',
          href: '/fr/saas-idea-validation',
          actionLabel: 'Ouvrir la validation',
        },
      ],
      closing: {
        eyebrow: 'Étape suivante',
        title: 'Ce template exemple est prêt à accueillir un vrai contenu de rapport public.',
        description:
          'Le prochain passage branchera des briefs de scénario, des meilleures opportunités et des blocs de preuve publics.',
        primaryAction: {
          label: "Lancer l'analyse",
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: "Retour à l'accueil",
          href: '/fr',
          variant: 'outline',
        },
      },
    },
  },
  it: {
    home: {
      heroVisualEyebrow: 'Cosa ottieni',
      heroVisualTitle: 'Trasforma una direzione in una mappa di opportunità prioritarie',
      heroVisualLayers: [
        'Direzione di prodotto in input',
        'Logica di scoring e opportunità ordinate',
        'Report pubblici prima del login',
      ],
      supportEyebrow: 'Scegli il punto di ingresso',
      supportTitle: 'Inizia dalla pagina che corrisponde meglio alla tua prossima domanda.',
      supportDescription:
        'La homepage funziona come hub decisionale. Entra subito nel workflow giusto se sai già cosa vuoi chiarire, oppure guarda prima un report pubblico se vuoi vedere la qualità dell output.',
      supportColumns: [
        {
          title: 'Generatore di idee startup AI',
          description:
            'Parti da un tema prodotto, apri più direzioni startup e confronta i wedge più interessanti da validare.',
          href: '/it/ai-startup-idea-generator',
          actionLabel: 'Apri il generatore',
        },
        {
          title: 'Validazione idea SaaS',
          description:
            'Usa una lettura strutturata per capire se una direzione SaaS merita più lavoro o va fermata prima.',
          href: '/it/saas-idea-validation',
          actionLabel: 'Apri la validazione',
        },
        {
          title: 'Analisi opportunità AI',
          description:
            'Riduci uno spazio di mercato più ampio a una lista di priorità più chiara e scegli il wedge successivo.',
          href: '/it/ai-business-opportunity-analysis',
          actionLabel: 'Apri l analisi',
        },
        {
          title: 'Report esempio: freelance',
          description:
            'Guarda un report pubblico sui workflow freelance per capire ranking, struttura e aderenza allo scenario.',
          href: '/it/examples/ai-tools-for-freelancers',
          actionLabel: 'Vedi esempio freelance',
        },
        {
          title: 'Report esempio: piccole imprese',
          description:
            'Consulta un report pubblico per piccole imprese prima di analizzare la tua direzione.',
          href: '/it/examples/ai-tools-for-small-business',
          actionLabel: 'Vedi esempio PMI',
        },
      ],
      detailEyebrow: 'Come funziona',
      detailTitle: 'Mostra prima il workflow, poi lascia decidere il visitatore.',
      detailDescription:
        'La homepage spiega il passaggio da una direzione a un set di opportunità ordinate, così il visitatore capisce il prodotto senza essere spinto subito nell app.',
      workflowSteps: [
        {
          label: 'Step 01',
          title: 'Arriva con una direzione',
          description: 'Parti da un tema di mercato, un tipo di utente o un wedge prodotto da esplorare.',
        },
        {
          label: 'Step 02',
          title: 'Rivedi le opportunità ordinate',
          description: 'Confronta un insieme valutato e strutturato invece di accumulare idee sparse.',
        },
        {
          label: 'Step 03',
          title: 'Capisci la logica di scoring',
          description: 'Vedi perché alcune direzioni emergono di più grazie a score e segnali di mercato.',
        },
        {
          label: 'Step 04',
          title: 'Prosegui con il wedge più forte',
          description: 'Vai avanti con la priorità migliore invece di oscillare tra opzioni poco chiare.',
        },
      ],
      closing: {
        eyebrow: 'Pronto a iniziare',
        title: 'Analizza la tua direzione o parti da un esempio pubblico.',
        description:
          'BadgerSignal mostra prima la struttura e poi la frizione. Avvia la tua analisi o guarda un report pubblico per capire il workflow in pratica.',
        primaryAction: {
          label: 'Avvia analisi',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Vedi report di esempio',
          href: '/it/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    core: {
      heroVisualEyebrow: 'Fuoco della landing',
      heroVisualTitle: 'Una keyword, una promessa, una prossima mossa',
      heroVisualRows: [
        { label: 'Intent fit', value: 'Alto' },
        { label: 'Profondità score', value: 'Pronta' },
        { label: 'Prova pubblica', value: 'Visibile' },
      ],
      supportEyebrow: 'Ruolo del template',
      supportTitle: 'Il template core organizza ogni pagina attorno a un solo intento, una sola prova e un solo CTA.',
      supportDescription:
        'Questa struttura è pensata per pagine SEO ad alta intenzione: generatore, validazione e analisi.',
      diagnosticColumns: [
        {
          title: 'Intento chiaro',
          description:
            'L hero è allineato a una sola intenzione di ricerca, così la pagina può posizionarsi e convertire senza promettere troppe cose insieme.',
        },
        {
          title: 'Struttura della prova',
          description:
            'La seconda sezione lascia spazio a logica di prodotto, metodo di scoring e segnali di fiducia visibili.',
        },
        {
          title: 'Ponte tra input e output',
          description:
            'La sezione di dettaglio separa già ciò che l utente porta e ciò che riceve in uscita.',
        },
      ],
      intentEyebrow: 'Scegli il workflow giusto',
      intentTitle: 'Usa la pagina che corrisponde alla decisione che devi prendere adesso.',
      intentDescription:
        'Le pagine core funzionano meglio quando il visitatore capisce subito se questo workflow è quello giusto o se prima serve un altra pagina.',
      intentColumns: [
        {
          title: 'Ideale per',
          description:
            'Visitatori che conoscono già il mercato, il workflow o l idea candidata che vogliono esaminare più seriamente.',
        },
        {
          title: 'Non ideale per',
          description:
            'Persone che cercano solo brainstorming generico o una risposta finale senza abbastanza contesto.',
        },
        {
          title: 'Usalo quando',
          description:
            'Hai bisogno di una decisione successiva più netta di “continuare a esplorare” e vuoi vedere struttura prima del login.',
        },
      ],
      detailEyebrow: 'Cornice input-output',
      detailTitle: 'Il template separa input e risultato per rendere chiara la logica del prodotto.',
      detailDescription:
        'Questo ci dà un posto ordinato per inserire prompt reali, sintesi dei risultati e scoring strutturato.',
      inputLabel: 'Corsia input',
      inputExample: [
        'Una direzione di prodotto focalizzata o un tema di mercato.',
        'Una domanda startup che richiede vera priorità.',
        'Un wedge stretto che ha ancora bisogno di validazione strutturata.',
      ],
      outputLabel: 'Corsia output',
      outputExample: [
        '20+ opportunità valutate con una gerarchia chiara.',
        'Una lettura più netta della direzione che merita attenzione.',
        'Blocchi pubblici di prova che possono essere localizzati ed espansi.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Domande frequenti su questo workflow',
      faqDescription:
        'Queste risposte verranno sostituite con FAQ specifiche per ogni route quando ogni pagina sarà completata.',
      faqItems: [
        {
          question: 'A cosa serve questa pagina?',
          answer:
            'Spiega un workflow preciso, mostra la struttura dell output e indirizza verso la prossima azione di prodotto più sensata.',
        },
        {
          question: 'Mostra un esempio visibile di input e output?',
          answer:
            'Sì. Ogni pagina core mostra chiaramente lo schema input-output così il visitatore capisce il workflow prima del login.',
        },
      ],
      relatedEyebrow: 'Continua a esplorare',
      relatedTitle: 'Vai alla pagina successiva che rende la decisione più chiara.',
      relatedDescription:
        'Ogni workflow core dovrebbe collegarsi alla homepage, a un workflow vicino e ad almeno un esempio pubblico.',
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Torna all hub pubblico per confrontare tutti i punti di ingresso.',
          href: '/it',
          actionLabel: 'Torna alla homepage',
        },
        {
          title: 'Validazione idea SaaS',
          description: 'Metti sotto più pressione un wedge promettente quando il campo è già più stretto.',
          href: '/it/saas-idea-validation',
          actionLabel: 'Apri la validazione',
        },
        {
          title: 'Report freelance',
          description: 'Guarda come appaiono opportunità ordinate in un report pubblico.',
          href: '/it/examples/ai-tools-for-freelancers',
          actionLabel: 'Vedi esempio pubblico',
        },
      ],
      closing: {
        eyebrow: 'Passo successivo',
        title: 'Questo template core è pronto per contenuti guidati da keyword.',
        description:
          'Nel prossimo passaggio il testo generico verrà sostituito con messaggi specifici per route, prove e FAQ mirate.',
        primaryAction: {
          label: 'Avvia analisi',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Vedi report di esempio',
          href: '/it/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    example: {
      heroVisualEyebrow: 'Struttura dell esempio',
      heroVisualTitle: 'Un report pubblico prima della frizione del login',
      heroVisualSteps: ['Scenario brief', 'Opportunità ordinate', 'Perché questo set vince'],
      supportEyebrow: 'Ruolo del template',
      supportTitle: 'Il template esempio pubblico mostra il livello reale dell output prima del login.',
      supportDescription:
        'Questa è la struttura usata per i report pubblici che dimostrano ai visitatori da search la qualità del prodotto.',
      supportSnapshots: [
        {
          label: 'Segmento di mercato',
          value: 'Use case definito',
          description: 'Un buon esempio pubblico ha bisogno di un audience concreta e di un contesto operativo chiaro.',
        },
        {
          label: 'Dolore principale',
          value: 'Attrito operativo',
          description: 'L esempio deve mostrare quale dolore ricorrente rende il workflow abbastanza prezioso da essere pagato.',
        },
        {
          label: 'Miglior passo successivo',
          value: 'Validare il top wedge',
          description: 'La pagina deve lasciare una prossima azione più chiara, non solo curiosità.',
        },
      ],
      opportunityEyebrow: 'Opportunità ordinate',
      opportunityTitle: 'Questa zona è riservata ai wedge prodotto più forti.',
      opportunityDescription:
        'Ogni blocco opportunità mostra score, aderenza al pubblico, logica temporale e prossima validazione concreta.',
      opportunityLabels: {
        score: 'Score',
        audience: 'Pubblico',
        whyNow: 'Perché ora',
        nextMove: 'Prossima mossa',
      },
      opportunityItems: [
        {
          title: 'Slot top opportunità',
          score: 'Pronto per score',
          description:
            'Il primo blocco è già pronto per riassunti di opportunità ordinate con segnali di fiducia visibili.',
        },
        {
          title: 'Slot aderenza scenario',
          score: 'Pronto per intent',
          description:
            'Il secondo blocco spiega perché lo scenario è interessante senza costringere il visitatore al login.',
        },
        {
          title: 'Slot decisione',
          score: 'Pronto per CTA',
          description:
            'Il terzo blocco è riservato al ragionamento che trasforma interesse in prova del prodotto.',
        },
      ],
      detailEyebrow: 'Anatomia dell esempio',
      detailTitle: 'Il template lascia spazio a metodo, logica di scoring e contesto dello scenario.',
      detailDescription:
        'Così possiamo pubblicare pagine esempio sostanziose, non teaser con qualche screenshot.',
      diagnosticColumns: [
        {
          title: 'Scenario brief',
          description: 'Un primo paragrafo chiaro spiega il segmento di mercato e il motivo dell esempio.',
        },
        {
          title: 'Output ordinato',
          description: 'La fascia centrale è fatta per ranking visibile, non per testo narrativo troppo vago.',
        },
        {
          title: 'Perché vince',
          description: 'L ultima zona serve a score, ragionamento e CTA che fanno avanzare il visitatore.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Domande frequenti sulla lettura di un report pubblico',
      faqDescription:
        'Queste risposte aiutano il visitatore a capire cosa prova un report pubblico, come leggerlo e quando lanciare la propria analisi.',
      faqItems: [
        {
          question: 'A cosa serve questo report pubblico?',
          answer:
            'Serve a giudicare se l output sembra abbastanza concreto, ordinato e azionabile prima di inviare la tua direzione.',
        },
        {
          question: 'Questo esempio si basa su un workflow reale?',
          answer:
            'Sì. Gli esempi pubblici sono costruiti attorno a un audience e a un workflow concreti per mostrare un output credibile, non una demo generica.',
        },
        {
          question: 'Cosa dovrei fare dopo aver letto l esempio?',
          answer:
            'Se la logica di ranking e la qualità dell output ti sembrano rilevanti, avvia la tua analisi o confronta un altro workflow pubblico.',
        },
      ],
      relatedEyebrow: 'Continua a esplorare',
      relatedTitle: 'Usa l esempio come ponte verso il resto del sito pubblico.',
      relatedDescription:
        'Un esempio pubblico deve riportare verso la homepage e i workflow più rilevanti, non diventare un vicolo cieco.',
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Torna all hub principale per confrontare gli altri ingressi pubblici.',
          href: '/it',
          actionLabel: 'Torna alla homepage',
        },
        {
          title: 'Generatore di idee startup AI',
          description: 'Guarda come il prodotto estende una direzione in wedge startup ordinati.',
          href: '/it/ai-startup-idea-generator',
          actionLabel: 'Apri il generatore',
        },
        {
          title: 'Validazione idea SaaS',
          description: 'Apri il workflow che mette più sotto pressione una singola idea candidata.',
          href: '/it/saas-idea-validation',
          actionLabel: 'Apri la validazione',
        },
      ],
      closing: {
        eyebrow: 'Passo successivo',
        title: 'Questo template esempio è pronto per veri contenuti di report pubblico.',
        description:
          'Nel prossimo passaggio inseriremo scenario brief, top opportunity e blocchi di prova pubblici.',
        primaryAction: {
          label: 'Avvia analisi',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Torna alla homepage',
          href: '/it',
          variant: 'outline',
        },
      },
    },
  },
  es: {
    home: {
      heroVisualEyebrow: 'Qué obtienes',
      heroVisualTitle: 'Convierte una dirección en un mapa de oportunidades priorizadas',
      heroVisualLayers: [
        'Dirección de producto como entrada',
        'Lógica de scoring y oportunidades ordenadas',
        'Reportes públicos antes del login',
      ],
      supportEyebrow: 'Elige la entrada',
      supportTitle: 'Empieza por la página que mejor encaja con tu próxima pregunta.',
      supportDescription:
        'La home funciona como hub de decisión. Ve directo al workflow principal si ya sabes qué quieres resolver, o revisa primero un reporte público si quieres evaluar la calidad del resultado.',
      supportColumns: [
        {
          title: 'Generador de ideas de startup con IA',
          description:
            'Parte de un tema de producto, abre varias direcciones startup y compara los wedges más prometedores.',
          href: '/es/ai-startup-idea-generator',
          actionLabel: 'Abrir generador',
        },
        {
          title: 'Validación de idea SaaS',
          description:
            'Usa una lectura estructurada para entender si una dirección SaaS merece más esfuerzo o debe frenarse antes.',
          href: '/es/saas-idea-validation',
          actionLabel: 'Abrir validación',
        },
        {
          title: 'Análisis de oportunidades IA',
          description:
            'Reduce un espacio de mercado más amplio a una lista de prioridades más clara y elige el mejor wedge siguiente.',
          href: '/es/ai-business-opportunity-analysis',
          actionLabel: 'Ver análisis',
        },
        {
          title: 'Reporte ejemplo: freelancers',
          description:
            'Consulta un reporte público sobre workflows freelance para entender estructura, ranking y ajuste del escenario.',
          href: '/es/examples/ai-tools-for-freelancers',
          actionLabel: 'Ver ejemplo freelance',
        },
        {
          title: 'Reporte ejemplo: pequeñas empresas',
          description:
            'Consulta un reporte público para pequeñas empresas antes de analizar tu propia dirección.',
          href: '/es/examples/ai-tools-for-small-business',
          actionLabel: 'Ver ejemplo pyme',
        },
      ],
      detailEyebrow: 'Cómo funciona',
      detailTitle: 'Explica primero el workflow y deja que el visitante decida después.',
      detailDescription:
        'La home explica el paso desde una dirección hasta un conjunto de oportunidades ordenadas, para que el visitante entienda el producto sin entrar de inmediato a la app.',
      workflowSteps: [
        {
          label: 'Paso 01',
          title: 'Llega con una dirección',
          description: 'Parte de un tema de mercado, un tipo de usuario o un wedge de producto que quieras explorar.',
        },
        {
          label: 'Paso 02',
          title: 'Revisa oportunidades ordenadas',
          description: 'Compara un conjunto evaluado y estructurado en lugar de juntar ideas sueltas sin jerarquía.',
        },
        {
          label: 'Paso 03',
          title: 'Entiende la lógica de scoring',
          description: 'Ve por qué ciertas direcciones destacan más gracias al score y a las señales de mercado.',
        },
        {
          label: 'Paso 04',
          title: 'Sigue con el wedge más fuerte',
          description: 'Avanza con la prioridad más sólida en lugar de dudar entre opciones poco claras.',
        },
      ],
      closing: {
        eyebrow: 'Listo para empezar',
        title: 'Analiza tu dirección o comienza con un ejemplo público.',
        description:
          'BadgerSignal muestra primero estructura y luego fricción. Inicia tu análisis o revisa un reporte público para ver cómo funciona el workflow.',
        primaryAction: {
          label: 'Iniciar análisis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Ver reporte de ejemplo',
          href: '/es/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    core: {
      heroVisualEyebrow: 'Foco de la landing',
      heroVisualTitle: 'Una keyword, una promesa, un siguiente paso',
      heroVisualRows: [
        { label: 'Intent fit', value: 'Alto' },
        { label: 'Profundidad del score', value: 'Lista' },
        { label: 'Prueba pública', value: 'Visible' },
      ],
      supportEyebrow: 'Rol del template',
      supportTitle: 'El template core organiza cada página alrededor de una sola intención, una sola línea de prueba y un solo CTA.',
      supportDescription:
        'Esta estructura está pensada para páginas SEO de alta intención: generador, validación y análisis.',
      diagnosticColumns: [
        {
          title: 'Intención clara',
          description:
            'El hero se alinea con una sola intención de búsqueda para que la página pueda posicionar y convertir sin prometer demasiadas cosas a la vez.',
        },
        {
          title: 'Estructura de prueba',
          description:
            'La segunda sección deja espacio para lógica de producto, método de scoring y señales visibles de confianza.',
        },
        {
          title: 'Puente entre entrada y salida',
          description:
            'La zona de detalle ya separa lo que trae el usuario y lo que recibe al final.',
        },
      ],
      intentEyebrow: 'Elegir el workflow correcto',
      intentTitle: 'Usa la página que coincide con la decisión que necesitas tomar ahora.',
      intentDescription:
        'Las páginas core funcionan mejor cuando el visitante entiende rápido si este workflow es el adecuado o si antes conviene otra página.',
      intentColumns: [
        {
          title: 'Ideal para',
          description:
            'Visitantes que ya conocen el mercado, el workflow o la idea candidata que quieren revisar con más seriedad.',
        },
        {
          title: 'No ideal para',
          description:
            'Personas que solo buscan brainstorming genérico o una respuesta final sin suficiente contexto.',
        },
        {
          title: 'Úsalo cuando',
          description:
            'Necesitas una siguiente decisión más clara que “seguir explorando” y quieres ver estructura antes del login.',
        },
      ],
      detailEyebrow: 'Marco entrada-salida',
      detailTitle: 'El template ya separa entrada y salida para que la lógica del producto sea evidente.',
      detailDescription:
        'Eso nos deja un lugar limpio para insertar prompts reales, resúmenes de resultados y scoring estructurado.',
      inputLabel: 'Carril de entrada',
      inputExample: [
        'Una dirección de producto enfocada o un tema de mercado.',
        'Una pregunta startup que necesita priorización real.',
        'Un wedge estrecho que aún necesita validación estructurada.',
      ],
      outputLabel: 'Carril de salida',
      outputExample: [
        '20+ oportunidades evaluadas con una jerarquía clara.',
        'Una lectura más nítida de la dirección que merece atención.',
        'Bloques públicos de prueba que luego se pueden localizar y expandir.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Preguntas frecuentes sobre este workflow',
      faqDescription:
        'Estas respuestas serán reemplazadas por FAQ específicas de cada ruta cuando cada página esté terminada.',
      faqItems: [
        {
          question: '¿Para qué sirve esta página?',
          answer:
            'Explica un workflow concreto, muestra la estructura del resultado y dirige hacia la siguiente acción de producto más lógica.',
        },
        {
          question: '¿Muestra un ejemplo visible de entrada y salida?',
          answer:
            'Sí. Cada página core muestra claramente el patrón entrada-salida para que el visitante entienda el workflow antes del login.',
        },
      ],
      relatedEyebrow: 'Seguir explorando',
      relatedTitle: 'Pasa a la página que hace tu decisión más clara.',
      relatedDescription:
        'Cada workflow core debe mantenerse conectado con la homepage, un workflow cercano y al menos un ejemplo público.',
      relatedColumns: [
        {
          title: 'Inicio',
          description: 'Vuelve al hub público para comparar todos los puntos de entrada.',
          href: '/es',
          actionLabel: 'Volver al inicio',
        },
        {
          title: 'Validación de idea SaaS',
          description: 'Presiona más un wedge prometedor cuando el campo ya está más acotado.',
          href: '/es/saas-idea-validation',
          actionLabel: 'Abrir validación',
        },
        {
          title: 'Reporte freelance',
          description: 'Mira cómo se presentan oportunidades ordenadas en un reporte público.',
          href: '/es/examples/ai-tools-for-freelancers',
          actionLabel: 'Ver ejemplo público',
        },
      ],
      closing: {
        eyebrow: 'Siguiente paso',
        title: 'Este template core está listo para contenido guiado por keyword.',
        description:
          'En el siguiente pase el texto genérico será reemplazado por mensajes, prueba y FAQ específicos por ruta.',
        primaryAction: {
          label: 'Iniciar análisis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Ver reporte de ejemplo',
          href: '/es/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    example: {
      heroVisualEyebrow: 'Estructura del ejemplo',
      heroVisualTitle: 'Un reporte público antes de la fricción del login',
      heroVisualSteps: ['Brief del escenario', 'Oportunidades ordenadas', 'Por qué este set gana'],
      supportEyebrow: 'Rol del template',
      supportTitle: 'El template de ejemplo público muestra la calidad real del resultado antes del login.',
      supportDescription:
        'Esta es la estructura para reportes públicos que demuestran la calidad del producto a visitantes que llegan desde search.',
      supportSnapshots: [
        {
          label: 'Segmento de mercado',
          value: 'Caso de uso definido',
          description: 'Un buen ejemplo público necesita una audiencia concreta y un contexto operativo claro.',
        },
        {
          label: 'Dolor principal',
          value: 'Fricción operativa',
          description: 'El ejemplo debe mostrar qué dolor recurrente hace que el workflow merezca ser pagado.',
        },
        {
          label: 'Mejor siguiente paso',
          value: 'Validar el top wedge',
          description: 'La página debe dejar una acción siguiente más clara, no solo curiosidad.',
        },
      ],
      opportunityEyebrow: 'Oportunidades ordenadas',
      opportunityTitle: 'Esta zona está reservada para los wedges de producto más fuertes.',
      opportunityDescription:
        'Cada bloque de oportunidad muestra score, ajuste con la audiencia, lógica temporal y la siguiente validación concreta.',
      opportunityLabels: {
        score: 'Score',
        audience: 'Audiencia',
        whyNow: 'Por qué ahora',
        nextMove: 'Siguiente paso',
      },
      opportunityItems: [
        {
          title: 'Bloque top oportunidad',
          score: 'Listo para score',
          description:
            'El primer bloque ya está preparado para resúmenes de oportunidades ordenadas con señales visibles de confianza.',
        },
        {
          title: 'Bloque ajuste del escenario',
          score: 'Listo para intención',
          description:
            'El segundo bloque explica por qué el escenario es atractivo sin obligar al visitante a iniciar sesión.',
        },
        {
          title: 'Bloque decisión',
          score: 'Listo para CTA',
          description:
            'El tercer bloque está reservado para el razonamiento que convierte interés en prueba de producto.',
        },
      ],
      detailEyebrow: 'Anatomía del ejemplo',
      detailTitle: 'El template deja espacio para método, lógica de scoring y contexto del escenario.',
      detailDescription:
        'Así podemos publicar páginas de ejemplo que se sienten sustanciales y no simples teasers con capturas.',
      diagnosticColumns: [
        {
          title: 'Brief del escenario',
          description: 'Un primer párrafo claro explica el segmento de mercado y el motivo del ejemplo.',
        },
        {
          title: 'Salida ordenada',
          description: 'La franja central está pensada para ranking visible, no para texto vago.',
        },
        {
          title: 'Por qué gana',
          description: 'La última zona sirve para score, razonamiento y CTA que hacen avanzar al visitante.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Preguntas frecuentes sobre cómo leer un reporte público',
      faqDescription:
        'Estas respuestas ayudan al visitante a entender qué demuestra un reporte público, cómo leerlo y cuándo lanzar su propio análisis.',
      faqItems: [
        {
          question: '¿Para qué sirve este reporte público?',
          answer:
            'Sirve para juzgar si el output parece lo bastante concreto, ordenado y accionable antes de enviar tu propia dirección.',
        },
        {
          question: '¿Este ejemplo está basado en un workflow real?',
          answer:
            'Sí. Los ejemplos públicos se construyen alrededor de una audiencia y un workflow concretos para mostrar una salida creíble, no una demo genérica.',
        },
        {
          question: '¿Qué debería hacer después de leer este ejemplo?',
          answer:
            'Si la lógica de ranking y la calidad del output te parecen relevantes, lanza tu propio análisis o compara otro workflow público.',
        },
      ],
      relatedEyebrow: 'Seguir explorando',
      relatedTitle: 'Usa el ejemplo como puente hacia el resto del sitio público.',
      relatedDescription:
        'Un ejemplo público debe devolver a la homepage y a los workflows más relevantes, no convertirse en una página sin salida.',
      relatedColumns: [
        {
          title: 'Inicio',
          description: 'Vuelve al hub principal para comparar los otros puntos de entrada públicos.',
          href: '/es',
          actionLabel: 'Volver al inicio',
        },
        {
          title: 'Generador de ideas de startup con IA',
          description: 'Mira cómo el producto amplía una dirección en wedges startup ordenados.',
          href: '/es/ai-startup-idea-generator',
          actionLabel: 'Abrir generador',
        },
        {
          title: 'Validación de idea SaaS',
          description: 'Abre el workflow que pone más presión sobre una sola idea candidata.',
          href: '/es/saas-idea-validation',
          actionLabel: 'Abrir validación',
        },
      ],
      closing: {
        eyebrow: 'Siguiente paso',
        title: 'Este template de ejemplo está listo para contenido público real.',
        description:
          'En el siguiente pase conectaremos briefs de escenario, top opportunities y bloques de prueba pública.',
        primaryAction: {
          label: 'Iniciar análisis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Volver al inicio',
          href: '/es',
          variant: 'outline',
        },
      },
    },
  },
  pt: {
    home: {
      heroVisualEyebrow: 'O que você recebe',
      heroVisualTitle: 'Transforme uma direção em um mapa de oportunidades priorizadas',
      heroVisualLayers: [
        'Direção de produto como entrada',
        'Lógica de score e oportunidades ordenadas',
        'Relatórios públicos antes do login',
      ],
      supportEyebrow: 'Escolha a entrada',
      supportTitle: 'Comece pela página que mais combina com a sua próxima pergunta.',
      supportDescription:
        'A home funciona como um hub de decisão. Entre direto no workflow principal se você já sabe o que quer resolver, ou veja primeiro um relatório público se quiser avaliar a qualidade da saída.',
      supportColumns: [
        {
          title: 'Gerador de ideias de startup com IA',
          description:
            'Parta de um tema de produto, abra várias direções de startup e compare os wedges mais promissores.',
          href: '/pt/ai-startup-idea-generator',
          actionLabel: 'Abrir gerador',
        },
        {
          title: 'Validação de ideia SaaS',
          description:
            'Use uma leitura estruturada para entender se uma direção SaaS merece mais esforço ou deve ser interrompida mais cedo.',
          href: '/pt/saas-idea-validation',
          actionLabel: 'Abrir validação',
        },
        {
          title: 'Análise de oportunidades IA',
          description:
            'Reduza um espaço de mercado mais amplo a uma lista de prioridades mais clara e escolha o melhor wedge seguinte.',
          href: '/pt/ai-business-opportunity-analysis',
          actionLabel: 'Ver análise',
        },
        {
          title: 'Relatório exemplo: freelancers',
          description:
            'Consulte um relatório público sobre workflows de freelancers para entender estrutura, ranking e aderência ao cenário.',
          href: '/pt/examples/ai-tools-for-freelancers',
          actionLabel: 'Ver exemplo freelancer',
        },
        {
          title: 'Relatório exemplo: pequenas empresas',
          description:
            'Consulte um relatório público para pequenas empresas antes de analisar a sua própria direção.',
          href: '/pt/examples/ai-tools-for-small-business',
          actionLabel: 'Ver exemplo PME',
        },
      ],
      detailEyebrow: 'Como funciona',
      detailTitle: 'Explique primeiro o workflow e deixe a decisão para o visitante.',
      detailDescription:
        'A home explica o caminho de uma direção até um conjunto de oportunidades ordenadas, para que o visitante entenda o produto sem ser empurrado imediatamente para a app.',
      workflowSteps: [
        {
          label: 'Passo 01',
          title: 'Chegue com uma direção',
          description: 'Parta de um tema de mercado, um tipo de usuário ou um wedge de produto para explorar.',
        },
        {
          label: 'Passo 02',
          title: 'Revise oportunidades ordenadas',
          description: 'Compare um conjunto avaliado e estruturado em vez de juntar ideias soltas sem prioridade.',
        },
        {
          label: 'Passo 03',
          title: 'Entenda a lógica de score',
          description: 'Veja por que certas direções se destacam mais por causa do score e dos sinais de mercado.',
        },
        {
          label: 'Passo 04',
          title: 'Siga com o wedge mais forte',
          description: 'Avance com a prioridade mais sólida em vez de hesitar entre opções pouco claras.',
        },
      ],
      closing: {
        eyebrow: 'Pronto para começar',
        title: 'Analise sua direção ou comece por um exemplo público.',
        description:
          'BadgerSignal mostra primeiro a estrutura e só depois a fricção. Inicie sua análise ou veja um relatório público para entender o workflow na prática.',
        primaryAction: {
          label: 'Iniciar análise',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Ver relatório de exemplo',
          href: '/pt/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    core: {
      heroVisualEyebrow: 'Foco da landing',
      heroVisualTitle: 'Uma keyword, uma promessa, um próximo passo',
      heroVisualRows: [
        { label: 'Intent fit', value: 'Alto' },
        { label: 'Profundidade do score', value: 'Pronta' },
        { label: 'Prova pública', value: 'Visível' },
      ],
      supportEyebrow: 'Papel do template',
      supportTitle: 'O template core organiza cada página em torno de uma intenção, uma trilha de prova e um CTA.',
      supportDescription:
        'Essa estrutura foi feita para páginas SEO de alta intenção: gerador, validação e análise.',
      diagnosticColumns: [
        {
          title: 'Intenção clara',
          description:
            'O hero é alinhado a uma única intenção de busca para que a página posicione e converta sem prometer coisas demais ao mesmo tempo.',
        },
        {
          title: 'Estrutura de prova',
          description:
            'A segunda seção deixa espaço para lógica de produto, método de score e sinais visíveis de confiança.',
        },
        {
          title: 'Ponte entre entrada e saída',
          description:
            'A área de detalhe já separa o que o usuário traz e o que ele recebe de volta.',
        },
      ],
      intentEyebrow: 'Escolha o workflow certo',
      intentTitle: 'Use a página que combina com a decisão que você precisa tomar agora.',
      intentDescription:
        'As páginas core funcionam melhor quando o visitante entende rápido se este workflow é o certo ou se outra página faz mais sentido antes.',
      intentColumns: [
        {
          title: 'Ideal para',
          description:
            'Visitantes que já conhecem o mercado, o workflow ou a ideia candidata que querem examinar com mais seriedade.',
        },
        {
          title: 'Não ideal para',
          description:
            'Pessoas que só querem brainstorming genérico ou uma resposta final sem contexto suficiente.',
        },
        {
          title: 'Use quando',
          description:
            'Você precisa de uma próxima decisão mais clara que “continuar explorando” e quer ver estrutura antes do login.',
        },
      ],
      detailEyebrow: 'Quadro entrada-saída',
      detailTitle: 'O template já separa entrada e saída para tornar a lógica do produto evidente.',
      detailDescription:
        'Isso nos dá um lugar limpo para encaixar prompts reais, resumos de resultado e score estruturado.',
      inputLabel: 'Faixa de entrada',
      inputExample: [
        'Uma direção de produto focada ou um tema de mercado.',
        'Uma pergunta de startup que precisa de priorização real.',
        'Um wedge estreito que ainda precisa de validação estruturada.',
      ],
      outputLabel: 'Faixa de saída',
      outputExample: [
        '20+ oportunidades avaliadas com hierarquia clara.',
        'Uma leitura mais nítida da direção que merece atenção.',
        'Blocos públicos de prova que podem ser localizados e expandidos.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Perguntas frequentes sobre este workflow',
      faqDescription:
        'Essas respostas serão substituídas por FAQ específicas de cada rota quando cada página estiver concluída.',
      faqItems: [
        {
          question: 'Para que serve esta página?',
          answer:
            'Ela explica um workflow específico, mostra a estrutura da saída e orienta para a próxima ação de produto mais lógica.',
        },
        {
          question: 'Mostra um exemplo visível de entrada e saída?',
          answer:
            'Sim. Cada página core mostra claramente o padrão entrada-saída para que o visitante entenda o workflow antes do login.',
        },
      ],
      relatedEyebrow: 'Continuar explorando',
      relatedTitle: 'Vá para a página seguinte que deixa sua decisão mais clara.',
      relatedDescription:
        'Cada workflow core deve permanecer conectado à homepage, a um workflow vizinho e a pelo menos um exemplo público.',
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Volte ao hub público para comparar todos os pontos de entrada.',
          href: '/pt',
          actionLabel: 'Voltar para a homepage',
        },
        {
          title: 'Validação de ideia SaaS',
          description: 'Pressione mais um wedge promissor quando o campo já estiver mais estreito.',
          href: '/pt/saas-idea-validation',
          actionLabel: 'Abrir validação',
        },
        {
          title: 'Relatório freelancer',
          description: 'Veja como oportunidades ordenadas aparecem em um relatório público.',
          href: '/pt/examples/ai-tools-for-freelancers',
          actionLabel: 'Ver exemplo público',
        },
      ],
      closing: {
        eyebrow: 'Próximo passo',
        title: 'Este template core está pronto para conteúdo guiado por keyword.',
        description:
          'No próximo passe o texto genérico será substituído por mensagem específica por rota, prova e FAQ mais fortes.',
        primaryAction: {
          label: 'Iniciar análise',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Ver relatório de exemplo',
          href: '/pt/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    example: {
      heroVisualEyebrow: 'Estrutura do exemplo',
      heroVisualTitle: 'Um relatório público antes da fricção do login',
      heroVisualSteps: ['Brief do cenário', 'Oportunidades ordenadas', 'Por que este conjunto vence'],
      supportEyebrow: 'Papel do template',
      supportTitle: 'O template de exemplo público mostra a qualidade real da saída antes do login.',
      supportDescription:
        'Essa é a estrutura usada para relatórios públicos que provam a qualidade do produto para visitantes vindos do search.',
      supportSnapshots: [
        {
          label: 'Segmento de mercado',
          value: 'Caso de uso definido',
          description: 'Um bom exemplo público precisa de uma audiência concreta e de um contexto operacional claro.',
        },
        {
          label: 'Dor principal',
          value: 'Atrito operacional',
          description: 'O exemplo deve mostrar qual dor recorrente torna o workflow valioso o suficiente para ser pago.',
        },
        {
          label: 'Melhor próximo passo',
          value: 'Validar o top wedge',
          description: 'A página deve deixar uma próxima ação mais clara, não apenas curiosidade.',
        },
      ],
      opportunityEyebrow: 'Oportunidades ordenadas',
      opportunityTitle: 'Esta área é reservada para os wedges de produto mais fortes.',
      opportunityDescription:
        'Cada bloco de oportunidade mostra score, aderência da audiência, lógica de timing e a próxima validação concreta.',
      opportunityLabels: {
        score: 'Score',
        audience: 'Audiência',
        whyNow: 'Por que agora',
        nextMove: 'Próximo passo',
      },
      opportunityItems: [
        {
          title: 'Bloco top oportunidade',
          score: 'Pronto para score',
          description:
            'O primeiro bloco já está preparado para resumos de oportunidades ordenadas com sinais visíveis de confiança.',
        },
        {
          title: 'Bloco aderência do cenário',
          score: 'Pronto para intenção',
          description:
            'O segundo bloco explica por que o cenário é atraente sem obrigar o visitante a fazer login.',
        },
        {
          title: 'Bloco decisão',
          score: 'Pronto para CTA',
          description:
            'O terceiro bloco é reservado ao raciocínio que transforma interesse em teste do produto.',
        },
      ],
      detailEyebrow: 'Anatomia do exemplo',
      detailTitle: 'O template deixa espaço para método, lógica de score e contexto do cenário.',
      detailDescription:
        'Assim podemos publicar páginas de exemplo substanciais, e não apenas teasers com algumas capturas.',
      diagnosticColumns: [
        {
          title: 'Brief do cenário',
          description: 'Um primeiro parágrafo claro explica o segmento de mercado e o motivo do exemplo.',
        },
        {
          title: 'Saída ordenada',
          description: 'A faixa central é feita para ranking visível, não para texto narrativo vago.',
        },
        {
          title: 'Por que vence',
          description: 'A última zona serve para score, raciocínio e CTA que fazem o visitante avançar.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Perguntas frequentes sobre como ler um relatório público',
      faqDescription:
        'Estas respostas ajudam o visitante a entender o que um relatório público prova, como lê-lo e quando iniciar a própria análise.',
      faqItems: [
        {
          question: 'Para que serve este relatório público?',
          answer:
            'Ele serve para julgar se o output parece concreto, ordenado e acionável o bastante antes de enviar a sua própria direção.',
        },
        {
          question: 'Este exemplo é baseado em um workflow real?',
          answer:
            'Sim. Os exemplos públicos são construídos em torno de uma audiência e de um workflow concretos para mostrar uma saída crível, não uma demo genérica.',
        },
        {
          question: 'O que devo fazer depois de ler este exemplo?',
          answer:
            'Se a lógica de ranking e a qualidade do output parecerem relevantes, inicie a sua própria análise ou compare outro workflow público.',
        },
      ],
      relatedEyebrow: 'Continuar explorando',
      relatedTitle: 'Use o exemplo como ponte para o restante do site público.',
      relatedDescription:
        'Um exemplo público deve voltar para a homepage e para os workflows mais relevantes, não virar uma página sem saída.',
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Volte ao hub principal para comparar as outras entradas públicas.',
          href: '/pt',
          actionLabel: 'Voltar para a homepage',
        },
        {
          title: 'Gerador de ideias de startup com IA',
          description: 'Veja como o produto amplia uma direção em wedges de startup ordenados.',
          href: '/pt/ai-startup-idea-generator',
          actionLabel: 'Abrir gerador',
        },
        {
          title: 'Validação de ideia SaaS',
          description: 'Abra o workflow que pressiona mais uma única ideia candidata.',
          href: '/pt/saas-idea-validation',
          actionLabel: 'Abrir validação',
        },
      ],
      closing: {
        eyebrow: 'Próximo passo',
        title: 'Este template de exemplo está pronto para conteúdo público real.',
        description:
          'No próximo passe vamos conectar briefs de cenário, top opportunities e blocos públicos de prova.',
        primaryAction: {
          label: 'Iniciar análise',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Voltar para a homepage',
          href: '/pt',
          variant: 'outline',
        },
      },
    },
  },
}
