import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";

export interface HomeHeroSectionProps {
  sys: {
    id: string;
  };
  heading: string;
  description: string;
  formSubmitButton: string;
  formNoticeText: any;
  mediaSection: {
    sys: {
      id: string;
    };
    url: string;
  };
  layout: string;
  previewSlug: string;
}

// Set a variable that contains all the fields needed for blogs when a fetch for content is performed
const HOME_HERO_SECTION_GRAPHQL_FIELDS = `
  sys {
    id
  }
  __typename
  heading
  description
  formSubmitButton
  formNoticeText
  mediaSection {
    sys {
      id
    }
    __typename
    url
  }
  layout
  previewSlug
`;

async function fetchGraphQL(
  query: string,
  preview = false,
  tags: [string] = [""],
) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags },
    },
  ).then((response) => response.json());
}

function extractHomeHeroSectionEntries(fetchResponse: {
  data: { homepageCollection: { items: HomeHeroSectionProps[] } };
}) {
  return fetchResponse?.data?.homepageCollection?.items;
}

export async function getAllHomeHeroSections(limit = 3, isDraftMode = false) {
  const blogs = await fetchGraphQL(
    `query {
      homepageCollection(where:{heading_exists: true},limit: ${limit}, preview: ${
        isDraftMode ? "true" : "false"
      }) {
          items {
            ${HOME_HERO_SECTION_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
    ["home-hero-section"],
  );

  return extractHomeHeroSectionEntries(blogs);
}

export async function getHomeHeroSection(slug: string, isDraftMode = false) {
  // console.log({ isDraftMode });
  const preview = await fetchGraphQL(
    `query {
      homepageCollection(where:{previewSlug: "${slug}"}, limit: 1, preview: ${
        isDraftMode ? "true" : "false"
      }) {
          items {
            ${HOME_HERO_SECTION_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
    [slug],
  );
  const data = extractHomeHeroSectionEntries(preview)[0];
  data.formNoticeText = await richTextFromMarkdown(data.formNoticeText);
  return data;
}
