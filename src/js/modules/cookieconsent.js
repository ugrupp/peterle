import 'cookieconsent';

window.addEventListener('load', () => {
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#847465",
        "text": "#ffffff"
      },
      "button": {
        "background": "#ffffff",
        "text": "#847465"
      }
    },
    "theme": "edgeless",
    "position": "bottom-right",
    "content": {
      "message": "Wir verwenden Cookies. Durch die weitere Nutzung unserer Website stimmen Sie der Verwendung dieser Cookies zu.",
      "dismiss": "Verstanden",
      "link": "Mehr erfahren?",
      "href": "https://www.hotel-peterle.de/datenschutz/"
    }
  });
});
