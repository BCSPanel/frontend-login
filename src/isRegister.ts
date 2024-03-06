export default ['true', '1'].includes(
    new URLSearchParams(window.location.search).get('r')?.toLocaleLowerCase() as string
)
