/**
* Customers.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  // Custom validation types
  uniqueEmail: false,
    types: {
        uniqueEmail: function(value) {
            return uniqueEmail;
        }
    },

  // ATTRIBUTES
  attributes: {
	name: {
	    type: 'string',
    	unique: true,
    	required: true,
    	index: true
    },
    email: {
        type: 'email',
        required: true,
        unique: true
    },      
    address: {
	    type: 'string'
    },
    status: {
        type: 'string',
        enum: ['active', 'disabled', 'blocked'],
        defaultsTo: 'active',
        required: true,
        index: true
    },    
    groups:{
            collection: 'group',
            via: 'customer'
        },
    users:{
            collection: 'user',
            via: 'customer'
        }
  },
  
  // LIFECYCLE
  beforeValidate: function(values, cb) {
    Customer.findOne({email: values.email}).exec(function (err, record) {
        uniqueEmail = !err && !record;
        cb();
    });
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
  }

};
