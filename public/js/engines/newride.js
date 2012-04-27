$(function(){
  
  // Direcciones arrastrables

  var rendererOptions = {
    draggable: true
  };

  //llamar DirectionsService();

  var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
  var directionsService = new google.maps.DirectionsService();
  var map;


  var guadalajara = new google.maps.LatLng(20.694157,-103.386902);
  function initialize() {

    var myOptions = {
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: guadalajara
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);

    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
      computeTotalDistance(directionsDisplay.directions);
      console.log(directionsDisplay.directions.routes);
      $("#route").val(JSON.stringify(directionsDisplay.directions.routes));//route
    });
  }

  function calcRoute() {

    var request = {
      origin: $('#origin').val(),
      destination: $('#destination').val(),
      travelMode: google.maps.TravelMode.DRIVING

    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
    
    
  }



  function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000.
    document.getElementById("total").innerHTML = total + " km";
  }
  
  initialize();
  
  $("#origin, #destination").blur(function(){ 
    calcRoute();
    $('.total').css("visibility", "visible"); 
  })
  
  $('#date').datepicker();
  
  $("#origin, #destination").geo_autocomplete(
    new google.maps.Geocoder,
    {
      minChars:3,
      cacheLength:50,
      width:470,
      scroll:!1,
      scrollHeight:330,
      geocoder_address:!0,
      geocoder_region:"MX",
      select:function(b,c){
        var d=c.item.label;
        $(this).val(d)}
    });
    
    //detect radio status when page loads
    $('label.radio').each(
  		function()
  		{
  			var lid;
  			lid = '#'+$(this).attr('for');
  			if( $(lid).attr('checked') )
  			{
  				$(this).addClass('checked');
  			}
  		}
  	);


		//change radio label status on click
		$('label.radio').click(
			function()
			{
				$('label.radio').each(function(){ $(this).removeClass('checked') });
				$(this).addClass('checked')
			}
		);
  
})


