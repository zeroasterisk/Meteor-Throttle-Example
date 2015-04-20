Meteor Throttle
==========================

A Simple (server only) Throttling System for Meteor.

This system uses a new Collection 'throttle' and some helper methods to:
`check`, `set`, and `purge` records.  There is also a helper `checkThenSet`
method which is actually the most common pattern, check if we can do something,
and the set a record that we did.

Example Meteor Application
------------------------

* https://github.com/zeroasterisk/Meteor-Throttle-Example
 * http://throttle-example.meteor.com
* https://github.com/zeroasterisk/Meteor-Throttle
* https://github.com/zeroasterisk/Meteor-Throttle-Accounts


Install
------------------------

Simple package [Atmosphere Package](https://atmospherejs.com/zeroasterisk/throttle) install is all you need:

    meteor add zeroasterisk:throttle

Optionally add an [Accounts Throttling](https://atmospherejs.com/zeroasterisk/throttle-accounts) "extra" if you want:

    meteor add zeroasterisk:throttle-accounts
