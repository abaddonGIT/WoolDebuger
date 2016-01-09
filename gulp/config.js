/**
 * Created by abaddon on 27.01.2015.
 */
var dest = './dist',
    src = './src';

module.exports = {
    forImage: {
        src: src + '/images/**',
        dest: dest + '/images'
    },
    sprites: {
        src: src + '/sprites/*.png',
        dest: src + '/images',
        name: 'sprites.png',
        cssName: 'sprites.less',
        type: 'less',
        imagePath: '../images/',
        cssPath: src + '/css',
        padding: 5
    },
    cssmin: {
        src: src + '/css/*.css',
        dest: dest + '/css'
    },
    prefix: {
        src: src + '/css/*.css',
        dest: src + '/css',
        versions: ['last 2 versions']
    },
    browserify: {
        src: src + '/js/app.js',
        dest: src + '/js',
        compileName: 'app.compile.js'
    },
    uglify: {
        src: src + '/js/app.compile.js',
        dest: dest + '/js'
    },
    html: {
        src: src + '/htdocs/*.html',
        dest: dest + '/htdocs',
        vendorsSrc: src + '/js/venders/**',
        vendorsDest: dest + '/js/venders'
    },
    sftp: {
        dest: dest + "/**",
        host: '188.120.234.133',
        user: 'root',
        pass: 'ItfaucW7bLAt',
        remotePath: '/var/www/taxi/data/www/client.taxicomfort68.ru'
    }
};