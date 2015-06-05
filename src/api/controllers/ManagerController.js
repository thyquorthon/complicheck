/**
 * ManagerController
 *
 * @description :: Server-side logic for managing managers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * `ManagerController.show()`
   */
  show: function (req, res) {
 	if(req.user.type=='customer' || req.user.type=='admin') {res.view('manager/main');}
 	else {res.view('403');}
  },

};

