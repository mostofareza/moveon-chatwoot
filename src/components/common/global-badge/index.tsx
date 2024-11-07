import Badge from "../badge";
import badgeStyles from "./badge-styles";

// Helper function to transform the label text
const transformLabel = (label: string) =>
  label
    .replace(/[-_]/g, " ") // Replace "-" or "_" with a space
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words with a space

interface GlobalBadgeProps {
  status: string;
  label: string;
}

const GlobalBadge = ({ status, label }: GlobalBadgeProps) => {
  const transformedLabel = transformLabel(label);
  const badgeClass = badgeStyles[status] || "capitalize";

  return (
    <Badge variant="ghost" className={`capitalize ${badgeClass}`}>
      {transformedLabel}
    </Badge>
  );
};

export default GlobalBadge;
