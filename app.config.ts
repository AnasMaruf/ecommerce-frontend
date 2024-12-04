export default defineAppConfig({
  ui: {
    primary: "orange",
    gray: "muted",
    button: {
      rounded: "rounded-sm",
      font: "font-normal",
      padding: {
        sm: "py-3 px-5",
      },
      variant: {
        soft: "bg-{color}-100 border border-{color}-500 hover:bg-{color}-50",
      },
      color: {
        white: {
          solid: "shadow-none ring-gray-200",
        },
      },
    },
    card: {
      rounded: "rounded-none",
      ring: "ring-0",
    },
    verticalNavigation: {
      font: "font-normal",
    },
    accordion: {
      item: {
        padding: "p-0",
        color: "text-slate-800",
      },
    },
    input: {
      rounded: "rounded-sm",
    },
    checkbox: {
      label: "font-normal text-black/80",
      base: "disabled:bg-gray-100",
      rounded: "rounded-sm",
    },
    badge: {
      rounded: "rounded-sm",
    },
  },
});
