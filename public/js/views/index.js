

define(['text!templates/index.html','text!templates/deviceTable.html','text!templates/deviceMap.html', 'text!templates/deviceDeleteList.html', 'text!templates/gpsPanel.html', 'text!templates/deviceProperties.html' ], 
			function(indexTemplate,deviceTableTemplate,deviceMapTemplate,deviceDeleteTemplate,gpsPanelTemplate,devicePropertiesTemplate) {

	
	//utility to render html pages, control ui workflow and to use data model in ui side
	var indexView = Backbone.View.extend ({

		//where content needs to be started
		el: $('#contentR'),

		events: {
      		'click #myDevices': 'myDevicesClicked',
      		'click #myEvents' : 'devicePropertiesClicked',
      		'click #deleteDevice' : 'deleteDeviceClicked',
      		'click .deleteGivenDevice' : 'deleteGivenDevice',
      		'click .displayGPSPanel' : 'displayGPSPanel',
      		'click .displayMSPanel' : 'displayMSPanel',
      		'click .displayPropPanel' : 'displayPropertyPanel',
      		'click .displayDeviceProperties' : 'displayDeviceProperties'
		},

    	initialize: function() {

	      	//Backbone.history.start();
	      		      	
	 		return this;
    	},

		render: function(opt) {
		
		//this.loadConfigData();
			//can pass in options
			this.$el.html(_.template(indexTemplate, {options: opt}));


		},
		displayDeviceProperties: function(e, id) {
			//do stuff
		},
		myDevicesClicked: function(e){
			// var data = [{'deviceId':"1234", 'deviceName' : 'GPS'},
		 //     {'deviceId':"1235", 'deviceName' : 'Motion-senser'},
		 //     {'deviceId':"1236", 'deviceName' : 'GPS'},
		 //     {'deviceId':"1237", 'deviceName' : 'Motion-senser'}];
		 //     var _thisIndex = this;
			// _thisIndex.displayDevices(data);


   			var url = 'http://localhost:3000/api/getDevices';
		    
		     var _thisIndex = this;
			$.get(url, function(data) {
							 console.log('devices data..' + JSON.stringify(data));
					     _thisIndex.displayDevices(data);

			  });

			
		},
		
		displayDevices: function(devices){
			
			if(devices)
				this.$('.area1').html(_.template(deviceTableTemplate,{data :devices}));
		},

		displayGPSPanel: function(e, id) {
			//call api
			var deviceData ={"device_id": "1001", "lat":-25, "long":131.0 };

			this.$('.GPSPanel').html(_.template(deviceMapTemplate,{data :deviceData}));
		
		},
		
		devicePropertiesClicked: function(e) {
			var data = [{'deviceId':"1234", 'deviceName' : 'GPS'},
		     {'deviceId':"1235", 'deviceName' : 'Motion-senser'},
		     {'deviceId':"1236", 'deviceName' : 'GPS'},
		     {'deviceId':"1237", 'deviceName' : 'Motion-senser'}];

		    // var propertyData = [{'deviceId':"1234", 'properties' : {"Lat":"123","long":122}},
		    //  {'deviceId':"1235", 'properties' : {"Last touched" : "09-08-2019"},
		    //  {'deviceId':"1236", , 'properties' : {"Lat":"123","long":122}},
		    //  {'deviceId':"1237", 'properties' : {"Last touched" : "09-08-2019"}]

			this.$('.area1').html(_.template(devicePropertiesTemplate,{data : data}));
		},







	  deleteDeviceClicked: function(event) {
	  		var url = 'http://localhost:3000/api/getDevices';
	  		_thisIndex = this;	 // 'this' is the class object by default, but looses scope inside another function, hence asssigned to another
	  		      	  

  			$.get(url, function(data) {
  						console.log('devices data..' + JSON.stringify(data));

  						_thisIndex.$('.area1').html(_.template(deviceDeleteTemplate,{data :data}));
		  	
  							 //implement a template here which allows post for delete data but first implement function for that
  					     //_thisIndex.deleteDevice(data);
  					
  			  });
	  }, 

	  	  deleteGivenDevice: function(event) {
	  	  		var url = 'http://localhost:3000/api/deleteDevice';
	  	  		_thisIndex = this;	 // 'this' is the class object by default, but looses scope inside another function, hence asssigned to another
	  	  		      	  

	    			//$.post(url, {device_id: $(event.target).context.id}, function(data) {
	    			$.post(url, {device_id: '12345'}, function(data) {
	    						console.log('devices data..' + JSON.stringify(data));
	    							 //implement a template here which allows post for delete data but first implement function for that
	    					     //_thisIndex.deleteDevice(data);
	    					_thisIndex.$('.area1').html(_.template(deviceDeleteTemplate,{data :data}));
	    			  });

	  	  }

	});	

	return  indexView;
});




