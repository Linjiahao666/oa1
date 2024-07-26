import { createApp } from "vue";
import { useBus } from '@/hooks/useBus.ts'
const { bus } = useBus()
class Modal {
  public vm: any = null
  constructor(component: any) {
    const app = createApp(component)
    this.vm = app.mount(document.createElement('div'))
    bus.$on('route-change', this.destroy)
  }
  static getInstance() { }

  show() {
    this.vm.visible = true;
  }

  hide() {
    this.vm.visible = false;
  }

  destroy() {
    if (this.vm) {
      this.vm.$el.remove()
      this.vm = null
      bus.$off('route-change', this.destroy)
    }
  }

}

export default Modal;