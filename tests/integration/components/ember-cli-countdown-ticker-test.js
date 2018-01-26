import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import { pollTaskFor } from 'ember-lifeline/mixins/run';

moduleForComponent('ember-cli-countdown-ticker', 'Integration | Component | ember cli countdown ticker', {
  integration: true
});

test('check countdown ticker with default config', function(assert) {
  this.render(hbs`
    {{ember-cli-countdown-ticker
      name='defaultConfigTimer'}}
  `);

  let tickerElement = this.$('.ticker');

  return wait()
  .then(() => {
    assert.equal(
      tickerElement.css('max-width'),
      '80%',
    'Ticker width reduced');
    pollTaskFor('defaultConfigTimer');
    return wait();
  })
  .then(() => {
    assert.equal(
      tickerElement.css('max-width'),
      '60%',
    'Ticker width reduced');
    pollTaskFor('defaultConfigTimer');
    return wait();
  })
  .then(() => {
    assert.equal(
      tickerElement.css('max-width'),
      '40%',
    'Ticker width reduced');
    pollTaskFor('defaultConfigTimer');
    return wait();
  })
  .then(() => {
    assert.equal(
      tickerElement.css('max-width'),
      '20%',
    'Ticker width reduced');
    pollTaskFor('defaultConfigTimer');
    return wait();
  })
  .then(() => {
    assert.equal(
      tickerElement.css('max-width'),
      '0%',
    'Ticker Expired after 5 seconds with default config');
    return wait();
  });
});

test('check countdown ticker with custom config', function(assert) {
  let config = {
    timeout: 3000
  };
  this.set('config', config);
  this.render(hbs`
    {{ember-cli-countdown-ticker
      config=config
      name='customConfigTimer'}}
  `);

  let tickerElement = this.$('.ticker');

  return wait()
  .then(() => {
    assert.equal(
      tickerElement.css('max-width'),
      '66.6667%',
    'Ticker width reduced');
    pollTaskFor('customConfigTimer');
    return wait();
  })
  .then(() => {
    assert.equal(
      tickerElement.css('max-width'),
      '33.3334%',
    'Ticker width reduced');
    pollTaskFor('customConfigTimer');
    return wait();
  })
  .then(() => {
    assert.equal(
      tickerElement.css('max-width'),
      '6.66667e-05%',
    'Ticker width reduced');
    pollTaskFor('customConfigTimer');
    return wait();
  })
  .then(() => {
    assert.equal(
      tickerElement.css('max-width'),
      '0%',
    'Ticker Expired after 3 seconds with custom config');
    pollTaskFor('customConfigTimer');
    return wait();
  });
});
