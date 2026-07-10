import { toPng } from 'html-to-image'

/**
 * Renders an off-screen element at exactly 1080×1350 and captures it as PNG.
 * Guards against missing Google Fonts by waiting for document.fonts.ready.
 */
export async function captureCardElement(element: HTMLElement): Promise<string> {
  // Critical: wait for all fonts to load before capture.
  // Without this, html-to-image silently falls back to system fonts.
  await document.fonts.ready

  // Small extra settle time for background images / QR canvas to paint
  await new Promise(r => setTimeout(r, 80))

  return toPng(element, {
    width: 1080,
    height: 1350,
    pixelRatio: 1,
    cacheBust: true,
    style: {
      // Ensure the element itself matches the capture size
      width: '1080px',
      height: '1350px',
      overflow: 'hidden',
    },
  })
}

/**
 * Creates and manages an off-screen container for card rendering.
 * Returns cleanup function.
 */
export function createOffscreenContainer(): { container: HTMLDivElement; cleanup: () => void } {
  const container = document.createElement('div')
  container.style.cssText = [
    'position:fixed',
    'top:-9999px',
    'left:-9999px',
    'width:1080px',
    'height:1350px',
    'overflow:hidden',
    'pointer-events:none',
    'z-index:-1',
  ].join(';')
  document.body.appendChild(container)
  return { container, cleanup: () => { if (container.parentNode) container.parentNode.removeChild(container) } }
}
