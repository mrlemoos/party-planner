export default function resetColorSchemeToSystemPreferences() {
  const $html = document.documentElement;
  $html.style.colorScheme = 'initial';
}
