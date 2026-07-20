import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`
*[_type == "siteSetting"][0] {
  siteName,
  seoTitle,
  seoDescription,

  favicon {
    asset->{
      url
    }
  },

  ogImage {
    asset->{
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    }
  }
}
`;

export const HOMEPAGE_QUERY = groq`
*[_type == "homePage"][0]{
    header {
      name,
      logo {
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            },
            lqip
          }
        }
      },
      button {
        label,
        type,
        url,
        openInNewTab
      }
    },
    hero {
      badge,
      title,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            },
            lqip
          }
        }
      },
      description,
      button {
        label,
        type,
        url,
        openInNewTab
      },
      stats[] {
        value,
        label
      }
    },
    brandSlider {
      brands[] {
        _key,
        alt,
        url,
        logo {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              },
              lqip
            }
          }
        }
      }
    },
    featuredProject {
      sectionLabel,
      title,
      description,
      projects[] {
        _key,
        year,
        title,
        role,
        url,
        thumbnail {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              },
              lqip
            }
          }
        }
      }
    },
    about {
      sectionLabel,
      headline,
      button {
        label,
        type,
        url,
        openInNewTab
      },
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            },
            lqip
          }
        }
      }
    },
    service {
      sectionLabel,
      title,
      description,
      services[] {
        _key,
        number,
        title,
        description
      }
    },
    collection {
      title,
      description,
      items[] {
        _key,
        title,
        description,
        url,
        image {
          alt,
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              },
              lqip
            }
          }
        }
      }
    },
    contact {
      title,
      description,
      emailLabel,
      email,
      phoneLabel,
      phone,
      socialLabel,
      socials[] {
        _key,
        label,
        url
      }
    },
    copyright {
      leftText,
      rightText
    }
  }
`;
