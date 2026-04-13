/**
 * Thin wrapper around posthog.capture() that uses a dynamic import
 * so the 130KB posthog-js bundle is code-split and not included
 * in the initial page load.
 */
export function capture(event: string, properties?: Record<string, unknown>): void {
  import('posthog-js').then(({ default: posthog }) => {
    if (posthog.__loaded) {
      posthog.capture(event, properties)
    }
  })
}
