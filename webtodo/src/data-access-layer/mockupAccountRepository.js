
module.exports = function ({ }) {
	const allAccounts = []

	return {
		getAllAccounts: function (callback) {
			callback([], allAccounts)
		}
	}
}