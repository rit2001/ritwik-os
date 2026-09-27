export type AlgorithmProfile = {
  platform: "LeetCode" | "Codeforces";
  status: string;
  profileUrl: string;
  stats: readonly {
    label: string;
    value: string;
  }[];
};

export const algorithmProfiles = [
  {
    platform: "LeetCode",
    status: "Knight",
    profileUrl: "https://leetcode.com/u/Britwik2025/",
    stats: [
      { label: "Peak rating", value: "1923" },
      { label: "Percentile", value: "Top 5.6%" },
      { label: "Problems solved", value: "1,550+" },
      { label: "Problem-of-the-Day streak", value: "600+ days" },
    ],
  },
  {
    platform: "Codeforces",
    status: "Specialist",
    profileUrl: "https://codeforces.com/profile/Eagle2.00",
    stats: [
      { label: "Peak rating", value: "1415" },
      {
        label: "Notable result",
        value: "Global Rank 818 in Codeforces Round 952",
      },
    ],
  },
] as const satisfies readonly AlgorithmProfile[];

export const achievementSignals = [
  "Amazon ML Summer School 2024",
  "Top 3 in GCOS 2024 at IIT Kharagpur",
  "Top 5 in Overnite at Kshitij, IIT Kharagpur",
  "Shyamal Ghosh & Sunanda Ghosh Endowment Honour",
] as const;
