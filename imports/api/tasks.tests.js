import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'testuser'
        });
      });

      it('can delete own task', () => {
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
        const invocation = { userId };

        deleteTask.apply(invocation, [taskId]);

        assert.equal(Tasks.find().count(), 0);
      });

      it('can mark own task complete', () => {
        const markDone = Meteor.server.method_handlers['tasks.setChecked'];
        const invocation = { userId };

        markDone.apply(invocation, [taskId, true]);

        const testTask = Tasks.findOne(taskId);

        assert.equal(testTask.checked, true);
      });
    });
  });
}
