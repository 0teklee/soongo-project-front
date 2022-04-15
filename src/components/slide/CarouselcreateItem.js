const createItem = (position, idx, activeIdx, _items, slideWidth, kind) => {
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`,
      transitionDuration: '1000ms',
    },
    goso: _items[idx],
  };

  if (kind === 'goso') {
    const length = 6;
    switch (position) {
      case length - 2:
      case length - 1:
      case length:
      case length + 1:
      case length + 2:
      case length + 3:
        break;
      default:
        item.styles = { ...item.styles, opacity: 0 };
        break;
    }
  } else if (kind === 'service') {
    const length = 5;

    switch (position) {
      case length - 1:
      case length:
      case length + 1:
      case length + 2:
        break;
      default:
        item.styles = { ...item.styles, opacity: 0 };
        break;
    }
  } else if (kind === 'banner') {
    const length = 2;

    switch (position) {
      case length - 1:
      case length:
      case length + 1:
        break;
      default:
        item.styles = { ...item.styles, opacity: 0 };
        break;
    }
  }

  return item;
};

export default createItem;
