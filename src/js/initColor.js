
function initColor(keyCatcher, backgroundEl, textEl) {
  if (!Color) throw Error('Color class is missing.')
  if (!keyCatcher.keydown || !backgroundEl.css || !textEl.html) throw Error('arguments do not seem to be jquery nodes.')

  function setColor(c) {
    window.localStorage.one_color_page = c.hex
    backgroundEl.css({
      'background-color': c.hex,
    })
    textEl.html(c.hex + '<br /><br />' + c.rgb.join(' '))
  }


  var c = new Color(window.localStorage.one_color_page || '#ffffff')
  setColor(c)
  keyCatcher.keydown(function(e) {
         if (e.which === 82) c.modC(0,+1)
    else if (e.which === 84) c.modC(0,-1)
    else if (e.which === 71) c.modC(1,+1)
    else if (e.which === 72) c.modC(1,-1)
    else if (e.which === 66) c.modC(2,+1)
    else if (e.which === 78) c.modC(2,-1)
    else return
    setColor(c)
  })
}
