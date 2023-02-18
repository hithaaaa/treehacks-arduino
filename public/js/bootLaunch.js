require.config ({


	shim: {
		'Backbone': ['jQuery','Underscore','bootstrap','datatables'],
		'IotApp': ['Backbone'],
		'bootstrap': {
			deps: ['jQuery']
		}

	},
/*
	'bootstrap': {
		deps: ['jQuery'],
		exports: '$'
		},*/

	waitSeconds: 30,
	paths: {
		jQuery: './libs/jquery-2.1.4.min',
		Underscore: './libs/underscore-min',
		Backbone: './libs/backbone-min',
		text: './libs/text',
		templates: '../templates',
		bootstrap: './libs/bootstrap',
		datatables: './libs/jquery.dataTables.min'
		
					
	},		

	'jQuery': {
		exports: '$'
		}

});

require(['IotApp'], function(iotApp) {
	iotApp.initialize();	
});

