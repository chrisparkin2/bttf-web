var models = ['./user.js', 
			'./token.js',
			'./meat.js',
			'./category_main.js',
			'./category_sub.js',
			'./category_product.js',
			'./user_product.js'];

exports.initialize = function() {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i]);
    }
};