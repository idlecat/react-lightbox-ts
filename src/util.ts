const globalAny = global as any;
/**
 * Placeholder for future translate functionality
 */
export function getWindowWidth() {
  return typeof globalAny.window !== 'undefined'
    ? globalAny.window.innerWidth
    : 0;
}

export function getWindowHeight() {
  return typeof globalAny.window !== 'undefined'
    ? globalAny.window.innerHeight
    : 0;
}

// Get the highest window context that isn't cross-origin
// (When in an iframe)
export function getHighestSafeWindowContext(
  self: Window = globalAny.window.self
) {
  const { referrer } = self.document;
  // If we reached the top level, return self
  if (self === globalAny.window.top || !referrer) {
    return self;
  }

  const getOrigin = href => href.match(/(.*\/\/.*?)(\/|$)/)[1];

  // If parent is the same origin, we can move up one context
  // Reference: https://stackoverflow.com/a/21965342/1601953
  if (getOrigin(self.location.href) === getOrigin(referrer)) {
    return getHighestSafeWindowContext(self.parent);
  }

  // If a different origin, we consider the current level
  // as the top reachable one
  return self;
}
