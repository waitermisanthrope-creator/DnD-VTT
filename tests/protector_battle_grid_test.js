const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const window = {};
const context = {
  window,
  document: { readyState: 'loading', addEventListener() {} },
  isFinite, Number, String, Object, Array, JSON, Math,
  setTimeout, clearTimeout
};
window.currentChar = {
  id: 'saved-hero',
  name: 'Protector',
  initiativeTracker: {
    round: 1,
    activeIndex: 0,
    combatants: [
      { id: 'ally-1', name: 'Ally', type: 'hero', hp: 0, maxHp: 12 },
      { id: 'foe-1', name: 'Enemy', type: 'enemy', hp: 10, maxHp: 10 }
    ],
    battlefield: {
      version: 3, cols: 8, rows: 8, cellFt: 5,
      tokens: {
        'bt_ally-1': { id: 'bt_ally-1', sourceId: 'ally-1', name: 'Ally', type: 'hero', x: 1, y: 1, size: 1, speed: 30, visible: true },
        'bt_foe-1': { id: 'bt_foe-1', sourceId: 'foe-1', name: 'Enemy', type: 'enemy', x: 6, y: 6, size: 1, speed: 30, visible: true }
      },
      obstacles: {}, difficultTerrain: {}, cover: {}, walls: []
    }
  }
};
vm.runInNewContext(fs.readFileSync(require.resolve('../app/battle_board.js'), 'utf8'), context);
const board = window.DNDBattleBoard;
assert(board, 'battle board exports its API');

let valid = board.validateRescueMove('ally-1', 2, 1, 5);
assert.strictEqual(valid.ok, true, 'a free adjacent cell is accepted');
assert.strictEqual(valid.distanceFt, 5, 'board computes actual movement distance');
assert.strictEqual(valid.pathCostFt, 5, 'board computes actual path cost');

let occupied = board.validateRescueMove('ally-1', 6, 6, 10);
assert.strictEqual(occupied.ok, false, 'occupied cell is rejected');
assert(occupied.reason.includes('занята'), 'occupied-cell error is explicit');

let tooFar = board.validateRescueMove('ally-1', 4, 1, 5);
assert.strictEqual(tooFar.ok, false, 'cell beyond the movement limit is rejected');

let outside = board.validateRescueMove('ally-1', 8, 1, 10);
assert.strictEqual(outside.ok, false, 'cell outside the grid is rejected');

window.currentChar.initiativeTracker.battlefield.obstacles['2:1'] = 1;
let blocked = board.validateRescueMove('ally-1', 2, 1, 10);
assert.strictEqual(blocked.ok, false, 'blocked cell is rejected');
delete window.currentChar.initiativeTracker.battlefield.obstacles['2:1'];

const moved = board.moveRescuedCombatant('ally-1', 2, 1, 5);
assert.strictEqual(moved.ok, true, 'valid rescue movement commits');
assert.strictEqual(board.findToken('bt_ally-1').x, 2, 'battle token moves to the validated cell');
assert.strictEqual(window.currentChar.initiativeTracker.combatants[0].x, 2, 'combatant coordinates stay in sync');
assert.deepStrictEqual(JSON.parse(JSON.stringify(window.currentChar.initiativeTracker.combatants[0].position)), { x: 2, y: 1 }, 'combatant position stays in sync');

console.log('Protector battle-grid tests passed.');
