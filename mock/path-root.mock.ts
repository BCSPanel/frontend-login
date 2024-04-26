import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
    url: '/',
    status: 302,
    headers: {
        location: '/login/'
    }
})
