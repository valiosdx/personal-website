type SanityResolvedImage = {
  asset?: {
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
};

export interface SiteSettings {
  siteName?: string;
  seoTitle?: string;
  seoDescription?: string;
  favicon?: SanityResolvedImage;
  ogImage?: SanityResolvedImage;
}
