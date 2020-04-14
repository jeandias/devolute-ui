import React from 'react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

export default props => (
  <ToastsContainer store={ToastsStore}
                   position={ToastsContainerPosition.TOP_RIGHT}
  />
)