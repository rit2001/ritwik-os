export type SocialLink = {
  key: "linkedin" | "github" | "leetcode" | "codeforces" | "x";
  label: string;
  href: string;
  primary: boolean;
};

export const socialLinks = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ritwik-biswas-958318234/",
    primary: true,
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/rit2001",
    primary: true,
  },
  {
    key: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/Britwik2025/",
    primary: false,
  },
  {
    key: "codeforces",
    label: "Codeforces",
    href: "https://codeforces.com/profile/Eagle2.00",
    primary: false,
  },
  {
    key: "x",
    label: "X",
    href: "https://x.com/RITWIKB66020553",
    primary: false,
  },
] as const satisfies readonly SocialLink[];

export const primarySocialLinks = socialLinks.filter((link) => link.primary);

export function getSocialLink(key: SocialLink["key"]) {
  return socialLinks.find((link) => link.key === key);
}
