import './../imports/startup/simpl-schema.config';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { render } from 'react-dom';
import { Session } from 'meteor/session';

import { onAuthChangeRouting } from './../imports/ui/router/AppRouter';

import App from '/imports/ui/App'

Tracker.autorun(() => {
  const isAuthenticated = Meteor.user();
  onAuthChangeRouting(isAuthenticated);
});

Meteor.startup(() => {
  window.met = require('meteor/meteor');
  window.session = require('meteor/session');
  Session.set('showVisible', true);
  render(<App />, document.getElementById('react-target'));
});
