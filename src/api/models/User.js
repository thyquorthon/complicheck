/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs'); //require('bcrypt-nodejs');


module.exports = {

  attributes: {
    customer: {
    	model: 'customer'
    },
    groups: {
    	collection: 'group',
    	via: 'users'
    },
    dni: {
	    type: 'string',
    	index: true
    },
    email: {
	    type: 'email',
	    required: true,
    	index: true,
    	unique: true
    },    
    name: {
	    type: 'string',
    	required: true,
    	index: true
    },    
    type: {
	    type: 'string',
	    enum: ['admin', 'customer', 'manager','employee'],
    	required: true,
    	index: true
    },
    password: {
	    type: 'string',
    	required: true
    },
    status: {
	    type: 'string',
	    enum: ['active', 'disabled', 'blocked'],
        defaultsTo: 'active',
    	required: true,
    	index: true
    }
  },

  // LIFECYCLE
  beforeValidate: function(values, cb) {
    Customer.findOne({email: values.email}).exec(function (err, record) {
        uniqueEmail = !err && !record;
        cb();
    });
  },

  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                cb(err);
            } else {
                user.password = hash;
                cb();
            }
        });
    });
  },

  toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        return obj;
  },

  // VALIDATION MSGS
  validationMessages: {
    name: {
        string: 'required',
        required: 'required',
        unique: 'non_unique'
    },
    email: {
        string: 'required',
        required: 'required',
        unique: 'non_unique',
        uniqueEmail: 'non_unique'
    },
    type: {
        enum: 'required',
        required: 'required'
    },
    password: {
        string: 'required',
        required: 'required'
    },
    status: {
        string: 'required',
        required: 'required'
    }    
  }
};

