export default function switchSessionColorScheme(colorScheme: "dark" | "light") {
  const $html = document.documentElement;
  $html.style.colorScheme = colorScheme;
}
