import QRCode from 'qrcode'

export async function generateQRDataUrl(
  text: string,
  options: { size?: number; dark?: string; light?: string } = {}
): Promise<string> {
  const { size = 220, dark = '#1a1a1a', light = '#ffffff' } = options
  return QRCode.toDataURL(text || 'https://example.com', {
    width: size,
    margin: 2,
    errorCorrectionLevel: 'M',
    color: { dark, light },
  })
}
