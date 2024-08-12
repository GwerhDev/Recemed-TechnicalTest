import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

export default {
  plugins: [react(), vike()],
  test: {
    globals: true,
    environment: 'jsdom',
  }
}