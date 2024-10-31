module.exports = {
  // eslint-disable-next-line import/no-extraneous-dependencies
  plugins: [require("tailwindcss-rtl")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        "4xl": "2rem",
        "5xl": "4rem",
        "6xl": "8rem",
        "7xl": "10rem",
      },
      spacing: {
        112: "28rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
        176: "44rem",
        182: "48rem",
        200: "60rem",
        210: "95rem",
      },
      screens: {
        "2xl": "1540px",
      },
      fontSize: {
        xxs: ["0.49rem", "0.49rem"],
      },
      colors: {
        stone: {
          250: "#eceae4",
        },
        neutral: {
          450: "#818181",
          650: "#4d4d4d",
          750: "#333333",
          775: "#232323",
          1000: "#0d0d0d",
        },
        cream: "#d8cfbf",
        creamer: "#cdc0b1",
        creamy: "#baae9b",
        cafe: "#a29876",
        late: "#6b5f4e",
        beige: "#a2987b",
        golden: "#b89564",
        darkgray: "#0c0c0c",
      },
    },
  },
};
