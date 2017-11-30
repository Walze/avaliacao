<?php namespace App\Http\Middleware;

use Closure;

class CORS
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        header('Access-Control-Allow-Origin', '*');
        header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers', 'Accept, Accept-Language, Content-Language, Content-Type, x-xsrf-token');

        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Accept, Accept-Language, Content-Language, Content-Type, x-xsrf-token');
    }

}