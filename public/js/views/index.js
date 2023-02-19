

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

		displayFinalProperites: function(myArray){
			this.$('.PropertiesPanel').html(_.template(chosenPropertyTemplate, {data : myArray}));
		},
		displayDeviceProperties: function(event) { 
			var url = './api/device/properties'; //api call to get list of properties like [{name:acceleormeter..},{name:gps..}]
		    
		     var _thisIndex = this; //id is of user
		     
			$.get(url, {device_id: $(event.target).context.id}, function(data) { //get this data and pass each property to function eachproperty

					data.properties.forEach(function(record) {
						_thisIndex.eachProperty(record.id, $(event.target).context.id)
					});
			  });
			
		},
		eachProperty : function(pid1, id) { //take property id and pass to api that returns property details

			var temp = []
		     this.temp = []
			var url = '/api/propShow';
		    
		     var _thisIndex = this; 
			$.get(url,  { device_id : id,  pid: pid1}, function(data) { //pass each property and add to array
					//console.log(JSON.stringify(data))
					_thisIndex.temp.push({"Name: ":data.name, "Last value: ": data.last_value});
					

			  });
			console.log(JSON.stringify(this.temp));
			_thisIndex.displayFinalProperites(this.temp)
		},
		myDevicesClicked: function(e){
			// var data = [{'deviceId':"1234", 'deviceName' : 'GPS'},
		 //     {'deviceId':"1235", 'deviceName' : 'Motion-senser'},
		 //     {'deviceId':"1236", 'deviceName' : 'GPS'},
		 //     {'deviceId':"1237", 'deviceName' : 'Motion-senser'}];
		 //     var _thisIndex = this;
			// _thisIndex.displayDevices(data);


   			var url = './api/getDevices';
		     var _thisIndex = this;


			$.get(url, {"conn":true}, function(data) {
							//console.log('devices data..' + JSON.stringify(data));
					     _thisIndex.$('.area1').html(_.template(deviceTableTemplate,{data :data}));
					data.forEach(function(record) {
						if (record.events[1].value == "CONNECTED") {
							console.log(record.name + " is connected")

						}
					}) 
			  });

			
		},
		displayDevices: function(devices){
			
			if(devices)
				this.$('.area1').html(_.template(devicePropertiesTemplate, {data :devices}));
		},

		displayGPSPanel: function(e) { //displaying map based on lat and long 
			var url = './api/propShow'; //making call to properties api
		    
		     var _thisIndex = this; //pid is property id - hardcoded
			var id = (e.target).id;
			//b6047-96c8-489b-8585-5e05f268662f
			$.get(url, {device_id: id, pid: "69c637d8-ecbd-4d51-aa18-ddf803667924"}, function(data) {
							 console.log('LOCALTION data..' + JSON.stringify(data.last_value.lat)+" and "+JSON.stringify(data.last_value.lon));
							 
					     _thisIndex.$('.GPSPanel').html(_.template(deviceMapTemplate,{data :data.last_value}));
		
			  });

			
		},
		
		devicePropertiesClicked: function(e) {
			
			var url = './api/getDevices';
		    
		     var _thisIndex = this;
			$.get(url, function(data) {
				//each device, call property api
					_thisIndex.displayDevices(data);
					
			  });
			//idk do
			
		},







	  deleteDeviceClicked: function(event) {
	  		var url = './api/getDevices';
	  		_thisIndex = this;	 // 'this' is the class object by default, but looses scope inside another function, hence asssigned to another
	  		      	  

  			$.get(url, function(data) {
  						console.log('devices data..' + JSON.stringify(data));

  						_thisIndex.$('.area1').html(_.template(deviceDeleteTemplate,{data :data}));
		  	
  							 //implement a template here which allows post for delete data but first implement function for that
  					     //_thisIndex.deleteDevice(data);
  					
  			  });
	  }, 

	  	  deleteGivenDevice: function(event) {
	  	  		var url = '/api/deleteDevice';
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




