import { request } from "tns-core-modules/http/http";

export async function req_login(user): Promise<any> {
    var URL = "";

    return new Promise((resolve, reject) => {
        request({
            url: URL,
            method: "POST",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            content: JSON.stringify(user)
        })
            .then((response) => {
                try {
                    if (response.statusCode == 200) {
                        var data = JSON.parse(JSON.stringify(response.content))
                        console.log(data);
                        resolve(data)
                    } else {
                        var data = JSON.parse(JSON.stringify(response.content))
                        resolve(false)
                    }
                } catch (e) {
                    resolve(false)
                }
            }, (e) => {
                resolve(false)
            });
    })
}
