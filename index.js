/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-countdown-ticker',

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/ember-cli-countdown-ticker.css');
  }
};
