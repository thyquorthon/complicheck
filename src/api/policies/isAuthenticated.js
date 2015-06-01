/**
 * isAuthenticated policy Mappings
 * (sails.policies.isAuthenticated)
 *
 *  Checks authentication
 *  Returns 403 Forbidden if not authenticated
 */

module.exports = function(req, res, next) {
   if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.forbidden();
    }
};