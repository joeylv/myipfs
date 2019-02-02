# -*- coding: utf8 -*-

import ipfsapi
from flask import Flask, request, Response, render_template

from dbcon import db

# api = ipfsapi.connect('192.168.12.170', 5001)
# api = ipfsapi.connect('https://ipfs.infura.io', 5001)
# ({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }

app = Flask(__name__, static_folder='', static_url_path='')


# CORS(app)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,session_id')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD')
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route("/mzigu/", methods=['GET', 'POST'])
def mzigu():
    # if request.method == 'POST':
    print(request.json['offset'])
    # print(request.get_json(force=True))
    return db().search(request.json['offset'], 3)
    # return


@app.route("/image", methods=['GET', 'POST'])
def image():
    return render_template("index.html")


@app.route("/upload", methods=['GET', 'POST'])
# @cross_origin()
def upload():
    if request.method == 'POST':
        if 'file' in request.files:
            f = request.files['file']
            print(f)
            api = ipfsapi.connect('localhost', 5001)
            res = api.add(f)
            print(res['Hash'])
            sql = "INSERT INTO main.images(hash) VALUES('%s')" % res['Hash']
            db().dbexec(sql)
        # f.save('/var/www/uploads/uploaded_file.txt')

    return 'success'


@app.route('/<hash>', methods=['GET'])
def get(hash):
    api = ipfsapi.connect('localhost', 5001)
    res = api.cat(hash)
    # print(res)
    resp = Response(res, mimetype="image/jpeg")
    return resp


@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")


if __name__ == '__main__':
    # upload()
    app.run(host='0.0.0.0', port=8088, debug=False)
