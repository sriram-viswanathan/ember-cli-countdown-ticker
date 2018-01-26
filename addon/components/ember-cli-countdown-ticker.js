/**
 * Usage:
 *   {{ember-cli-countdown-ticker
 *      config=config
 *      name=tickerName (optional)
 *      timerExpired=(action 'onTimerExpired')
 *   }}
 */
import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/ember-cli-countdown-ticker';
import RunMixin from 'ember-lifeline/mixins/run';

export default Component.extend(RunMixin, {
  layout,

  classNames: ['ember-cli-countdown-ticker'],

  /**
   * @property {String} name
   */
  name: null,

  /**
   * @property {Object} config
   */
  config: {},

  /**
   * @property {Object} tickerElement
   */
  tickerElement: computed(function() {
    return this.$('.ticker');
  }),

  /**
   * @method didInsertElement
   */
  didInsertElement() {
    let defaultConfig = {
      color: "#663399",
      timeout: 5000 // milliseconds
    };

    let config = this.get('config'),
      finalConfig = Object.assign(defaultConfig, config);

    let element = this.get('tickerElement');
    element.css('background', finalConfig.color);

    let elementWidth = this._getTickerWidth(),
      reductionPercentValue = elementWidth / (finalConfig.timeout / 1000); // converting to seconds

    this.set('reductionPercentValue', reductionPercentValue);

    let name = this.get('name') || 'updating-ticker#' + Date.now(); // for unique-ness

    this.pollTask('updateTicker', name); //for unique-ness
  },

  /**
   * @method updateTicker
   * @param {String} next - Token for pollTask
   */
  updateTicker(next) {
    let element = this.get('tickerElement'),
      elementWidth = this._getTickerWidth(),
      newWidth = elementWidth - this.get('reductionPercentValue');

    if (newWidth <= 0) {
      newWidth = 0;
      element.css('padding', '0');
      this.sendAction('timerExpired');
    }

    element.css('max-width', newWidth + '%');
    this.runTask(next, 1000); // milliseconds
  },

  _getTickerWidth() {
    let tickerElement = this.get('tickerElement');
    return parseFloat(tickerElement.css('max-width').replace('%', ''), 10);
  }
});
