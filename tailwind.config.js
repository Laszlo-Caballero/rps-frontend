/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svg}"],
  theme: {
    extend: {
      colors: {
        BackgroundRadientP: "hsl(214, 47%, 23%)",
        BackgroundRadientR: "hsl(237, 49%, 15%)",
        TextScore: "hsl(229, 64%, 46%)",
        DarkText: "hsl(229, 25%, 31%)",
        PaperGradientT: "hsl(230, 89%, 62%)",
        PaperGradientB: "hsl(230, 89%, 62%)",
        RockGradientT: "hsl(349, 71%, 52%)",
        RockGradientB: "hsl(349, 70%, 56%)",
        ScissorGradientT: "hsl(39, 89%, 49%)",
        ScissorGradientB: "hsl(40, 84%, 53%)",
      },
      fontFamily: {
        BarlowRegular: "BarlowRegular",
        BarlowMedium: "BarlowMedium",
        BarlowBlod: "BarlowBlod",
      },
    },
  },
  plugins: [],
};
