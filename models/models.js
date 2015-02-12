var models = ['./token.js',
'./user.js', 
'./meat.js',
'./category_main.js',
'./category_sub.js',
'./category_product.js',
'./product.js'
];
exports.initialize = function() {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i]);
    }
};