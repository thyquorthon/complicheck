/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {	
    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        // TODO: Correct res
        res.redirect('/');
    },

    register: function(req, res) {   	
        // Register proces! 
        // 0 - Check parameters
        var newCustomer = {};
        Object.keys(Customer.attributes).forEach(function(key) {
  			if(req.body[key] != undefined) newCustomer[key] = req.body[key];
		});
        // 1 -Create a new customer
        Customer.create(newCustomer).exec(function cb(err, createdC){
			if(err){errorMessage(res, err, Customer); return;}
        	// 2 - create all group
        	// TODO: LOCALIZE NAME
        	var newGroup = {'name':'all','customer': createdC.id};
        	Group.create(newGroup).exec(function cb(err, createdG){
				if(err){res.send(err); return;}
				// 3 - Create a ner user
				var newUser = {};
        		Object.keys(User.attributes).forEach(function(key) {
  					if(req.body[key] != undefined) newUser[key] = req.body[key];
				});
				newUser['type'] = 'customer';
				newUser['customer'] = createdC.id;
				newUser['group'] = createdG.id;
			   	User.create(newUser).exec(function cb(err, createdU){
					if(err){res.send(err); return;}
					res.send(createdU);
	        		// end - User
    	    	});
        		// end - Group
        	});
  			// end - Customer
		});
    }


};

function errorMessage(res, err, model){
	var output = {};
	if(err.ValidationError) {
		Object.keys(err.ValidationError).forEach(function(field){
            console.log(field);
			output[field] = [];
			err.ValidationError[field].forEach(function(error){output[field].push(error);});
		})
        res.badRequest(output);
	} else {res.send(err);}	
}
