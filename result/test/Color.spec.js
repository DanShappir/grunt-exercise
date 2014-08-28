'use strict';

var Color

describe('Color.js', function() {

  beforeEach(function() {
    Color = Color || require('../src/js/Color.js')
  })

  it('should have Color defined', function() {
    expect(Color).toBeDefined()
  })

  it('should handle hex to rgb conversion', function() {
    var rgbRed = new Color('#ff0000').rgb
    expect(rgbRed[0]).toEqual(255)
    expect(rgbRed[1]).toEqual(0)
    expect(rgbRed[2]).toEqual(0)
  })

  it('should handle changing channels', function() {
    var red = new Color('#000000')
    red.modC(0, 255)
    red.modC(1, 32)
    expect(red.hex).toEqual('#ff2000')
  })

  it('should handle changing channels over the limit', function() {
    var red = new Color('#ff0000')
    red.modC(0, -Infinity)
    red.modC(1, Infinity)
    expect(red.hex).toEqual('#00ff00')
  })

  it('should handle changing an invalid channel', function() {
    var red = new Color('#ff0000')
    red.modC(3, 33)
    expect(red.hex).toEqual('#ff0000')
  })


})

//
