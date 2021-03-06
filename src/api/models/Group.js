/**
* Groups.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	name: {
	    type: 'string',
    	required: true,
    	index: true
    },
    customer: {
    	model: 'customer'
    },
    users: {
    	collection: 'user',
    	via: 'groups'
    }
  },

  // VALIDATION MSGS
  validationMessages: {
    name: {
        string: 'required',
        required: 'required'
    }
  }  
  
};

