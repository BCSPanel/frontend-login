import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
    url: '/api/color-scheme/',
    body: '',
    type: 'text/plain',
})
