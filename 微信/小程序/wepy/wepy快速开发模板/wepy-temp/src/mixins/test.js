import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  };

  methods = {
    tap () {
      this.mixin = 'mixin data was changed'
      console.log('mixin method tap')
    }
  };

  onShow = function() {
    console.log('mixin onShow')
  };

  onLoad = function() {
    console.log('mixin onLoad')
  }
}
