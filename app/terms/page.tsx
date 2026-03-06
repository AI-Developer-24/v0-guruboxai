import { LegalDocumentView } from "@/components/legal/legal-document"
import { termsDocuments } from "@/lib/legal-content"

export default function TermsPage() {
  return <LegalDocumentView documents={termsDocuments} />
}
