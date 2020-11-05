# Animations

Styled React animations are defined using plain javascript objects with properties to represent the type off css animation, duration, and count.

## In Animation

The `in` animation property receives a plain javascript object that represents the animation keyframes using either the keywords `from` and `to` or using `0%` up to `100%` representation

When using the `in` animation the `duration_in` property is required as this defines how long it will take for the animation to start until end

```javascript
  <Box
    animation={{
      in: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      duration_in: 3
    }}
  >
    Im animating "in"
  </Box>
```
## Out Animation

The `out` animation property receives a plain javascript object that represents the animation keyframes using either the keywords `from` and `to` or using `0%` up to `100%` representation

When using the `out` animation the `duration_out` property is required as this defines how long it will take for the animation to animate out after rendering on screen

```javascript
  <Box
    animation={{
      out: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      duration_out: 3
    }}
  >
    Im animating "out"
  </Box>
```

## Continuous Animation

The continuous animation uses keyframes to animate between the `from` and `to` values infinitely.

The `continuous` animation property receives a plain javascript object that represents the animation keyframes using either the keywords `from` and `to` or using `0%` up to `100%` representation

When using the `continuous` animation the `duration_continuous` property is required, this defines how many seconds between the `from` and `to` keyframes

```javascript
  <Box
    animation={{
      continuous: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      duration_continuous: 3
    }}
  >
    Im "continuously" animating
  </Box>
```

## Combining Animations

Multiple animations can be used if needing to transition between `in`, `out`, and `continuous` animations. When using `in` and `out` animations the property `delay_between` must be used which sets the amount of time between the end of the `in` animation and the `out` animation. When using the `continuous` animation with `in` or `out` the `delay_between` cannot be used.

```javascript
  <Box animation={{
    in: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    delay_between: 4,
    out: {
      from: { "background-color": "red" },
      to: { "background-color": "yellow" }
    },
    duration_out: 4,
    duration_in: 2,
    animation_fill_mode: "forwards"
  }}
  >
    Im animating "in" then "out"
  </Box>
```

```javascript
  <Box animation={{
    in: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    continuous: {
      from: { "background-color": "red" },
      to: { "background-color": "yellow" }
    },
    duration_continuous: 4,
    duration_in: 2,
    animation_fill_mode: "forwards"
  }}>
    Im animating "in" then "continuosly"
  </Box>
```

## Animation Timing Helpers

### delay_in

The `delay_in` property can be used with the `in`, `out` and `continuous` animation to specify how many seconds before the animation should begin

```javascript
  <Box animation={{
    in: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    duration_in: 5,
    delay_in: 10
  };}>
    Im animating "in" after 10 seconds
  </Box>
```

### iteration

The `iteration` property can be used with the `in` and `out` animations and sets how many times an animation will be performed

```javascript
  <Box animation={{
    in: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    duration_in: 5,
    iteration: 3
  };}>
    Im animating "in" after 10 seconds
  </Box>
```