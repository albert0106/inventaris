import { request } from "tns-core-modules/http/http";

export async function req_barang(data): Promise<any> {
    var URL = "https://mystal.xyz/ronaldiman/apis/get_barang.php";

    console.log(data);
    var body = {
        id : data.id
    }

    return new Promise((resolve, reject) => {
        request({
            url: URL,
            method: "POST",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            content: JSON.stringify(body)
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

export async function get_jenis(): Promise<any> {
    var URL = "https://mystal.xyz/ronaldiman/apis/get_jenis.php";

    return new Promise((resolve, reject) => {
        request({
            url: URL,
            method: "GET",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            }
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

export async function tambah_barang(data): Promise<any> {
    var URL = "https://mystal.xyz/ronaldiman/apis/tambah_barang.php";

    console.log(data);

    var body = {
        // id_gudang: id_gudang,
        // id_barang: id_barang,
    }

    return new Promise((resolve, reject) => {
        request({
            url: URL,
            method: "POST",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            content: JSON.stringify(data)
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

export async function req_detail_barang(id_gudang,id_barang): Promise<any> {
    var URL = "https://mystal.xyz/ronaldiman/apis/get_detail_barang.php";

    // console.log(data);

    var body = {
        id_gudang: id_gudang,
        id_barang: id_barang,
    }

    return new Promise((resolve, reject) => {
        request({
            url: URL,
            method: "POST",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            content: JSON.stringify(body)
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

export async function tambah_stok(data): Promise<any> {
    var URL = "https://mystal.xyz/ronaldiman/apis/tambah_stok.php";

    console.log(data);

    return new Promise((resolve, reject) => {
        request({
            url: URL,
            method: "POST",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            content: JSON.stringify(data)
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

export async function hapus(id_barang, id): Promise<any> {
    var URL = "https://mystal.xyz/ronaldiman/apis/delete.php";

    var body= {
        id_detil: id,
        id_barang: id_barang
    }

    return new Promise((resolve, reject) => {
        request({
            url: URL,
            method: "POST",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            content: JSON.stringify(body)
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

export async function edit_stok(id_barang, id, tanggal): Promise<any> {
    var URL = "https://mystal.xyz/ronaldiman/apis/edit.php";

    var body = {
        id_detil: id,
        id_barang: id_barang,
        expired_date : tanggal
    }

    return new Promise((resolve, reject) => {
        request({
            url: URL,
            method: "POST",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            content: JSON.stringify(body)
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

export async function kirim_konter(data): Promise<any> {
    var URL = "https://mystal.xyz/ronaldiman/apis/kirim_konter.php";

    var body = {
        data : [
            {}
        ]
    }

    return new Promise((resolve, reject) => {
        request({
            url: URL,
            method: "POST",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            content: JSON.stringify(body)
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
