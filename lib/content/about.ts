import { AlertTriangle, EyeOff, FileX } from "lucide-react";

export const PROBLEMS = [
  { icon: FileX, title: "Reserves live in PDFs", body: "Issuers publish attestations monthly as documents. By the time you read one, it is already out of date." },
  { icon: EyeOff, title: "Nobody can check", body: "A dashboard run by the issuer is still the issuer talking. There is no neutral party in the loop." },
  { icon: AlertTriangle, title: "Contracts cannot react", body: "Lending markets and exchanges cannot read a PDF, so they cannot pause when backing slips." },
];
