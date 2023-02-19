

define(['text!templates/index.html','text!templates/deviceTable.html','text!templates/deviceMap.html', 'text!templates/deviceDeleteList.html', 'text!templates/gpsPanel.html', 'text!templates/deviceProperties.html', 'text!templates/chosenProperty.html' ], 
			function(indexTemplate,deviceTableTemplate,deviceMapTemplate,deviceDeleteTemplate,gpsPanelTemplate,devicePropertiesTemplate,chosenPropertyTemplate) {

	
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
      		'click .displayDeviceForProperties' : 'displayDeviceProperties' //each button
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
		displayDeviceProperties: function(event) { 
			var url = 'http://localhost:3000/api/device/properties'; //api call to get list of properties like [{name:acceleormeter..},{name:gps..}]
		    
		     var _thisIndex = this; //id is of user
		     console.log((event.target).id);
			$.get(url, {device_id: (event.target).id}, function(data) { //get this data and pass each property to function eachproperty

					console.log('list of props data..' + JSON.stringify(data));
					data.properties.forEach(function(record) {
						_thisIndex.eachProperty(record.id, (event.target).id);
						console.log("ID is "+record.id)
					});
			  });
		},
		eachProperty : function(pid, id) { //take property id and pass to api that returns property details
			var url = 'api/device/propertiesShow';
		    
		     var _thisIndex = this; 
		     var arrayOfPropData = [];
			$.get(url, {'device_id': id, 'pid':pid}, function(data) { //pass each property and add to array

					console.log('list of props data..' + JSON.stringify(data));
					arrayOfPropData.push(data[0]);

			  });
			console.log("props"+arrayOfPropData)
			_thisIndex.$('.PropertiesPanel').html(_.template(chosenPropertyTemplate, {data :arrayOfPropData}));
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
					     _thisIndex.$('.area1').html(_.template(deviceTableTemplate,{data :data}));

			  });

			
		},
		displayDevices: function(devices){
			
			if(devices)
				this.$('.area1').html(_.template(devicePropertiesTemplate, {data :devices}));
		},

		displayGPSPanel: function(e, id) {
			var url = 'http://localhost:3000/api/device/propertiesShow';
		    
		     var _thisIndex = this;
			$.get(url, {'pid':'366b6047-96c8-489b-8585-5e05f268662f', 'device_id': id}, function(data) {
							 console.log('LOCALTION data..' + JSON.stringify(data));
					     _thisIndex.$('.area1').html(_.template(deviceTableTemplate,{data :data}));

			  });

			var deviceData ={"device_id": "1001", "lat":-25, "long":131.0 };

			this.$('.GPSPanel').html(_.template(deviceMapTemplate,{data :deviceData}));
		
		},
		
		devicePropertiesClicked: function(e) {
			
			var url = 'http://localhost:3000/api/getDevices';
		    
		     var _thisIndex = this;
			$.get(url, function(data) {
				//each device, call property api
					_thisIndex.displayDevices(data);
					     
			  });
			//idk do
			
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




