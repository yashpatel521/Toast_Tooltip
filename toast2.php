<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="iziToast.min.css">
    <script src="iziToast.min.js"></script>
</head>

<body>
    <button onclick="iziToast.error({title: 'Hello World!',message: 'I am a toast message!'});">error</button>
    <button onclick="iziToast.info({title: 'Hello World!',message: 'I am a toast message!'});">info</button>
    <button onclick="iziToast.success({title: 'Hello World!',message: 'I am a toast message!'});">success</button>
    <button onclick="iziToast.warning({title: 'Hello World!',message: 'I am a toast message!'});">warining</button>
</body>
<script>
    iziToast.settings({
        // options here
        class: '',
        title: '',
        message: '',
        color: '', // blue, red, green, yellow
        icon: '',
        iconText: '',
        iconColor: '',
        image: '',
        imageWidth: 50,
        layout: 1,
        balloon: false,
        close: true,
        rtl: false,
        position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        target: '',
        timeout: 2000,
        pauseOnHover: true,
        resetOnHover: false,
        progressBar: true,
        progressBarColor: '',
        animateInside: true,
        buttons: {},
        transitionIn: 'fadeInUp', // bounceInLeft, bounceInRight, bounceInUp, bounceInDown, fadeIn, fadeInDown, fadeInUp, fadeInLeft, fadeInRight, flipInX
        transitionOut: 'fadeOut', // fadeOut, fadeOutUp, fadeOutDown, fadeOutLeft, fadeOutRight, flipOutX
        transitionInMobile: 'fadeInUp',
        transitionOutMobile: 'fadeOutDown',
        onOpen: function() {},
        onClose: function() {}
    });


    // override options
    iziToast.settings({
        // options here
    });
</script>

</html>