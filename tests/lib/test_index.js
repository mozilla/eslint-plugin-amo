const assert = require('assert');

const plugin = require('../../lib');

describe('plugin', () => {
  it('exports all rules', () => {
    assert.ok(typeof plugin.rules === 'object');
  });

  it('exports a set of configurations', () => {
    assert.ok(typeof plugin.configs === 'object');
  });

  it('provides a "recommended" configuration', () => {
    const config = plugin.configs.recommended;

    assert.ok(typeof config === 'object');
    assert.deepEqual(config.plugins, ['amo']);
    assert.ok(typeof config.rules === 'object');
    assert.ok(config.rules['amo/only-tsx-files'] === undefined);
  });

  it('provides a "typescript" configuration', () => {
    const config = plugin.configs.typescript;

    assert.ok(typeof config === 'object');
    assert.deepEqual(config.plugins, ['amo']);
    assert.ok(typeof config.rules === 'object');
    assert.ok(config.rules['amo/only-tsx-files'] !== undefined);
  });
});
