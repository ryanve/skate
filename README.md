# skate
#### Manage app state

```sh
npm install skate --save
```

## Examples

### Basic usage

```js
var skate = require('skate')
var state = skate()
state('user', 47) // 47
state('user') // 47
state('dreaming', true) // true
state() // calls state.raw()
state.raw() // {user: 47, dreaming: true}
state('dreaming', false)
state.kill() // {user: 47, dreaming: false}
state.raw() // {}
```

### Multiple instances

```js
var skate = require('skate')
var you = skate()
var me = skate()
you('talking', true)
me('listening', true)
```

## Extension

### Use an [event emitter](https://github.com/ryanve/energy) to emit events when states change

```js
var state = require('skate')()
var emitter = require('energy')()
state.emit = function(changedStateName) {
  emitter.emit(changedStateName)
}
```

### Prevent access to the state hash

```
var state = require('skate')()
state.raw = function() {}
state('user', 47)
state() // undefined
```

[View the source](skate.js) to see how this works

## Playground
[Try `skate` in your browser](http://ryanve.github.io/skate/)
