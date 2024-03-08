export default ['true', '1'].includes(
    new URLSearchParams(document.location.search).get('r')?.toLocaleLowerCase() as string
)
