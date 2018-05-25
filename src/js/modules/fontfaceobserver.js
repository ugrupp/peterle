import FontFaceObserver from 'fontfaceobserver';

// FontfaceObserver webfont helper script.
// Right now, we're only watching the CI font (League Gothic). The body font body flag will be triggered directly by Typekit (wf-active).

// Helper function to transform the raw font data below into a flattened array of FontFaceObserver objects.
function transformFontData(fontData) {
  return fontData.reduce((totalObservers, fontObj) => {
    let currentOberservers = fontObj.styles.reduce((totalObserversStyle, styleObj) => {
      let currentObserversStyle = styleObj.styles.map((style) => {
        return new FontFaceObserver(fontObj.name, {
          weight: styleObj.weight,
          style: style,
        });
      });
      return [...totalObserversStyle, ...currentObserversStyle];
    }, []);
    return [...totalObservers, ...currentOberservers];
  }, []);
}

// CI font
const fontsCi = transformFontData([
  {
    name: 'League Gothic',
    styles: [
      {
        weight: 400,
        styles: [
          'normal',
          'italic',
        ],
      },
    ],
  },
]);

// Load CI fonts
let fontsCiLoadedPromises = fontsCi.map((fontFaceObserverObj) => {
  // timeout: 5s
  return fontFaceObserverObj.load(null, 7000);
});

// As soon as the fonts are loaded, set a body flag
Promise.all(fontsCiLoadedPromises).then(() => {
  document.body.classList.add('has-loaded-fonts-ci');
});
