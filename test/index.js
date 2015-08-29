!function(root, name) {
  var common = typeof module != 'undefined' && !!module.exports
  var aok = common ? require('aok') : root.aok
  var api = common ? require('../src') : root[name]

  try {
    console.dir(api)
  } catch(e) {}

  function bump() {
    ++bump.emitted
  }

  bump.reset = function() {
    bump.emitted = 0
    return bump
  }

  aok('get', function() {
    var state = api()
    if (state('anything') !== void 0) return false
    if (state('toString') !== void 0) return false
    return true
  })

  aok('set-get', function() {
    var state = api()
    if (state('user', 47) !== 47) return false
    if (state('user') !== 47) return false
    return true
  })

  aok('change', function() {
    var state = api()
    state.emit = bump.reset()
    state('user', 47)
    return 1 === bump.emitted
  })

  aok('no-change', function() {
    var state = api()
    state('user', 47)
    state.emit = bump.reset()
    state('user', 47)
    return 0 === bump.emitted
  })

  aok('raw-access', function() {
    var state = api()
    if (!(state.raw() instanceof Object)) return false
    state.raw().hoping = true
    return state('hoping') === true
  })

  aok('raw-custom', function() {
    var state = api()
    state.raw = function() { return true }
    return state() === true
  })

  aok('kill', function() {
    var state = api()
    state('chillin', 'villian')
    state.kill()
    return state('chillin') === void 0
  })

  aok('killed', function() {
    var state = api()
    var raw = state.raw()
    var killed = state.kill()
    if (raw !== killed) return false
    return state.raw() !== raw
  })
}(this, 'skate');
