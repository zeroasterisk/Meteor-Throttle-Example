
if (Meteor.isServer) {
  // configure ThrottleAccounts.login - Accounts.validateLoginAttempt()
  ThrottleAccounts.login(
    'connection',
    2,
    (4 * 60000),
    'Nope - You are limited to 2 logins every 4 min (per DDP connection)'
  );
  ThrottleAccounts.login(
    'ip',
    2,
    (5 * 60000),
    'Nope - You are limited to 2 logins every 5 min (per client IP address)'
  );
  ThrottleAccounts.login(
    'user',
    2,
    60000,
    'Nope - You are limited to 2 login every 1 min (per user account - success only, if failed login, no throttle)'
  );
  ThrottleAccounts.login(
    'global',
    40,
    1000,
    'We are under heavy load - More than 40 logins every second... wait a few, and retry'
  );

  // configure ThrottleAccounts.create - Accounts.validateNewUser()
  ThrottleAccounts.create(
    'global',
    20,
    1000,
    'We are under heavy load - More than 20 creates every second... wait a few, and retry'
  );
}


if (Meteor.isClient) {

  Session.set('debug', true);
  Session.set('scope', 'global');
  Template.main.events({
    'change #debug': function() {
      Session.set('debug', $('#debug').val()==1);
      Meteor.call('example-set-debug', $('#debug').val()==1);
    },
    'change #scope': function() {
      Session.set('scope', $('#scope').val());
      Meteor.call('example-set-scope', $('#scope').val());
    }
  });

  // 5 every 10 sec
  Template.ex5x10.rendered = function() {
    Session.set('ex5x10', '');
  };
  Template.ex5x10.log = function() {
    var logs = Session.get('ex5x10');
    return Spacebars.SafeString(String(logs));
  };
  Template.ex5x10.events({
    'click input': function () {
      Meteor.call('throttle', 'ex5x10', 5, 10000, function(error, result) {
        console.log('throttle', error, result);
        var now = new Date();
        if (result) {
          var log = '<span class="label label-success">' +
              '<span class="glyphicon glyphicon-ok"></span> '  + now.toString() +
            '</span><br>';
        } else {
          var log = '<span class="label label-danger">' +
              '<span class="glyphicon glyphicon-remove"></span> '  + now.toString() +
            '</span><br>';
        }
        Session.set('ex5x10', Session.get('ex5x10') + log);
      });
    }
  });

  // 1 every 3 sec
  Template.ex1x3.rendered = function() {
    Session.set('ex1x3', '');
  };
  Template.ex1x3.log = function() {
    var logs = Session.get('ex1x3');
    return Spacebars.SafeString(String(logs));
  };
  Template.ex1x3.events({
    'click input': function () {
      Meteor.call('throttle', 'ex1x3', 1, 3000, function(error, result) {
        console.log('throttle', error, result);
        var now = new Date();
        if (result) {
          var log = '<span class="label label-success">' +
              '<span class="glyphicon glyphicon-ok"></span> '  + now.toString() +
            '</span><br>';
        } else {
          var log = '<span class="label label-danger">' +
              '<span class="glyphicon glyphicon-remove"></span> '  + now.toString() +
            '</span><br>';
        }
        Session.set('ex1x3', Session.get('ex1x3') + log);
      });
    },
  });

}

if (Meteor.isServer) {
  // config
  console.log('Setting Example to Debug=true');
  Throttle.setDebugMode(true);
  console.log('Setting Example to scope=global');
  Throttle.setScope('global');

  // custom methods
  //   you probably wouldn't want to expose these to the client
  //   in the real world... but for this example it makes sesne
  Meteor.methods({
    'example-set-debug': function(bool) {
      Throttle.setDebugMode(bool);
    },
    'example-set-scope': function(scope) {
      Throttle.setScope(scope);
    }
  });
}

