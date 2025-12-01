export function onRequest() {
    return new Response(
        JSON.stringify({
            success: false,
            errorCode: 0,
            data: {},
        }),
        {
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            },
        }
    );
}
