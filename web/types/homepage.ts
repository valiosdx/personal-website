import type { SanityImageSource } from "@sanity/image-url";

export type ButtonType = "external" | "internal" | "email" | "phone";

export type HeaderButton = {
  label: string;
  type: ButtonType;
  url: string;
  openInNewTab?: boolean;
};

type SanityImageWithAlt = SanityImageSource & {
  alt?: string;
};

export interface Homepage {
  header: {
    name: string;
    logo?: SanityImageSource;
    button?: HeaderButton;
  };

  hero: {
    badge: string;
    title: string;
    description: string;
    image?: SanityImageSource;
    button?: HeaderButton;
    stats?: {
      value: string;
      label: string;
    }[];
  };

  brandSlider?: {
    brands?: {
      _key: string;
      logo?: SanityImageSource;
      alt?: string;
      url?: string;
    }[];
  };

  featuredProject?: {
    sectionLabel?: string;
    title?: string;
    description?: string;
    projects?: {
      _key: string;
      year?: string;
      thumbnail?: SanityImageSource;
      title?: string;
      role?: string;
      url?: string;
    }[];
  };

  about?: {
    sectionLabel?: string;
    headline?: string;
    button?: HeaderButton;
    image?: SanityImageSource;
  };

  service?: {
    sectionLabel?: string;
    title?: string;
    description?: string;
    services?: {
      _key: string;
      number?: string;
      title?: string;
      description?: string;
    }[];
  };

  collection?: {
    title?: string;
    description?: string;
    items?: {
      _key: string;
      title?: string;
      description?: string;
      url?: string;
      image?: SanityImageWithAlt;
    }[];
  };

  contact?: {
    title?: string;
    description?: string;
    emailLabel?: string;
    email?: string;
    phoneLabel?: string;
    phone?: string;
    socialLabel?: string;
    socials?: {
      _key: string;
      label?: string;
      url?: string;
    }[];
  };

  copyright?: {
    leftText?: string;
    rightText?: string;
  };
}
