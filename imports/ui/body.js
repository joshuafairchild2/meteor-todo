import { Template } from 'meteor/templating';

import './body.html';

Template.body.helpers({
  tasks: [
    { text: 'Task 1' },
    { text: 'Task 2' },
    { text: 'Task 3' },
  ],
});
