# Contentful CMS Review

This is a review project for evaluating contentful cms as much as possible under the free plan.

## Introduction

Contentful is a Headless CMS which means it separates the "presentation layer" (FE) from the "management layer" (
backend).

Marketing team can manage the content independently, while the FE team can re-use the content for different components
in the FE.

## Benefits over Traditional CMS like WordPress

- Traditional CMSes put every data blob (images, rich text, html, css, videos, etc.) into one bucket (page or post).
  This makes it impossible to re-use the content in two different pages or posts.
- Traditional CMSes also are deeply coupled with Web and with more devices in the market, it's a requirement to use one
  content for different FE layers.
- In traditional CMSes, WYSIWYG editor helps craft pages or posts but each post is tightly coupled whereas here, we
  create models over posts. Each thing within a page can be a separate model to be combined independently.
- Roles in this CMS:
    - Admin: Members of this role have full access to everything in this space.
    - Author: Allows editing of content
    - Editor: Allows editing, publishing and archiving of content
    - Translator: Allows editing of localized fields in the specified language

## Todos

- [x] Set up the project environment by configuring Prettier for code formatting and integrating ShadCN for UI
  components.
- [x] Implement Contentful as the content management system to handle content dynamically.
- [x] Deploy the initial version of the project on Vercel following the initial Git commit to ensure that deployment
  processes are functioning correctly.
- [x] Create a content model for a dummy site, inspired by the homepage of [Rippling](https://rippling.com). This will
  serve as a template for structuring the site's content.
- [x] Enter and organize data within the content model to simulate a real-world content structure, ensuring it reflects
  the design and functionality of the Rippling homepage.
- [x] Develop the front-end of the site by cloning the structure and design from the content model, ensuring that it
  aligns with the populated content and meets the design specifications.
- [ ] Evaluate the effectiveness of the implemented content management system and front-end solution in addressing the
  marketing team's objectives. Specifically, assess how well it reduces dependency on the development team for content
  updates and maintenance.

## Setup Process

- Create an account on [contentful](https://contentful.com) and simply follow usual instructions till the below screen
  is reached:

  ![image](https://github.com/user-attachments/assets/b771cccc-11bf-4818-8122-fe215da84ea8)

- Here, choose start from scratch and follow the steps shown.
- You can create a dummy content model named "Homepage" and fill it with following types as shown in the image below (
  note: also add a new "Preview Slug" field with Slug type linked to Internal Title):
  
  ![image](https://github.com/user-attachments/assets/75e4537d-0e6f-493e-81ad-d1e65eed2496)
  
- Now go to "content" tab and click on "Add Entry" and simply fill the details as required. You can fill any data.
  ![image](https://github.com/user-attachments/assets/0e500d1d-1ce9-439a-8e35-14788c84235f)

- At this point, we are ready to consume this data in our codebase and also setup "Live Preview" if we want to.
- Open you next.js app and run `bun add contentful` or `npm install contentful` to install the `contentful` package.
- Create an `.env` file and paste the following values in it:
  ```.dotenv
  CONTENTFUL_ENVIRONMENT=master
  CONTENTFUL_SPACE_ID=<your_space_id>
  CONTENTFUL_ACCESS_TOKEN=<your_api_token>
  CONTENTFUL_PREVIEW_ACCESS_TOKEN=<your_preview_access_token>
  CONTENTFUL_PREVIEW_SECRET=preview # this can be any page value. here, it's a page url pointing to app/preview/page.tsx
  CONTENTFUL_MANAGEMENT_TOKEN=<your_cma_token>
  ```
- In your contentful dashboard, under the spaces, you'll find "Settings" dropdown. Click on it:
  
  ![image](https://github.com/user-attachments/assets/aea52f8b-a2a7-4956-85f3-d369bc0483be)

- Here, you'll find two settings: API Keys and CMA Tokens:
  
  ![image](https://github.com/user-attachments/assets/1f582718-570d-469d-b44a-b3dee3c9fa0b)
  
- Just click on both one by one, and create the API keys and tokens and retrieve the values for the `.env` file
  variables and paste them in the `.env` file.
- Now create a new folder `preview/page.tsx` inside `app` and go back to contentful dashboard, "Settings" and select "
  Content preview" from the dropdown.
- Start setup process and configure it like this for the localhost (note: change preview url
  to http://localhost:3000/api/preview/enable-draft?secret=preview&slug={entry.fields.previewSlug}):

  ![image](https://github.com/user-attachments/assets/bfedd534-9de4-4fad-a80c-1fcf02119258)
  
- Focus on the preview url that is supplied as we will use the `secret` and `slug` in our codebase api route.
- Now come back to code terminal and run `bun add @contentful/live-preview or npm install @contentful/live-preview`
- Once installed, create a new layout file inside `app/preview` folder. Inside it, create another folder `_components`
  and inside it create a new file `contentful-preview-provider.tsx` with following content:
  ```tsx
  "use client";
  
  import { ContentfulLivePreviewInitConfig } from "@contentful/live-preview";
  import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
  import { PropsWithChildren } from "react";
  
  export function ContentfulPreviewProvider({
    children,
    ...props
  }: PropsWithChildren<ContentfulLivePreviewInitConfig>) {
  return (
    <ContentfulLivePreviewProvider {...props}>
      {children}
    </ContentfulLivePreviewProvider>
    );
  }
  ```

## Benefits

- Separates content from presentation frontend layer. This means the marketing team or content team can change the
  content independent of developer efforts. This also means the unified content change across the site where the same
  content is being used.
- Same content can be used across devices and regions (with help of localisation)

## Problems

- Unified content change looks promising in theory but often not work in practice as different frontend layers use the
  same content differently in terms of presentation. This can lead to breaking designs in the frontend in case of
  content not conforming to the assumed length or height or other properties.

## Points to remember

- Content creators and developers must remain inside the bounds of their brand's structured content strategy - carefully
  crafted content models - and then they'll be able to reuse and replicate their content.
- If the model is changed, developers will be required to jump in.
- If the design is changed in the Frontend, developers will be required to jump in.
- Boolean flag fields can be used from the get go to provide flexible layout content models which should be decided from
  the beginning or developers will be required to jump in later on adhoc basis.
- Content Source Maps are only available on Premium plan. Vercel Content Links are only available on Vercel Pro and
  Enterprise plans.
