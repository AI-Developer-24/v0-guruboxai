import { LegalDocumentView } from "@/components/legal/legal-document"
import { privacyDocuments } from "@/lib/legal-content"

export default function PrivacyPage() {
  return <LegalDocumentView documents={privacyDocuments} />
}
