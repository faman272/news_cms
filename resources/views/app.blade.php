<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }}</title>

    {{-- Favicon --}}
    <link rel="icon" href="/images/favicon.ico" type="image/x-icon">

    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>

<body class="font-body">
    @inertia
</body>

</html>
