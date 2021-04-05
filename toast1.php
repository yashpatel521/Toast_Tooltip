<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <style>
        body,
        html {
            height: 100%;
            width: 100%;
            min-height: 100%;
            padding: 0;
            margin: 0;
        }

        .error {
            width: 200px;
            height: 20px;
            /* height: auto; */
            position: absolute;
            right: 20px;
            top: 20px;
            margin-left: -100px;
            bottom: 10px;
            background-color: red;
            color: #F0F0F0;
            font-family: Calibri;
            font-size: 20px;
            padding: 10px;
            text-align: center;
            border-radius: 2px;
            -webkit-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
            -moz-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
            box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
        }
    </style>
</head>

<body>

    <div class='error' style='display:none'></div>
    <button data-text='I did something!'>Do something!</button>

</body>
<script>
    $('button').click(function() {
        $('.error').text('hello').fadeIn(400).delay(1000).fadeOut(400);
    });
</script>

</html>