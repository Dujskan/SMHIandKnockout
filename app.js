function WeatherViewModel(){
    var self = this;

    self.locationData = ko.observableArray();
    self.locationName = ko.observable('');

    //West and East
    self.long = ko.observable('16');

    //South and North
    self.lat = ko.observable('56.3586');


    self.longAndLatIsInRange = function(){
        var long = parseFloat(self.long());
        var lat = parseFloat(self.lat());

        return (self.locationName().length > 0) &&
            (lat <= 70.75 && lat >= 52.50) &&
            (long >= 2.25 && long <= 38.00);
    };

    self.deleteLoaction = function(location){
        self.locationData.remove(location)
    }

    self.getWeatherData = function(){

        var url = 'http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/' + self.lat() + '/lon/' + self.long() + '/data.json';

        $.ajax({
            url: url,
            type: 'GET',
            crossDomain: true,
            success: function (response) {

                var average;
                var degrees = response.timeseries.map(function(item){return item.tcc;}).sort()
                var median = degrees[(Math.round(degrees.length / 2))];

                var sum = 0;
                degrees.forEach(function(degree){

                    sum += degree;
                })
                average = sum / degrees.length;

                self.locationData.push({
                    locationName : self.locationName(),
                    long: self.long(),
                    lat: self.lat(),
                    average: average,
                    mean: median});

                self.locationName('');
                self.long('');
                self.lat('');

            },
            error: function (response) {
                if(response.state() == 'rejected'){
                    alert('FIELD POINT OUT OF BOUNDS')
                }
            }
        });
    }

}

var viewModel = new WeatherViewModel()
ko.applyBindings(viewModel);
