import { getUrlHome } from '~/helpers'

export default function ({ store, redirect }) {
  if (store.state.author.currentUser) {
    return redirect(getUrlHome())
  }
}
