import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
    url: '/api-login/color-scheme',
    body: '\n',
    type: 'text/plain',
})
