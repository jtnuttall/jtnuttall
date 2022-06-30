declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    hero?: true;
  }
  interface TypographyVariantsOptions {
    hero: React.CSSProperties;
  }
}

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    hero?: React.CSSProperties;
  }
}