import Ember from 'ember';

export default Ember.Controller.extend({
  tickerConfig: {
      color: "red",
      timeout: 10000 //milliseconds
  },

  actions: {
    defaultTimerExpired() {
      Ember.$('#ticker1').html('Default ticker time expired');
    },

    customTimerExpired() {
      Ember.$('#ticker2').html('Custom ticker time expired');
    }
  }
});
