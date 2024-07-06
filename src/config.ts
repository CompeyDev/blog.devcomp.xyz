import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
  title: "compey's blog",
  subtitle:
    "A blog where I occassionally post about my development experiences :^)",
  lang: "en",
  themeColor: {
    hue: 295,
    fixed: true,
  },
  banner: {
    enable: false,
    src: "assets/images/demo-banner.png",
    position: "center",
  },
  favicon: [
    {
      src: "/favicon-dark.png",
      theme: "dark",
      sizes: "32x32",
    },
    {
      src: "/favicon-light.png",
      theme: "light",
      sizes: "32x32",
    },
  ],
};

export const navBarConfig: NavBarConfig = {
  links: [LinkPreset.Home, LinkPreset.Archive, LinkPreset.About],
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/CompeyDev.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: "compey",
  bio: "ur local developer | 8 bit enthusiast | rust <3",
  links: [
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/CompeyDev",
    },
    {
      name: "Twitter",
      icon: "fa6-brands:twitter",
      url: "https://twitter.com/DevComp_",
    },
    {
      name: "Mastodon",
      icon: "fa6-brands:mastodon",
      url: "https://mas.to/@DevComp",
    },
    {
      name: "Spotify",
      icon: "fa6-brands:spotify",
      url: "https://open.spotify.com/user/ouauk3ftumdwxokxn5jxb5kxw",
    },
  ],
};

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};
