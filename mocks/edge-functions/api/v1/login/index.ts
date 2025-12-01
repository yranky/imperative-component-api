export async function onRequest({ request }: { request: Request }) {
    const params = await request.json();
    const username = params?.username;

    if (username === '111') {
        return new Response(
            JSON.stringify({
                success: true,
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
