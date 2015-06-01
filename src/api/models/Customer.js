/**
* Customers.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	name: {
	    type: 'string',
    	unique: true,
    	required: true,
    	index: true
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

  validationMessages: {
    name: {
        required: 'email required',
        unique: 'repeated name'
    }
  }

};
