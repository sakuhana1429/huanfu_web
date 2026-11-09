import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import SearchBox from './SearchBox.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(SearchBox),
    })
  },
}
