var $ = require('./../../js/jquery.js');

$(function () {
    clgl();
    dzcj();
    kfzgl();
    lysz();
    sqfw();
    tcdz();
    zygl();
    var index = false;
    $('.content_init').delegate('.common_pop_x', 'click', function () {
        $('.common_popUp').hide();
        $('.shade').hide();
    });
    $('.content_init').delegate('.common_pop_content_i', 'click', function () {
        index = !index;
        if (index) {
            $(this).parent().parent().children('div').show();
        } else {
            $(this).parent().parent().children('div').hide();
        }
    });
});

function clgl() {
    $('.content_init').delegate('.clgl_pop_r', 'click', function () {
        location.reload();
    });
    $('.content_init').delegate('.clgl_add_btn', 'click', function () {
        $('.clgl_popUp').show();
        $('.shade').show();
    });
    $('.content_init').delegate('.clgl_list_r', 'click', function () {
        $('.clgl_popUp').show();
        $('.shade').show();
    });
}

function dzcj() {
    $('.content_init').delegate('.dzcj_pop_r', 'click', function () {
        location.reload();
    });
    $('.content_init').delegate('.dzcj_add_btn', 'click', function () {
        $('.dzcj_popUp').show();
        $('.shade').show();
    });
    $('.content_init').delegate('.dzcj_list_r', 'click', function () {
        $('.dzcj_popUp').show();
        $('.shade').show();
    });
}

function kfzgl() {
    $('.content_init').delegate('.kfzgl_pop_r', 'click', function () {
        location.reload();
    });
    $('.content_init').delegate('.kfzgl_add_btn', 'click', function () {
        $('.kfzgl_popUp').show();
        $('.shade').show();
    });
    $('.content_init').delegate('.kfzgl_list_r', 'click', function () {
        $('.kfzgl_popUp').show();
        $('.shade').show();
    });
}

function lysz() {
    //提交
    $('.content_init').delegate('.lysz_pop_r', 'click', function () {
        // console.log($('.lysz_data_a').val())
        // console.log($('.lysz_data_b').val())
        // console.log($('.lysz_data_c').val())
        // console.log($('.lysz_data_d').val())
        // console.log($('.lysz_data_e').val())
        // console.log($('.lysz_data_f').val())
        // console.log($('.lysz_data_g').val())
        var html = '';
        $.ajax({
            method: 'post',
            url: 'http://192.168.1.200:8084/v1/route',
            data: {
                serviceId: $('.lysz_data_d').val(),
                path: $('.lysz_data_a').val(),
                enabled: $('.lysz_data_b').val(),
                stripPrefix: $('.lysz_data_e').val(),
                retryable: $('.lysz_data_f').val()
            },
            success: function (res) {}
        }); //提交
        // location.reload();
    });

    //修改
    $('.content_init').delegate('.lysz_list_r', 'click', function () {
        // console.log($('.lysz_data_a').val())
        // console.log($('.lysz_data_b').val())
        // console.log($('.lysz_data_c').val())
        // console.log($('.lysz_data_d').val())
        // console.log($('.lysz_data_e').val())
        // console.log($('.lysz_data_f').val())
        // console.log($('.lysz_data_g').val())
        var html = '';
        $.ajax({
            method: 'post',
            url: 'http://192.168.1.200:8084/v1/route',
            data: {
                retryable: $('.lysz_data_f').val(),
                path: $('.lysz_data_a').val(),
                stripPrefix: $('.lysz_data_e').val(),
                requestMethod: $('.lysz_data_g').val(),
                id: $('.lysz_data_d').val(),
                serviceId: $('.lysz_data_f').val(),
                url: $('.lysz_data_c').val(),
                enabled: $('.lysz_data_b').val(),
                sensitiveHeaders: $('.lysz_data_g').val(),                
            },
            success: function (res) {}
        }); 
    });

    $('.content_init').delegate('.lysz_add_btn', 'click', function () {
        $('.lysz_popUp').show();
        $('.shade').show();
    });
    $('.content_init').delegate('.lysz_list_r', 'click', function () {
        $('.lysz_popUp').show();
        $('.shade').show();
    });
}

function sqfw() {
    $('.content_init').delegate('.sqfw_pop_r', 'click', function () {
        location.reload();
    });
    $('.content_init').delegate('.sqfw_add_btn', 'click', function () {
        $('.sqfw_popUp').show();
        $('.shade').show();
    });
    $('.content_init').delegate('.sqfw_list_r', 'click', function () {
        $('.sqfw_popUp').show();
        $('.shade').show();
    });
}

function tcdz() {
    $('.content_init').delegate('.tcdz_pop_r', 'click', function () {
        location.reload();
    });
    $('.content_init').delegate('.tcdz_add_btn', 'click', function () {
        $('.tcdz_popUp').show();
        $('.shade').show();
    });
    $('.content_init').delegate('.tcdz_list_r', 'click', function () {
        $('.tcdz_popUp').show();
        $('.shade').show();
    });
}

function zygl() {
    $('.content_init').delegate('.zygl_pop_r', 'click', function () {
        location.reload();
    });
    $('.content_init').delegate('.zygl_add_btn', 'click', function () {
        $('.zygl_popUp').show();
        $('.shade').show();
    });
    $('.content_init').delegate('.zygl_list_r', 'click', function () {
        $('.zygl_popUp').show();
        $('.shade').show();
    });
}


