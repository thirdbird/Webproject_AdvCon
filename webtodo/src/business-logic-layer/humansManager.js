const humansRepository = require('../data-access-layer/humansRepository')

exports.getAllHumans = function(callback){
	humansRepository.getAllHumans(function(humans){
		// TODO: Also handle errors.
		callback(humans)
	})
}