$(document).ready(function () {

    $.ajax({
        url: 'http://localhost:3000/pokemon/random',
        method: 'GET'
    })
        .done(res => {
            let output = ''
            output += `
                <h2>${res.name}</h2>
                <img src="${res.sprites.front_default}" width="200px" height="200px">
                `
            $('#pokeInfo').append(output)
        })
        .fail(err => {
            console.log(err)
        })


    searchPokemon('')
})

function searchPokemon(search) {
    if (search) {
        console.log(search)
        let url = `http://localhost:3000/pokemon/search?name=${search}`
        console.log(url)
        $.ajax({
            url,
            method: 'GET'
        })
            .done(res => {
                let output = ''
                output += `
                <h2>${res.name}</h2>
                <img src="${res.sprites.front_default}">
                `
                // console.log(res.name)
                $('#pokeInfo').empty()
                $('#pokeInfo').append(output)
            })
            .fail(err => {
                console.log(err)
            })
    }
}

//!! ====================[GOOGLE MAP]======================
var geocoder
var address = 'Jakarta'

function initMap() {
    var options = {
        zoom: 11,
        center: {
            lat: -6.21462,
            lng: 106.84513
        },
        animation: google.maps.Animation.BOUNCE
    }
    //new map
    var map = new google.maps.Map(document.getElementById('map'), options)
    geocoder = new google.maps.Geocoder()

    codeAddress(geocoder, map)

    let markers = [{
        lat: -5.21462,
        lng: 106.84513,
        content: 'charizard'
    }, {
        lat: -6.21462,
        lng: 106.84513,
        content: 'bulbasar'
    }, {
        lat: -7.21462,
        lng: 106.84513,
        content: 'pikachu'
    }]

    for (let i = 0; i < markers.length; i++) {
        addMarker(markers[i])
    }

    function addMarker(detail) {
        var marker = new google.maps.Marker({
            position: {
                lat: detail.lat,
                lng: detail.lng
            },
            map: map,
            icon: detail.icon
        })
        var infoWindow = new google.maps.InfoWindow({
            content: '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"></img>'
        })
        marker.addListener('mouseover', function () {
            infoWindow.open(map, marker)
            marker.addListener('mouseout', function () {
                infoWindow.close()
            })
        })

    }
    google.maps.event.addListener(map, 'click', function (event) {
        addMarker({
            coords: event.latling
        })
    })

}

function codeAddress(geocoder, map) {
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

}


//name: response.name
//foto: response.sprites.front_default
