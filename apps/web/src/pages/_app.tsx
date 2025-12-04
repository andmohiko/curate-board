import type { AppProps } from 'next/app'
import 'react-image-crop/dist/ReactCrop.css'

import { Providers } from '~/providers'
import '~/styles/globals.css'
import '~/styles/reset.css'
import '~/styles/variables.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
