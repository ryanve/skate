!function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make()
  else root[name] = make()
}(this, 'skate', function() {

  return function skate() {
    var o = {}
    var has = o.hasOwnProperty
    
    function state(k, v) {
      var n = arguments.length
      if (n == 2) {
        if (state(k) !== v) {
          o[k] = v
          state.emit(k)
        }
        return v
      }
      if (!n) return state.raw()
      if (has.call(o, k)) return o[k]
    }

    state.raw = function() { return o }
    state.kill = function() {
      var last = state.raw()
      o = {}
      return last
    }
    state.emit = function() {}
    return state
  }
});