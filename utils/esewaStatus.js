export const EsewaStatus = {
  COMPLETE: "COMPLETE",
  PENDING: "PENDING",
  AMBIGUOUS: "AMBIGUOUS",
  NOT_FOUND: "NOT_FOUND",
  CANCELED: "CANCELED",
  FULL_REFUND: "FULL_REFUND",
  PARTIAL_REFUND: "PARTIAL_REFUND",
};

export function categorizeEsewaStatus(status) {
  switch (status) {
    case EsewaStatus.COMPLETE:
      return "SUCCESS";

    case EsewaStatus.PENDING:
    case EsewaStatus.AMBIGUOUS:
      return "RETRY";

    case EsewaStatus.NOT_FOUND:
    case EsewaStatus.CANCELED:
    case EsewaStatus.FULL_REFUND:
    case EsewaStatus.PARTIAL_REFUND:
      return "FAILURE";

    default:
      return "UNKNOWN";
  }
}
