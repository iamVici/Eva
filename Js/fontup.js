if ('fonts' in document) {
    console.log('Font API supported')
    
    var font = new FontFace("ClashDisplay-Bold",  "url(Fonts/ClashDisplay-Bold.woff2) format('woff2')");
    
    font.load().then(function() {
      document.fonts.add(font);
      document.body.style.fontFamily = "ClashDisplay-Bold"; 
    });
  }
  