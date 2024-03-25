// tooltipPlugin.js

import { createApp } from 'vue';
import VTooltip from 'v-tooltip';

export default {
  install(app) {
    app.directive('tooltip', VTooltip);
  }
};
