import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  transform?: Maybe<ImageTransformOptions>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AssetFilter = {
  AND?: Maybe<Array<Maybe<AssetFilter>>>;
  OR?: Maybe<Array<Maybe<AssetFilter>>>;
  contentType?: Maybe<Scalars['String']>;
  contentType_contains?: Maybe<Scalars['String']>;
  contentType_exists?: Maybe<Scalars['Boolean']>;
  contentType_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_not?: Maybe<Scalars['String']>;
  contentType_not_contains?: Maybe<Scalars['String']>;
  contentType_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName?: Maybe<Scalars['String']>;
  fileName_contains?: Maybe<Scalars['String']>;
  fileName_exists?: Maybe<Scalars['Boolean']>;
  fileName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_not?: Maybe<Scalars['String']>;
  fileName_not_contains?: Maybe<Scalars['String']>;
  fileName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  height?: Maybe<Scalars['Int']>;
  height_exists?: Maybe<Scalars['Boolean']>;
  height_gt?: Maybe<Scalars['Int']>;
  height_gte?: Maybe<Scalars['Int']>;
  height_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_lt?: Maybe<Scalars['Int']>;
  height_lte?: Maybe<Scalars['Int']>;
  height_not?: Maybe<Scalars['Int']>;
  height_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size?: Maybe<Scalars['Int']>;
  size_exists?: Maybe<Scalars['Boolean']>;
  size_gt?: Maybe<Scalars['Int']>;
  size_gte?: Maybe<Scalars['Int']>;
  size_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_lt?: Maybe<Scalars['Int']>;
  size_lte?: Maybe<Scalars['Int']>;
  size_not?: Maybe<Scalars['Int']>;
  size_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  width?: Maybe<Scalars['Int']>;
  width_exists?: Maybe<Scalars['Boolean']>;
  width_gt?: Maybe<Scalars['Int']>;
  width_gte?: Maybe<Scalars['Int']>;
  width_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_lt?: Maybe<Scalars['Int']>;
  width_lte?: Maybe<Scalars['Int']>;
  width_not?: Maybe<Scalars['Int']>;
  width_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  projectCollection?: Maybe<ProjectCollection>;
  technologyCollection?: Maybe<TechnologyCollection>;
};

export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export type AssetLinkingCollectionsProjectCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export type AssetLinkingCollectionsTechnologyCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
}

/** A blog post [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/blogPoste) */
export type BlogPoste = Entry & {
  __typename?: 'BlogPoste';
  body?: Maybe<BlogPosteBody>;
  byline?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  headline?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<BlogPosteLinkingCollections>;
  relatedCollection?: Maybe<BlogPosteRelatedCollection>;
  sys: Sys;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** A blog post [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/blogPoste) */
export type BlogPosteBodyArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** A blog post [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/blogPoste) */
export type BlogPosteBylineArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** A blog post [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/blogPoste) */
export type BlogPosteCategoryArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** A blog post [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/blogPoste) */
export type BlogPosteHeadlineArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** A blog post [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/blogPoste) */
export type BlogPosteLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** A blog post [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/blogPoste) */
export type BlogPosteRelatedCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

/** A blog post [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/blogPoste) */
export type BlogPosteTagsArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type BlogPosteBody = {
  __typename?: 'BlogPosteBody';
  json: Scalars['JSON'];
  links: BlogPosteBodyLinks;
};

export type BlogPosteBodyAssets = {
  __typename?: 'BlogPosteBodyAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type BlogPosteBodyEntries = {
  __typename?: 'BlogPosteBodyEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type BlogPosteBodyLinks = {
  __typename?: 'BlogPosteBodyLinks';
  assets: BlogPosteBodyAssets;
  entries: BlogPosteBodyEntries;
};

export type BlogPosteCollection = {
  __typename?: 'BlogPosteCollection';
  items: Array<Maybe<BlogPoste>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type BlogPosteFilter = {
  AND?: Maybe<Array<Maybe<BlogPosteFilter>>>;
  OR?: Maybe<Array<Maybe<BlogPosteFilter>>>;
  body_contains?: Maybe<Scalars['String']>;
  body_exists?: Maybe<Scalars['Boolean']>;
  body_not_contains?: Maybe<Scalars['String']>;
  byline?: Maybe<Scalars['String']>;
  byline_contains?: Maybe<Scalars['String']>;
  byline_exists?: Maybe<Scalars['Boolean']>;
  byline_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  byline_not?: Maybe<Scalars['String']>;
  byline_not_contains?: Maybe<Scalars['String']>;
  byline_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  category?: Maybe<Scalars['String']>;
  category_contains?: Maybe<Scalars['String']>;
  category_exists?: Maybe<Scalars['Boolean']>;
  category_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  category_not?: Maybe<Scalars['String']>;
  category_not_contains?: Maybe<Scalars['String']>;
  category_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  headline?: Maybe<Scalars['String']>;
  headline_contains?: Maybe<Scalars['String']>;
  headline_exists?: Maybe<Scalars['Boolean']>;
  headline_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  headline_not?: Maybe<Scalars['String']>;
  headline_not_contains?: Maybe<Scalars['String']>;
  headline_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  relatedCollection_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  tags_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags_exists?: Maybe<Scalars['Boolean']>;
};

export type BlogPosteLinkingCollections = {
  __typename?: 'BlogPosteLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type BlogPosteLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum BlogPosteOrder {
  BylineAsc = 'byline_ASC',
  BylineDesc = 'byline_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type BlogPosteRelatedCollection = {
  __typename?: 'BlogPosteRelatedCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags?: Maybe<ContentfulMetadataTagsFilter>;
  tags_exists?: Maybe<Scalars['Boolean']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type EntryFilter = {
  AND?: Maybe<Array<Maybe<EntryFilter>>>;
  OR?: Maybe<Array<Maybe<EntryFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  sys?: Maybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/homeSection) */
export type HomeSection = Entry & {
  __typename?: 'HomeSection';
  content?: Maybe<HomeSectionContent>;
  contentfulMetadata: ContentfulMetadata;
  expoItemsCollection?: Maybe<HomeSectionExpoItemsCollection>;
  height?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<HomeSectionLinkingCollections>;
  position?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/homeSection) */
export type HomeSectionContentArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/homeSection) */
export type HomeSectionExpoItemsCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

/** [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/homeSection) */
export type HomeSectionHeightArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/homeSection) */
export type HomeSectionLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/homeSection) */
export type HomeSectionPositionArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/homeSection) */
export type HomeSectionTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/homeSection) */
export type HomeSectionTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type HomeSectionCollection = {
  __typename?: 'HomeSectionCollection';
  items: Array<Maybe<HomeSection>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type HomeSectionContent = {
  __typename?: 'HomeSectionContent';
  json: Scalars['JSON'];
  links: HomeSectionContentLinks;
};

export type HomeSectionContentAssets = {
  __typename?: 'HomeSectionContentAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type HomeSectionContentEntries = {
  __typename?: 'HomeSectionContentEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type HomeSectionContentLinks = {
  __typename?: 'HomeSectionContentLinks';
  assets: HomeSectionContentAssets;
  entries: HomeSectionContentEntries;
};

export type HomeSectionExpoItemsCollection = {
  __typename?: 'HomeSectionExpoItemsCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type HomeSectionFilter = {
  AND?: Maybe<Array<Maybe<HomeSectionFilter>>>;
  OR?: Maybe<Array<Maybe<HomeSectionFilter>>>;
  content_contains?: Maybe<Scalars['String']>;
  content_exists?: Maybe<Scalars['Boolean']>;
  content_not_contains?: Maybe<Scalars['String']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  expoItemsCollection_exists?: Maybe<Scalars['Boolean']>;
  height?: Maybe<Scalars['String']>;
  height_contains?: Maybe<Scalars['String']>;
  height_exists?: Maybe<Scalars['Boolean']>;
  height_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  height_not?: Maybe<Scalars['String']>;
  height_not_contains?: Maybe<Scalars['String']>;
  height_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  position?: Maybe<Scalars['Int']>;
  position_exists?: Maybe<Scalars['Boolean']>;
  position_gt?: Maybe<Scalars['Int']>;
  position_gte?: Maybe<Scalars['Int']>;
  position_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  position_lt?: Maybe<Scalars['Int']>;
  position_lte?: Maybe<Scalars['Int']>;
  position_not?: Maybe<Scalars['Int']>;
  position_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
  type_contains?: Maybe<Scalars['String']>;
  type_exists?: Maybe<Scalars['Boolean']>;
  type_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  type_not?: Maybe<Scalars['String']>;
  type_not_contains?: Maybe<Scalars['String']>;
  type_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type HomeSectionLinkingCollections = {
  __typename?: 'HomeSectionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type HomeSectionLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum HomeSectionOrder {
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
}

export enum ImageFormat {
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP',
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT',
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB',
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: Maybe<Scalars['HexColor']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: Maybe<Scalars['Int']>;
  /** Desired image format. Defaults to the original image format. */
  format?: Maybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: Maybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: Maybe<Scalars['Quality']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: Maybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: Maybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: Maybe<Scalars['Dimension']>;
};

/** An engineering project I've worked on or am working on [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/project) */
export type Project = Entry & {
  __typename?: 'Project';
  blurb?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<ProjectDescription>;
  exampleUrl?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<ProjectLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  preview?: Maybe<Asset>;
  priority?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Float']>;
  repositoryUrl?: Maybe<Scalars['String']>;
  sys: Sys;
  technologiesCollection?: Maybe<ProjectTechnologiesCollection>;
};

/** An engineering project I've worked on or am working on [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/project) */
export type ProjectBlurbArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** An engineering project I've worked on or am working on [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/project) */
export type ProjectDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** An engineering project I've worked on or am working on [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/project) */
export type ProjectExampleUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** An engineering project I've worked on or am working on [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/project) */
export type ProjectLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** An engineering project I've worked on or am working on [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/project) */
export type ProjectNameArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** An engineering project I've worked on or am working on [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/project) */
export type ProjectPreviewArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

/** An engineering project I've worked on or am working on [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/project) */
export type ProjectPriorityArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** An engineering project I've worked on or am working on [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/project) */
export type ProjectRatingArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** An engineering project I've worked on or am working on [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/project) */
export type ProjectRepositoryUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** An engineering project I've worked on or am working on [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/project) */
export type ProjectTechnologiesCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export type ProjectCollection = {
  __typename?: 'ProjectCollection';
  items: Array<Maybe<Project>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ProjectDescription = {
  __typename?: 'ProjectDescription';
  json: Scalars['JSON'];
  links: ProjectDescriptionLinks;
};

export type ProjectDescriptionAssets = {
  __typename?: 'ProjectDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ProjectDescriptionEntries = {
  __typename?: 'ProjectDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ProjectDescriptionLinks = {
  __typename?: 'ProjectDescriptionLinks';
  assets: ProjectDescriptionAssets;
  entries: ProjectDescriptionEntries;
};

export type ProjectFilter = {
  AND?: Maybe<Array<Maybe<ProjectFilter>>>;
  OR?: Maybe<Array<Maybe<ProjectFilter>>>;
  blurb?: Maybe<Scalars['String']>;
  blurb_contains?: Maybe<Scalars['String']>;
  blurb_exists?: Maybe<Scalars['Boolean']>;
  blurb_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  blurb_not?: Maybe<Scalars['String']>;
  blurb_not_contains?: Maybe<Scalars['String']>;
  blurb_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_not_contains?: Maybe<Scalars['String']>;
  exampleUrl?: Maybe<Scalars['String']>;
  exampleUrl_contains?: Maybe<Scalars['String']>;
  exampleUrl_exists?: Maybe<Scalars['Boolean']>;
  exampleUrl_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  exampleUrl_not?: Maybe<Scalars['String']>;
  exampleUrl_not_contains?: Maybe<Scalars['String']>;
  exampleUrl_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  preview_exists?: Maybe<Scalars['Boolean']>;
  priority?: Maybe<Scalars['Int']>;
  priority_exists?: Maybe<Scalars['Boolean']>;
  priority_gt?: Maybe<Scalars['Int']>;
  priority_gte?: Maybe<Scalars['Int']>;
  priority_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  priority_lt?: Maybe<Scalars['Int']>;
  priority_lte?: Maybe<Scalars['Int']>;
  priority_not?: Maybe<Scalars['Int']>;
  priority_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  rating?: Maybe<Scalars['Float']>;
  rating_exists?: Maybe<Scalars['Boolean']>;
  rating_gt?: Maybe<Scalars['Float']>;
  rating_gte?: Maybe<Scalars['Float']>;
  rating_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  rating_lt?: Maybe<Scalars['Float']>;
  rating_lte?: Maybe<Scalars['Float']>;
  rating_not?: Maybe<Scalars['Float']>;
  rating_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  repositoryUrl?: Maybe<Scalars['String']>;
  repositoryUrl_contains?: Maybe<Scalars['String']>;
  repositoryUrl_exists?: Maybe<Scalars['Boolean']>;
  repositoryUrl_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  repositoryUrl_not?: Maybe<Scalars['String']>;
  repositoryUrl_not_contains?: Maybe<Scalars['String']>;
  repositoryUrl_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  technologiesCollection_exists?: Maybe<Scalars['Boolean']>;
};

export type ProjectLinkingCollections = {
  __typename?: 'ProjectLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};

export type ProjectLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum ProjectOrder {
  BlurbAsc = 'blurb_ASC',
  BlurbDesc = 'blurb_DESC',
  ExampleUrlAsc = 'exampleUrl_ASC',
  ExampleUrlDesc = 'exampleUrl_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PriorityAsc = 'priority_ASC',
  PriorityDesc = 'priority_DESC',
  RatingAsc = 'rating_ASC',
  RatingDesc = 'rating_DESC',
  RepositoryUrlAsc = 'repositoryUrl_ASC',
  RepositoryUrlDesc = 'repositoryUrl_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type ProjectTechnologiesCollection = {
  __typename?: 'ProjectTechnologiesCollection';
  items: Array<Maybe<Technology>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  blogPoste?: Maybe<BlogPoste>;
  blogPosteCollection?: Maybe<BlogPosteCollection>;
  entryCollection?: Maybe<EntryCollection>;
  homeSection?: Maybe<HomeSection>;
  homeSectionCollection?: Maybe<HomeSectionCollection>;
  project?: Maybe<Project>;
  projectCollection?: Maybe<ProjectCollection>;
  technology?: Maybe<Technology>;
  technologyCollection?: Maybe<TechnologyCollection>;
};

export type QueryAssetArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

export type QueryAssetCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<AssetOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<AssetFilter>;
};

export type QueryBlogPosteArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

export type QueryBlogPosteCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<BlogPosteOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<BlogPosteFilter>;
};

export type QueryEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<EntryOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<EntryFilter>;
};

export type QueryHomeSectionArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

export type QueryHomeSectionCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<HomeSectionOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<HomeSectionFilter>;
};

export type QueryProjectArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

export type QueryProjectCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<ProjectOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ProjectFilter>;
};

export type QueryTechnologyArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

export type QueryTechnologyCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<TechnologyOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TechnologyFilter>;
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
};

export type SysFilter = {
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: Maybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_not?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  id?: Maybe<Scalars['String']>;
  id_contains?: Maybe<Scalars['String']>;
  id_exists?: Maybe<Scalars['Boolean']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedAt_exists?: Maybe<Scalars['Boolean']>;
  publishedAt_gt?: Maybe<Scalars['DateTime']>;
  publishedAt_gte?: Maybe<Scalars['DateTime']>;
  publishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedAt_lt?: Maybe<Scalars['DateTime']>;
  publishedAt_lte?: Maybe<Scalars['DateTime']>;
  publishedAt_not?: Maybe<Scalars['DateTime']>;
  publishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedVersion?: Maybe<Scalars['Float']>;
  publishedVersion_exists?: Maybe<Scalars['Boolean']>;
  publishedVersion_gt?: Maybe<Scalars['Float']>;
  publishedVersion_gte?: Maybe<Scalars['Float']>;
  publishedVersion_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  publishedVersion_lt?: Maybe<Scalars['Float']>;
  publishedVersion_lte?: Maybe<Scalars['Float']>;
  publishedVersion_not?: Maybe<Scalars['Float']>;
  publishedVersion_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

/** A technology [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/technology) */
export type Technology = Entry & {
  __typename?: 'Technology';
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata: ContentfulMetadata;
  experienceBegin?: Maybe<Scalars['DateTime']>;
  experienceRating?: Maybe<Scalars['Float']>;
  icon?: Maybe<Asset>;
  linkedFrom?: Maybe<TechnologyLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
};

/** A technology [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/technology) */
export type TechnologyCategoriesArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** A technology [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/technology) */
export type TechnologyExperienceBeginArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** A technology [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/technology) */
export type TechnologyExperienceRatingArgs = {
  locale?: Maybe<Scalars['String']>;
};

/** A technology [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/technology) */
export type TechnologyIconArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

/** A technology [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/technology) */
export type TechnologyLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** A technology [See type definition](https://app.contentful.com/spaces/j3g3ddoz6mao/content_types/technology) */
export type TechnologyNameArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type TechnologyCollection = {
  __typename?: 'TechnologyCollection';
  items: Array<Maybe<Technology>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TechnologyFilter = {
  AND?: Maybe<Array<Maybe<TechnologyFilter>>>;
  OR?: Maybe<Array<Maybe<TechnologyFilter>>>;
  categories_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>;
  categories_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>;
  categories_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>;
  categories_exists?: Maybe<Scalars['Boolean']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  experienceBegin?: Maybe<Scalars['DateTime']>;
  experienceBegin_exists?: Maybe<Scalars['Boolean']>;
  experienceBegin_gt?: Maybe<Scalars['DateTime']>;
  experienceBegin_gte?: Maybe<Scalars['DateTime']>;
  experienceBegin_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  experienceBegin_lt?: Maybe<Scalars['DateTime']>;
  experienceBegin_lte?: Maybe<Scalars['DateTime']>;
  experienceBegin_not?: Maybe<Scalars['DateTime']>;
  experienceBegin_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  experienceRating?: Maybe<Scalars['Float']>;
  experienceRating_exists?: Maybe<Scalars['Boolean']>;
  experienceRating_gt?: Maybe<Scalars['Float']>;
  experienceRating_gte?: Maybe<Scalars['Float']>;
  experienceRating_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  experienceRating_lt?: Maybe<Scalars['Float']>;
  experienceRating_lte?: Maybe<Scalars['Float']>;
  experienceRating_not?: Maybe<Scalars['Float']>;
  experienceRating_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  icon_exists?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
};

export type TechnologyLinkingCollections = {
  __typename?: 'TechnologyLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  projectCollection?: Maybe<ProjectCollection>;
};

export type TechnologyLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export type TechnologyLinkingCollectionsProjectCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum TechnologyOrder {
  ExperienceBeginAsc = 'experienceBegin_ASC',
  ExperienceBeginDesc = 'experienceBegin_DESC',
  ExperienceRatingAsc = 'experienceRating_ASC',
  ExperienceRatingDesc = 'experienceRating_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type BaseSectionFragment = {
  __typename?: 'HomeSection';
  title?: Maybe<string>;
  type?: Maybe<string>;
  height?: Maybe<string>;
  sys: { __typename?: 'Sys'; id: string };
  content?: Maybe<{ __typename?: 'HomeSectionContent'; json: any }>;
};

export type SectionsQueryVariables = Exact<{ [key: string]: never }>;

export type SectionsQuery = {
  __typename?: 'Query';
  homeSectionCollection?: Maybe<{
    __typename?: 'HomeSectionCollection';
    items: Array<
      Maybe<{
        __typename?: 'HomeSection';
        title?: Maybe<string>;
        type?: Maybe<string>;
        height?: Maybe<string>;
        sys: { __typename?: 'Sys'; id: string };
        content?: Maybe<{ __typename?: 'HomeSectionContent'; json: any }>;
      }>
    >;
  }>;
};

export type ProjectShortItemFragment = {
  __typename?: 'Project';
  name?: Maybe<string>;
  blurb?: Maybe<string>;
  priority?: Maybe<number>;
  rating?: Maybe<number>;
  exampleUrl?: Maybe<string>;
  repositoryUrl?: Maybe<string>;
  sys: { __typename?: 'Sys'; id: string };
  preview?: Maybe<{ __typename?: 'Asset'; url?: Maybe<string> }>;
};

export type ProjectItemFragment = {
  __typename?: 'Project';
  name?: Maybe<string>;
  blurb?: Maybe<string>;
  priority?: Maybe<number>;
  rating?: Maybe<number>;
  exampleUrl?: Maybe<string>;
  repositoryUrl?: Maybe<string>;
  description?: Maybe<{ __typename?: 'ProjectDescription'; json: any }>;
  technologies?: Maybe<{
    __typename?: 'ProjectTechnologiesCollection';
    items: Array<
      Maybe<{
        __typename?: 'Technology';
        name?: Maybe<string>;
        sys: { __typename?: 'Sys'; id: string };
        icon?: Maybe<{ __typename?: 'Asset'; url?: Maybe<string> }>;
      }>
    >;
  }>;
  sys: { __typename?: 'Sys'; id: string };
  preview?: Maybe<{ __typename?: 'Asset'; url?: Maybe<string> }>;
};

export type ProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type ProjectsQuery = {
  __typename?: 'Query';
  projectCollection?: Maybe<{
    __typename?: 'ProjectCollection';
    items: Array<
      Maybe<{
        __typename?: 'Project';
        name?: Maybe<string>;
        blurb?: Maybe<string>;
        priority?: Maybe<number>;
        rating?: Maybe<number>;
        exampleUrl?: Maybe<string>;
        repositoryUrl?: Maybe<string>;
        description?: Maybe<{ __typename?: 'ProjectDescription'; json: any }>;
        technologies?: Maybe<{
          __typename?: 'ProjectTechnologiesCollection';
          items: Array<
            Maybe<{
              __typename?: 'Technology';
              name?: Maybe<string>;
              sys: { __typename?: 'Sys'; id: string };
              icon?: Maybe<{ __typename?: 'Asset'; url?: Maybe<string> }>;
            }>
          >;
        }>;
        sys: { __typename?: 'Sys'; id: string };
        preview?: Maybe<{ __typename?: 'Asset'; url?: Maybe<string> }>;
      }>
    >;
  }>;
};

export type ProjectsExpoQueryVariables = Exact<{ [key: string]: never }>;

export type ProjectsExpoQuery = {
  __typename?: 'Query';
  projectCollection?: Maybe<{
    __typename?: 'ProjectCollection';
    items: Array<
      Maybe<{
        __typename?: 'Project';
        name?: Maybe<string>;
        blurb?: Maybe<string>;
        priority?: Maybe<number>;
        rating?: Maybe<number>;
        exampleUrl?: Maybe<string>;
        repositoryUrl?: Maybe<string>;
        description?: Maybe<{ __typename?: 'ProjectDescription'; json: any }>;
        technologies?: Maybe<{
          __typename?: 'ProjectTechnologiesCollection';
          items: Array<
            Maybe<{
              __typename?: 'Technology';
              name?: Maybe<string>;
              sys: { __typename?: 'Sys'; id: string };
              icon?: Maybe<{ __typename?: 'Asset'; url?: Maybe<string> }>;
            }>
          >;
        }>;
        sys: { __typename?: 'Sys'; id: string };
        preview?: Maybe<{ __typename?: 'Asset'; url?: Maybe<string> }>;
      }>
    >;
  }>;
};

export type TechnologyShortItemFragment = {
  __typename?: 'Technology';
  name?: Maybe<string>;
  sys: { __typename?: 'Sys'; id: string };
  icon?: Maybe<{ __typename?: 'Asset'; url?: Maybe<string> }>;
};

export type TechnologyItemFragment = {
  __typename?: 'Technology';
  categories?: Maybe<Array<Maybe<string>>>;
  experienceRating?: Maybe<number>;
  experienceBegin?: Maybe<any>;
  name?: Maybe<string>;
  sys: { __typename?: 'Sys'; id: string };
  icon?: Maybe<{ __typename?: 'Asset'; url?: Maybe<string> }>;
};

export type TechnologiesQueryVariables = Exact<{ [key: string]: never }>;

export type TechnologiesQuery = {
  __typename?: 'Query';
  technologyCollection?: Maybe<{
    __typename?: 'TechnologyCollection';
    items: Array<
      Maybe<{
        __typename?: 'Technology';
        categories?: Maybe<Array<Maybe<string>>>;
        experienceRating?: Maybe<number>;
        experienceBegin?: Maybe<any>;
        name?: Maybe<string>;
        sys: { __typename?: 'Sys'; id: string };
        icon?: Maybe<{ __typename?: 'Asset'; url?: Maybe<string> }>;
      }>
    >;
  }>;
};

export const BaseSectionFragmentDoc = gql`
  fragment BaseSection on HomeSection {
    sys {
      id
    }
    title
    type
    height
    content {
      json
    }
  }
`;
export const ProjectShortItemFragmentDoc = gql`
  fragment ProjectShortItem on Project {
    sys {
      id
    }
    name
    blurb
    preview {
      url(transform: { width: 512, height: 288, resizeStrategy: SCALE })
    }
    priority
    rating
    exampleUrl
    repositoryUrl
  }
`;
export const TechnologyShortItemFragmentDoc = gql`
  fragment TechnologyShortItem on Technology {
    sys {
      id
    }
    name
    icon {
      url
    }
  }
`;
export const ProjectItemFragmentDoc = gql`
  fragment ProjectItem on Project {
    ...ProjectShortItem
    description {
      json
    }
    technologies: technologiesCollection(limit: 5) {
      items {
        ...TechnologyShortItem
      }
    }
  }
  ${ProjectShortItemFragmentDoc}
  ${TechnologyShortItemFragmentDoc}
`;
export const TechnologyItemFragmentDoc = gql`
  fragment TechnologyItem on Technology {
    ...TechnologyShortItem
    categories
    experienceRating
    experienceBegin
  }
  ${TechnologyShortItemFragmentDoc}
`;
export const SectionsDocument = gql`
  query Sections {
    homeSectionCollection(order: [position_ASC]) {
      items {
        ...BaseSection
      }
    }
  }
  ${BaseSectionFragmentDoc}
`;

/**
 * __useSectionsQuery__
 *
 * To run a query within a React component, call `useSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSectionsQuery(
  baseOptions?: Apollo.QueryHookOptions<SectionsQuery, SectionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SectionsQuery, SectionsQueryVariables>(
    SectionsDocument,
    options,
  );
}
export function useSectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SectionsQuery,
    SectionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SectionsQuery, SectionsQueryVariables>(
    SectionsDocument,
    options,
  );
}
export type SectionsQueryHookResult = ReturnType<typeof useSectionsQuery>;
export type SectionsLazyQueryHookResult = ReturnType<
  typeof useSectionsLazyQuery
>;
export type SectionsQueryResult = Apollo.QueryResult<
  SectionsQuery,
  SectionsQueryVariables
>;
export const ProjectsDocument = gql`
  query Projects {
    projectCollection(order: [priority_DESC, rating_DESC]) {
      items {
        ...ProjectItem
      }
    }
  }
  ${ProjectItemFragmentDoc}
`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options,
  );
}
export function useProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsQuery,
    ProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options,
  );
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<
  typeof useProjectsLazyQuery
>;
export type ProjectsQueryResult = Apollo.QueryResult<
  ProjectsQuery,
  ProjectsQueryVariables
>;
export const ProjectsExpoDocument = gql`
  query ProjectsExpo {
    projectCollection(order: [priority_DESC, rating_DESC], limit: 3) {
      items {
        ...ProjectItem
      }
    }
  }
  ${ProjectItemFragmentDoc}
`;

/**
 * __useProjectsExpoQuery__
 *
 * To run a query within a React component, call `useProjectsExpoQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsExpoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsExpoQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsExpoQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProjectsExpoQuery,
    ProjectsExpoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProjectsExpoQuery, ProjectsExpoQueryVariables>(
    ProjectsExpoDocument,
    options,
  );
}
export function useProjectsExpoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsExpoQuery,
    ProjectsExpoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProjectsExpoQuery, ProjectsExpoQueryVariables>(
    ProjectsExpoDocument,
    options,
  );
}
export type ProjectsExpoQueryHookResult = ReturnType<
  typeof useProjectsExpoQuery
>;
export type ProjectsExpoLazyQueryHookResult = ReturnType<
  typeof useProjectsExpoLazyQuery
>;
export type ProjectsExpoQueryResult = Apollo.QueryResult<
  ProjectsExpoQuery,
  ProjectsExpoQueryVariables
>;
export const TechnologiesDocument = gql`
  query Technologies {
    technologyCollection {
      items {
        ...TechnologyItem
      }
    }
  }
  ${TechnologyItemFragmentDoc}
`;

/**
 * __useTechnologiesQuery__
 *
 * To run a query within a React component, call `useTechnologiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTechnologiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTechnologiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTechnologiesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TechnologiesQuery,
    TechnologiesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TechnologiesQuery, TechnologiesQueryVariables>(
    TechnologiesDocument,
    options,
  );
}
export function useTechnologiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TechnologiesQuery,
    TechnologiesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TechnologiesQuery, TechnologiesQueryVariables>(
    TechnologiesDocument,
    options,
  );
}
export type TechnologiesQueryHookResult = ReturnType<
  typeof useTechnologiesQuery
>;
export type TechnologiesLazyQueryHookResult = ReturnType<
  typeof useTechnologiesLazyQuery
>;
export type TechnologiesQueryResult = Apollo.QueryResult<
  TechnologiesQuery,
  TechnologiesQueryVariables
>;
