import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      sans: ["Roboto", "system-ui"],
    },
    extend: {
      colors: {
        orange: {
          "50": "#FDEFEC",
          "100": "#FCDBD5",
          "200": "#F8B7AA",
          "300": "#F59380",
          "400": "#F16F55",
          "500": "#EE4D2D",
          "600": "#D03111",
          "700": "#9C240D",
          "800": "#681808",
          "900": "#340C04",
          "950": "#1C0702",
        },
        muted: {
          "50": "#fbfbfb",
          "100": "#efefef",
          "200": "#dcdcdc",
          "300": "#bdbdbd",
          "400": "#989898",
          "500": "#7c7c7c",
          "600": "#656565",
          "700": "#525252",
          "800": "#464646",
          "900": "#3d3d3d",
          "950": "#292929",
        },
      },
    },
  },
  safelist: [
    {
      pattern: /border-primary-(50|100|200|300|400|500|600|700|800|950)/,
      variants: ["hover", "focus"],
    },
  ],
};
