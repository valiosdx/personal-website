export function getButtonHref(button?: { type?: string; url?: string }) {
  if (!button?.url) return "#";

  switch (button.type) {
    case "email":
      return `mailto:${button.url}`;

    case "phone":
      return `tel:${button.url}`;

    default:
      return button.url;
  }
}
