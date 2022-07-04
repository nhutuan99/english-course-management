export default function(context) {
  context.store.dispatch('initToken', context.req)
}
