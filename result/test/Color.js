'use strict';

var test = require('tape')
var Color = require('../src/js/Color.js')

test('Color is returned', function(t) {
  t.plan(1)
  t.equal(Boolean(Color), true)
})

test('hex to rgb conversion', function(t) {
  var rgbRed = new Color('#ff0000').rgb
  t.plan(3)
  t.equal(rgbRed[0], 255)
  t.equal(rgbRed[1], 0)
  t.equal(rgbRed[2], 0)
})

test('changing channels', function(t) {
  var red = new Color('#000000')
  red.modC(0, 255)
  red.modC(1, 32)
  t.plan(1)
  t.equal(red.hex, '#ff2000')
})

test('changing channels over the limit', function(t) {
  var red = new Color('#ff0000')
  red.modC(0, -Infinity)
  red.modC(1, Infinity)
  t.plan(1)
  t.equal(red.hex, '#00ff00')
})

test('changing an invalid channel', function(t) {
  var red = new Color('#ff0000')
  red.modC(3, 33)
  t.plan(1)
  t.equal(red.hex, '#ff0000')
})


//
