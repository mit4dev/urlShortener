/*
 * Created by M. Irfan TARI | 04.03.2017
 */

$(document).ready(function () {
    $('#btn-shorten').on('click', function () {
        $.ajax({
            url: '/api/shorten',
            type: 'POST',
            dataType: 'JSON',
            data: {url: $('#url-input').val()},
            success: function (data) {
                var resultHTML = '<a target="_blank" href="' + data.shortUrl + '">'
                    + data.shortUrl + '</a>';
                $('#url').html(resultHTML);
                $('#url').hide().fadeIn('slow');
            }
        });
        console.log('click eventi calisti');
    });
});
