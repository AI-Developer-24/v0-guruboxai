import type {
  HomepageTemplateProps,
  PublicExampleTemplateProps,
} from '@/components/marketing/marketing-page-templates'
import type { SeoLocale } from '@/lib/seo/locales'

type SharedTemplateFields = Pick<
  HomepageTemplateProps,
  'sectionLabel' | 'title' | 'description' | 'primaryAction' | 'secondaryAction' | 'signals'
>

type ExamplePageOverride = Partial<Omit<PublicExampleTemplateProps, 'locale'>>
type ExamplePageKey =
  | 'examples-ai-tools-for-freelancers'
  | 'examples-ai-tools-for-small-business'

export const EURO_EXAMPLE_PAGE_OVERRIDES: Partial<
  Record<SeoLocale, Partial<Record<ExamplePageKey, ExamplePageOverride>>>
> = {
  de: {
    'examples-ai-tools-for-freelancers': {
      primaryAction: {
        label: 'Eigene Analyse starten',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Zur Homepage',
        href: '/de',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Öffentlicher Beispielbericht',
      heroVisualTitle: 'Freelancer-Workflows, priorisiert nach praktischem Produktsignal',
      heroVisualSteps: ['Freelancer-Kontext', 'Top-Chancenkeile', 'Empfohlene nächste Validierung'],
      supportEyebrow: 'Szenario-Überblick',
      supportTitle: 'KI-Tools für Freelancer: ein öffentlicher Bericht rund um administrative Kundenarbeit.',
      supportDescription:
        'Dieser Beispielbericht zeigt, wo Freelancer zwischen Kundengesprächen und abrechenbarer Leistung am meisten Zeit verlieren. Es geht nicht um generische KI-Tools, sondern um Produktkeile, die wiederkehrenden, bezahlbaren Workflow-Schmerz lösen.',
      supportSnapshots: [
        {
          label: 'Marktsegment',
          value: 'Solo-Berater und Freelancer-Operatoren',
          description:
            'Menschen, die Gespräche, Scoping, Follow-up und Lieferung ohne internes Operations-Team koordinieren.',
        },
        {
          label: 'Kernschmerz',
          value: 'Admin-Arbeit frisst abrechenbare Zeit',
          description:
            'Die stärksten Chancen liegen dort, wo Calls, Notizen und Revisionen immer wieder in Follow-up-Aktionen übersetzt werden müssen.',
        },
        {
          label: 'Bester erster Keil',
          value: 'Post-Call-Briefing-zu-Aktionsplan-Assistent',
          description:
            'Das Beispiel deutet darauf hin, dass die Umwandlung chaotischen Kundenkontexts in klare nächste Schritte der stärkste Startkeil ist.',
        },
      ],
      opportunityEyebrow: 'Priorisierte Chancen',
      opportunityTitle: 'Der stärkste erste Keil ist operative Aufräumarbeit nach dem Gespräch, nicht generische KI-Unterstützung.',
      opportunityDescription:
        'Dieses Ranking priorisiert wiederkehrenden Schmerz, leicht erklärbaren ROI und die Geschwindigkeit, mit der Freelancer echten Zeitgewinn spüren können.',
      opportunityItems: [
        {
          rank: 'Rang 01',
          title: 'Kunden-Debriefing-zu-Aktionsplan-Assistent',
          score: '8.9/10',
          description:
            'Verwandle rohe Call-Notizen, Sprachtranskripte und lose To-dos in ein strukturiertes Debriefing mit nächsten Schritten, Deadlines und Follow-up-Nachrichten.',
          audience: 'Unabhängige Berater, Strategen und Operatoren mit mehreren aktiven Kunden.',
          whyNow:
            'LLMs sind inzwischen stark genug, um aus chaotischen Gesprächen Aktionen zu extrahieren, wodurch der Zeitgewinn sofort sichtbar wird.',
          nextMove:
            'Validiere, ob Freelancer KI-generierten Follow-up-Entwürfen vertrauen würden, wenn jede Aktion auf Quellnotizen zurückverweist.',
          highlights: [
            'Klare Umsatzverbindung, weil abrechenbare Stunden geschützt werden.',
            'Wiederkehrender Wochen-Workflow statt einmaliger Spielerei.',
            'Guter Erweiterungspfad in Angebotserstellung und Projektübergabe.',
          ],
        },
        {
          rank: 'Rang 02',
          title: 'Angebots- und Scope-Risiko-Prüfer',
          score: '8.3/10',
          description:
            'Prüfe Angebotsentwürfe, Scope-Formulierungen und Kundenwünsche, um Unter-Scoping, unklare Deliverables und spätere Revisionsfallen früh zu markieren.',
          audience: 'Freelancer mit individuellen Angeboten, Retainern oder stark schwankenden Projektumfängen.',
          whyNow:
            'Ein großer Teil des Schmerzes entsteht noch vor Projektstart, besonders wenn schlechtes Scoping Wochen unbezahlter Revisionen erzeugt.',
          nextMove:
            'Teste, ob eine Vorab-Scope-Prüfung wertvoller wirkt als ein weiterer generischer Angebots-Schreiber.',
          highlights: [
            'Reduziert direkt die versteckten Kosten schlecht passender Projekte.',
            'Schärfere Positionierung als allgemeine Schreibassistenz.',
            'Besonders stark in Nischen mit häufiger Projekt-Unschärfe.',
          ],
        },
        {
          rank: 'Rang 03',
          title: 'Übergabe- und Revisions-Copilot',
          score: '7.8/10',
          description:
            'Paketiert Deliverables, erklärt Entscheidungen, macht offene Fragen sichtbar und strukturiert Revisionsschleifen, damit nach der Lieferung weniger Koordinationsarbeit anfällt.',
          audience: 'Designer, Marketer und Content-Freelancer mit iterativen Review-Schleifen.',
          whyNow:
            'Revisionsmüdigkeit ist häufig, aber der Workflow ist oft über E-Mail, Docs und Messenger verteilt, was die Produkteinfachheit senkt.',
          nextMove:
            'Prüfe, ob die Übergabeschicht allein genug Wert hat oder mit dem stärkeren Post-Call-Workflow gebündelt werden sollte.',
          highlights: [
            'Gute Retention-Chance, wenn das Tool Teil der Delivery-Operations wird.',
            'Schmerz ist real, aber Fragmentierung erschwert Adoption.',
            'Wahrscheinlich stärker als zweiter Keil nach einem einfacheren Admin-Einstieg.',
          ],
        },
      ],
      detailEyebrow: 'Warum diese Chancen gut abschneiden',
      detailTitle: 'Die stärksten Freelancer-KI-Chancen sitzen dort, wo chaotischer Kontext zu unbezahlter Operations-Arbeit wird.',
      detailDescription:
        'Das Ranking dreht sich weniger um abstrakte KI für Freelancer als um wiederkehrenden Workflow-Schmerz. Die besten Keile holen Zeit zurück, reduzieren verlorene Aufgaben und schaffen eine klare Vorher-Nachher-Geschichte.',
      diagnosticColumns: [
        {
          title: 'Warum Freelancer kaufen',
          description:
            'Sie wollen keinen weiteren generischen Assistenten. Sie wollen weniger Admin-Reibung, schnelleres Follow-up und weniger verlorene Details zwischen Call und Lieferung.',
        },
        {
          title: 'Was höhere Scores verhindert',
          description:
            'Freelancer-Workflows sind fragmentiert. Produkte mit zu viel Setup oder zu vielen Integrationen werden trotz realem Schmerz schnell liegen gelassen.',
        },
        {
          title: 'Empfohlener nächster Schritt',
          description:
            'Sprich mit 5 bis 10 Freelancern, die nach Kundencalls regelmäßig Zeit im Follow-up verlieren, und positioniere das Produkt als Rückgewinn abrechenbarer Zeit.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Zurück zum öffentlichen Hub, um die übrigen Produktpfade an einem Ort zu vergleichen.',
          href: '/de',
          actionLabel: 'Zur Homepage',
        },
        {
          title: 'KI-Startup-Ideengenerator',
          description: 'Sieh, wie das Produkt eine Marktrichtung vor der Validierung in mehrere Startup-Keile ausfaltet.',
          href: '/de/ai-startup-idea-generator',
          actionLabel: 'Generator ansehen',
        },
        {
          title: 'SaaS-Ideenvalidierung',
          description: 'Öffne den engeren Workflow, der beurteilt, ob ein Kandidatenkeil mehr Aufwand verdient.',
          href: '/de/saas-idea-validation',
          actionLabel: 'Validierung öffnen',
        },
      ],
      closing: {
        eyebrow: 'Eigene Analyse starten',
        title: 'Vergleiche dein eigenes Marktsegment mit diesem Beispiel.',
        description:
          'Nutze diesen öffentlichen Bericht als Referenz und analysiere anschließend deine eigene Richtung, um zu sehen, ob Zielgruppe, Workflow oder Schmerzprofil ein stärkeres Chancenbild erzeugen.',
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
    'examples-ai-tools-for-small-business': {
      primaryAction: {
        label: 'Eigene Analyse starten',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Zur Homepage',
        href: '/de',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Öffentlicher Beispielbericht',
      heroVisualTitle: 'Kleinunternehmens-Workflows, priorisiert nach praktischem Umsatzsignal',
      heroVisualSteps: ['Geschäftskontext', 'Top-Workflow-Keile', 'Empfohlene nächste Validierung'],
      supportEyebrow: 'Szenario-Überblick',
      supportTitle: 'KI-Tools für kleine Unternehmen: ein öffentlicher Bericht rund um inhabergeführte Service-Prozesse.',
      supportDescription:
        'Dieser Bericht fokussiert die Stellen, an denen kleine Unternehmen zwischen Anfrage, Angebot, Termin und Zahlung Schwung verlieren. Ziel ist nicht eine Liste breiter KI-Ideen, sondern die Workflow-Keile zu finden, für die Inhaber wegen Umsatzschutz und weniger Follow-up-Reibung zuerst zahlen würden.',
      supportSnapshots: [
        {
          label: 'Marktsegment',
          value: 'Inhabergeführte Service-Unternehmen mit kleinen Teams',
          description:
            'Unternehmen mit 2 bis 20 Personen, die weiterhin stark auf Inhaber oder ein kleines Admin-Team für Leads, Angebote, Planung und Nachverfolgung bauen.',
        },
        {
          label: 'Kernschmerz',
          value: 'Umsatz entweicht zwischen Anfrage und Zahlung',
          description:
            'Die wertvollsten Keile liegen in den Übergaben, in denen niemand genug Zeit hat, um nachzufassen, Details zu bestätigen oder stockende Arbeit voranzutreiben.',
        },
        {
          label: 'Bester erster Keil',
          value: 'Angebots-Follow-up-und-No-Response-Rettungsassistent',
          description:
            'Der stärkste Startkeil ist der Workflow, der versendete Angebote und stille Interessenten wieder in klare nächste Schritte verwandelt, bevor die Anfrage kalt wird.',
        },
      ],
      opportunityEyebrow: 'Priorisierte Chancen',
      opportunityTitle: 'Der stärkste KMU-Keil ist keine generische Automatisierung, sondern Umsatzrückgewinnung im Follow-up.',
      opportunityDescription:
        'Dieses Ranking priorisiert kurzfristigen ROI, operative Einfachheit und die Frage, ob der Inhaber den Wert schnell spürt, ohne ein schweres neues System einzuführen.',
      opportunityItems: [
        {
          rank: 'Rang 01',
          title: 'Angebots-Follow-up-und-No-Response-Rettungsassistent',
          score: '8.8/10',
          description:
            'Verfolge versendete Angebote, erkenne stockende Interessenten, entwerfe kontextbezogene Follow-ups und zeige, welche Leads einen Inhaber-Anruf brauchen, bevor die Chance leise stirbt.',
          audience: 'Inhabergeführte Dienstleister, Agenturen und lokale Anbieter mit individuellen Angeboten und langsamen Follow-up-Prozessen.',
          whyNow:
            'Viele kleine Unternehmen erfassen heute schon Anfragen, aber der Follow-up-Schritt nach dem Angebot ist weiterhin manuell, inkonsistent und direkt mit verlorenem Umsatz verbunden.',
          nextMove:
            'Validiere, ob Inhaber einem Assistenten vertrauen, der den nächsten Follow-up-Schritt empfiehlt und gefährdete Angebote markiert, bevor ein vollständiges CRM entsteht.',
          highlights: [
            'Sehr klare ROI-Geschichte, weil es um zurückgewonnenen Umsatz geht.',
            'Passt zum heutigen Verhalten statt einen komplett neuen Workflow zu erzwingen.',
            'Starker Ausbaupfad in Angebotsanalyse und Vertriebs-Coaching.',
          ],
        },
        {
          rank: 'Rang 02',
          title: 'Inbox-zu-Termin-Koordinationsassistent',
          score: '8.1/10',
          description:
            'Verwandle verteilte Anrufe, Formulare, E-Mails und Nachrichten in eine saubere Planungswarteschlange mit markierten Informationslücken und klarer nächster Buchungsaktion.',
          audience: 'Praxen, Studios, Handwerksbetriebe und kleine Teams, die Termine noch über mehrere Kanäle koordinieren.',
          whyNow:
            'Planungsschmerz ist akut und häufig, doch viele Teams sind zu klein für komplexe Ops-Software oder eine Vollzeit-Koordination.',
          nextMove:
            'Teste, ob kleine Unternehmen unvollständige Anfragen lieber sauber vorsortieren wollen als noch eine Kalenderintegration anzubinden.',
          highlights: [
            'Häufiger Operations-Schmerz mit schneller Sichtbarkeit am ersten Tag.',
            'Besonders stark in Szenarien mit verpassten Anrufen und unvollständigen Anfragen.',
            'Braucht einen engen Startumfang, um keine aufgeblähte Planungssuite zu werden.',
          ],
        },
        {
          rank: 'Rang 03',
          title: 'Rechnungsmahnung-und-Zahlungsstatus-Copilot',
          score: '7.6/10',
          description:
            'Überwache offene Rechnungen, bereite taktvolle Erinnerungsketten vor, fasse Zahlungsstatus zusammen und erinnere das Team, bevor verzögerter Cashflow zum größeren Problem wird.',
          audience: 'Kleine Unternehmen, die vor Zahlung liefern und auf manuelle Erinnerungen angewiesen sind.',
          whyNow:
            'Cashflow-Schmerz ist ernst, aber das sensible Verhältnis rund um Mahnungen erhöht die Hürde für reine Automatisierung deutlich.',
          nextMove:
            'Prüfe, ob Inhaber lieber einen Zahlungs-Follow-up-Copiloten mit Entwürfen und Risikosignalen möchten oder zunächst nur Reporting und Priorisierung.',
          highlights: [
            'Der Schmerz ist scharf, weil verspätete Zahlung den Betrieb sofort trifft.',
            'Vertrauen und Tonalität machen die Umsetzung sensibler.',
            'Wahrscheinlich stärker, nachdem ein weniger sensibler Front-Office-Keil gewonnen hat.',
          ],
        },
      ],
      detailEyebrow: 'Warum diese Chancen gut abschneiden',
      detailTitle: 'Die besten KMU-KI-Keile liegen dort, wo manuelle Koordination den Umsatz leise bremst.',
      detailDescription:
        'Dieses Ranking fokussiert die operativen Lücken, die Inhaber jede Woche spüren: Leads kühlen aus, Terminpläne rutschen, Rechnungen stocken. Die stärksten Keile verbessern Geldfluss, ohne ein schweres neues System zu verlangen.',
      diagnosticColumns: [
        {
          title: 'Warum kleine Unternehmen kaufen',
          description:
            'Inhaber kaufen, wenn ein Produkt Umsatz zurückholt, Follow-up-Chaos verringert oder einen vertrauenswürdigen Operator entlastet, ohne langes Setup-Projekt.',
        },
        {
          title: 'Was höhere Scores verhindert',
          description:
            'Kleine Unternehmen sind budgetsensibel und tool-müde. Alles, was wie eine vollständige Plattformmigration wirkt, hat es schwer, selbst bei echtem Schmerz.',
        },
        {
          title: 'Empfohlener nächster Schritt',
          description:
            'Interviews mit 5 bis 10 inhabergeführten Firmen führen, die nach Angeboten regelmäßig Tempo verlieren, und den ersten Keil als Umsatzrückgewinnung positionieren.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Zurück zum öffentlichen Hub und die anderen Workflows vergleichen, bevor du deine eigene Analyse startest.',
          href: '/de',
          actionLabel: 'Zur Homepage',
        },
        {
          title: 'KI-Geschäftschancenanalyse',
          description: 'Prüfe den Workflow, der mehrere Keile in einem größeren Markt vor tieferer Validierung sortiert.',
          href: '/de/ai-business-opportunity-analysis',
          actionLabel: 'Analyse ansehen',
        },
        {
          title: 'SaaS-Ideenvalidierung',
          description: 'Nimm einen starken KMU-Keil in einen engeren Entscheidungs-Workflow, sobald er heraussticht.',
          href: '/de/saas-idea-validation',
          actionLabel: 'Validierung öffnen',
        },
      ],
      closing: {
        eyebrow: 'Eigene Analyse starten',
        title: 'Vergleiche deinen eigenen KMU-Keil mit diesem Beispiel.',
        description:
          'Nutze das Beispiel, um zu sehen, wie operativer Schmerz in priorisierte Chancenkeile übersetzt wird, und analysiere dann deinen eigenen Markt auf ein stärkeres Signal.',
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
    'examples-ai-tools-for-freelancers': {
      primaryAction: {
        label: 'Lancer votre analyse',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: "Retour à l'accueil",
        href: '/fr',
        variant: 'outline',
      },
      heroVisualEyebrow: "Rapport d'exemple public",
      heroVisualTitle: 'Workflows freelances classés selon un signal produit réellement exploitable',
      heroVisualSteps: ['Contexte freelance', 'Meilleurs wedges', 'Validation suivante recommandée'],
      supportEyebrow: 'Brief scénario',
      supportTitle: 'Outils IA pour freelances : un rapport public centré sur les opérations client à forte charge admin.',
      supportDescription:
        'Ce rapport observe les points où les freelances perdent le plus de temps entre conversations client et livraison facturable. L objectif n est pas de lister des outils IA génériques, mais d identifier les wedges produit qui résolvent une douleur workflow répétée et monétisable.',
      supportSnapshots: [
        {
          label: 'Segment marché',
          value: 'Consultants solo et opérateurs freelances',
          description:
            'Des personnes qui gèrent appels clients, cadrage, suivi et livraison sans équipe operations interne.',
        },
        {
          label: 'Douleur centrale',
          value: 'L admin mange le temps facturable',
          description:
            'Les meilleures opportunités apparaissent là où les freelances doivent sans cesse transformer appels, notes et révisions en actions de suivi.',
        },
        {
          label: 'Meilleur premier wedge',
          value: 'Assistant brief post-appel vers plan d action',
          description:
            'L exemple suggère que la synthèse d un contexte client désordonné en prochaines actions claires est le meilleur point de départ.',
        },
      ],
      opportunityEyebrow: 'Opportunités classées',
      opportunityTitle: 'Le meilleur premier wedge est le nettoyage opérationnel après appel, pas une aide IA générique.',
      opportunityDescription:
        'Le classement privilégie la répétition de la douleur, la facilité d expliquer le ROI et la rapidité avec laquelle un freelance peut sentir le gain de temps.',
      opportunityItems: [
        {
          rank: 'Rang 01',
          title: 'Assistant débrief client vers plan d action',
          score: '8.9/10',
          description:
            'Transformez notes d appel, transcriptions vocales et tâches dispersées en débrief structuré avec prochaines actions, échéances et messages de suivi.',
          audience: 'Consultants indépendants, stratèges et opérateurs gérant plusieurs clients actifs.',
          whyNow:
            'Les LLM sont désormais assez bons pour extraire des actions d un échange désordonné, ce qui rend le gain de temps immédiatement visible.',
          nextMove:
            'Validez si les freelances feraient confiance à des suivis générés par IA si chaque action renvoie aux notes source.',
          highlights: [
            'Lien clair avec le revenu car cela protège les heures facturables.',
            'Workflow répété chaque semaine, pas un gadget ponctuel.',
            'Bon chemin d expansion vers préparation de proposition et handoff projet.',
          ],
        },
        {
          rank: 'Rang 02',
          title: 'Relecteur de proposition et de risque de périmètre',
          score: '8.3/10',
          description:
            'Relisez propositions, formulation du scope et demandes client pour signaler sous-cadrage, livrables ambigus et pièges de révision avant envoi.',
          audience: 'Freelances avec propositions sur mesure, retainers personnalisés ou forte variabilité de périmètre.',
          whyNow:
            'Une grande partie de la douleur apparaît avant même le début du projet, surtout quand un mauvais cadrage déclenche des semaines de révisions non payées.',
          nextMove:
            'Testez si une revue du scope avant envoi semble plus précieuse qu un autre produit générique de rédaction de propositions.',
          highlights: [
            'Réduit directement le coût caché des projets mal calibrés.',
            'Positionnement plus net qu une assistance rédaction générique.',
            'Fonctionne particulièrement bien dans les niches où l ambiguïté projet est fréquente.',
          ],
        },
        {
          rank: 'Rang 03',
          title: 'Copilote de handoff et de révisions',
          score: '7.8/10',
          description:
            'Structurez les livrables, expliquez les décisions, rendez visibles les questions ouvertes et organisez les boucles de révision pour limiter les allers-retours après la livraison.',
          audience: 'Designers, marketeurs et freelances contenu confrontés à des boucles de revue itératives.',
          whyNow:
            'La fatigue des révisions est fréquente, mais le workflow se fragmente souvent entre e-mail, docs et messagerie, ce qui réduit la simplicité produit.',
          nextMove:
            'Vérifiez si la couche de handoff vaut suffisamment à elle seule ou si elle doit être couplée au workflow post-appel plus fort.',
          highlights: [
            'Bon potentiel de rétention si l outil devient une couche d operations de livraison.',
            'La douleur est réelle, mais la fragmentation complique l adoption.',
            'Probablement plus fort comme second wedge après un point d entrée admin plus simple.',
          ],
        },
      ],
      detailEyebrow: 'Pourquoi ces opportunités scorent bien',
      detailTitle: 'Les meilleures opportunités IA pour freelances apparaissent quand un contexte flou devient du travail opérationnel non payé.',
      detailDescription:
        'Le classement parle moins de IA pour freelances dans l abstrait que de douleur workflow répétée. Les meilleurs wedges récupèrent du temps, réduisent les tâches perdues et créent une histoire de valeur avant-après très nette.',
      diagnosticColumns: [
        {
          title: 'Pourquoi les freelances achètent',
          description:
            'Ils ne veulent pas un assistant générique de plus. Ils veulent moins de friction admin, plus de rapidité de suivi et moins de détails perdus entre appel et livraison.',
        },
        {
          title: 'Ce qui empêche des scores plus élevés',
          description:
            'Les workflows freelances sont fragmentés. Les produits qui demandent trop de setup ou trop d intégrations risquent d être abandonnés même si la douleur est réelle.',
        },
        {
          title: 'Suite recommandée',
          description:
            'Interrogez 5 à 10 freelances qui perdent déjà du temps après les appels client et positionnez le produit comme récupération d heures facturables.',
        },
      ],
      relatedColumns: [
        {
          title: 'Accueil',
          description: 'Retournez au hub public pour comparer les autres parcours produit au même endroit.',
          href: '/fr',
          actionLabel: "Retour à l'accueil",
        },
        {
          title: "Générateur d'idées startup IA",
          description: 'Voyez comment le produit déploie une direction marché en plusieurs wedges startup avant validation.',
          href: '/fr/ai-startup-idea-generator',
          actionLabel: 'Voir le générateur',
        },
        {
          title: "Validation d'idée SaaS",
          description: 'Ouvrez le workflow plus serré qui juge si un wedge candidat mérite davantage d effort.',
          href: '/fr/saas-idea-validation',
          actionLabel: 'Ouvrir la validation',
        },
      ],
      closing: {
        eyebrow: 'Lancer votre analyse',
        title: 'Comparez votre segment de marché à cet exemple public.',
        description:
          'Utilisez ce rapport comme point de référence, puis analysez votre propre direction pour voir si une autre audience, un autre workflow ou une autre douleur dessine une carte d opportunités plus forte.',
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
    'examples-ai-tools-for-small-business': {
      primaryAction: {
        label: 'Lancer votre analyse',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: "Retour à l'accueil",
        href: '/fr',
        variant: 'outline',
      },
      heroVisualEyebrow: "Rapport d'exemple public",
      heroVisualTitle: 'Workflows de petites entreprises classés selon un signal revenu concret',
      heroVisualSteps: ['Contexte business', 'Meilleurs wedges workflow', 'Validation suivante recommandée'],
      supportEyebrow: 'Brief scénario',
      supportTitle: 'Outils IA pour petites entreprises : un rapport public centré sur les opérations de services pilotées par le dirigeant.',
      supportDescription:
        'Ce rapport cible les points où les petites entreprises perdent de l élan entre demande, devis, planning et paiement. Le but n est pas de lister de grandes idées IA, mais d identifier les wedges workflow pour lesquels les dirigeants paient d abord parce qu ils protègent le revenu et réduisent la friction de suivi.',
      supportSnapshots: [
        {
          label: 'Segment marché',
          value: 'Entreprises de services pilotées par le dirigeant avec équipes légères',
          description:
            'Des entreprises de 2 à 20 personnes qui reposent encore sur le dirigeant ou une petite équipe admin pour gérer leads, devis, planning et suivi client.',
        },
        {
          label: 'Douleur centrale',
          value: 'Le revenu fuit entre demande et paiement',
          description:
            'Les wedges les plus précieux se situent dans les zones de passage où personne n a assez de temps pour relancer, confirmer les détails ou débloquer le travail.',
        },
        {
          label: 'Meilleur premier wedge',
          value: 'Assistant de relance devis et de récupération sans réponse',
          description:
            'Le meilleur point d entrée est le workflow qui transforme des devis envoyés et des prospects silencieux en prochaines actions claires avant que le lead ne refroidisse.',
        },
      ],
      opportunityEyebrow: 'Opportunités classées',
      opportunityTitle: 'Le wedge PME le plus fort n est pas une automatisation générique, mais la récupération de revenu autour du suivi.',
      opportunityDescription:
        'Le classement privilégie le ROI à court terme, la simplicité opérationnelle et la vitesse à laquelle le dirigeant peut sentir la valeur sans ajouter un système lourd.',
      opportunityItems: [
        {
          rank: 'Rang 01',
          title: 'Assistant de relance devis et récupération sans réponse',
          score: '8.8/10',
          description:
            'Suivez les devis envoyés, détectez les prospects en attente, préparez des relances contextualisées et signalez les leads qui demandent un appel du dirigeant avant qu ils ne meurent en silence.',
          audience: 'Dirigeants de services, agences et opérateurs locaux qui envoient des devis sur mesure et perdent des ventes par manque de suivi.',
          whyNow:
            'Beaucoup de petites entreprises captent déjà les demandes, mais le suivi après devis reste manuel, irrégulier et directement lié au revenu perdu.',
          nextMove:
            'Validez si les dirigeants font confiance à un assistant qui recommande l étape suivante de relance et signale les devis à risque avant de construire une couche CRM complète.',
          highlights: [
            'Histoire ROI très claire car centrée sur le revenu récupéré.',
            'Colle au comportement actuel sans imposer un workflow entièrement nouveau.',
            'Forte voie d expansion vers analytics devis et coaching commercial.',
          ],
        },
        {
          rank: 'Rang 02',
          title: 'Assistant de coordination boîte de réception vers planning',
          score: '8.1/10',
          description:
            'Transformez appels, formulaires, e-mails et SMS dispersés en une file de planification claire avec informations manquantes signalées et prochaine réservation évidente.',
          audience: 'Cliniques, studios, artisans et petites équipes qui coordonnent encore rendez-vous ou visites sur plusieurs canaux.',
          whyNow:
            'La douleur planning est immédiate et fréquente, mais beaucoup d équipes sont trop petites pour justifier un logiciel ops complexe ou un coordinateur à plein temps.',
          nextMove:
            'Testez si les petites entreprises se soucient davantage du tri des demandes incomplètes que d une intégration calendrier supplémentaire.',
          highlights: [
            'Douleur opérationnelle fréquente avec visibilité quasi immédiate.',
            'Très fort là où appels manqués et demandes incomplètes sont courants.',
            'Demande un périmètre de départ étroit pour éviter de devenir un logiciel de planning trop lourd.',
          ],
        },
        {
          rank: 'Rang 03',
          title: 'Copilote de relance facture et statut de paiement',
          score: '7.6/10',
          description:
            'Surveillez les factures impayées, préparez des relances plus tactiques, résumez l état des paiements clients et avertissez l équipe avant qu un retard de trésorerie ne grossisse.',
          audience: 'Petites entreprises qui livrent avant paiement et dépendent de relances manuelles pour faire rentrer le cash.',
          whyNow:
            'La douleur trésorerie est forte, mais la sensibilité relationnelle autour des relances rend la confiance et le ton plus importants qu une pure automatisation.',
          nextMove:
            'Validez si les dirigeants veulent un copilote de relance paiement qui prépare les messages et signale le risque, ou seulement du reporting et de la priorisation au départ.',
          highlights: [
            'La douleur est aiguë car les retards de paiement touchent immédiatement les opérations.',
            'La confiance et le ton rendent l exécution plus délicate.',
            'Probablement plus fort après un wedge front-office moins sensible.',
          ],
        },
      ],
      detailEyebrow: 'Pourquoi ces opportunités scorent bien',
      detailTitle: 'Les meilleurs wedges IA PME se trouvent là où la coordination manuelle ralentit discrètement le revenu.',
      detailDescription:
        'Le classement se concentre sur les gaps opérationnels que les dirigeants ressentent chaque semaine : leads qui refroidissent, planning qui glisse, factures qui stagnent. Les meilleurs wedges améliorent la circulation du cash sans exiger un nouveau système lourd.',
      diagnosticColumns: [
        {
          title: 'Pourquoi les petites entreprises achètent',
          description:
            'Les dirigeants achètent quand un produit aide à récupérer du revenu, réduire le chaos de suivi ou libérer un opérateur clé sans projet de setup long.',
        },
        {
          title: 'Ce qui empêche des scores plus élevés',
          description:
            'Les petites entreprises sont sensibles au budget et fatiguées des outils. Tout ce qui ressemble à une migration complète de plateforme sera difficile, même si la douleur est réelle.',
        },
        {
          title: 'Suite recommandée',
          description:
            'Interrogez 5 à 10 entreprises dirigées par le fondateur qui perdent déjà de l élan après l envoi d un devis, et positionnez le premier wedge comme récupération de revenu.',
        },
      ],
      relatedColumns: [
        {
          title: 'Accueil',
          description: 'Revenez au hub public pour comparer les autres workflows avant votre propre analyse.',
          href: '/fr',
          actionLabel: "Retour à l'accueil",
        },
        {
          title: 'Analyse des opportunités IA',
          description: 'Inspectez le workflow qui classe plusieurs wedges dans un marché plus large avant validation profonde.',
          href: '/fr/ai-business-opportunity-analysis',
          actionLabel: "Voir l'analyse",
        },
        {
          title: "Validation d'idée SaaS",
          description: 'Faites passer un wedge PME prometteur dans un workflow de décision plus serré lorsqu il ressort clairement.',
          href: '/fr/saas-idea-validation',
          actionLabel: 'Ouvrir la validation',
        },
      ],
      closing: {
        eyebrow: 'Lancer votre analyse',
        title: 'Comparez votre wedge petite entreprise à cet exemple public.',
        description:
          'Utilisez cet exemple pour voir comment une douleur opérationnelle se transforme en wedges priorisés, puis analysez votre propre marché pour voir si un autre workflow ou un autre acheteur score mieux.',
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
    'examples-ai-tools-for-freelancers': {
      primaryAction: {
        label: 'Avvia la tua analisi',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Torna alla homepage',
        href: '/it',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Report pubblico di esempio',
      heroVisualTitle: 'Workflow freelance ordinati per segnale di prodotto realmente pratico',
      heroVisualSteps: ['Contesto freelance', 'Wedge migliori', 'Prossima validazione consigliata'],
      supportEyebrow: 'Scenario brief',
      supportTitle: 'Strumenti AI per freelance: un report pubblico costruito intorno al lavoro cliente ad alta frizione amministrativa.',
      supportDescription:
        'Questo report guarda i punti in cui i freelance perdono più tempo tra conversazioni con i clienti e delivery fatturabile. L obiettivo non è elencare strumenti AI generici, ma identificare i wedge di prodotto che risolvono un dolore di workflow ripetuto e monetizzabile.',
      supportSnapshots: [
        {
          label: 'Slice di mercato',
          value: 'Consulenti solo e operatori freelance',
          description:
            'Persone che gestiscono call cliente, definizione scope, follow-up e delivery senza un team operations interno.',
        },
        {
          label: 'Dolore principale',
          value: 'L amministrazione ruba tempo fatturabile',
          description:
            'Le opportunità migliori emergono dove i freelance devono trasformare ripetutamente call, note e revisioni in azioni di follow-up.',
        },
        {
          label: 'Miglior primo wedge',
          value: 'Assistente da post-call brief a piano d azione',
          description:
            'L esempio suggerisce che sintetizzare un contesto cliente disordinato in prossimi passi chiari è il punto di partenza più promettente.',
        },
      ],
      opportunityEyebrow: 'Opportunità ordinate',
      opportunityTitle: 'Il wedge iniziale più forte è il riordino operativo dopo la call, non l assistenza AI generica.',
      opportunityDescription:
        'Il ranking privilegia dolore ripetuto, facilità di spiegare il ROI e velocità con cui un freelance può percepire un vero risparmio di ore.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Assistente da debrief cliente a piano d azione',
          score: '8.9/10',
          description:
            'Trasforma note di call, trascrizioni vocali e to-do sparsi in un debrief strutturato con prossime azioni, scadenze e messaggi di follow-up.',
          audience: 'Consulenti indipendenti, strategist e operatori che seguono più clienti attivi.',
          whyNow:
            'Gli LLM sono ormai abbastanza bravi a estrarre azioni da input conversazionali disordinati, quindi il valore in tempo risparmiato diventa subito visibile.',
          nextMove:
            'Valida se i freelance si fiderebbero di bozze di follow-up generate dall AI se ogni azione rimanda alle note sorgente.',
          highlights: [
            'Legame molto chiaro con i ricavi perché protegge ore fatturabili.',
            'Workflow settimanale ricorrente, non un azione una tantum.',
            'Buon percorso di espansione verso preparazione proposal e handoff progetto.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Revisore di proposal e rischio di scope',
          score: '8.3/10',
          description:
            'Rivedi proposal, linguaggio di scope e richieste cliente per segnalare sotto-scoping, deliverable ambigui e trappole di revisione prima dell invio.',
          audience: 'Freelance con proposal personalizzate, retainer su misura o grande variabilità di scope.',
          whyNow:
            'Una grossa parte del dolore nasce prima ancora che il lavoro inizi, soprattutto quando uno scoping debole genera settimane di revisioni non pagate.',
          nextMove:
            'Testa se una revisione dello scope prima dell invio appare più preziosa di un altro prodotto generico per scrivere proposal.',
          highlights: [
            'Riduce direttamente il costo nascosto di progetti poco adatti.',
            'Posizionamento più netto rispetto all assistenza di scrittura generica.',
            'Funziona meglio in nicchie dove l ambiguità di progetto è frequente.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Copilot per handoff deliverable e revisioni',
          score: '7.8/10',
          description:
            'Impacchetta deliverable, spiega decisioni, rende visibili le questioni aperte e organizza i cicli di revisione per ridurre il back-and-forth dopo la consegna.',
          audience: 'Designer, marketer e freelance content che gestiscono cicli di review iterativi.',
          whyNow:
            'La fatica da revisione è frequente, ma il workflow si frammenta spesso tra email, documenti e messaggistica, riducendo la semplicità del prodotto.',
          nextMove:
            'Verifica se il layer di handoff ha abbastanza valore da solo oppure se deve essere unito al workflow post-call più forte.',
          highlights: [
            'Buon potenziale di retention se lo strumento entra nelle operations di delivery.',
            'Il dolore è reale, ma la frammentazione rende l adozione più difficile.',
            'Probabilmente più forte come secondo wedge dopo un entry point admin più semplice.',
          ],
        },
      ],
      detailEyebrow: 'Perché queste opportunità hanno punteggi alti',
      detailTitle: 'Le migliori opportunità AI per freelance emergono dove un contesto disordinato diventa lavoro operativo non pagato.',
      detailDescription:
        'Il ranking parla meno di AI per freelance in astratto e più di dolore di workflow ripetuto. I wedge migliori recuperano tempo, riducono task persi e costruiscono una storia di valore prima-dopo molto chiara.',
      diagnosticColumns: [
        {
          title: 'Perché i freelance comprano',
          description:
            'Non vogliono un altro assistente generico. Vogliono meno attrito amministrativo, follow-up più rapido e meno dettagli persi tra call e delivery.',
        },
        {
          title: 'Cosa impedisce punteggi più alti',
          description:
            'I workflow freelance sono frammentati. Prodotti che richiedono troppo setup o troppe integrazioni rischiano di essere abbandonati anche con dolore reale.',
        },
        {
          title: 'Prossimo passo consigliato',
          description:
            'Intervista 5-10 freelance che perdono già tempo nel follow-up post-call e posiziona il prodotto come recupero di tempo fatturabile.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Torna all hub pubblico per confrontare gli altri percorsi prodotto in un solo posto.',
          href: '/it',
          actionLabel: 'Torna alla homepage',
        },
        {
          title: 'Generatore di idee startup AI',
          description: 'Guarda come il prodotto espande una direzione di mercato in più wedge startup prima della validazione.',
          href: '/it/ai-startup-idea-generator',
          actionLabel: 'Apri il generatore',
        },
        {
          title: 'Validazione idea SaaS',
          description: 'Apri il workflow più stretto che giudica se un wedge candidato merita più sforzo.',
          href: '/it/saas-idea-validation',
          actionLabel: 'Apri la validazione',
        },
      ],
      closing: {
        eyebrow: 'Avvia la tua analisi',
        title: 'Confronta il tuo slice di mercato con questo esempio pubblico.',
        description:
          'Usa questo report come riferimento e poi analizza la tua direzione per vedere se un altra audience, workflow o struttura del dolore produce una mappa opportunità più forte.',
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
    'examples-ai-tools-for-small-business': {
      primaryAction: {
        label: 'Avvia la tua analisi',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Torna alla homepage',
        href: '/it',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Report pubblico di esempio',
      heroVisualTitle: 'Workflow per piccole imprese ordinati per segnale concreto di ricavo',
      heroVisualSteps: ['Contesto business', 'Wedge workflow migliori', 'Prossima validazione consigliata'],
      supportEyebrow: 'Scenario brief',
      supportTitle: 'Strumenti AI per piccole imprese: un report pubblico centrato su operazioni di servizio guidate dal titolare.',
      supportDescription:
        'Questo report si concentra sui punti in cui le piccole imprese perdono slancio tra richiesta, preventivo, agenda e pagamento. Il punto non è elencare grandi idee AI, ma trovare i wedge di workflow per cui i titolari pagherebbero per primi perché proteggono ricavi e riducono attrito di follow-up.',
      supportSnapshots: [
        {
          label: 'Slice di mercato',
          value: 'Attività di servizio guidate dal titolare con team leggeri',
          description:
            'Imprese da 2 a 20 persone che continuano a contare sul titolare o su un piccolo team admin per lead, preventivi, agenda e follow-up cliente.',
        },
        {
          label: 'Dolore principale',
          value: 'Il ricavo si disperde tra richiesta e pagamento',
          description:
            'I wedge più preziosi stanno nei passaggi in cui nessuno ha abbastanza tempo per ricontattare, confermare dettagli o sbloccare lavori fermi.',
        },
        {
          label: 'Miglior primo wedge',
          value: 'Assistente per follow-up preventivi e recupero senza risposta',
          description:
            'Il miglior punto di partenza è il workflow che trasforma preventivi inviati e prospect silenziosi in prossime azioni chiare prima che il lead si raffreddi.',
        },
      ],
      opportunityEyebrow: 'Opportunità ordinate',
      opportunityTitle: 'Il wedge PMI più forte non è automazione generica, ma recupero ricavi intorno al follow-up.',
      opportunityDescription:
        'Il ranking privilegia ROI a breve termine, semplicità operativa e velocità con cui il titolare può percepire valore senza introdurre un sistema pesante.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Assistente per follow-up preventivi e recupero senza risposta',
          score: '8.8/10',
          description:
            'Traccia preventivi inviati, rileva prospect bloccati, prepara follow-up contestuali e segnala quali lead richiedono una chiamata del titolare prima che l opportunità si spenga.',
          audience: 'Home services, agenzie e operatori locali guidati dal titolare che inviano preventivi personalizzati e perdono vendite per follow-up lento.',
          whyNow:
            'Molte piccole imprese raccolgono già richieste, ma il follow-up dopo il preventivo è ancora manuale, incoerente e direttamente collegato a ricavi persi.',
          nextMove:
            'Valida se i titolari si fidano di un assistente che suggerisce il prossimo passo di follow-up e segnala i preventivi a rischio prima di costruire un CRM completo.',
          highlights: [
            'Storia ROI molto chiara perché si concentra su ricavi recuperati.',
            'Si adatta al comportamento attuale invece di imporre un workflow totalmente nuovo.',
            'Forte espansione futura verso analytics di preventivo e coaching commerciale.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Assistente di coordinamento da inbox a agenda',
          score: '8.1/10',
          description:
            'Trasforma chiamate, form, email e messaggi sparsi in una coda di pianificazione pulita con informazioni mancanti segnalate e prossima prenotazione evidente.',
          audience: 'Cliniche, studi, artigiani e piccoli team che coordinano appuntamenti o sopralluoghi su più canali.',
          whyNow:
            'Il dolore di agenda è immediato e frequente, ma molti team sono troppo piccoli per giustificare software ops complesso o un coordinatore full-time.',
          nextMove:
            'Testa se le piccole imprese tengono di più a smistare richieste incomplete che ad aggiungere un altra integrazione calendario.',
          highlights: [
            'Dolore operativo frequente con visibilità quasi immediata.',
            'Molto forte dove chiamate perse e richieste incomplete sono comuni.',
            'Ha bisogno di un primo scope stretto per non diventare software agenda gonfio.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Copilot per solleciti fatture e stato pagamenti',
          score: '7.6/10',
          description:
            'Monitora fatture non pagate, prepara sequenze di promemoria più attente, riassume lo stato dei pagamenti cliente e avvisa il team prima che il ritardo di cassa diventi più serio.',
          audience: 'Piccole imprese che consegnano prima del pagamento e dipendono da solleciti manuali per far girare la cassa.',
          whyNow:
            'Il dolore di cash flow è forte, ma la sensibilità relazionale intorno agli incassi rende fiducia e tono più importanti della pura automazione.',
          nextMove:
            'Verifica se i titolari vogliono un copilot di follow-up pagamenti che prepari messaggi e segnali rischio, o solo reporting e prioritizzazione iniziale.',
          highlights: [
            'Il dolore è acuto perché i ritardi di pagamento colpiscono subito le operations.',
            'Fiducia e tono rendono l implementazione più delicata.',
            'Probabilmente più forte dopo aver vinto con un wedge front-office meno sensibile.',
          ],
        },
      ],
      detailEyebrow: 'Perché queste opportunità hanno punteggi alti',
      detailTitle: 'I migliori wedge AI per PMI si trovano dove il coordinamento manuale rallenta in silenzio i ricavi.',
      detailDescription:
        'Il ranking si concentra sui gap operativi che i titolari sentono ogni settimana: lead che si raffreddano, agenda che slitta, fatture che ristagnano. I wedge migliori migliorano il movimento di cassa senza richiedere un nuovo sistema pesante.',
      diagnosticColumns: [
        {
          title: 'Perché le piccole imprese comprano',
          description:
            'I titolari comprano quando un prodotto aiuta a recuperare ricavi, ridurre caos di follow-up o liberare un operatore chiave senza lunghi progetti di setup.',
        },
        {
          title: 'Cosa impedisce punteggi più alti',
          description:
            'Le piccole imprese sono sensibili al budget e stanche di nuovi tool. Tutto ciò che sembra una migrazione completa di piattaforma farà fatica anche con dolore reale.',
        },
        {
          title: 'Prossimo passo consigliato',
          description:
            'Intervista 5-10 aziende guidate dal titolare che perdono già ritmo dopo l invio dei preventivi e posiziona il primo wedge come recupero ricavi.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Torna all hub pubblico e confronta gli altri workflow prima della tua analisi.',
          href: '/it',
          actionLabel: 'Torna alla homepage',
        },
        {
          title: 'Analisi opportunità AI',
          description: 'Esamina il workflow che ordina più wedge in un mercato più ampio prima della validazione profonda.',
          href: '/it/ai-business-opportunity-analysis',
          actionLabel: 'Apri analisi',
        },
        {
          title: 'Validazione idea SaaS',
          description: 'Porta un wedge PMI promettente in un workflow decisionale più stretto quando emerge chiaramente.',
          href: '/it/saas-idea-validation',
          actionLabel: 'Apri la validazione',
        },
      ],
      closing: {
        eyebrow: 'Avvia la tua analisi',
        title: 'Confronta il tuo wedge per piccole imprese con questo esempio pubblico.',
        description:
          'Usa questo esempio per capire come il dolore operativo diventa wedge opportunità ordinati, poi analizza il tuo mercato per vedere se un altro workflow o acquirente produce un segnale più forte.',
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
    'examples-ai-tools-for-freelancers': {
      primaryAction: {
        label: 'Inicia tu análisis',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Volver al inicio',
        href: '/es',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Reporte público de ejemplo',
      heroVisualTitle: 'Workflows freelance ordenados por señal de producto realmente útil',
      heroVisualSteps: ['Contexto freelance', 'Mejores wedges', 'Siguiente validación recomendada'],
      supportEyebrow: 'Brief del escenario',
      supportTitle: 'Herramientas IA para freelancers: un reporte público centrado en trabajo con cliente con alta fricción administrativa.',
      supportDescription:
        'Este reporte mira dónde los freelancers pierden más tiempo entre conversaciones con clientes y delivery facturable. El objetivo no es listar herramientas IA genéricas, sino identificar wedges de producto que resuelven dolor de workflow repetido y monetizable.',
      supportSnapshots: [
        {
          label: 'Segmento de mercado',
          value: 'Consultores en solitario y operadores freelance',
          description:
            'Personas que gestionan llamadas, alcance del trabajo, follow-up y delivery sin un equipo interno de operaciones.',
        },
        {
          label: 'Dolor central',
          value: 'La administración roba tiempo facturable',
          description:
            'Las mejores oportunidades aparecen donde los freelancers convierten una y otra vez llamadas, notas y revisiones en acciones de seguimiento.',
        },
        {
          label: 'Mejor primer wedge',
          value: 'Asistente de brief post-llamada a plan de acción',
          description:
            'El ejemplo sugiere que sintetizar un contexto de cliente desordenado en siguientes pasos claros es el punto de partida más prometedor.',
        },
      ],
      opportunityEyebrow: 'Oportunidades ordenadas',
      opportunityTitle: 'El primer wedge más fuerte es la limpieza operativa después de la llamada, no la asistencia IA genérica.',
      opportunityDescription:
        'Este ranking prioriza dolor repetido, facilidad para explicar el ROI y la velocidad con la que un freelance puede sentir ahorro real de horas.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Asistente de debrief de cliente a plan de acción',
          score: '8.9/10',
          description:
            'Convierte notas de llamadas, transcripciones de voz y tareas sueltas en un debrief estructurado con siguientes acciones, fechas y mensajes de seguimiento.',
          audience: 'Consultores independientes, estrategas y operadores que gestionan varios clientes activos.',
          whyNow:
            'Los LLM ya son lo bastante buenos para extraer acciones de input conversacional desordenado, así que el valor del tiempo ahorrado se vuelve visible enseguida.',
          nextMove:
            'Valida si los freelancers confiarían en borradores de follow-up generados por IA si cada acción remite a las notas fuente.',
          highlights: [
            'Vínculo claro con ingresos porque protege horas facturables.',
            'Workflow semanal recurrente, no una novedad de una sola vez.',
            'Buen camino de expansión hacia preparación de propuestas y handoff de proyecto.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Revisor de propuestas y riesgo de alcance',
          score: '8.3/10',
          description:
            'Revisa borradores de propuestas, lenguaje de alcance y peticiones del cliente para señalar under-scoping, entregables ambiguos y trampas de revisión antes del envío.',
          audience: 'Freelancers con propuestas personalizadas, retainers a medida o alta variación de alcance.',
          whyNow:
            'Gran parte del dolor nace antes de empezar el trabajo, especialmente cuando un mal alcance crea semanas de revisiones no pagadas.',
          nextMove:
            'Prueba si una revisión del scope antes del envío se percibe más valiosa que otro producto genérico para escribir propuestas.',
          highlights: [
            'Reduce directamente el coste oculto de proyectos mal encajados.',
            'Posicionamiento más afilado que una ayuda genérica de escritura.',
            'Funciona mejor en nichos donde la ambigüedad del proyecto es frecuente.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Copiloto de handoff y revisiones',
          score: '7.8/10',
          description:
            'Empaqueta entregables, explica decisiones, hace visibles preguntas abiertas y organiza ciclos de revisión para reducir el ir y venir después de entregar.',
          audience: 'Diseñadores, marketers y freelancers de contenido que gestionan bucles de revisión iterativos.',
          whyNow:
            'La fatiga por revisiones es frecuente, pero el workflow suele quedar fragmentado entre email, docs y mensajería, lo que reduce la simplicidad del producto.',
          nextMove:
            'Comprueba si la capa de handoff vale por sí sola o si debe empaquetarse con el workflow post-llamada más fuerte.',
          highlights: [
            'Buen potencial de retención si la herramienta entra en las operaciones de delivery.',
            'El dolor es real, pero la fragmentación complica la adopción.',
            'Probablemente sea más fuerte como segundo wedge tras un punto de entrada admin más simple.',
          ],
        },
      ],
      detailEyebrow: 'Por qué estas oportunidades puntúan bien',
      detailTitle: 'Las mejores oportunidades IA para freelancers aparecen donde un contexto desordenado se convierte en trabajo operativo no pagado.',
      detailDescription:
        'El ranking habla menos de IA para freelancers en abstracto y más de dolor de workflow repetido. Los mejores wedges recuperan tiempo, reducen tareas perdidas y crean una historia de valor antes-después muy clara.',
      diagnosticColumns: [
        {
          title: 'Por qué compran los freelancers',
          description:
            'No quieren otro asistente genérico. Quieren menos fricción administrativa, follow-up más rápido y menos detalles perdidos entre la llamada y la entrega.',
        },
        {
          title: 'Qué impide puntuaciones más altas',
          description:
            'Los workflows freelance están fragmentados. Los productos que requieren demasiado setup o demasiadas integraciones corren el riesgo de abandonarse incluso si el dolor es real.',
        },
        {
          title: 'Siguiente paso recomendado',
          description:
            'Habla con 5 a 10 freelancers que ya pierden tiempo después de llamadas con clientes y posiciona el producto como recuperación de tiempo facturable.',
        },
      ],
      relatedColumns: [
        {
          title: 'Inicio',
          description: 'Vuelve al hub público para comparar los demás recorridos del producto en un solo lugar.',
          href: '/es',
          actionLabel: 'Volver al inicio',
        },
        {
          title: 'Generador de ideas de startup con IA',
          description: 'Mira cómo el producto expande una dirección de mercado en varios wedges startup antes de validar.',
          href: '/es/ai-startup-idea-generator',
          actionLabel: 'Abrir generador',
        },
        {
          title: 'Validación de idea SaaS',
          description: 'Abre el workflow más estrecho que juzga si un wedge candidato merece más esfuerzo.',
          href: '/es/saas-idea-validation',
          actionLabel: 'Abrir validación',
        },
      ],
      closing: {
        eyebrow: 'Inicia tu análisis',
        title: 'Compara tu propio segmento de mercado con este ejemplo público.',
        description:
          'Usa este reporte como referencia y después analiza tu propia dirección para ver si otra audiencia, workflow o patrón de dolor produce un mapa de oportunidades más fuerte.',
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
    'examples-ai-tools-for-small-business': {
      primaryAction: {
        label: 'Inicia tu análisis',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Volver al inicio',
        href: '/es',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Reporte público de ejemplo',
      heroVisualTitle: 'Workflows de pequeñas empresas ordenados por señal real de ingresos',
      heroVisualSteps: ['Contexto del negocio', 'Mejores wedges de workflow', 'Siguiente validación recomendada'],
      supportEyebrow: 'Brief del escenario',
      supportTitle: 'Herramientas IA para pequeñas empresas: un reporte público centrado en operaciones de servicios lideradas por el dueño.',
      supportDescription:
        'Este reporte se centra en los lugares donde las pequeñas empresas pierden impulso entre consulta, presupuesto, agenda y pago. El objetivo no es listar grandes ideas IA, sino encontrar los wedges de workflow por los que los dueños pagarían primero porque protegen ingresos y reducen fricción de seguimiento.',
      supportSnapshots: [
        {
          label: 'Segmento de mercado',
          value: 'Negocios de servicios dirigidos por el dueño con equipos ligeros',
          description:
            'Empresas de 2 a 20 personas que siguen apoyándose en el dueño o en un pequeño equipo admin para leads, presupuestos, agenda y seguimiento.',
        },
        {
          label: 'Dolor central',
          value: 'Los ingresos se escapan entre consulta y pago',
          description:
            'Los wedges más valiosos están en los traspasos donde nadie tiene tiempo suficiente para relanzar, confirmar detalles o empujar trabajo estancado.',
        },
        {
          label: 'Mejor primer wedge',
          value: 'Asistente de follow-up de presupuestos y recuperación sin respuesta',
          description:
            'El mejor punto de entrada es el workflow que convierte presupuestos enviados y prospectos silenciosos en próximos pasos claros antes de que el lead se enfríe.',
        },
      ],
      opportunityEyebrow: 'Oportunidades ordenadas',
      opportunityTitle: 'El wedge pyme más fuerte no es automatización genérica, sino recuperación de ingresos alrededor del follow-up.',
      opportunityDescription:
        'El ranking prioriza ROI de corto plazo, simplicidad operativa y la velocidad con la que el dueño puede sentir valor sin añadir un sistema pesado.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Asistente de follow-up de presupuestos y recuperación sin respuesta',
          score: '8.8/10',
          description:
            'Sigue presupuestos enviados, detecta prospectos estancados, redacta follow-ups contextuales y señala qué leads necesitan una llamada del dueño antes de que la oportunidad muera en silencio.',
          audience: 'Servicios locales, agencias y operadores liderados por el dueño que envían presupuestos a medida y pierden ventas por seguimiento lento.',
          whyNow:
            'Muchas pequeñas empresas ya capturan consultas, pero el follow-up después del presupuesto sigue siendo manual, inconsistente y directamente ligado a ingresos perdidos.',
          nextMove:
            'Valida si los dueños confiarían en un asistente que recomiende el siguiente paso de seguimiento y marque presupuestos en riesgo antes de construir una capa CRM completa.',
          highlights: [
            'Historia de ROI muy clara porque se centra en ingresos recuperados.',
            'Encaja con el comportamiento actual en lugar de forzar un workflow totalmente nuevo.',
            'Fuerte camino de expansión hacia analítica de presupuestos y coaching comercial.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Asistente de coordinación de inbox a agenda',
          score: '8.1/10',
          description:
            'Convierte llamadas, formularios, emails y mensajes dispersos en una cola de planificación limpia con información faltante señalada y la siguiente reserva claramente visible.',
          audience: 'Clínicas, estudios, contratistas y pequeños equipos que todavía coordinan citas o visitas por varios canales.',
          whyNow:
            'El dolor de agenda es inmediato y frecuente, pero muchos equipos son demasiado pequeños para justificar software ops complejo o un coordinador full-time.',
          nextMove:
            'Prueba si a las pequeñas empresas les importa más clasificar consultas incompletas que añadir otra integración de calendario.',
          highlights: [
            'Dolor operativo frecuente con visibilidad casi inmediata.',
            'Muy fuerte donde son comunes llamadas perdidas y consultas incompletas.',
            'Necesita un primer alcance estrecho para no convertirse en software de agenda demasiado pesado.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Copiloto de cobro de facturas y estado de pagos',
          score: '7.6/10',
          description:
            'Monitoriza facturas impagadas, prepara secuencias de recordatorio más cuidadosas, resume el estado de pagos de clientes y avisa al equipo antes de que el retraso de caja crezca.',
          audience: 'Pequeñas empresas que entregan antes de cobrar y dependen de recordatorios manuales para mover caja.',
          whyNow:
            'El dolor de caja es fuerte, pero la sensibilidad relacional alrededor del cobro hace que confianza y tono pesen más que la automatización pura.',
          nextMove:
            'Comprueba si los dueños quieren un copiloto de seguimiento de pagos que redacte mensajes y marque riesgo, o solo reporting y priorización al principio.',
          highlights: [
            'El dolor es agudo porque el retraso de pago afecta enseguida a las operaciones.',
            'La confianza y el tono hacen la implementación más delicada.',
            'Probablemente sea más fuerte después de ganar con un wedge de front-office menos sensible.',
          ],
        },
      ],
      detailEyebrow: 'Por qué estas oportunidades puntúan bien',
      detailTitle: 'Los mejores wedges IA para pymes aparecen donde la coordinación manual frena en silencio los ingresos.',
      detailDescription:
        'El ranking se centra en los huecos operativos que los dueños sienten cada semana: leads que se enfrían, agendas que resbalan y facturas que se atascan. Los mejores wedges mejoran el flujo de caja sin exigir un sistema pesado nuevo.',
      diagnosticColumns: [
        {
          title: 'Por qué compran las pequeñas empresas',
          description:
            'Los dueños compran cuando un producto ayuda a recuperar ingresos, reducir caos de seguimiento o liberar a un operador clave sin un proyecto largo de setup.',
        },
        {
          title: 'Qué impide puntuaciones más altas',
          description:
            'Las pequeñas empresas son sensibles al presupuesto y están cansadas de nuevas herramientas. Todo lo que parezca una migración completa de plataforma costará incluso con dolor real.',
        },
        {
          title: 'Siguiente paso recomendado',
          description:
            'Entrevista a 5 o 10 negocios liderados por el dueño que ya pierden ritmo tras enviar presupuestos y posiciona el primer wedge como recuperación de ingresos.',
        },
      ],
      relatedColumns: [
        {
          title: 'Inicio',
          description: 'Vuelve al hub público y compara los otros workflows antes de tu propio análisis.',
          href: '/es',
          actionLabel: 'Volver al inicio',
        },
        {
          title: 'Análisis de oportunidades IA',
          description: 'Revisa el workflow que ordena varios wedges dentro de un mercado más amplio antes de una validación profunda.',
          href: '/es/ai-business-opportunity-analysis',
          actionLabel: 'Ver análisis',
        },
        {
          title: 'Validación de idea SaaS',
          description: 'Lleva un wedge pyme prometedor a un workflow de decisión más estrecho cuando ya destaque.',
          href: '/es/saas-idea-validation',
          actionLabel: 'Abrir validación',
        },
      ],
      closing: {
        eyebrow: 'Inicia tu análisis',
        title: 'Compara tu wedge para pequeñas empresas con este ejemplo público.',
        description:
          'Usa este ejemplo para ver cómo el dolor operativo se convierte en wedges ordenados y luego analiza tu propio mercado para comprobar si otro workflow o comprador produce mejor señal.',
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
    'examples-ai-tools-for-freelancers': {
      primaryAction: {
        label: 'Inicie sua análise',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Voltar para a homepage',
        href: '/pt',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Relatório público de exemplo',
      heroVisualTitle: 'Workflows de freelancers ordenados por sinal de produto realmente útil',
      heroVisualSteps: ['Contexto freelancer', 'Melhores wedges', 'Próxima validação recomendada'],
      supportEyebrow: 'Brief do cenário',
      supportTitle: 'Ferramentas de IA para freelancers: um relatório público focado em trabalho com cliente com alta fricção administrativa.',
      supportDescription:
        'Este relatório observa onde freelancers perdem mais tempo entre conversas com clientes e entrega faturável. O objetivo não é listar ferramentas genéricas de IA, mas identificar wedges de produto que resolvem dor de workflow repetida e monetizável.',
      supportSnapshots: [
        {
          label: 'Segmento de mercado',
          value: 'Consultores solo e operadores freelancers',
          description:
            'Pessoas que gerenciam chamadas, escopo, follow-up e entrega sem uma equipe interna de operações.',
        },
        {
          label: 'Dor central',
          value: 'O admin rouba tempo faturável',
          description:
            'As melhores oportunidades aparecem onde freelancers transformam repetidamente chamadas, notas e revisões em ações de acompanhamento.',
        },
        {
          label: 'Melhor primeiro wedge',
          value: 'Assistente de pós-call para plano de ação',
          description:
            'O exemplo sugere que sintetizar contexto confuso de cliente em próximos passos claros é o ponto de partida mais promissor.',
        },
      ],
      opportunityEyebrow: 'Oportunidades ordenadas',
      opportunityTitle: 'O wedge inicial mais forte é a limpeza operacional pós-call, não assistência genérica de IA.',
      opportunityDescription:
        'O ranking prioriza dor recorrente, facilidade de explicar ROI e velocidade com que um freelancer percebe economia real de horas.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Assistente de debrief de cliente para plano de ação',
          score: '8.9/10',
          description:
            'Transforme notas de chamada, transcrições de voz e tarefas soltas em um debrief estruturado com próximos passos, prazos e mensagens de follow-up.',
          audience: 'Consultores independentes, estrategistas e operadores que atendem vários clientes ativos.',
          whyNow:
            'Os LLMs já são bons o suficiente para extrair ações de conversa bagunçada, então o valor do tempo poupado fica visível rapidamente.',
          nextMove:
            'Valide se freelancers confiariam em rascunhos de follow-up gerados por IA quando cada ação remete às notas de origem.',
          highlights: [
            'Conexão clara com receita porque protege horas faturáveis.',
            'Workflow recorrente semanal, não uma novidade pontual.',
            'Bom caminho de expansão para preparação de proposta e handoff de projeto.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Revisor de proposta e risco de escopo',
          score: '8.3/10',
          description:
            'Revise propostas, linguagem de escopo e pedidos do cliente para sinalizar under-scoping, entregáveis ambíguos e armadilhas de revisão antes do envio.',
          audience: 'Freelancers com propostas sob medida, retainers personalizados ou alta variação de escopo.',
          whyNow:
            'Grande parte da dor aparece antes do trabalho começar, especialmente quando um escopo fraco cria semanas de revisões não pagas.',
          nextMove:
            'Teste se uma revisão de escopo antes do envio parece mais valiosa do que outro produto genérico para escrever propostas.',
          highlights: [
            'Reduz diretamente o custo oculto de projetos mal encaixados.',
            'Posicionamento mais afiado do que assistência genérica de escrita.',
            'Funciona melhor em nichos onde ambiguidade de projeto é frequente.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Copiloto de handoff e revisões',
          score: '7.8/10',
          description:
            'Empacote entregas, explique decisões, torne perguntas abertas visíveis e organize ciclos de revisão para reduzir idas e vindas após a entrega.',
          audience: 'Designers, marketers e freelancers de conteúdo que administram loops iterativos de revisão.',
          whyNow:
            'A fadiga de revisão é frequente, mas o workflow costuma ficar fragmentado entre email, docs e mensagens, o que reduz a simplicidade do produto.',
          nextMove:
            'Verifique se a camada de handoff tem valor suficiente sozinha ou se deve ser combinada com o workflow pós-call mais forte.',
          highlights: [
            'Bom potencial de retenção se a ferramenta entrar nas operações de entrega.',
            'A dor é real, mas a fragmentação dificulta a adoção.',
            'Provavelmente mais forte como segundo wedge após um ponto de entrada admin mais simples.',
          ],
        },
      ],
      detailEyebrow: 'Por que estas oportunidades pontuam bem',
      detailTitle: 'As melhores oportunidades de IA para freelancers aparecem onde contexto bagunçado vira trabalho operacional não pago.',
      detailDescription:
        'O ranking fala menos de IA para freelancers em abstrato e mais de dor de workflow recorrente. Os melhores wedges recuperam tempo, reduzem tarefas perdidas e criam uma história de valor antes-depois muito clara.',
      diagnosticColumns: [
        {
          title: 'Por que freelancers compram',
          description:
            'Eles não querem mais um assistente genérico. Querem menos fricção administrativa, follow-up mais rápido e menos detalhes perdidos entre chamada e entrega.',
        },
        {
          title: 'O que impede scores mais altos',
          description:
            'Workflows de freelancers são fragmentados. Produtos que exigem setup demais ou integrações demais correm risco de abandono mesmo com dor real.',
        },
        {
          title: 'Próximo passo recomendado',
          description:
            'Converse com 5 a 10 freelancers que já perdem tempo após chamadas com clientes e posicione o produto como recuperação de tempo faturável.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Volte ao hub público para comparar os demais caminhos do produto em um só lugar.',
          href: '/pt',
          actionLabel: 'Voltar para a homepage',
        },
        {
          title: 'Gerador de ideias de startup com IA',
          description: 'Veja como o produto expande uma direção de mercado em vários wedges startup antes da validação.',
          href: '/pt/ai-startup-idea-generator',
          actionLabel: 'Abrir gerador',
        },
        {
          title: 'Validação de ideia SaaS',
          description: 'Abra o workflow mais estreito que julga se um wedge candidato merece mais esforço.',
          href: '/pt/saas-idea-validation',
          actionLabel: 'Abrir validação',
        },
      ],
      closing: {
        eyebrow: 'Inicie sua análise',
        title: 'Compare seu próprio segmento de mercado com este exemplo público.',
        description:
          'Use este relatório como referência e depois analise sua direção para ver se outra audiência, workflow ou padrão de dor gera um mapa de oportunidades mais forte.',
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
    'examples-ai-tools-for-small-business': {
      primaryAction: {
        label: 'Inicie sua análise',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Voltar para a homepage',
        href: '/pt',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Relatório público de exemplo',
      heroVisualTitle: 'Workflows de pequenas empresas ordenados por sinal real de receita',
      heroVisualSteps: ['Contexto do negócio', 'Melhores wedges de workflow', 'Próxima validação recomendada'],
      supportEyebrow: 'Brief do cenário',
      supportTitle: 'Ferramentas de IA para pequenas empresas: um relatório público focado em operações de serviço lideradas pelo dono.',
      supportDescription:
        'Este relatório se concentra nos pontos em que pequenas empresas perdem ritmo entre consulta, orçamento, agenda e pagamento. O objetivo não é listar grandes ideias de IA, mas identificar os wedges de workflow pelos quais donos pagariam primeiro porque protegem receita e reduzem atrito de follow-up.',
      supportSnapshots: [
        {
          label: 'Segmento de mercado',
          value: 'Negócios de serviços liderados pelo dono com times enxutos',
          description:
            'Empresas com 2 a 20 pessoas que ainda dependem muito do dono ou de um pequeno time admin para leads, orçamentos, agenda e acompanhamento.',
        },
        {
          label: 'Dor central',
          value: 'A receita escapa entre consulta e pagamento',
          description:
            'Os wedges mais valiosos ficam nas passagens em que ninguém tem tempo suficiente para retomar contato, confirmar detalhes ou destravar trabalho parado.',
        },
        {
          label: 'Melhor primeiro wedge',
          value: 'Assistente de follow-up de orçamento e recuperação sem resposta',
          description:
            'O melhor ponto de entrada é o workflow que transforma orçamentos enviados e prospects silenciosos em próximos passos claros antes que o lead esfrie.',
        },
      ],
      opportunityEyebrow: 'Oportunidades ordenadas',
      opportunityTitle: 'O wedge PME mais forte não é automação genérica, mas recuperação de receita em torno do follow-up.',
      opportunityDescription:
        'O ranking prioriza ROI de curto prazo, simplicidade operacional e a velocidade com que o dono percebe valor sem adicionar um sistema pesado.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Assistente de follow-up de orçamento e recuperação sem resposta',
          score: '8.8/10',
          description:
            'Acompanhe orçamentos enviados, detecte prospects travados, prepare follow-ups contextuais e destaque quais leads exigem uma ligação do dono antes que a oportunidade morra em silêncio.',
          audience: 'Negócios locais, agências e operadores liderados pelo dono que enviam orçamentos personalizados e perdem vendas por follow-up lento.',
          whyNow:
            'Muitas pequenas empresas já capturam consultas, mas o follow-up após o orçamento continua manual, inconsistente e diretamente ligado à perda de receita.',
          nextMove:
            'Valide se os donos confiariam em um assistente que recomenda o próximo passo de follow-up e sinaliza orçamentos em risco antes de construir uma camada completa de CRM.',
          highlights: [
            'História de ROI muito clara porque foca em receita recuperada.',
            'Se encaixa no comportamento atual em vez de forçar um workflow totalmente novo.',
            'Forte caminho de expansão para analytics de orçamento e coaching comercial.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Assistente de coordenação da inbox para agenda',
          score: '8.1/10',
          description:
            'Transforme chamadas, formulários, emails e mensagens soltas em uma fila limpa de agendamento com informações faltantes sinalizadas e próximo passo de reserva evidente.',
          audience: 'Clínicas, estúdios, prestadores e pequenos times que ainda coordenam horários ou visitas em vários canais.',
          whyNow:
            'A dor de agenda é imediata e frequente, mas muitos times são pequenos demais para justificar software ops complexo ou um coordenador em tempo integral.',
          nextMove:
            'Teste se pequenas empresas se importam mais em triar consultas incompletas do que adicionar mais uma integração de calendário.',
          highlights: [
            'Dor operacional frequente com visibilidade quase imediata.',
            'Muito forte onde chamadas perdidas e consultas incompletas são comuns.',
            'Precisa de um escopo inicial estreito para não virar software de agenda inchado.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Copiloto de cobrança de faturas e status de pagamento',
          score: '7.6/10',
          description:
            'Monitore faturas em aberto, prepare sequências de lembretes mais cuidadosas, resuma o status de pagamento dos clientes e avise o time antes que o atraso de caixa aumente.',
          audience: 'Pequenas empresas que entregam antes de receber e dependem de lembretes manuais para manter o caixa girando.',
          whyNow:
            'A dor de fluxo de caixa é forte, mas a sensibilidade relacional em torno da cobrança faz confiança e tom pesarem mais do que automação pura.',
          nextMove:
            'Verifique se os donos querem um copiloto de follow-up de pagamento que prepare mensagens e sinalize risco, ou apenas reporting e priorização no início.',
          highlights: [
            'A dor é aguda porque atraso de pagamento afeta rapidamente a operação.',
            'Confiança e tom tornam a implementação mais delicada.',
            'Provavelmente mais forte depois de vencer com um wedge de front-office menos sensível.',
          ],
        },
      ],
      detailEyebrow: 'Por que estas oportunidades pontuam bem',
      detailTitle: 'Os melhores wedges de IA para PMEs aparecem onde a coordenação manual desacelera silenciosamente a receita.',
      detailDescription:
        'O ranking se concentra nos gaps operacionais que donos sentem toda semana: leads esfriando, agenda escorregando e faturas travando. Os melhores wedges melhoram o movimento de caixa sem exigir um novo sistema pesado.',
      diagnosticColumns: [
        {
          title: 'Por que pequenas empresas compram',
          description:
            'Donos compram quando um produto ajuda a recuperar receita, reduzir o caos do follow-up ou liberar um operador-chave sem um longo projeto de setup.',
        },
        {
          title: 'O que impede scores mais altos',
          description:
            'Pequenas empresas são sensíveis a orçamento e cansadas de ferramentas. Tudo que parecer uma migração completa de plataforma vai sofrer, mesmo com dor real.',
        },
        {
          title: 'Próximo passo recomendado',
          description:
            'Converse com 5 a 10 empresas lideradas pelo dono que já perdem ritmo após enviar orçamentos e posicione o primeiro wedge como recuperação de receita.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Volte ao hub público e compare os outros workflows antes da sua própria análise.',
          href: '/pt',
          actionLabel: 'Voltar para a homepage',
        },
        {
          title: 'Análise de oportunidades IA',
          description: 'Revise o workflow que ordena vários wedges dentro de um mercado maior antes de validação profunda.',
          href: '/pt/ai-business-opportunity-analysis',
          actionLabel: 'Ver análise',
        },
        {
          title: 'Validação de ideia SaaS',
          description: 'Leve um wedge PME promissor para um workflow de decisão mais estreito quando ele se destacar.',
          href: '/pt/saas-idea-validation',
          actionLabel: 'Abrir validação',
        },
      ],
      closing: {
        eyebrow: 'Inicie sua análise',
        title: 'Compare seu wedge de pequenas empresas com este exemplo público.',
        description:
          'Use este exemplo para ver como dor operacional vira wedges priorizados e depois analise seu próprio mercado para descobrir se outro workflow ou comprador gera sinal mais forte.',
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
