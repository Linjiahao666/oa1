import styles from './css/dragSize.module.scss';

export default {
  mounted(el, binding) {
    const parent = el.parentNode;
    const prev = el.previousElementSibling;
    const [minI = 0, maxP = 0] = binding.value || []
    if (!prev) {
      console.error('No previous sibling element found.');
      return;
    }
    const initHeight = el.offsetHeight;
    const prevHeight = prev.offsetHeight;
    function startResize(event) {
      const startY = event.clientY;
      function doResize(e) {
        const diff = e.clientY - startY;
        const newHeight = initHeight - diff;
        const newPrevHeight = prevHeight + diff;
        if ((minI && newHeight < minI) || (maxP && newPrevHeight < maxP)) {
          return;
        }
        el.style.height = `${newHeight}px`;
        prev.style.height = `${newPrevHeight}px`;
      }
      function stopResize() {
        window.removeEventListener('mousemove', doResize);
        window.removeEventListener('mouseup', stopResize);
      }
      window.addEventListener('mousemove', doResize);
      window.addEventListener('mouseup', stopResize);
    }

    const bar = document.createElement('div');
    bar.className = styles['resize-handle'];
    if (binding.modifiers.vertical) {
      bar.classList.add(styles['vertical'])
    }
    bar.onmousedown = startResize;
    parent.insertBefore(bar, el);
  }
};