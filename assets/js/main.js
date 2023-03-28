import * as params from '@params';
import LazyLoad from 'vanilla-lazyload'
import './components/carousel'
import './components/lazy-video'

new LazyLoad({ // eslint-disable-line no-new
    elements_selector: '.lazy'
})
