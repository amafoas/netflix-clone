// Client only
export function getItemsPerScreen () : number {
  return parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--items-per-screen')
  )
}
