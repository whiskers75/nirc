angular.module('nirc')
  .factory('User', function() {
    var User = function(nick) {
      this.rename(nick);
    };

    /* nick!user@host */
    User.NICK_REGEX = /^([^!]+)!([^@]+)@(.+)$/;

    User.prototype.rename = function(nick) {
      var parts;
      this.whole = nick;
      /* is it in the format user!~login@host? */
      if ((parts = nick.match(User.NICK_REGEX))) {
        this.nick     = parts[1];
        this.login    = parts[2];
        this.hostname = parts[3];
      } else {
        /* probably just a plain nick */
        this.nick     = nick;
        this.login    = null;
        this.hostname = null;
      }
    };

    User.prototype.toString = function() {
      return this.nick;
    };

    User.prototype.mentionedIn = function(text) {
      if (!this._mentionRegex) {
        this._mentionRegex = new RegExp("\\b" + this.nick + "\\b", "i");
      }

      return !!text.match(this._mentionRegex);
    };

    return User;
  });
