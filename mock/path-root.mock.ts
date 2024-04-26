import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
    url: '/login/',
    status: 302,
    headers: {
        location: '/'
    }
})
