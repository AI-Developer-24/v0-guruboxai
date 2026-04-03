import type {
  CoreLandingTemplateProps,
  HomepageTemplateProps,
} from '@/components/marketing/marketing-page-templates'
import type { SeoLocale } from '@/lib/seo/locales'

type SharedTemplateFields = Pick<
  HomepageTemplateProps,
  'sectionLabel' | 'title' | 'description' | 'primaryAction' | 'secondaryAction' | 'signals'
>

type CoreContentFields = Omit<CoreLandingTemplateProps, keyof SharedTemplateFields | 'locale'>
type CorePageKey =
  | 'ai-startup-idea-generator'
  | 'saas-idea-validation'
  | 'ai-business-opportunity-analysis'

export const EURO_CORE_PAGE_OVERRIDES: Partial<
  Record<SeoLocale, Partial<Record<CorePageKey, Partial<CoreContentFields>>>>
> = {
  de: {
    'ai-startup-idea-generator': {
      heroVisualEyebrow: 'Ideengenerierung',
      heroVisualTitle: 'Eine Richtung hinein, priorisierte Startup-Keile heraus',
      heroVisualRows: [
        { label: 'Ideenbreite', value: '20+' },
        { label: 'Scoring', value: 'Strukturiert' },
        { label: 'Nächster Schritt', value: 'Validierungsbereit' },
      ],
      supportEyebrow: 'Warum diese Seite existiert',
      supportTitle:
        'Ein guter KI-Startup-Ideengenerator sollte Startup-Keile vergleichbar machen und nicht nur zufällige Prompts ausspucken.',
      supportDescription:
        'Diese Seite verbindet Ideengenerierung mit erster Bewertung. Sie startet mit einer Richtung, entfaltet mehrere Startup-Winkel und gibt genug Struktur, um die besten Ideen für den nächsten Schritt zu erkennen.',
      diagnosticColumns: [
        {
          title: 'Mit einer Richtung beginnen',
          description:
            'Bring eine Produktrichtung, ein Markt-Thema oder ein Nutzersegment mit, damit der Generator innerhalb eines sinnvollen Rahmens arbeitet.',
        },
        {
          title: 'Bewertete Startup-Keile sehen',
          description:
            'Statt einer flachen Liste erhältst du 20+ bewertete Chancen mit sichtbaren Prioritätssignalen.',
        },
        {
          title: 'Die stärksten Ideen weitertragen',
          description:
            'Nutze die stärksten Keile als Input für Validierung, engere Scoping-Entscheidungen oder den Vergleich mit öffentlichen Beispielen.',
        },
      ],
      detailEyebrow: 'Input-und-Output-Beispiel',
      detailTitle: 'Der Generator funktioniert am besten mit einer echten Richtung statt mit einem leeren Blatt.',
      detailDescription:
        'Anstatt abstrakt nach Startup-Ideen zu fragen, nutzt dieser Workflow eine konkrete Richtung, um angrenzende Ideen, priorisierte Optionen und bessere Anschlussfragen zu erzeugen.',
      inputLabel: 'Beispiel-Input',
      inputExample: [
        'Ein KI-Tool für Solo-Berater, die Gespräche schneller in Projekt-Follow-ups verwandeln wollen.',
        'Eine Richtung rund um compliance-lastige Workflows für kleine Gesundheitsteams.',
        'Ein Produktkeil für E-Commerce-Operatoren, die Katalog- und Kampagneniteration beschleunigen möchten.',
      ],
      outputLabel: 'Was der Generator zurückgibt',
      outputExample: [
        '20+ bewertete Startup-Chancen, die mit der ursprünglichen Richtung verbunden sind.',
        'Eine klarere Menge von Keilen, die sich nach Dringlichkeit, Zielgruppen-Fit und Produkttiefe vergleichen lassen.',
        'Eine Shortlist, die anschließend in Validierung oder Chancenanalyse übergehen kann.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Fragen vor der Nutzung eines KI-Startup-Ideengenerators',
      faqDescription:
        'Diese Antworten erklären, warum die Seite anders ist als ein generisches Brainstorming-Tool und weshalb bewertete Ideen im Mittelpunkt stehen.',
      faqItems: [
        {
          question: 'Was ist hier anders als bei einem generischen KI-Brainstorming-Prompt?',
          answer:
            'Ein generischer Prompt liefert oft verstreute Ideen. Dieser Workflow hält eine Richtung konstant, entfaltet mehrere Startup-Keile und zeigt eine strukturierte Menge bewerteter Chancen zum Vergleichen.',
        },
        {
          question: 'Brauche ich schon eine vollständig ausgearbeitete Startup-Idee?',
          answer:
            'Nein. Eine starke Ausgangsrichtung reicht. Die Seite ist für Menschen gedacht, die ihren Suchraum kennen, aber daraus klarere Startup-Optionen ableiten wollen.',
        },
        {
          question: 'Validiert diese Seite die Idee schon vollständig?',
          answer:
            'Nicht vollständig. Hier geht es um Ideengenerierung plus erste Bewertung. Für einen härteren Test eines einzelnen Keils ist die SaaS-Ideenvalidierung der nächste Schritt.',
        },
        {
          question: 'Welche Art von Ergebnis sollte ich erwarten?',
          answer:
            'Erwarte 20+ bewertete Chancen, sichtbare Bewertungslogik und ein klareres Gefühl dafür, welche Startup-Keile deine nächste Stunde verdienen.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Zurück zum öffentlichen Hub und den gesamten Einstiegspfad vergleichen.',
          href: '/de',
          actionLabel: 'Zur Homepage',
        },
        {
          title: 'SaaS-Ideenvalidierung',
          description: 'Führe einen vielversprechenden Keil in den Workflow, der eine Kandidatenidee direkter testet.',
          href: '/de/saas-idea-validation',
          actionLabel: 'Validierung öffnen',
        },
        {
          title: 'Freelancer-Beispielbericht',
          description: 'Sieh einen öffentlichen Bericht, der priorisierte Chancen in ein konkretes Marktszenario übersetzt.',
          href: '/de/examples/ai-tools-for-freelancers',
          actionLabel: 'Freelancer-Beispiel ansehen',
        },
      ],
      closing: {
        eyebrow: 'Mit deiner Richtung starten',
        title: 'Erzeuge Startup-Ideen aus einer echten Produktrichtung.',
        description:
          'BadgerSignal ist am stärksten, wenn du ein reales Thema, einen Markt oder ein Nutzerproblem mitbringst. Starte mit deiner Richtung oder prüfe zuerst ein öffentliches Beispiel.',
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
    'saas-idea-validation': {
      heroVisualEyebrow: 'Validierungs-Workflow',
      heroVisualTitle: 'Prüfe eine SaaS-Idee: weiter oder verwerfen',
      heroVisualRows: [
        { label: 'Validierungstiefe', value: 'Fokussiert' },
        { label: 'Trade-off-Sicht', value: 'Sichtbar' },
        { label: 'Ziel der Entscheidung', value: 'Weiter oder stoppen' },
      ],
      supportEyebrow: 'Warum diese Seite existiert',
      supportTitle:
        'SaaS-Ideenvalidierung sollte schwache Richtungen aussortieren helfen und nicht jede Idee gut klingen lassen.',
      supportDescription:
        'Diese Seite ist für Gründer gedacht, die bereits eine Kandidatenidee haben. Statt neue Ideen zu öffnen, setzt der Workflow eine Richtung unter Druck, damit du entscheiden kannst, ob sie Produktzeit, Kundengespräche oder einen harten Stopp verdient.',
      diagnosticColumns: [
        {
          title: 'Eine Kandidatenidee fokussieren',
          description:
            'Bring eine konkrete SaaS-Richtung mit, damit die Seite genau diesen Produktkeil bewertet statt das Suchfeld wieder zu verbreitern.',
        },
        {
          title: 'Risiko und Fit klarer sehen',
          description:
            'Nutze strukturiertes Scoring, um Dringlichkeit, Schmerz, Umsetzungs-Tiefe und die Attraktivität der Marktform besser zu verstehen.',
        },
        {
          title: 'Entscheiden, was als Nächstes passiert',
          description:
            'Das Ziel ist keine endlose Exploration, sondern die Entscheidung: weiter validieren, den Keil schärfen oder stoppen, bevor du zu viel investierst.',
        },
      ],
      detailEyebrow: 'Input-und-Output-Beispiel',
      detailTitle: 'Validierung funktioniert am besten, wenn eine konkrete SaaS-These geprüft werden kann.',
      detailDescription:
        'Dieser Workflow ist das Gegenteil des Generators. Du suchst nicht nach mehr Ideen, sondern prüfst, ob eine Kandidatenrichtung stark genug für tiefere Ausführung ist.',
      inputLabel: 'Beispiel-Input',
      inputExample: [
        'Ein SaaS für unabhängige Recruiter, das Interviewnotizen in Kandidatenzusammenfassungen und nächste Schritte verwandelt.',
        'Ein compliance-orientiertes Produkt für kleine Finanzteams mit langsamem Prüf-Workflow.',
        'Ein KI-Operations-Tool für Agenturen, das Kundenfeedback verlässlicher in Projektänderungen überführt.',
      ],
      outputLabel: 'Was die Validierungsseite zurückgibt',
      outputExample: [
        'Eine strukturierte Einschätzung, ob die Idee tiefere Validierung verdient oder erst geschärft werden sollte.',
        'Klarere Stärken und Schwächen bei Zielgruppen-Schmerz, Produkttiefe und Umsetzungs-Trade-offs.',
        'Eine deutlichere nächste Entscheidung: weitermachen, den Keil verengen oder die Idee depriorisieren.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Fragen vor der Validierung einer SaaS-Idee',
      faqDescription:
        'Diese Antworten klären, wann der Validierungs-Workflow sinnvoll ist und wie er sich vom Generator unterscheidet.',
      faqItems: [
        {
          question: 'Wie unterscheidet sich das vom KI-Startup-Ideengenerator?',
          answer:
            'Der Generator entfaltet aus einer Richtung mehrere Startup-Keile. Diese Seite macht das Gegenteil: Sie fokussiert eine Kandidatenidee und beurteilt, ob sie weitere Mühe verdient.',
        },
        {
          question: 'Brauche ich einen vollständigen Produktplan, bevor ich validiere?',
          answer:
            'Nein. Du brauchst nur eine ausreichend klare SaaS-Richtung. Die Seite hilft dir zu verstehen, ob diese Richtung mehr Kundenarbeit oder Produktscoping verdient.',
        },
        {
          question: 'Sagt mir diese Seite mit Sicherheit, ob die Idee gewinnt?',
          answer:
            'Nein. Aber sie macht Trade-offs früher sichtbar, legt Schwachstellen offen und senkt die Chance, Monate in eine Richtung mit schwachem Signal zu investieren.',
        },
        {
          question: 'Was sollte ich nach dieser Seite tun?',
          answer:
            'Wenn die Idee stark bleibt, gehe in tiefere Kundengespräche oder engere Chancenanalyse. Wenn sie schwach wirkt, schärfe den Keil oder stoppe früher.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Zurück zum Hub, wenn du zuerst die übrigen Workflows vergleichen willst.',
          href: '/de',
          actionLabel: 'Zur Homepage',
        },
        {
          title: 'KI-Geschäftschancenanalyse',
          description: 'Gehe eine Ebene zurück, wenn du noch mehrere Keile in einem größeren Markt vergleichen musst.',
          href: '/de/ai-business-opportunity-analysis',
          actionLabel: 'Analyse ansehen',
        },
        {
          title: 'Freelancer-Beispielbericht',
          description: 'Vergleiche das Ranking mit einem öffentlichen Bericht in einem realen Szenario.',
          href: '/de/examples/ai-tools-for-freelancers',
          actionLabel: 'Freelancer-Beispiel ansehen',
        },
      ],
      closing: {
        eyebrow: 'Deine Kandidatenidee validieren',
        title: 'Nutze Struktur, um zu entscheiden, ob diese SaaS-Idee mehr Aufwand verdient.',
        description:
          'BadgerSignal hilft dir, die unbequeme Entscheidung früher zu treffen: weitermachen, den Keil enger machen oder weggehen. Starte jetzt mit deiner Richtung oder prüfe zuerst ein Beispiel.',
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
    'ai-business-opportunity-analysis': {
      heroVisualEyebrow: 'Chancenanalyse',
      heroVisualTitle: 'Mache aus einer breiten Richtung eine priorisierte Chancenkarte',
      heroVisualRows: [
        { label: 'Marktraum', value: 'Definiert' },
        { label: 'Ranking-Logik', value: 'Signalgestützt' },
        { label: 'Nächster Schritt', value: 'Priorisierbar' },
      ],
      supportEyebrow: 'Warum diese Seite existiert',
      supportTitle:
        'Chancenanalyse dient dazu, einen Raum einzugrenzen und nicht dazu, nur mehr Ideen zu erzeugen oder schon eine exakte These zu validieren.',
      supportDescription:
        'Diese Seite ist nützlich, wenn du das Feld bereits kennst, der Opportunitätsraum aber noch zu breit wirkt. Statt endlos zu brainstormen oder zu früh ein einzelnes Produkt zu validieren, vergleichst du hier die besten Keile innerhalb dieses größeren Marktes.',
      diagnosticColumns: [
        {
          title: 'Den breiteren Chancenraum kartieren',
          description:
            'Starte mit einer größeren Richtung wie Workflow, Markt oder Nutzergruppe, damit die Seite mehrere interessante Opportunity-Lanes darin finden kann.',
        },
        {
          title: 'Vergleichen, welche Keile stärkeres Signal haben',
          description:
            'Nutze strukturiertes Scoring für Dringlichkeit, Monetarisierung, operativen Schmerz und Umsetzungs-Trade-offs.',
        },
        {
          title: 'Den stärksten nächsten Keil wählen',
          description:
            'Das Ziel ist eine klarere Prioritätenordnung statt nur ein Stapel Optionen. Danach kann der stärkste Keil tiefer validiert werden.',
        },
      ],
      detailEyebrow: 'Input-und-Output-Beispiel',
      detailTitle: 'Chancenanalyse funktioniert am besten, wenn der Startpunkt größer ist als eine einzelne Produktidee.',
      detailDescription:
        'Dieser Workflow liegt zwischen Ideengenerierung und Validierung. Du suchst keine abstrakte Inspiration und testest noch nicht eine präzise SaaS-Idee, sondern findest heraus, welcher Keil in einem größeren Raum den nächsten Schritt verdient.',
      inputLabel: 'Beispiel-Input',
      inputExample: [
        'KI-Chancen innerhalb von Customer-Support-Workflows für Mid-Market-Softwareteams.',
        'Eine breitere Richtung rund um compliance-lastige Operations in der Gesundheitsverwaltung.',
        'Potenzielle KI-Produktkeile in E-Commerce-Merchandising und Katalogmanagement.',
      ],
      outputLabel: 'Was die Analyse zurückgibt',
      outputExample: [
        'Eine priorisierte Menge von Opportunity-Keilen innerhalb des gewählten Marktes oder Workflows.',
        'Klarere Begründung, warum bestimmte Chancen bei Schmerz, Geschäftsform und Umsetzung stärker wirken.',
        'Eine Shortlist der vielversprechendsten Keile für Validierung oder tiefere Recherche.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Fragen vor einer KI-Geschäftschancenanalyse',
      faqDescription:
        'Diese Antworten erklären, wann Chancenanalyse sinnvoll ist und wie sie sich von Generator und Validierung unterscheidet.',
      faqItems: [
        {
          question: 'Wie unterscheidet sich das vom KI-Startup-Ideengenerator?',
          answer:
            'Der Generator erweitert eine Richtung in viele Startup-Ideen. Diese Seite analysiert einen größeren Markt oder Workflow, damit du den stärksten Opportunity-Keil innerhalb dieses Raums findest.',
        },
        {
          question: 'Wie unterscheidet sich das von der SaaS-Ideenvalidierung?',
          answer:
            'Validierung testet eine konkrete Idee. Chancenanalyse liegt einen Schritt davor und hilft dir erst zu entscheiden, welcher Keil überhaupt tiefere Validierung verdient.',
        },
        {
          question: 'Brauche ich schon eine konkrete Produktidee?',
          answer:
            'Nein. Tatsächlich ist die Seite am nützlichsten, wenn du eine breite Richtung hast, dich aber noch nicht auf einen einzelnen Produktkeil festgelegt hast.',
        },
        {
          question: 'Was sollte ich nach dieser Seite tun?',
          answer:
            'Nimm den stärksten Keil in Validierung, Kundengespräche oder engeres Produktscoping. Das Ergebnis sollte eine bessere Prioritätenordnung sein und nicht nur mehr Möglichkeiten.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Zurück zum Haupt-Hub, wenn du die öffentlichen Workflows nebeneinander vergleichen möchtest.',
          href: '/de',
          actionLabel: 'Zur Homepage',
        },
        {
          title: 'SaaS-Ideenvalidierung',
          description: 'Nimm den stärksten Keil in einen engeren Entscheidungs-Workflow, sobald du weißt, was du testen willst.',
          href: '/de/saas-idea-validation',
          actionLabel: 'Validierung öffnen',
        },
        {
          title: 'KMU-Beispielbericht',
          description: 'Vergleiche die Analyse mit einem öffentlichen Bericht rund um inhabergeführte Prozesse.',
          href: '/de/examples/ai-tools-for-small-business',
          actionLabel: 'KMU-Beispiel ansehen',
        },
      ],
      closing: {
        eyebrow: 'Deinen Chancenraum analysieren',
        title: 'Finde den stärksten Keil, bevor du alles auf eine Richtung setzt.',
        description:
          'BadgerSignal hilft dir, aus einer breiten Marktidee eine schärfere Prioritätenliste zu machen. Analysiere deinen Raum jetzt oder prüfe zuerst ein öffentliches Beispiel.',
        primaryAction: {
          label: 'Analyse starten',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Beispielbericht ansehen',
          href: '/de/examples/ai-tools-for-small-business',
          variant: 'outline',
        },
      },
    },
  },
  fr: {
    'ai-startup-idea-generator': {
      heroVisualEyebrow: 'Génération d idées',
      heroVisualTitle: 'Une direction en entrée, des wedges startup classés en sortie',
      heroVisualRows: [
        { label: 'Largeur des idées', value: '20+' },
        { label: 'Scoring', value: 'Structuré' },
        { label: 'Étape suivante', value: 'Prête à valider' },
      ],
      supportEyebrow: 'Pourquoi cette page existe',
      supportTitle:
        'Un vrai générateur d idées startup IA doit aider à comparer des wedges startup, pas seulement produire des prompts aléatoires.',
      supportDescription:
        'Cette page associe génération d idées et première évaluation. Elle part d une direction, l élargit en plusieurs angles startup et donne assez de structure pour repérer les idées qui méritent un travail supplémentaire.',
      diagnosticColumns: [
        {
          title: 'Partir d une direction',
          description:
            'Apportez une direction produit, un thème de marché ou un segment utilisateur pour que le générateur reste dans un cadre utile.',
        },
        {
          title: 'Voir des wedges startup évalués',
          description:
            'Au lieu d une liste plate, vous obtenez 20+ opportunités évaluées avec des signaux de priorité visibles.',
        },
        {
          title: 'Faire avancer les meilleures idées',
          description:
            'Utilisez les wedges les plus forts comme entrée pour la validation, le cadrage plus fin ou la comparaison avec des exemples publics.',
        },
      ],
      detailEyebrow: 'Exemple d entrée et de sortie',
      detailTitle: 'Le générateur fonctionne mieux avec une vraie direction qu avec une page blanche.',
      detailDescription:
        'Au lieu de demander des idées startup dans l abstrait, ce workflow utilise une direction concrète pour produire des idées adjacentes, des options classées et de meilleures questions de suivi.',
      inputLabel: 'Exemple d entrée',
      inputExample: [
        'Un outil IA pour consultants indépendants qui perdent trop de temps à transformer des appels en suivis projet.',
        'Une direction autour de workflows à forte contrainte conformité pour de petites équipes santé.',
        'Un wedge produit pour opérateurs e-commerce qui doivent itérer plus vite sur catalogue et campagnes.',
      ],
      outputLabel: 'Ce que renvoie le générateur',
      outputExample: [
        '20+ opportunités startup évaluées liées à la direction initiale.',
        'Un ensemble plus clair de wedges à comparer par urgence, adéquation audience et profondeur produit.',
        'Une short-list d idées à envoyer ensuite vers validation SaaS ou analyse d opportunités.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions posées avant d utiliser un générateur d idées startup IA',
      faqDescription:
        'Ces réponses expliquent pourquoi cette page diffère d un simple outil de brainstorming et pourquoi elle est construite autour d idées évaluées.',
      faqItems: [
        {
          question: 'Qu est-ce qui change par rapport à un prompt de brainstorming IA générique ?',
          answer:
            'Un prompt générique livre souvent des idées dispersées. Ici, on garde une direction fixe, on la déploie en plusieurs wedges startup et on montre un ensemble structuré d opportunités évaluées à comparer.',
        },
        {
          question: 'Faut-il déjà avoir une idée startup très aboutie ?',
          answer:
            'Non. Une direction forte suffit. La page est pensée pour les personnes qui connaissent l espace à explorer mais ont besoin d options startup plus nettes.',
        },
        {
          question: 'Cette page valide-t-elle l idée à ma place ?',
          answer:
            'Pas complètement. Ici, il s agit de génération d idées avec évaluation initiale. Pour mettre une option précise sous pression, l étape suivante est la validation d idée SaaS.',
        },
        {
          question: 'Quel type de sortie puis-je attendre ?',
          answer:
            'Attendez-vous à 20+ opportunités évaluées, une logique de score visible et une lecture plus nette des wedges startup qui méritent votre prochain créneau de travail.',
        },
      ],
      relatedColumns: [
        {
          title: 'Accueil',
          description: 'Revenir au hub public pour comparer le parcours complet avant de vous engager.',
          href: '/fr',
          actionLabel: "Retour à l'accueil",
        },
        {
          title: "Validation d'idée SaaS",
          description: 'Envoyez un wedge prometteur dans le workflow qui met une idée candidate sous plus de pression.',
          href: '/fr/saas-idea-validation',
          actionLabel: 'Ouvrir la validation',
        },
        {
          title: 'Rapport freelance',
          description: 'Voir un rapport public qui transforme des opportunités classées en exemple marché concret.',
          href: '/fr/examples/ai-tools-for-freelancers',
          actionLabel: 'Voir l exemple freelance',
        },
      ],
      closing: {
        eyebrow: 'Tester votre direction',
        title: 'Générez des idées startup à partir d une vraie direction produit.',
        description:
          'BadgerSignal est le plus utile quand vous partez d un vrai thème, marché ou problème utilisateur. Lancez votre direction ou regardez d abord un exemple public.',
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
    'saas-idea-validation': {
      heroVisualEyebrow: 'Workflow de validation',
      heroVisualTitle: 'Testez une idée SaaS: poursuivre ou écarter',
      heroVisualRows: [
        { label: 'Profondeur de validation', value: 'Focalisée' },
        { label: 'Vue des arbitrages', value: 'Visible' },
        { label: 'But de décision', value: 'Continuer ou arrêter' },
      ],
      supportEyebrow: 'Pourquoi cette page existe',
      supportTitle:
        'La validation d idée SaaS doit aider à disqualifier les directions faibles, pas à rendre chaque idée séduisante.',
      supportDescription:
        'Cette page s adresse aux fondateurs qui ont déjà une idée candidate. Au lieu d ouvrir davantage d options, le workflow met une direction sous pression afin de décider si elle mérite du temps produit, de la découverte client ou un arrêt net.',
      diagnosticColumns: [
        {
          title: 'Se concentrer sur une idée candidate',
          description:
            'Apportez une direction SaaS précise pour que la page évalue ce wedge produit en particulier au lieu d élargir encore le champ.',
        },
        {
          title: 'Voir plus clairement le risque et l adéquation',
          description:
            'Utilisez le scoring structuré pour lire l urgence, la douleur audience, la profondeur de mise en œuvre et l attractivité de la forme de marché.',
        },
        {
          title: 'Décider de la suite',
          description:
            'Le but n est pas l exploration sans fin. Le but est de décider s il faut continuer, resserrer le wedge ou arrêter avant de trop investir.',
        },
      ],
      detailEyebrow: 'Exemple d entrée et de sortie',
      detailTitle: 'La validation fonctionne mieux quand la page peut examiner une thèse SaaS concrète.',
      detailDescription:
        'Ce workflow est différent du générateur. Vous ne cherchez plus plus d idées. Vous vérifiez si une direction candidate semble assez forte pour justifier une exécution plus profonde.',
      inputLabel: 'Exemple d entrée',
      inputExample: [
        'Un SaaS pour recruteurs indépendants qui transforme des notes d entretien en résumés candidat et prochaines actions.',
        'Un produit orienté conformité pour petites équipes finance ayant besoin de revues plus rapides.',
        'Un outil d opérations IA pour agences qui veulent convertir les retours clients en changements projet plus fiables.',
      ],
      outputLabel: 'Ce que renvoie la page de validation',
      outputExample: [
        'Une lecture structurée indiquant si l idée mérite une validation plus profonde ou doit être resserrée.',
        'Des forces et faiblesses plus claires sur douleur audience, profondeur produit et arbitrages d exécution.',
        'Une décision plus nette sur la suite : continuer, affiner le wedge ou déprioriser l idée.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions posées avant de valider une idée SaaS',
      faqDescription:
        'Ces réponses précisent quand utiliser ce workflow et comment il diffère du générateur.',
      faqItems: [
        {
          question: 'En quoi est-ce différent de la page générateur d idées startup IA ?',
          answer:
            'Le générateur déploie une direction en plusieurs wedges startup. Ici, on fait l inverse : on se concentre sur une seule idée SaaS candidate et on juge si elle mérite plus d effort.',
        },
        {
          question: 'Dois-je avoir un plan produit complet avant de valider ?',
          answer:
            'Non. Il suffit d avoir une direction SaaS suffisamment claire à évaluer. La page aide à comprendre si cette direction mérite plus de travail client ou de cadrage produit.',
        },
        {
          question: 'Est-ce que cette page dira avec certitude si l idée va gagner ?',
          answer:
            'Non. Mais elle rend les arbitrages plus visibles, révèle plus tôt les points faibles et réduit le risque de passer des mois sur une idée à faible signal.',
        },
        {
          question: 'Que faire après cette page ?',
          answer:
            'Si l idée reste forte, passez à une validation client plus profonde ou à une analyse d opportunités plus étroite. Si elle paraît faible, resserrez le wedge ou abandonnez plus tôt.',
        },
      ],
      relatedColumns: [
        {
          title: 'Accueil',
          description: 'Revenir au hub si vous souhaitez comparer les autres workflows avant.',
          href: '/fr',
          actionLabel: "Retour à l'accueil",
        },
        {
          title: 'Analyse des opportunités IA',
          description: 'Revenez un cran en arrière si vous devez encore comparer plusieurs wedges dans un marché plus large.',
          href: '/fr/ai-business-opportunity-analysis',
          actionLabel: "Voir l'analyse",
        },
        {
          title: 'Rapport freelance',
          description: 'Comparer le ranking avec un exemple public dans un scénario réel.',
          href: '/fr/examples/ai-tools-for-freelancers',
          actionLabel: 'Voir l exemple freelance',
        },
      ],
      closing: {
        eyebrow: 'Valider votre idée candidate',
        title: 'Utilisez une structure claire pour décider si cette idée SaaS mérite plus d effort.',
        description:
          'BadgerSignal vous aide à prendre plus tôt la décision inconfortable : continuer, resserrer le wedge ou s arrêter. Lancez votre direction ou regardez d abord un exemple public.',
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
    'ai-business-opportunity-analysis': {
      heroVisualEyebrow: 'Analyse des opportunités',
      heroVisualTitle: 'Transformez une direction large en carte d opportunités priorisées',
      heroVisualRows: [
        { label: 'Périmètre marché', value: 'Défini' },
        { label: 'Logique de ranking', value: 'Appuyée par signal' },
        { label: 'Suite', value: 'Prête à prioriser' },
      ],
      supportEyebrow: 'Pourquoi cette page existe',
      supportTitle:
        'L analyse d opportunités sert à resserrer un espace, pas simplement à générer plus d idées ni à valider trop tôt une thèse précise.',
      supportDescription:
        'Cette page est utile quand vous connaissez déjà la zone à explorer mais que l espace d opportunité reste trop large. Au lieu de brainstormer sans fin ou de valider un produit unique trop tôt, elle aide à comparer les meilleurs wedges à l intérieur de ce marché plus large.',
      diagnosticColumns: [
        {
          title: 'Cartographier un espace plus large',
          description:
            'Commencez avec une direction plus vaste, comme un workflow, un marché ou un groupe d utilisateurs, pour identifier plusieurs lanes prometteuses à l intérieur.',
        },
        {
          title: 'Comparer les wedges qui ont le meilleur signal',
          description:
            'Utilisez le scoring structuré pour comparer urgence, forme de monétisation, douleur opérationnelle et arbitrages d exécution.',
        },
        {
          title: 'Choisir le wedge suivant le plus fort',
          description:
            'Le but est de quitter la page avec un ordre de priorité plus clair, puis de pousser le wedge le plus fort dans une validation plus serrée.',
        },
      ],
      detailEyebrow: 'Exemple d entrée et de sortie',
      detailTitle: 'L analyse fonctionne le mieux quand le point de départ est plus large qu une seule idée produit.',
      detailDescription:
        'Ce workflow se situe entre génération d idées et validation. Vous ne demandez ni de l inspiration abstraite ni un test immédiat d un concept SaaS précis. Vous cherchez quel wedge dans un espace plus large mérite l étape suivante.',
      inputLabel: 'Exemple d entrée',
      inputExample: [
        'Des opportunités IA dans les workflows support client pour équipes software mid-market.',
        'Une direction plus large autour des opérations à forte conformité dans l administration santé.',
        'Des wedges produit IA possibles dans le merchandising e-commerce et la gestion de catalogue.',
      ],
      outputLabel: 'Ce que renvoie l analyse',
      outputExample: [
        'Un ensemble priorisé de wedges d opportunité dans le marché ou workflow choisi.',
        'Un raisonnement plus clair sur les opportunités les plus fortes en termes de douleur, de forme business et de faisabilité.',
        'Une short-list des wedges les plus prometteurs à envoyer ensuite en validation ou en recherche plus profonde.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions posées avant de lancer une analyse d opportunités IA',
      faqDescription:
        'Ces réponses expliquent quand utiliser l analyse et comment elle diffère du générateur et de la validation.',
      faqItems: [
        {
          question: 'En quoi est-ce différent de la page générateur d idées startup IA ?',
          answer:
            'Le générateur sert à élargir une direction en plusieurs idées startup. Cette page analyse un marché ou un workflow plus large pour décider quel wedge semble le plus fort.',
        },
        {
          question: 'En quoi est-ce différent de la validation d idée SaaS ?',
          answer:
            'La validation met une idée précise sous pression. L analyse d opportunités intervient juste avant pour décider quel wedge mérite cette validation plus profonde.',
        },
        {
          question: 'Faut-il déjà avoir une idée produit précise ?',
          answer:
            'Non. La page est la plus utile lorsque vous avez une direction large mais n avez pas encore choisi un wedge produit précis.',
        },
        {
          question: 'Que faire après cette page ?',
          answer:
            'Prenez le wedge le plus fort dans la validation SaaS, la découverte client ou un cadrage produit plus précis. Le résultat doit être un meilleur ordre de priorité, pas seulement plus de possibilités.',
        },
      ],
      relatedColumns: [
        {
          title: 'Accueil',
          description: 'Retournez au hub principal si vous voulez comparer les workflows publics côte à côte.',
          href: '/fr',
          actionLabel: "Retour à l'accueil",
        },
        {
          title: "Validation d'idée SaaS",
          description: 'Faites passer le wedge le plus fort dans un workflow de décision plus serré une fois le choix fait.',
          href: '/fr/saas-idea-validation',
          actionLabel: 'Ouvrir la validation',
        },
        {
          title: 'Rapport petite entreprise',
          description: 'Comparez l analyse avec un exemple public centré sur des opérations dirigées par le propriétaire.',
          href: '/fr/examples/ai-tools-for-small-business',
          actionLabel: 'Voir l exemple PME',
        },
      ],
      closing: {
        eyebrow: 'Analyser votre espace d opportunité',
        title: 'Trouvez le wedge le plus fort avant de tout miser sur une direction.',
        description:
          'BadgerSignal vous aide à passer d une idée de marché large à une liste de priorités plus nette. Analysez votre espace maintenant ou regardez d abord un exemple public.',
        primaryAction: {
          label: "Lancer l'analyse",
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: "Voir le rapport d'exemple",
          href: '/fr/examples/ai-tools-for-small-business',
          variant: 'outline',
        },
      },
    },
  },
  it: {
    'ai-startup-idea-generator': {
      heroVisualEyebrow: 'Generazione di idee',
      heroVisualTitle: 'Una direzione in ingresso, wedge startup ordinati in uscita',
      heroVisualRows: [
        { label: 'Ampiezza idee', value: '20+' },
        { label: 'Scoring', value: 'Strutturato' },
        { label: 'Prossimo passo', value: 'Pronto per validazione' },
      ],
      supportEyebrow: 'Perché esiste questa pagina',
      supportTitle:
        'Un buon generatore di idee startup AI deve aiutarti a confrontare wedge startup, non a sputare prompt casuali.',
      supportDescription:
        'Questa pagina unisce generazione di idee e prima valutazione. Parte da una direzione, la espande in più angoli startup e ti dà abbastanza struttura per vedere quali idee meritano il prossimo giro di lavoro.',
      diagnosticColumns: [
        {
          title: 'Partire da una direzione',
          description:
            'Porta una direzione di prodotto, un tema di mercato o un segmento utente, così il generatore lavora dentro un frame utile.',
        },
        {
          title: 'Vedere wedge startup valutati',
          description:
            'Invece di una lista piatta ricevi 20+ opportunità valutate con segnali di priorità visibili.',
        },
        {
          title: 'Portare avanti le idee migliori',
          description:
            'Usa i wedge più forti come input per validazione, scoping più stretto o confronto con esempi pubblici.',
        },
      ],
      detailEyebrow: 'Esempio input-output',
      detailTitle: 'Il generatore rende di più quando parti da una direzione reale, non da una pagina vuota.',
      detailDescription:
        'Invece di chiedere idee startup in astratto, questo workflow usa una direzione concreta per produrre idee adiacenti, opzioni ordinate e domande successive più utili.',
      inputLabel: 'Input di esempio',
      inputExample: [
        'Uno strumento AI per consulenti indipendenti che perdono troppo tempo a trasformare call in follow-up di progetto.',
        'Una direzione legata a workflow ad alta compliance per piccoli team sanitari.',
        'Un wedge di prodotto per operatori e-commerce che devono iterare più velocemente su catalogo e campagne.',
      ],
      outputLabel: 'Cosa restituisce il generatore',
      outputExample: [
        '20+ opportunità startup valutate collegate alla direzione iniziale.',
        'Un insieme più chiaro di wedge da confrontare per urgenza, fit con l audience e profondità di prodotto.',
        'Una short-list di idee da portare poi in validazione SaaS o analisi opportunità.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Domande prima di usare un generatore di idee startup AI',
      faqDescription:
        'Queste risposte spiegano perché la pagina è diversa da un normale strumento di brainstorming e perché mette al centro idee valutate.',
      faqItems: [
        {
          question: 'In cosa è diverso da un prompt di brainstorming AI generico?',
          answer:
            'Un prompt generico tende a produrre idee sparse. Qui mantieni fissa una direzione, la espandi in più wedge startup e vedi un set strutturato di opportunità valutate da confrontare.',
        },
        {
          question: 'Devo già avere un idea startup molto completa?',
          answer:
            'No. Basta una buona direzione iniziale. La pagina è pensata per chi conosce lo spazio da esplorare ma ha bisogno di opzioni startup più chiare.',
        },
        {
          question: 'Questa pagina valida già l idea al posto mio?',
          answer:
            'Non completamente. Qui il focus è generazione più prima valutazione. Se vuoi mettere sotto pressione un opzione specifica, il passo successivo è la validazione idea SaaS.',
        },
        {
          question: 'Che tipo di output devo aspettarmi?',
          answer:
            'Aspettati 20+ opportunità valutate, logica di scoring visibile e una lettura più chiara dei wedge startup che meritano il tuo prossimo tempo di lavoro.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Torna all hub pubblico e confronta il percorso completo prima di impegnarti.',
          href: '/it',
          actionLabel: 'Torna alla homepage',
        },
        {
          title: 'Validazione idea SaaS',
          description: 'Porta un wedge promettente nel workflow che testa più direttamente un idea candidata.',
          href: '/it/saas-idea-validation',
          actionLabel: 'Apri la validazione',
        },
        {
          title: 'Report freelance',
          description: 'Guarda un report pubblico che trasforma opportunità ordinate in un esempio di mercato concreto.',
          href: '/it/examples/ai-tools-for-freelancers',
          actionLabel: 'Vedi esempio freelance',
        },
      ],
      closing: {
        eyebrow: 'Prova la tua direzione',
        title: 'Genera idee startup partendo da una vera direzione di prodotto.',
        description:
          'BadgerSignal è più utile quando parti da un tema reale, un mercato o un problema utente. Avvia la tua direzione o guarda prima un esempio pubblico.',
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
    'saas-idea-validation': {
      heroVisualEyebrow: 'Workflow di validazione',
      heroVisualTitle: 'Metti alla prova un idea SaaS: avanti o stop',
      heroVisualRows: [
        { label: 'Profondità validazione', value: 'Focalizzata' },
        { label: 'Vista dei trade-off', value: 'Visibile' },
        { label: 'Obiettivo decisionale', value: 'Continuare o fermarsi' },
      ],
      supportEyebrow: 'Perché esiste questa pagina',
      supportTitle:
        'La validazione di un idea SaaS dovrebbe aiutarti a escludere direzioni deboli, non a far sembrare promettente ogni idea.',
      supportDescription:
        'Questa pagina è pensata per founder che hanno già un idea candidata. Invece di aprire nuove opzioni, il workflow mette una direzione sotto pressione così puoi decidere se merita tempo prodotto, discovery clienti o uno stop netto.',
      diagnosticColumns: [
        {
          title: 'Focalizzati su una sola idea candidata',
          description:
            'Porta una direzione SaaS precisa così la pagina valuta quel wedge prodotto invece di allargare di nuovo il campo.',
        },
        {
          title: 'Vedi meglio rischio e fit',
          description:
            'Usa scoring strutturato per capire urgenza, dolore dell audience, profondità di implementazione e attrattività della forma di mercato.',
        },
        {
          title: 'Decidi cosa succede dopo',
          description:
            'L obiettivo non è un esplorazione infinita. È decidere se continuare, restringere il wedge o fermarsi prima di investire troppo.',
        },
      ],
      detailEyebrow: 'Esempio input-output',
      detailTitle: 'La validazione funziona meglio quando la pagina può esaminare una tesi SaaS concreta.',
      detailDescription:
        'Questo workflow è diverso dal generatore. Non stai più cercando altre idee. Stai verificando se una direzione candidata è abbastanza forte da giustificare un esecuzione più profonda.',
      inputLabel: 'Input di esempio',
      inputExample: [
        'Un SaaS per recruiter indipendenti che trasforma note di colloquio in riassunti candidati e prossime azioni.',
        'Un prodotto orientato alla compliance per piccoli team finance che hanno bisogno di revisioni più rapide.',
        'Uno strumento AI per operations di agenzia che converte feedback cliente in modifiche di progetto più affidabili.',
      ],
      outputLabel: 'Cosa restituisce la pagina di validazione',
      outputExample: [
        'Una lettura strutturata che indica se l idea merita validazione più profonda o va ristretta prima.',
        'Punti di forza e debolezza più chiari su audience pain, profondità di prodotto e trade-off esecutivi.',
        'Una decisione più netta sul passo successivo: continuare, affinare il wedge o de-prioritizzare l idea.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Domande prima di validare un idea SaaS',
      faqDescription:
        'Queste risposte chiariscono quando usare il workflow di validazione e come differisce dal generatore.',
      faqItems: [
        {
          question: 'In cosa è diverso dalla pagina generatore di idee startup AI?',
          answer:
            'Il generatore amplia una direzione in più wedge startup. Questa pagina fa il contrario: si concentra su una sola idea SaaS candidata e giudica se merita ulteriore sforzo.',
        },
        {
          question: 'Devo avere un piano prodotto completo prima di validare?',
          answer:
            'No. Ti serve solo una direzione SaaS abbastanza chiara da valutare. La pagina aiuta a capire se quella direzione merita più lavoro con i clienti o più scoping di prodotto.',
        },
        {
          question: 'Mi dirà con certezza se l idea vincerà?',
          answer:
            'No. Però rende i trade-off più visibili, fa emergere prima i punti deboli e riduce il rischio di spendere mesi su un idea con segnale scarso.',
        },
        {
          question: 'Cosa dovrei fare dopo questa pagina?',
          answer:
            'Se l idea resta forte, passa a validazione clienti più profonda o ad analisi opportunità più stretta. Se appare debole, restringi il wedge o fermati prima.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Torna all hub se vuoi confrontare prima gli altri workflow pubblici.',
          href: '/it',
          actionLabel: 'Torna alla homepage',
        },
        {
          title: 'Analisi opportunità AI',
          description: 'Torna un livello indietro se devi ancora confrontare più wedge in un mercato più ampio.',
          href: '/it/ai-business-opportunity-analysis',
          actionLabel: 'Apri analisi',
        },
        {
          title: 'Report freelance',
          description: 'Confronta il ranking con un report pubblico in uno scenario reale.',
          href: '/it/examples/ai-tools-for-freelancers',
          actionLabel: 'Vedi esempio freelance',
        },
      ],
      closing: {
        eyebrow: 'Valida la tua idea candidata',
        title: 'Usa più struttura per capire se questa idea SaaS merita più lavoro.',
        description:
          'BadgerSignal ti aiuta a prendere prima la decisione scomoda: andare avanti, restringere il wedge o fermarti. Avvia la tua direzione o guarda prima un esempio pubblico.',
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
    'ai-business-opportunity-analysis': {
      heroVisualEyebrow: 'Analisi opportunità',
      heroVisualTitle: 'Trasforma una direzione ampia in una mappa di opportunità prioritarie',
      heroVisualRows: [
        { label: 'Spazio di mercato', value: 'Definito' },
        { label: 'Logica di ranking', value: 'Guidata da segnali' },
        { label: 'Prossimo passo', value: 'Pronto per priorità' },
      ],
      supportEyebrow: 'Perché esiste questa pagina',
      supportTitle:
        'L analisi opportunità serve a restringere uno spazio, non solo a generare più idee o validare troppo presto una tesi precisa.',
      supportDescription:
        'Questa pagina è utile quando conosci già l area da esplorare ma lo spazio delle opportunità è ancora troppo ampio. Invece di fare brainstorming senza fine o validare un singolo prodotto troppo presto, confronti i migliori wedge all interno di quel mercato più grande.',
      diagnosticColumns: [
        {
          title: 'Mappare lo spazio più ampio',
          description:
            'Parti da una direzione più grande, come workflow, mercato o gruppo utente, così la pagina può individuare più lane promettenti al suo interno.',
        },
        {
          title: 'Confrontare quali wedge hanno segnale migliore',
          description:
            'Usa scoring strutturato per confrontare urgenza, forma di monetizzazione, dolore operativo e trade-off di esecuzione.',
        },
        {
          title: 'Scegliere il wedge successivo più forte',
          description:
            'L obiettivo è uscire con un ordine di priorità più chiaro e poi spingere il wedge migliore in una validazione più stretta.',
        },
      ],
      detailEyebrow: 'Esempio input-output',
      detailTitle: 'L analisi opportunità funziona meglio quando il punto di partenza è più grande di una sola idea di prodotto.',
      detailDescription:
        'Questo workflow si colloca tra generazione di idee e validazione. Non stai chiedendo ispirazione astratta e non stai ancora testando un concetto SaaS preciso. Stai capendo quale wedge dentro uno spazio più ampio merita il prossimo passo.',
      inputLabel: 'Input di esempio',
      inputExample: [
        'Opportunità AI nei workflow di customer support per team software mid-market.',
        'Una direzione più ampia intorno a operations ad alta compliance nell amministrazione sanitaria.',
        'Possibili wedge di prodotto AI tra merchandising e gestione catalogo e-commerce.',
      ],
      outputLabel: 'Cosa restituisce l analisi',
      outputExample: [
        'Un insieme prioritizzato di wedge opportunità nel mercato o workflow scelto.',
        'Una spiegazione più chiara di quali opportunità sembrano più forti per audience pain, forma business e fattibilità.',
        'Una short-list dei wedge più promettenti da portare poi in validazione o ricerca più profonda.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Domande prima di eseguire un analisi di opportunità AI',
      faqDescription:
        'Queste risposte spiegano quando usare l analisi e come differisce dal generatore e dalla validazione.',
      faqItems: [
        {
          question: 'In cosa è diversa dalla pagina generatore di idee startup AI?',
          answer:
            'Il generatore serve ad ampliare una direzione in più idee startup. Questa pagina analizza un mercato o workflow più ampio per decidere quale wedge appare più forte.',
        },
        {
          question: 'In cosa è diversa dalla validazione idea SaaS?',
          answer:
            'La validazione mette sotto pressione un idea precisa. L analisi opportunità arriva un passo prima per decidere quale wedge merita quella validazione più profonda.',
        },
        {
          question: 'Devo già avere un idea di prodotto precisa?',
          answer:
            'No. Anzi, la pagina è più utile quando hai una direzione ampia ma non hai ancora scelto un singolo wedge prodotto.',
        },
        {
          question: 'Cosa dovrei fare dopo questa pagina?',
          answer:
            'Porta il wedge più forte in validazione SaaS, discovery clienti o scoping di prodotto più preciso. Il risultato dovrebbe essere un ordine di priorità migliore, non solo più possibilità.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Torna all hub principale se vuoi confrontare i workflow pubblici uno accanto all altro.',
          href: '/it',
          actionLabel: 'Torna alla homepage',
        },
        {
          title: 'Validazione idea SaaS',
          description: 'Porta il wedge più forte in un workflow decisionale più stretto quando sai cosa testare.',
          href: '/it/saas-idea-validation',
          actionLabel: 'Apri la validazione',
        },
        {
          title: 'Report piccole imprese',
          description: 'Confronta l analisi con un report pubblico costruito su operazioni guidate dal titolare.',
          href: '/it/examples/ai-tools-for-small-business',
          actionLabel: 'Vedi esempio PMI',
        },
      ],
      closing: {
        eyebrow: 'Analizza il tuo spazio opportunità',
        title: 'Trova il wedge più forte prima di puntare tutto su una sola direzione.',
        description:
          'BadgerSignal ti aiuta a passare da un idea di mercato ampia a una lista di priorità più nitida. Analizza ora il tuo spazio o guarda prima un esempio pubblico.',
        primaryAction: {
          label: 'Avvia analisi',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Vedi report di esempio',
          href: '/it/examples/ai-tools-for-small-business',
          variant: 'outline',
        },
      },
    },
  },
  es: {
    'ai-startup-idea-generator': {
      heroVisualEyebrow: 'Generación de ideas',
      heroVisualTitle: 'Una dirección entra, salen wedges startup ordenados',
      heroVisualRows: [
        { label: 'Amplitud de ideas', value: '20+' },
        { label: 'Scoring', value: 'Estructurado' },
        { label: 'Siguiente paso', value: 'Listo para validar' },
      ],
      supportEyebrow: 'Por qué existe esta página',
      supportTitle:
        'Un buen generador de ideas de startup con IA debería ayudarte a comparar wedges startup, no solo a lanzar prompts aleatorios.',
      supportDescription:
        'Esta página une generación de ideas y evaluación inicial. Parte de una dirección, la abre en varios ángulos startup y te da suficiente estructura para ver qué ideas merecen la siguiente ronda de trabajo.',
      diagnosticColumns: [
        {
          title: 'Empezar con una dirección',
          description:
            'Trae una dirección de producto, un tema de mercado o un segmento de usuario para que el generador trabaje dentro de un marco útil.',
        },
        {
          title: 'Ver wedges startup evaluados',
          description:
            'En lugar de una lista plana, recibes 20+ oportunidades evaluadas con señales visibles de prioridad.',
        },
        {
          title: 'Llevar adelante las mejores ideas',
          description:
            'Usa los wedges más fuertes como input para validación, scoping más estrecho o comparación con ejemplos públicos.',
        },
      ],
      detailEyebrow: 'Ejemplo de entrada y salida',
      detailTitle: 'El generador funciona mejor cuando empiezas con una dirección real, no con una hoja en blanco.',
      detailDescription:
        'En vez de pedir ideas startup en abstracto, este workflow usa una dirección concreta para producir ideas adyacentes, opciones ordenadas y mejores preguntas de seguimiento.',
      inputLabel: 'Entrada de ejemplo',
      inputExample: [
        'Una herramienta IA para consultores en solitario que pierden demasiado tiempo convirtiendo llamadas en follow-ups de proyecto.',
        'Una dirección alrededor de workflows con mucha compliance para pequeños equipos sanitarios.',
        'Un wedge de producto para operadores de e-commerce que necesitan iterar más rápido catálogo y campañas.',
      ],
      outputLabel: 'Qué devuelve el generador',
      outputExample: [
        '20+ oportunidades startup evaluadas conectadas con la dirección original.',
        'Un conjunto más claro de wedges para comparar por urgencia, fit con la audiencia y profundidad de producto.',
        'Una short-list de ideas para llevar después a validación SaaS o análisis de oportunidades.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Preguntas antes de usar un generador de ideas de startup con IA',
      faqDescription:
        'Estas respuestas explican por qué la página es distinta de una herramienta genérica de brainstorming y por qué se centra en ideas evaluadas.',
      faqItems: [
        {
          question: '¿Qué cambia frente a un prompt genérico de brainstorming con IA?',
          answer:
            'Un prompt genérico suele dar ideas dispersas. Aquí mantienes fija una dirección, la expandes en varios wedges startup y ves un conjunto estructurado de oportunidades evaluadas para comparar.',
        },
        {
          question: '¿Necesito tener ya una idea startup muy formada?',
          answer:
            'No. Basta una buena dirección inicial. La página está pensada para personas que conocen el espacio a explorar pero necesitan opciones startup más claras.',
        },
        {
          question: '¿Esta página valida la idea por mí?',
          answer:
            'No del todo. Aquí el foco es generación más evaluación inicial. Si quieres presionar más una opción concreta, el siguiente paso es la validación de idea SaaS.',
        },
        {
          question: '¿Qué tipo de resultado debería esperar?',
          answer:
            'Espera 20+ oportunidades evaluadas, lógica de scoring visible y una lectura más clara de los wedges startup que merecen tu siguiente bloque de trabajo.',
        },
      ],
      relatedColumns: [
        {
          title: 'Inicio',
          description: 'Vuelve al hub público y compara el recorrido completo antes de comprometerte.',
          href: '/es',
          actionLabel: 'Volver al inicio',
        },
        {
          title: 'Validación de idea SaaS',
          description: 'Lleva un wedge prometedor al workflow que prueba más directamente una idea candidata.',
          href: '/es/saas-idea-validation',
          actionLabel: 'Abrir validación',
        },
        {
          title: 'Reporte freelance',
          description: 'Mira un reporte público que convierte oportunidades ordenadas en un ejemplo de mercado concreto.',
          href: '/es/examples/ai-tools-for-freelancers',
          actionLabel: 'Ver ejemplo freelance',
        },
      ],
      closing: {
        eyebrow: 'Prueba tu dirección',
        title: 'Genera ideas startup a partir de una dirección de producto real.',
        description:
          'BadgerSignal es más útil cuando partes de un tema real, un mercado o un problema de usuario. Inicia tu dirección o mira primero un ejemplo público.',
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
    'saas-idea-validation': {
      heroVisualEyebrow: 'Workflow de validación',
      heroVisualTitle: 'Pon a prueba una idea SaaS: seguir o parar',
      heroVisualRows: [
        { label: 'Profundidad de validación', value: 'Enfocada' },
        { label: 'Vista de trade-offs', value: 'Visible' },
        { label: 'Objetivo de decisión', value: 'Seguir o parar' },
      ],
      supportEyebrow: 'Por qué existe esta página',
      supportTitle:
        'La validación de una idea SaaS debería ayudarte a descartar direcciones débiles, no a hacer que toda idea suene prometedora.',
      supportDescription:
        'Esta página está pensada para founders que ya tienen una idea candidata. En lugar de abrir más opciones, el workflow pone una dirección bajo presión para decidir si merece tiempo de producto, discovery con clientes o un stop claro.',
      diagnosticColumns: [
        {
          title: 'Centrarse en una sola idea candidata',
          description:
            'Trae una dirección SaaS concreta para que la página evalúe ese wedge de producto en particular en lugar de volver a abrir el campo.',
        },
        {
          title: 'Ver mejor riesgo y encaje',
          description:
            'Usa scoring estructurado para entender urgencia, dolor de la audiencia, profundidad de implementación y atractivo de la forma de mercado.',
        },
        {
          title: 'Decidir qué pasa después',
          description:
            'El objetivo no es la exploración infinita. Es decidir si seguir, estrechar el wedge o parar antes de invertir demasiado.',
        },
      ],
      detailEyebrow: 'Ejemplo de entrada y salida',
      detailTitle: 'La validación funciona mejor cuando la página puede inspeccionar una tesis SaaS concreta.',
      detailDescription:
        'Este workflow es diferente del generador. Ya no buscas más ideas. Estás comprobando si una dirección candidata parece lo bastante fuerte como para justificar ejecución más profunda.',
      inputLabel: 'Entrada de ejemplo',
      inputExample: [
        'Un SaaS para recruiters independientes que convierte notas de entrevistas en resúmenes de candidatos y siguientes acciones.',
        'Un producto orientado a compliance para pequeños equipos financieros que necesitan revisiones más rápidas.',
        'Una herramienta IA para operaciones de agencias que convierte feedback de clientes en cambios de proyecto más fiables.',
      ],
      outputLabel: 'Qué devuelve la página de validación',
      outputExample: [
        'Una lectura estructurada sobre si la idea merece validación más profunda o debe estrecharse antes.',
        'Fortalezas y debilidades más claras en dolor de audiencia, profundidad de producto y trade-offs de ejecución.',
        'Una decisión más nítida sobre el siguiente paso: continuar, afinar el wedge o depriorizar la idea.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Preguntas antes de validar una idea SaaS',
      faqDescription:
        'Estas respuestas aclaran cuándo usar el workflow de validación y cómo se diferencia del generador.',
      faqItems: [
        {
          question: '¿En qué se diferencia de la página del generador de ideas startup con IA?',
          answer:
            'El generador expande una dirección en varios wedges startup. Esta página hace lo contrario: se centra en una sola idea SaaS candidata y juzga si merece más esfuerzo.',
        },
        {
          question: '¿Necesito un plan de producto completo antes de validar?',
          answer:
            'No. Solo necesitas una dirección SaaS suficientemente clara para evaluar. La página ayuda a entender si esa dirección merece más trabajo con clientes o más scoping de producto.',
        },
        {
          question: '¿Esta página me dirá con certeza si la idea va a ganar?',
          answer:
            'No. Pero hace los trade-offs más visibles, expone puntos débiles antes y reduce la probabilidad de pasar meses en una idea con señal pobre.',
        },
        {
          question: '¿Qué debería hacer después de esta página?',
          answer:
            'Si la idea sigue fuerte, pasa a validación con clientes más profunda o a una análisis de oportunidades más estrecha. Si parece débil, afina el wedge o detente antes.',
        },
      ],
      relatedColumns: [
        {
          title: 'Inicio',
          description: 'Vuelve al hub si quieres comparar antes los demás workflows públicos.',
          href: '/es',
          actionLabel: 'Volver al inicio',
        },
        {
          title: 'Análisis de oportunidades IA',
          description: 'Retrocede un nivel si todavía necesitas comparar varios wedges dentro de un mercado más amplio.',
          href: '/es/ai-business-opportunity-analysis',
          actionLabel: 'Ver análisis',
        },
        {
          title: 'Reporte freelance',
          description: 'Compara el ranking con un reporte público dentro de un escenario real.',
          href: '/es/examples/ai-tools-for-freelancers',
          actionLabel: 'Ver ejemplo freelance',
        },
      ],
      closing: {
        eyebrow: 'Valida tu idea candidata',
        title: 'Usa más estructura para decidir si esta idea SaaS merece más esfuerzo.',
        description:
          'BadgerSignal te ayuda a tomar antes la decisión incómoda: seguir, estrechar el wedge o parar. Inicia tu dirección o mira primero un ejemplo público.',
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
    'ai-business-opportunity-analysis': {
      heroVisualEyebrow: 'Análisis de oportunidades',
      heroVisualTitle: 'Convierte una dirección amplia en un mapa de oportunidades priorizadas',
      heroVisualRows: [
        { label: 'Espacio de mercado', value: 'Definido' },
        { label: 'Lógica de ranking', value: 'Respaldada por señal' },
        { label: 'Siguiente paso', value: 'Listo para priorizar' },
      ],
      supportEyebrow: 'Por qué existe esta página',
      supportTitle:
        'El análisis de oportunidades sirve para estrechar un espacio, no solo para generar más ideas ni para validar demasiado pronto una tesis exacta.',
      supportDescription:
        'Esta página es útil cuando ya conoces el área a explorar pero el espacio de oportunidad sigue siendo demasiado amplio. En lugar de hacer brainstorming sin fin o validar un único producto demasiado pronto, aquí comparas los mejores wedges dentro de ese mercado mayor.',
      diagnosticColumns: [
        {
          title: 'Mapear el espacio más amplio',
          description:
            'Empieza con una dirección mayor, como un workflow, un mercado o un grupo de usuarios, para que la página identifique varias lanes prometedoras en su interior.',
        },
        {
          title: 'Comparar qué wedges tienen mejor señal',
          description:
            'Usa scoring estructurado para comparar urgencia, forma de monetización, dolor operativo y trade-offs de ejecución.',
        },
        {
          title: 'Elegir el siguiente wedge más fuerte',
          description:
            'El objetivo es salir con un orden de prioridad más claro y después empujar el wedge más fuerte hacia una validación más estrecha.',
        },
      ],
      detailEyebrow: 'Ejemplo de entrada y salida',
      detailTitle: 'El análisis funciona mejor cuando el punto de partida es mayor que una sola idea de producto.',
      detailDescription:
        'Este workflow se sitúa entre generación de ideas y validación. No estás pidiendo inspiración abstracta y todavía no estás poniendo a prueba un concepto SaaS exacto. Estás averiguando qué wedge dentro de un espacio más amplio merece el siguiente paso.',
      inputLabel: 'Entrada de ejemplo',
      inputExample: [
        'Oportunidades IA dentro de workflows de soporte al cliente para equipos software mid-market.',
        'Una dirección más amplia alrededor de operaciones con mucha compliance en administración sanitaria.',
        'Posibles wedges de producto IA entre merchandising de e-commerce y gestión de catálogo.',
      ],
      outputLabel: 'Qué devuelve el análisis',
      outputExample: [
        'Un conjunto priorizado de wedges de oportunidad dentro del mercado o workflow elegido.',
        'Una explicación más clara de qué oportunidades parecen más fuertes por dolor de audiencia, forma de negocio y viabilidad.',
        'Una short-list de los wedges más prometedores para llevar después a validación o investigación más profunda.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Preguntas antes de ejecutar un análisis de oportunidades IA',
      faqDescription:
        'Estas respuestas explican cuándo usar el análisis y cómo se diferencia del generador y de la validación.',
      faqItems: [
        {
          question: '¿En qué se diferencia de la página del generador de ideas startup con IA?',
          answer:
            'El generador sirve para ampliar una dirección en varias ideas startup. Esta página analiza un mercado o workflow más amplio para decidir qué wedge parece más fuerte.',
        },
        {
          question: '¿En qué se diferencia de la validación de idea SaaS?',
          answer:
            'La validación pone bajo presión una idea concreta. El análisis de oportunidades llega un paso antes para decidir qué wedge merece esa validación más profunda.',
        },
        {
          question: '¿Necesito ya una idea de producto precisa?',
          answer:
            'No. De hecho, la página es más útil cuando tienes una dirección amplia pero todavía no has elegido un wedge de producto concreto.',
        },
        {
          question: '¿Qué debería hacer después de esta página?',
          answer:
            'Lleva el wedge más fuerte a validación SaaS, discovery con clientes o un scoping de producto más preciso. El resultado debería ser un mejor orden de prioridad, no solo más posibilidades.',
        },
      ],
      relatedColumns: [
        {
          title: 'Inicio',
          description: 'Vuelve al hub principal si quieres comparar los workflows públicos uno al lado del otro.',
          href: '/es',
          actionLabel: 'Volver al inicio',
        },
        {
          title: 'Validación de idea SaaS',
          description: 'Lleva el wedge más fuerte a un workflow de decisión más estrecho cuando ya sepas qué probar.',
          href: '/es/saas-idea-validation',
          actionLabel: 'Abrir validación',
        },
        {
          title: 'Reporte de pequeñas empresas',
          description: 'Compara el análisis con un reporte público construido alrededor de operaciones lideradas por el dueño.',
          href: '/es/examples/ai-tools-for-small-business',
          actionLabel: 'Ver ejemplo pyme',
        },
      ],
      closing: {
        eyebrow: 'Analiza tu espacio de oportunidad',
        title: 'Encuentra el wedge más fuerte antes de apostar todo por una sola dirección.',
        description:
          'BadgerSignal te ayuda a pasar de una idea de mercado amplia a una lista de prioridades más clara. Analiza ahora tu espacio o mira primero un ejemplo público.',
        primaryAction: {
          label: 'Iniciar análisis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Ver reporte de ejemplo',
          href: '/es/examples/ai-tools-for-small-business',
          variant: 'outline',
        },
      },
    },
  },
  pt: {
    'ai-startup-idea-generator': {
      heroVisualEyebrow: 'Geração de ideias',
      heroVisualTitle: 'Uma direção entra, wedges startup ordenados saem',
      heroVisualRows: [
        { label: 'Amplitude de ideias', value: '20+' },
        { label: 'Score', value: 'Estruturado' },
        { label: 'Próximo passo', value: 'Pronto para validar' },
      ],
      supportEyebrow: 'Por que esta página existe',
      supportTitle:
        'Um bom gerador de ideias de startup com IA deve ajudar você a comparar wedges startup, não apenas despejar prompts aleatórios.',
      supportDescription:
        'Esta página combina geração de ideias e avaliação inicial. Ela parte de uma direção, abre vários ângulos de startup e dá estrutura suficiente para enxergar quais ideias merecem a próxima rodada de trabalho.',
      diagnosticColumns: [
        {
          title: 'Começar com uma direção',
          description:
            'Traga uma direção de produto, um tema de mercado ou um segmento de usuário para que o gerador trabalhe dentro de um enquadramento útil.',
        },
        {
          title: 'Ver wedges startup avaliados',
          description:
            'Em vez de uma lista plana, você recebe 20+ oportunidades avaliadas com sinais visíveis de prioridade.',
        },
        {
          title: 'Levar adiante as melhores ideias',
          description:
            'Use os wedges mais fortes como entrada para validação, scoping mais estreito ou comparação com exemplos públicos.',
        },
      ],
      detailEyebrow: 'Exemplo de entrada e saída',
      detailTitle: 'O gerador funciona melhor quando você começa com uma direção real, não com uma página em branco.',
      detailDescription:
        'Em vez de pedir ideias de startup no abstrato, este workflow usa uma direção concreta para produzir ideias adjacentes, opções ordenadas e perguntas de sequência mais úteis.',
      inputLabel: 'Entrada de exemplo',
      inputExample: [
        'Uma ferramenta de IA para consultores solo que perdem tempo demais transformando calls em follow-ups de projeto.',
        'Uma direção ligada a workflows com muita compliance para pequenos times de saúde.',
        'Um wedge de produto para operadores de e-commerce que precisam iterar mais rápido catálogo e campanhas.',
      ],
      outputLabel: 'O que o gerador devolve',
      outputExample: [
        '20+ oportunidades de startup avaliadas conectadas à direção original.',
        'Um conjunto mais claro de wedges para comparar por urgência, aderência da audiência e profundidade de produto.',
        'Uma short-list de ideias para seguir depois para validação SaaS ou análise de oportunidades.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Perguntas antes de usar um gerador de ideias de startup com IA',
      faqDescription:
        'Estas respostas explicam por que a página é diferente de uma ferramenta genérica de brainstorming e por que ela é construída em torno de ideias avaliadas.',
      faqItems: [
        {
          question: 'O que muda em relação a um prompt genérico de brainstorming com IA?',
          answer:
            'Um prompt genérico costuma gerar ideias dispersas. Aqui você mantém uma direção fixa, expande em vários wedges startup e vê um conjunto estruturado de oportunidades avaliadas para comparar.',
        },
        {
          question: 'Eu preciso ter uma ideia de startup totalmente formada?',
          answer:
            'Não. Uma boa direção inicial já basta. A página foi pensada para quem conhece o espaço a explorar, mas precisa transformar isso em opções startup mais claras.',
        },
        {
          question: 'Esta página valida a ideia por mim?',
          answer:
            'Não completamente. Aqui o foco é geração mais avaliação inicial. Se você quiser pressionar mais uma opção específica, o próximo passo é a validação de ideia SaaS.',
        },
        {
          question: 'Que tipo de resultado devo esperar?',
          answer:
            'Espere 20+ oportunidades avaliadas, lógica de score visível e uma leitura mais clara dos wedges startup que merecem o seu próximo bloco de trabalho.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Volte ao hub público e compare toda a jornada antes de se comprometer.',
          href: '/pt',
          actionLabel: 'Voltar para a homepage',
        },
        {
          title: 'Validação de ideia SaaS',
          description: 'Leve um wedge promissor para o workflow que testa uma ideia candidata de forma mais direta.',
          href: '/pt/saas-idea-validation',
          actionLabel: 'Abrir validação',
        },
        {
          title: 'Relatório freelancer',
          description: 'Veja um relatório público que transforma oportunidades ordenadas em um exemplo de mercado concreto.',
          href: '/pt/examples/ai-tools-for-freelancers',
          actionLabel: 'Ver exemplo freelancer',
        },
      ],
      closing: {
        eyebrow: 'Teste sua direção',
        title: 'Gere ideias de startup a partir de uma direção real de produto.',
        description:
          'BadgerSignal é mais útil quando você parte de um tema real, mercado ou problema de usuário. Inicie sua direção ou veja primeiro um exemplo público.',
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
    'saas-idea-validation': {
      heroVisualEyebrow: 'Workflow de validação',
      heroVisualTitle: 'Teste uma ideia SaaS: seguir ou parar',
      heroVisualRows: [
        { label: 'Profundidade da validação', value: 'Focada' },
        { label: 'Visão dos trade-offs', value: 'Visível' },
        { label: 'Objetivo da decisão', value: 'Seguir ou parar' },
      ],
      supportEyebrow: 'Por que esta página existe',
      supportTitle:
        'A validação de uma ideia SaaS deve ajudar você a eliminar direções fracas, não a fazer toda ideia parecer promissora.',
      supportDescription:
        'Esta página foi feita para founders que já têm uma ideia candidata. Em vez de abrir mais opções, o workflow coloca uma direção sob pressão para decidir se ela merece tempo de produto, descoberta com clientes ou uma parada clara.',
      diagnosticColumns: [
        {
          title: 'Foque em uma única ideia candidata',
          description:
            'Traga uma direção SaaS específica para que a página avalie esse wedge de produto em vez de abrir o campo de novo.',
        },
        {
          title: 'Veja melhor risco e aderência',
          description:
            'Use score estruturado para entender urgência, dor da audiência, profundidade de implementação e atratividade da forma de mercado.',
        },
        {
          title: 'Decida o que acontece depois',
          description:
            'O objetivo não é exploração infinita. É decidir se vale continuar, estreitar o wedge ou parar antes de investir demais.',
        },
      ],
      detailEyebrow: 'Exemplo de entrada e saída',
      detailTitle: 'A validação funciona melhor quando a página pode inspecionar uma tese SaaS concreta.',
      detailDescription:
        'Este workflow é diferente do gerador. Você não está mais buscando mais ideias. Está verificando se uma direção candidata parece forte o suficiente para justificar execução mais profunda.',
      inputLabel: 'Entrada de exemplo',
      inputExample: [
        'Um SaaS para recrutadores independentes que transforma notas de entrevista em resumos de candidatos e próximas ações.',
        'Um produto orientado a compliance para pequenos times financeiros que precisam de revisões mais rápidas.',
        'Uma ferramenta de IA para operações de agências que transforma feedback de clientes em mudanças de projeto mais confiáveis.',
      ],
      outputLabel: 'O que a página de validação devolve',
      outputExample: [
        'Uma leitura estruturada de se a ideia merece validação mais profunda ou deve ser estreitada primeiro.',
        'Pontos fortes e fracos mais claros em dor da audiência, profundidade de produto e trade-offs de execução.',
        'Uma decisão mais nítida sobre o próximo passo: continuar, refinar o wedge ou despriorizar a ideia.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Perguntas antes de validar uma ideia SaaS',
      faqDescription:
        'Estas respostas esclarecem quando usar o workflow de validação e como ele difere do gerador.',
      faqItems: [
        {
          question: 'Em que isso difere da página do gerador de ideias de startup com IA?',
          answer:
            'O gerador amplia uma direção em vários wedges startup. Esta página faz o oposto: concentra-se em uma única ideia SaaS candidata e julga se ela merece mais esforço.',
        },
        {
          question: 'Preciso de um plano de produto completo antes de validar?',
          answer:
            'Não. Você só precisa de uma direção SaaS clara o suficiente para avaliar. A página ajuda a entender se essa direção merece mais trabalho com clientes ou mais scoping de produto.',
        },
        {
          question: 'Esta página vai me dizer com certeza se a ideia vai vencer?',
          answer:
            'Não. Mas ela torna os trade-offs mais visíveis, expõe pontos fracos mais cedo e reduz a chance de gastar meses em uma ideia com sinal fraco.',
        },
        {
          question: 'O que devo fazer depois desta página?',
          answer:
            'Se a ideia continuar forte, siga para validação com clientes mais profunda ou para análise de oportunidades mais estreita. Se parecer fraca, refine o wedge ou pare mais cedo.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Volte ao hub se quiser comparar antes os outros workflows públicos.',
          href: '/pt',
          actionLabel: 'Voltar para a homepage',
        },
        {
          title: 'Análise de oportunidades IA',
          description: 'Volte um nível se ainda precisar comparar vários wedges dentro de um mercado mais amplo.',
          href: '/pt/ai-business-opportunity-analysis',
          actionLabel: 'Ver análise',
        },
        {
          title: 'Relatório freelancer',
          description: 'Compare o ranking com um relatório público em um cenário real.',
          href: '/pt/examples/ai-tools-for-freelancers',
          actionLabel: 'Ver exemplo freelancer',
        },
      ],
      closing: {
        eyebrow: 'Valide sua ideia candidata',
        title: 'Use mais estrutura para decidir se esta ideia SaaS merece mais esforço.',
        description:
          'BadgerSignal ajuda você a tomar antes a decisão desconfortável: seguir, estreitar o wedge ou parar. Inicie sua direção ou veja primeiro um exemplo público.',
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
    'ai-business-opportunity-analysis': {
      heroVisualEyebrow: 'Análise de oportunidades',
      heroVisualTitle: 'Transforme uma direção ampla em um mapa de oportunidades priorizadas',
      heroVisualRows: [
        { label: 'Espaço de mercado', value: 'Definido' },
        { label: 'Lógica de ranking', value: 'Guiada por sinal' },
        { label: 'Próximo passo', value: 'Pronto para priorizar' },
      ],
      supportEyebrow: 'Por que esta página existe',
      supportTitle:
        'A análise de oportunidades serve para estreitar um espaço, não apenas para gerar mais ideias nem para validar cedo demais uma tese exata.',
      supportDescription:
        'Esta página é útil quando você já conhece a área a explorar, mas o espaço de oportunidade ainda parece amplo demais. Em vez de brainstorm infinito ou validação precoce de um único produto, aqui você compara os melhores wedges dentro desse mercado maior.',
      diagnosticColumns: [
        {
          title: 'Mapear o espaço mais amplo',
          description:
            'Comece por uma direção maior, como workflow, mercado ou grupo de usuários, para que a página identifique várias lanes promissoras dentro dela.',
        },
        {
          title: 'Comparar quais wedges têm sinal melhor',
          description:
            'Use score estruturado para comparar urgência, forma de monetização, dor operacional e trade-offs de execução.',
        },
        {
          title: 'Escolher o wedge seguinte mais forte',
          description:
            'O objetivo é sair com uma ordem de prioridade mais clara e depois empurrar o wedge mais forte para uma validação mais estreita.',
        },
      ],
      detailEyebrow: 'Exemplo de entrada e saída',
      detailTitle: 'A análise funciona melhor quando o ponto de partida é maior do que uma única ideia de produto.',
      detailDescription:
        'Este workflow fica entre geração de ideias e validação. Você não está pedindo inspiração abstrata nem testando imediatamente um conceito SaaS exato. Está descobrindo qual wedge, dentro de um espaço maior, merece o próximo passo.',
      inputLabel: 'Entrada de exemplo',
      inputExample: [
        'Oportunidades de IA em workflows de suporte ao cliente para equipes de software mid-market.',
        'Uma direção mais ampla em torno de operações com muita compliance na administração de saúde.',
        'Possíveis wedges de produto com IA entre merchandising de e-commerce e gestão de catálogo.',
      ],
      outputLabel: 'O que a análise devolve',
      outputExample: [
        'Um conjunto priorizado de wedges de oportunidade dentro do mercado ou workflow escolhido.',
        'Uma explicação mais clara de quais oportunidades parecem mais fortes em dor da audiência, forma de negócio e viabilidade.',
        'Uma short-list dos wedges mais promissores para levar depois à validação ou pesquisa mais profunda.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Perguntas antes de executar uma análise de oportunidades IA',
      faqDescription:
        'Estas respostas explicam quando usar a análise e como ela difere do gerador e da validação.',
      faqItems: [
        {
          question: 'Em que isso difere da página do gerador de ideias de startup com IA?',
          answer:
            'O gerador serve para ampliar uma direção em várias ideias startup. Esta página analisa um mercado ou workflow mais amplo para decidir qual wedge parece mais forte.',
        },
        {
          question: 'Em que isso difere da validação de ideia SaaS?',
          answer:
            'A validação coloca uma ideia específica sob pressão. A análise de oportunidades vem um passo antes para decidir qual wedge merece essa validação mais profunda.',
        },
        {
          question: 'Eu já preciso ter uma ideia de produto precisa?',
          answer:
            'Não. Na verdade, a página é mais útil quando você tem uma direção ampla, mas ainda não escolheu um wedge de produto específico.',
        },
        {
          question: 'O que devo fazer depois desta página?',
          answer:
            'Leve o wedge mais forte para validação SaaS, descoberta com clientes ou scoping de produto mais preciso. O resultado deve ser uma ordem de prioridade melhor, não apenas mais possibilidades.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Volte ao hub principal se quiser comparar os workflows públicos lado a lado.',
          href: '/pt',
          actionLabel: 'Voltar para a homepage',
        },
        {
          title: 'Validação de ideia SaaS',
          description: 'Leve o wedge mais forte para um workflow de decisão mais estreito quando já souber o que testar.',
          href: '/pt/saas-idea-validation',
          actionLabel: 'Abrir validação',
        },
        {
          title: 'Relatório pequenas empresas',
          description: 'Compare a análise com um relatório público construído em torno de operações lideradas pelo dono.',
          href: '/pt/examples/ai-tools-for-small-business',
          actionLabel: 'Ver exemplo PME',
        },
      ],
      closing: {
        eyebrow: 'Analise seu espaço de oportunidade',
        title: 'Encontre o wedge mais forte antes de apostar tudo em uma única direção.',
        description:
          'BadgerSignal ajuda você a sair de uma ideia ampla de mercado para uma lista de prioridades mais clara. Analise agora o seu espaço ou veja primeiro um exemplo público.',
        primaryAction: {
          label: 'Iniciar análise',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Ver relatório de exemplo',
          href: '/pt/examples/ai-tools-for-small-business',
          variant: 'outline',
        },
      },
    },
  },
}
