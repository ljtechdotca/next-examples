import config from "@config/seo_meta.json";
import NextHead from "next/head";
import { Fragment } from "react";

interface OgImage {
  url: string;
  width: string;
  height: string;
  alt: string;
}

interface HeadProps {
  title?: string;
  description?: string;
  robots?: string;
  openGraph?: {
    title?: string;
    type?: string;
    locale?: string;
    description?: string;
    site_name?: string;
    url?: string;
    images?: OgImage[];
  };
}

const websiteUrl =
  process.env.NEXT_PUBLIC_WEBSITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
const websiteBaseUrl = websiteUrl ? `https://${websiteUrl}` : null;

const ogImage = ({ url, width, height, alt }: OgImage, index: number) => {
  const imgUrl = websiteBaseUrl
    ? new URL(url!, websiteBaseUrl).toString()
    : url;

  return (
    <Fragment key={`og:image:${index}`}>
      <meta
        key={`og:image:url:${index}`}
        property="og:image"
        content={imgUrl}
      />
      <meta
        key={`og:image:width:${index}`}
        property="og:image:width"
        content={width}
      />
      <meta
        key={`og:image:height:${index}`}
        property="og:image:height"
        content={height}
      />
      <meta
        key={`og:image:alt:${index}`}
        property="og:image:alt"
        content={alt}
      />
    </Fragment>
  );
};

export const Head: React.FC<HeadProps> = ({
  title,
  description,
  openGraph,
  robots,
  children,
}) => {
  return (
    <NextHead>
      <title key="title">
        {title ? `${config.titleTemplate.replace(/%s/g, title)}` : config.title}
      </title>
      <meta
        key="description"
        name="description"
        content={description || config.description}
      />
      <meta
        key="og:type"
        property="og:type"
        content={
          openGraph?.title ?? config.openGraph.title ?? title ?? config.title
        }
      />
      <meta
        key="og:description"
        property="og:description"
        content={
          openGraph?.description ??
          config.openGraph.description ??
          description ??
          config.description
        }
      />
      <meta
        key="og:site_name"
        property="og:site_name"
        content={openGraph?.site_name ?? config.openGraph.site_name}
      />
      <meta
        key="og:url"
        property="og:url"
        content={openGraph?.url ?? config.openGraph.url}
      />
      {openGraph?.locale && (
        <meta key="og:locale" property="og:locale" content={openGraph.locale} />
      )}
      {openGraph?.images?.length
        ? openGraph.images.map((img, index) => ogImage(img, index))
        : ogImage(config.openGraph.images[0], 0)}
      {config.twitter.cardType && (
        <meta
          key="twitter:card"
          name="twitter:card"
          content={config.twitter.cardType}
        />
      )}
      {config.twitter.site && (
        <meta
          key="twitter:site"
          name="twitter:site"
          content={config.twitter.site}
        />
      )}
      {config.twitter.handle && (
        <meta
          key="twitter:handle"
          name="twitter:handle"
          content={config.twitter.handle}
        />
      )}
      <meta key="robots" name="robots" content={robots ?? "index,follow"} />
      <meta
        key="googlebot"
        name="googlebot"
        content={robots ?? "index,follow"}
      />
      {children}
    </NextHead>
  );
};

export default Head;
