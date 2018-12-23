import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const NEXT_BUTTON = ".flickity-prev-next-button.next";
const PREV_BUTTON = ".flickity-prev-next-button.previous";
const PAGE_DOTS = ".flickity-page-dots";

module('Integration | Component | em-flickity', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{em-flickity}}`);
    assert.equal(this.$().html().includes('flickity-wrapper'), true);
  });

  test('hides flickity controls if false', async function(assert) {
    // Template block usage:
    await render(hbs`{{em-flickity}}`);
    assert.equal(this.$().find(NEXT_BUTTON).length, 0);
    assert.equal(this.$().find(PREV_BUTTON).length, 0);
  });

  test('hides flickity controls if true', async function(assert) {
    // Template block usage:
    await render(hbs`
          {{#em-flickity showSlides=true}}
            <div id="slide-1"></div>
            <div id="slide-2"></div>
          {{/em-flickity}}
      `);
    assert.equal(this.$().find(NEXT_BUTTON).length, 1);
    assert.equal(this.$().find(PREV_BUTTON).length, 1);
  });

  test('passes options to flickity', async function (assert) {
    // Template block usage:
    await render(hbs`
          {{#em-flickity pageDots=true showSlides=true}}
        {{/em-flickity}}
      `);
    assert.equal(this.$().find(PAGE_DOTS).length, 1);
  });
  
  [
    "ready",
    "change",
    "select",
    "settle",
    "scroll",
    "dragStart",
    "dragMove",
    "dragEnd",
    "pointerDown",
    "pointerMove",
    "pointerUp",
    "staticClick",
    "lazyLoad",
    "bgLazyLoad",
    "fullscreenChange"
  ].forEach(event => {
    test(`binds to the ${event} flickity event`, async function (assert) {
      let eventCalled;

      this.set("handler", () => { 
        //console.log("Event", event);
        eventCalled = true; 
      });
      await render(hbs`
          {{#em-flickity showSlides=true 
              ready=(action handler) change=(action handler) 
              cellSelect=(action handler) select=(action handler)
              settle=(action handler) scroll=(action handler)
              dragStart=(action handler) dragMove=(action handler)
              dragEnd=(action handler) pointerDown=(action handler)
              pointerMove=(action handler) pointerUp=(action handler)
              staticClick=(action handler) lazyLoad=(action handler)
              bgLazyLoad=(action handler) }}
            <div id="slide-1"></div>
            <div id="slide-2"></div>
          {{/em-flickity}}
          `);
      // this.$('.flickity-wrapper').trigger(`${event}.flickity`);
      assert.equal(eventCalled, true);
    });
  });
});
