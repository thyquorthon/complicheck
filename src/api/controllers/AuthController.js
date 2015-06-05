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
                return res.forbidden({
                    message: [req.__(info.message)]
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({
                    message: [req.__(info.message)],
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
			if(err){errorMessage(req, res, err, Customer); return;}
        	// 2 - create all group
        	var newGroup = {'name':req.__('all'),'customer': createdC.id};
        	Group.create(newGroup).exec(function cb(err, createdG){
				if(err){errorMessage(req, res, err, Group); return;}
				// 3 - Create a ner user
				var newUser = {};
        		Object.keys(User.attributes).forEach(function(key) {
  					if(req.body[key] != undefined) newUser[key] = req.body[key];
				});
				newUser['type'] = 'customer';
				newUser['customer'] = createdC.id;
				newUser['group'] = createdG.id;
			   	User.create(newUser).exec(function cb(err, createdU){
					if(err){errorMessage(req, res, err, User); return;}
					res.send(createdU);
	        		// end - User
    	    	});
        		// end - Group
        	});
  			// end - Customer
		});
    }
};

// TODO : This has to be in another place
function errorMessage(req, res, err, model){
	var output = {};
    var non_valid = ['string', 'email'];
    // VALIDATION ERRORS
	if(err.ValidationError) {
		Object.keys(err.ValidationError).forEach(function(field){
			output[field] = []; 
			err.ValidationError[field].forEach(function(error){
                if(non_valid.indexOf(error.rule) == -1) output[field].push(req.__(error.rule));
            });
		})        
	}
    
    // MONGO ERROR
    // TODO : Find a more elegant way to do this.    
    errorObj = JSON.parse(JSON.stringify(err)); 
    if(errorObj.error == 'E_UNKNOWN' && errorObj.raw.name == 'MongoError') {
        if (errorObj.raw.code == 11000) {         // DUPLICATED KEY ERROR
            var field = errorObj.raw.message.split('.$')[1].split('_1')[0];
            output[field] = []; output[field].push(req.__('non_unique'));
        }
    }    
    if (Object.keys(output).length>0) { res.badRequest(output); } else {res.send(err);}	
}
