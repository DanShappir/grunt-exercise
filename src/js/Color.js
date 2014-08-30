(function() {
  'use strict';

  // Color.prototype.negativeRgb = function() {
  //   return this.rgb.map(function(c){return 255-c})
  // }

  function Color(hex) {
    this.hex = hex
    this.rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.hex).slice(1).map(function(v) {
      return parseInt(v, 16)
    })
  }

  Color.prototype.modC = function(channel, change) {
    if (!~[0,1,2].indexOf(channel)) return
    this.rgb[channel] = Math.min(Math.max(0, this.rgb[channel] + change), 255)
    this.hex = '#' + this.rgb.map(function(c) {
      var h = c.toString(16)
      return h.length == 1 ? '0' + h : h
    }).join('')
  }

  if (typeof module !== 'undefined') {
    module.exports = Color
  } else if (typeof window !== 'undefined') {
    window.Color = Color
  }

})()
